import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { UserDetail } from "../../app/models/User";
import { Vehicle } from "../../app/models/Vehicle";
import { RootState } from "../../app/store/ConfigureStore";
import agent from "../../app/api/agent";

interface ProfileState {
  profileUser: UserDetail | null;
  productOfUser: Vehicle | null;
  profileLoaded: boolean;
  productLoaded: boolean;
}

const initialState: ProfileState = {
  profileUser: null,
  productOfUser: null,
  profileLoaded: false,
  productLoaded: false,
};

const profileAdapter = createEntityAdapter<UserDetail>();

export const getProfileUserAsync = createAsyncThunk<
  UserDetail,
  string,
  { state: RootState }
>("profile/getProfileUserAsync", async (username: string, ThunkAPI) => {
  try {
    const response = await agent.User.details(username);
    return response;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getProductUserAsync = createAsyncThunk<
  Vehicle,
  string,
  { state: RootState }
>("profile/getProfileUserAsync", async (ownerId: string, ThunkAPI) => {
  try {
    const response = await agent.Vehicle.getVehicleByOwner(ownerId);
    return response;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: profileAdapter.getInitialState<ProfileState>({
    profileUser: null,
    productOfUser: null,
    profileLoaded: false,
    productLoaded: false,
  }),
  reducers: {
    // getProfileUser: (state, action) => {
    //   state.profileUser = action.payload;
    //   state.profileLoaded = true;
    // },
    // getProductUser: (state, action) => {
    //   state.productOfUser = action.payload;
    //   state.productLoaded = true;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileUserAsync.fulfilled, (state, action) => {
        profileAdapter.setOne(state, action.payload);
        state.profileLoaded = false;
      })
      .addCase(getProfileUserAsync.pending, (state, action) => {
        state.profileLoaded = true;
      })
      .addCase(getProfileUserAsync.rejected, (state, action) => {
        console.log("Get profile rejected: ", action);
        state.profileLoaded = false;
      });

    builder
      .addCase(getProductUserAsync.fulfilled, (state, action) => {
        state.productOfUser = action.payload;
        state.productLoaded = false;
      })
      .addCase(getProductUserAsync.pending, (state, action) => {
        state.productLoaded = true;
      })
      .addCase(getProductUserAsync.rejected, (state, action) => {
        console.log("Get product by user rejected: ", action);
        state.productLoaded = false;
      });
  },
});

export const profileSelectors = profileAdapter.getSelectors(
  (state: RootState) => state.profile
);

export const {} = ProfileSlice.actions;
