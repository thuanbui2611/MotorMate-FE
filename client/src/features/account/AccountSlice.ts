import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User, UserLogin } from "../../app/models/User";
import { FieldValues } from "react-hook-form";
import agentTest from "../../app/api/agentTest";
import jwt_decode from "jwt-decode";

interface AccountState {
  user: User | null;
  userLogin: UserLogin | null;
}

const initialState: AccountState = {
  user: null,
  userLogin: null,
};

export const signInUser = createAsyncThunk<UserLogin, FieldValues>(
  "account/signInUser",
  async ({ data }, thunkAPI) => {
    try {
      const user = await agentTest.Account.login(data);
      debugger;
      localStorage.setItem("userToken", user.token);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const currentUser = createAsyncThunk<any>(
  "account/currentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const decodedToken = jwt_decode(token) as any;
        // Check expiration time of token
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("userToken");
          return thunkAPI.rejectWithValue({ error: "Token expired" });
        }
        return decodedToken;
      } else {
        // No valid token found in localStorage
        return thunkAPI.rejectWithValue({ error: "No valid token found" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, currentUser.fulfilled),
      (state, action) => {
        if (action.payload) {
          state.userLogin = action.payload;
        } else {
          state.userLogin = null;
        }
      }
    );

    builder.addMatcher(
      isAnyOf(signInUser.rejected, currentUser.rejected),
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});
