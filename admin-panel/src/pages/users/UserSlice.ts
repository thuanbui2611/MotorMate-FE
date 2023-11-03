import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/ConfigureStore";
import { toast } from "react-toastify";
import { MetaData } from "../../app/models/Pagination";
import { UserDetail, UserParams } from "../../app/models/User";

interface UserState {
  user: UserDetail | null;
  userLoaded: boolean;
  userParams: UserParams;
  metaData: MetaData | null;
}

const usersAdapter = createEntityAdapter<UserDetail>();

function getAxiosParams(userParams: UserParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", userParams.pageNumber.toString());
  params.append("pageSize", userParams.pageSize.toString());
  return params;
}

export const getUsersAsync = createAsyncThunk<
  UserDetail[],
  void,
  { state: RootState }
>("user/getUsersAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().user.userParams);
  try {
    const response = await agent.User.list(params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addUserAsync = createAsyncThunk<UserDetail, FieldValues>(
  "user/addUserAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Account.Register(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateUserAsync = createAsyncThunk<UserDetail, FieldValues>(
  "user/updateUserAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.User.update(data.username, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUserAsync",
  async (id: string) => {
    try {
      await agent.User.delete(id);
      toast.success("Delete user successfully!");
      return id;
    } catch (error: any) {
      toast.error(error.data.message);
      throw error;
    }
  }
);

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 5,
  };
}

export const UserSlice = createSlice({
  name: "user",
  initialState: usersAdapter.getInitialState<UserState>({
    user: null,
    userLoaded: false,
    userParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setUserParams: (state, action) => {
      state.userParams = { ...state.userParams, ...action.payload };
    },

    resetUserParams: (state) => {
      state.userParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.userLoaded = false;
      state.userParams = { ...state.userParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        state.userLoaded = false;
      })
      .addCase(getUsersAsync.pending, (state, action) => {
        state.userLoaded = true;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        console.log("Get user rejected: ", action);
        state.userLoaded = false;
      });

    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      toast.success("Add user successfully!");
      usersAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      toast.success("Update user successfully!");
      usersAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      usersAdapter.removeOne(state, action.payload);
    });
  },
});

export const userSelectors = usersAdapter.getSelectors(
  (state: RootState) => state.user
);

export const { setUserParams, resetUserParams, setMetaData, setPageNumber } =
  UserSlice.actions;
