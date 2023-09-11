import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { User } from "../../app/models/User";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userLogin = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(userLogin));
      return userLogin.token;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const signInByGoogle = createAsyncThunk<User, string>(
  "account/signInByGoogle",
  async (tokenCredential, thunkAPI) => {
    try {
      const userLogin = await agent.Account.loginGoogle({
        tokenCredential,
      });
      localStorage.setItem("user", JSON.stringify(userLogin));
      return userLogin.token;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const fetchUserFromToken = createAsyncThunk<User>(
  "account/fetchUserFromToken",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userLogin = localStorage.getItem("user");
      const user = JSON.parse(userLogin!);
      localStorage.setItem("user", JSON.stringify(user));
      return user.token;
    } catch (error) {
      debugger;
      return thunkAPI.rejectWithValue(error);
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

// export const getUserDetails = createAsyncThunk<User>(
//   "account/getUserDetails",
//   async (_, thunkAPI) => {
//     try {
//       const user = await agent.Account.userDetail();
//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: (error as any).data });
//     }
//   },
//   {
//     condition: () => {
//       if (!localStorage.getItem("user")) return false;
//     },
//   }
// );

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Log out success!");
    },
    setUser: (state, action) => {
      try {
        const userToken = action.payload.token.toString();
        const decodedToken = jwt_decode(userToken) as any;
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("user");
          throw new Error("Token expired!");
        }
        state.user = setDataUserFromToken(decodedToken, userToken);
      } catch (error) {
        throw new Error("No valid token found, please login again!");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFromToken.rejected, (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error(action.error.message);
    });

    builder.addMatcher(
      isAnyOf(
        signInUser.fulfilled,
        signInByGoogle.fulfilled,
        fetchUserFromToken.fulfilled
      ),
      (state, action) => {
        let userToken = action.payload.toString();
        const decodedToken = jwt_decode(userToken) as any;
        state.user = setDataUserFromToken(decodedToken, userToken);
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, signInByGoogle.rejected),
      (state, action) => {
        console.log("SignIn rejected, the payload:");
        console.log(action.payload);
      }
    );
  },
});

function setDataUserFromToken(decodedToken: any, userToken: string) {
  const user = {
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
    token: userToken,
  };
  return user;
}

export const { signOut, setUser } = AccountSlice.actions;
