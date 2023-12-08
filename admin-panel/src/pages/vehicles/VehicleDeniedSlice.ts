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
  vehiclesDenied: Vehicle | null;
  vehiclesDeniedLoaded: boolean;
  vehiclesParams: VehicleParams;
  metaData: MetaData | null;
}

const vehiclesDeniedAdapter = createEntityAdapter<Vehicle>();

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

export const getVehiclesDeniedAsync = createAsyncThunk<
  Vehicle[],
  void,
  { state: RootState }
>("vehiclesDenied/getVehiclesDeniedAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(
    ThunkAPI.getState().vehicleDenied.vehiclesParams
  );
  try {
    const response = await agent.Vehicle.listVehicleByStatus(params, "denied");
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const updateVehicleDeniedAsync = createAsyncThunk<Vehicle, FieldValues>(
  "vehiclesDenied/updateVehicleDeniedAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Vehicle.update(data.id, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteVehicleDeniedAsync = createAsyncThunk(
  "vehiclesDenied/deleteVehicleDeniedAsync",
  async (id: string) => {
    try {
      await agent.Vehicle.delete(id);
      toast.success("Delete vehicleDenied successfully!");
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

export const VehicleDeniedSlice = createSlice({
  name: "vehicle",
  initialState: vehiclesDeniedAdapter.getInitialState<VehicleState>({
    vehiclesDenied: null,
    vehiclesDeniedLoaded: false,
    vehiclesParams: initParams(),
    metaData: null,
  }),
  reducers: {
    addVehicleDenied: (state, action) => {
      vehiclesDeniedAdapter.addOne(state, action.payload);
    },
    removeVehicleDenied: (state, action) => {
      vehiclesDeniedAdapter.removeOne(state, action.payload);
    },
    setVehicleDeniedParams: (state, action) => {
      state.vehiclesParams = {
        ...state.vehiclesParams,
        ...action.payload,
      };
    },
    resetVehicleDeniedParams: (state) => {
      state.vehiclesParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.vehiclesDeniedLoaded = false;
      state.vehiclesParams = {
        ...state.vehiclesParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehiclesDeniedAsync.fulfilled, (state, action) => {
        vehiclesDeniedAdapter.setAll(state, action.payload);
        state.vehiclesDeniedLoaded = false;
      })
      .addCase(getVehiclesDeniedAsync.pending, (state, action) => {
        state.vehiclesDeniedLoaded = true;
      })
      .addCase(getVehiclesDeniedAsync.rejected, (state, action) => {
        console.log("Get Vehicle Denied rejected: ", action);
        state.vehiclesDeniedLoaded = false;
      });

    builder.addCase(updateVehicleDeniedAsync.fulfilled, (state, action) => {
      toast.success("Update Vehicle Denied successfully!");
      vehiclesDeniedAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteVehicleDeniedAsync.fulfilled, (state, action) => {
      vehiclesDeniedAdapter.removeOne(state, action.payload);
    });
  },
});

export const vehicleDeniedSelectors = vehiclesDeniedAdapter.getSelectors(
  (state: RootState) => state.vehicleDenied
);

export const {
  setVehicleDeniedParams,
  resetVehicleDeniedParams,
  setMetaData,
  setPageNumber,
  addVehicleDenied,
  removeVehicleDenied,
} = VehicleDeniedSlice.actions;
