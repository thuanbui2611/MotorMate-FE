import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { UserDetail } from "../../app/models/User";
import { Vehicle } from "../../app/models/Vehicle";
import { RootState } from "../../app/store/ConfigureStore";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

interface ProfileState {
  profileUser: UserDetail | null;
  profileUserLoaded: boolean;
  productOfUser: Vehicle | null;
  productOfUserLoaded: boolean;
}

const initialState: ProfileState = {
  profileUser: null,
  profileUserLoaded: false,
  productOfUser: null,
  productOfUserLoaded: false,
};

const profileAdapter = createEntityAdapter<Vehicle>();

export const getProfileByUsernameAsync = createAsyncThunk<UserDetail, string>(
  "profile/getUser",
  async (username: string, ThunkAPI) => {
    try {
      const response = await agent.User.details(username);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

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

export const addProductAsync = createAsyncThunk<Vehicle, FieldValues>(
  "profile/addProductAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Vehicle.create(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateProductAsync = createAsyncThunk<Vehicle, FieldValues>(
  "profile/updateProductAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Vehicle.update(data.id, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "profile/deleteProductAsync",
  async (id: string) => {
    try {
      await agent.Vehicle.delete(id);
      toast.success("Delete product successfully!");
      return id;
    } catch (error: any) {
      toast.error(error.data.message);
      throw error;
    }
  }
);

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: profileAdapter.getInitialState<ProfileState>({
    productOfUser: null,
    profileUser: null,
    profileUserLoaded: false,
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
    builder
      .addCase(getProfileByUsernameAsync.fulfilled, (state, action) => {
        state.profileUser = action.payload;
        state.profileUserLoaded = false;
      })
      .addCase(getProfileByUsernameAsync.pending, (state, action) => {
        state.profileUserLoaded = true;
      })
      .addCase(getProfileByUsernameAsync.rejected, (state, action) => {
        console.log("Get user profile rejected: ", action);
        state.profileUserLoaded = false;
      });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      toast.success("Add product successfully!");
      profileAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      toast.success("Update product successfully!");
      profileAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      profileAdapter.removeOne(state, action.payload);
    });
  },
});

export const profileSelectors = profileAdapter.getSelectors(
  (state: RootState) => state.profile
);

export const {} = ProfileSlice.actions;
