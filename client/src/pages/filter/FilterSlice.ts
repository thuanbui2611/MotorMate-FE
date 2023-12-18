import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Brand } from "../../app/models/Brand";
import { Collection } from "../../app/models/Collection";
import { ModelVehicle } from "../../app/models/ModelVehicle";
import agent from "../../app/api/agent";
import { City } from "../../app/models/Address";
import dataCityVN from "./../../app/data/dataCityVN.json";
import { UserDetail } from "../../app/models/User";

interface FilterState {
  brands: Brand[];
  brandLoading: boolean;
  collections: Collection[];
  collectionLoading: boolean;
  modelVehicles: ModelVehicle[];
  modelVehicleLoading: boolean;
  cities: City[];
  users: UserDetail[];
  usersLoading: boolean;
}

const initialState: FilterState = {
  brands: [],
  brandLoading: false,
  collections: [],
  collectionLoading: false,
  modelVehicles: [],
  modelVehicleLoading: false,
  cities: [],
  users: [],
  usersLoading: false,
};

export const getBrandsAsync = createAsyncThunk<Brand[]>(
  "filter/getBrandsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Brand.all();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getCollectionsAsync = createAsyncThunk<Collection[]>(
  "filter/getCollectionsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Collection.all();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getModelVehiclesAsync = createAsyncThunk<ModelVehicle[]>(
  "filter/getModelVehiclesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.ModelVehicle.all();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getCities = createAsyncThunk<City[]>(
  "filter/getCities",
  async (_, ThunkAPI) => {
    try {
      const cities = dataCityVN as City[];
      return cities;
    } catch (error) {
      return ThunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const getUsersAsync = createAsyncThunk<UserDetail[]>(
  "filter/getUsersAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.User.all();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as any).data });
    }
  }
);

export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsAsync.pending, (state, action) => {
        state.brandLoading = true;
      })
      .addCase(getBrandsAsync.fulfilled, (state, action) => {
        state.brandLoading = false;
        state.brands = action.payload;
      })
      .addCase(getBrandsAsync.rejected, (state, action) => {
        console.log("Get brands fail");
      });

    builder
      .addCase(getCollectionsAsync.pending, (state, action) => {
        state.collectionLoading = true;
      })
      .addCase(getCollectionsAsync.fulfilled, (state, action) => {
        state.collectionLoading = false;
        state.collections = action.payload;
      })
      .addCase(getCollectionsAsync.rejected, (state, action) => {
        console.log("Get collections fail");
      });

    builder
      .addCase(getModelVehiclesAsync.pending, (state, action) => {
        state.modelVehicleLoading = true;
      })
      .addCase(getModelVehiclesAsync.fulfilled, (state, action) => {
        state.modelVehicleLoading = false;
        state.modelVehicles = action.payload;
      })
      .addCase(getModelVehiclesAsync.rejected, (state, action) => {
        console.log("Get model vehicles fail");
      });

    builder
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(getCities.rejected, (state, action) => {
        console.log("Get cities fail");
      });

    builder
      .addCase(getUsersAsync.pending, (state, action) => {
        state.usersLoading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        console.log("Get users fail");
      });
  },
});

export const {} = FilterSlice.actions;
