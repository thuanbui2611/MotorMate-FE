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
import { vehiclesAdapter } from "./VehicleSlice";

interface VehicleState {
  vehiclesPending: Vehicle | null;
  vehiclesPendingLoaded: boolean;
  vehiclesPendingParams: VehicleParams;
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

  return params;
}

export const getVehiclesPendingAsync = createAsyncThunk<
  Vehicle[],
  void,
  { state: RootState }
>("vehiclesPending/getVehiclesPendingAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().vehicle.vehicleParams);
  try {
    const response = await agent.Vehicle.listVehicleByStatus(params, "pending");
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

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
  };
}

export const VehiclePendingSlice = createSlice({
  name: "vehicle",
  initialState: vehiclesPendingAdapter.getInitialState<VehicleState>({
    vehiclesPending: null,
    vehiclesPendingLoaded: false,
    vehiclesPendingParams: initParams(),
    metaData: null,
  }),
  reducers: {
    addVehiclePending: (state, action) => {
      vehiclesPendingAdapter.addOne(state, action.payload);
    },
    removeVehiclePending: (state, action) => {
      vehiclesPendingAdapter.removeOne(state, action.payload);
    },
    setVehiclePendingParams: (state, action) => {
      state.vehiclesPendingParams = {
        ...state.vehiclesPendingParams,
        ...action.payload,
      };
    },
    resetVehiclePendingParams: (state) => {
      state.vehiclesPendingParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.vehiclesPendingLoaded = false;
      state.vehiclesPendingParams = {
        ...state.vehiclesPendingParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehiclesPendingAsync.fulfilled, (state, action) => {
        vehiclesPendingAdapter.setAll(state, action.payload);
        state.vehiclesPendingLoaded = false;
      })
      .addCase(getVehiclesPendingAsync.pending, (state, action) => {
        state.vehiclesPendingLoaded = true;
      })
      .addCase(getVehiclesPendingAsync.rejected, (state, action) => {
        console.log("Get vehiclesPending rejected: ", action);
        state.vehiclesPendingLoaded = false;
      });

    builder.addCase(updateVehiclePendingAsync.fulfilled, (state, action) => {
      toast.success("Update vehiclesPending successfully!");
      vehiclesPendingAdapter.upsertOne(state, action.payload);
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
