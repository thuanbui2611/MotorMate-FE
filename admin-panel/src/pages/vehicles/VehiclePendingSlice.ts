import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { MetaData } from "../../app/models/Pagination";
import { Vehicle, VehicleParams } from "../../app/models/Vehicle";
import { RootState } from "../../app/store/ConfigureStore";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

interface VehicleState {
  vehiclesPending: Vehicle | null;
  vehiclesPendingLoaded: boolean;
  vehiclesParams: VehicleParams;
  isFetched: boolean;
  metaData: MetaData | null;
}

const vehiclesPendingAdapter = createEntityAdapter<Vehicle>();

function getAxiosParams(vehicleParams: VehicleParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", vehicleParams.pageNumber.toString());
  params.append("pageSize", vehicleParams.pageSize.toString());
  if (vehicleParams.Models!.length > 0) {
    vehicleParams.Models!.forEach((model) => {
      params.append("Models", model);
    });
  }
  if (vehicleParams.Brands!.length > 0) {
    vehicleParams.Brands!.forEach((brand) => {
      params.append("Brands", brand);
    });
  }
  if (vehicleParams.Collections!.length > 0) {
    vehicleParams.Collections!.forEach((collection) => {
      params.append("Collections", collection);
    });
  }
  if (vehicleParams.Cities!.length > 0) {
    vehicleParams.Cities!.forEach((city) => {
      params.append("Cities", city);
    });
  }
  if (vehicleParams.Search) {
    params.append("Search", vehicleParams.Search);
  }
  return params;
}

export const getVehiclesPendingAsync = createAsyncThunk<
  Vehicle[],
  void,
  { state: RootState }
>("vehiclesPending/getVehiclesPendingAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(
    ThunkAPI.getState().vehiclePending.vehiclesParams
  );
  try {
    const response = await agent.Vehicle.listVehicleByStatus(params, "pending");
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addVehicleAsync = createAsyncThunk<Vehicle, FieldValues>(
  "vehiclesPending/addVehicleAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Vehicle.create(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateVehiclePendingAsync = createAsyncThunk<Vehicle, FieldValues>(
  "vehiclesPending/updateVehiclePendingAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Vehicle.update(data.id, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteVehiclePendingAsync = createAsyncThunk(
  "vehiclesPending/deleteVehiclePendingAsync",
  async (id: string) => {
    try {
      await agent.Vehicle.delete(id);
      toast.success("Delete vehiclePending successfully!");
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
    Brands: [],
    Collections: [],
    Models: [],
    Cities: [],
    Search: null,
  };
}

export const VehiclePendingSlice = createSlice({
  name: "vehiclePending",
  initialState: vehiclesPendingAdapter.getInitialState<VehicleState>({
    vehiclesPending: null,
    vehiclesPendingLoaded: false,
    vehiclesParams: initParams(),
    metaData: null,
    isFetched: false,
  }),
  reducers: {
    addVehiclePending: (state, action) => {
      vehiclesPendingAdapter.addOne(state, action.payload);
    },
    removeVehiclePending: (state, action) => {
      vehiclesPendingAdapter.removeOne(state, action.payload);
    },
    setVehiclePendingParams: (state, action) => {
      state.vehiclesParams = {
        ...state.vehiclesParams,
        ...action.payload,
      };
    },
    resetVehiclePendingParams: (state) => {
      state.vehiclesParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.vehiclesPendingLoaded = false;
      state.vehiclesParams = {
        ...state.vehiclesParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehiclesPendingAsync.fulfilled, (state, action) => {
        vehiclesPendingAdapter.setAll(state, action.payload);
        state.vehiclesPendingLoaded = false;
        state.isFetched = true;
      })
      .addCase(getVehiclesPendingAsync.pending, (state, action) => {
        state.vehiclesPendingLoaded = true;
      })
      .addCase(getVehiclesPendingAsync.rejected, (state, action) => {
        console.log("Get Vehicles Pending Rejected: ", action);
        state.vehiclesPendingLoaded = false;
      });

    builder.addCase(addVehicleAsync.fulfilled, (state, action) => {
      toast.success("Add vehicle successfully!");
      vehiclesPendingAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateVehiclePendingAsync.fulfilled, (state, action) => {
      toast.success("Update Vehicle Pending Successfully!");
      if (state.isFetched) {
        vehiclesPendingAdapter.upsertOne(state, action.payload);
      }
    });

    builder.addCase(deleteVehiclePendingAsync.fulfilled, (state, action) => {
      vehiclesPendingAdapter.removeOne(state, action.payload);
    });
  },
});

export const vehiclePendingSelectors = vehiclesPendingAdapter.getSelectors(
  (state: RootState) => state.vehiclePending
);

export const {
  setVehiclePendingParams,
  resetVehiclePendingParams,
  setMetaData,
  setPageNumber,
  removeVehiclePending,
  addVehiclePending,
} = VehiclePendingSlice.actions;
