import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User, UserLogin } from "../../app/models/User";
import { FieldValues } from "react-hook-form";
import agentTest from "../../app/api/agentTest";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { history } from "../..";

interface AccountState {
  user: User | null;
  userLoginToken: UserLogin | null;
}

const initialState: AccountState = {
  user: null,
  userLoginToken: null,
};

export const signInUser = createAsyncThunk<UserLogin, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userLoginToken = await agentTest.Account.login(data);
      localStorage.setItem("userToken", userLoginToken.token);
      return userLoginToken;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const fetchUserFromToken = createAsyncThunk<any>(
  "account/fetchUserFromToken",
  (_, { rejectWithValue }) => {
    console.log("Fetching user from token");
    try {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        const decodedToken = jwt_decode(userToken) as any;
        // Check expiration time of token
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("userToken");
          return rejectWithValue({ error: "Token expired" });
        }
        const user: User = {
          username:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          name: decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
          email:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        };
        return user;
      } else {
        // No valid token found in localStorage
        // throw new Error("No user token found in localStorage");
        return rejectWithValue({ error: "No valid token found" });
      }
    } catch (error) {
      return rejectWithValue({ error: (error as any).message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("userToken")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.userLoginToken = null;
      localStorage.removeItem("userToken");
      history.push("/");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.userLoginToken = action.payload;
    });

    builder.addCase(signInUser.rejected, (state, action) => {
      console.log("Action rejected, the payload:");
      console.log(action.payload);
    });

    builder.addCase(fetchUserFromToken.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(fetchUserFromToken.rejected, (state, action) => {
      state.userLoginToken = null;
      state.user = null;
      localStorage.removeItem("userToken");
      toast.error("Token expired, please sign in again!");
    });
  },
});

export const { signOut } = accountSlice.actions;
