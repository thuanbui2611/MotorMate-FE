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
  productOfUser: Vehicle | null;
  productOfUserLoaded: boolean;
}

const initialState: ProfileState = {
  productOfUser: null,
  productOfUserLoaded: false,
};

const profileAdapter = createEntityAdapter<Vehicle>();

export const getProductsOfUserAsync = createAsyncThunk<
  Vehicle[],
  string,
  { state: RootState }
>("profile/getProductUserAsync", async (ownerId: string, ThunkAPI) => {
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
    productOfUser: null,
    productOfUserLoaded: false,
  }),
  reducers: {
    addProductUser: (state, action) => {
      profileAdapter.addOne(state, action.payload);
    },
    updateProductUser: (state, action) => {
      profileAdapter.upsertOne(state, action.payload);
    },
    removeProductUser: (state, action) => {
      profileAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsOfUserAsync.fulfilled, (state, action) => {
        profileAdapter.upsertMany(state, action.payload);
        state.productOfUserLoaded = false;
      })
      .addCase(getProductsOfUserAsync.pending, (state, action) => {
        state.productOfUserLoaded = true;
      })
      .addCase(getProductsOfUserAsync.rejected, (state, action) => {
        console.log("Get product by user rejected: ", action);
        state.productOfUserLoaded = false;
      });
  },
});

export const profileSelectors = profileAdapter.getSelectors(
  (state: RootState) => state.profile
);

export const {} = ProfileSlice.actions;
