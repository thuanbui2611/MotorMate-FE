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
  vehicle: Vehicle | null;
  vehicleLoaded: boolean;
  vehicleParams: VehicleParams;
  metaData: MetaData | null;
}

const vehiclesAdapter = createEntityAdapter<Vehicle>();

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

export const getVehiclesAsync = createAsyncThunk<
  Vehicle[],
  void,
  { state: RootState }
>("vehicle/getVehiclesAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().vehicle.vehicleParams);
  try {
    const response = await agent.Vehicle.listVehicleByStatus(
      params,
      "approved"
    );
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addVehicleAsync = createAsyncThunk<Vehicle, FieldValues>(
  "vehicle/addVehicleAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Vehicle.create(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateVehicleAsync = createAsyncThunk<Vehicle, FieldValues>(
  "vehicle/updateVehicleAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Vehicle.update(data.id, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const lockVehicleAsync = createAsyncThunk(
  "vehicle/lockVehicleAsync",
  async (id: string) => {
    try {
      const response = await agent.Vehicle.lock(id);

      return response;
    } catch (error: any) {
      toast.error(error.data.message);
      throw error;
    }
  }
);

export const deleteVehicleAsync = createAsyncThunk(
  "vehicle/deleteVehicleAsync",
  async (id: string) => {
    try {
      await agent.Vehicle.delete(id);
      toast.success("Delete vehicle successfully!");
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

export const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: vehiclesAdapter.getInitialState<VehicleState>({
    vehicle: null,
    vehicleLoaded: false,
    vehicleParams: initParams(),
    metaData: null,
  }),
  reducers: {
    addVehicle: (state, action) => {
      vehiclesAdapter.addOne(state, action.payload);
    },
    removeVehicle: (state, action) => {
      vehiclesAdapter.removeOne(state, action.payload);
    },
    setVehicleParams: (state, action) => {
      state.vehicleParams = {
        ...state.vehicleParams,
        ...action.payload,
      };
    },
    resetVehicleParams: (state) => {
      state.vehicleParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.vehicleLoaded = false;
      state.vehicleParams = {
        ...state.vehicleParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehiclesAsync.fulfilled, (state, action) => {
        vehiclesAdapter.setAll(state, action.payload);
        state.vehicleLoaded = false;
      })
      .addCase(getVehiclesAsync.pending, (state, action) => {
        state.vehicleLoaded = true;
      })
      .addCase(getVehiclesAsync.rejected, (state, action) => {
        console.log("Get vehicles rejected: ", action);
        state.vehicleLoaded = false;
      });

    builder.addCase(addVehicleAsync.fulfilled, (state, action) => {
      toast.success("Add vehicle successfully!");
      vehiclesAdapter.addOne(state, action.payload);
    });

    builder
      .addCase(lockVehicleAsync.fulfilled, (state, action) => {
        const { id, isLocked } = action.payload;
        vehiclesAdapter.updateOne(state, {
          id: id,
          changes: { isLocked: isLocked },
        });
        if (isLocked) {
          toast.success("Lock vehicle successfully!");
        } else {
          toast.success("Unlock vehicle successfully!");
        }
      })
      .addCase(lockVehicleAsync.rejected, (state, action) => {
        toast.error("Lock vehicle failed!");
      });

    builder.addCase(updateVehicleAsync.fulfilled, (state, action) => {
      toast.success("Update vehicle successfully!");
      vehiclesAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteVehicleAsync.fulfilled, (state, action) => {
      vehiclesAdapter.removeOne(state, action.payload);
    });
  },
});

export const vehicleSelectors = vehiclesAdapter.getSelectors(
  (state: RootState) => state.vehicle
);

export const {
  setVehicleParams,
  resetVehicleParams,
  setMetaData,
  setPageNumber,
  addVehicle,
  removeVehicle,
} = VehicleSlice.actions;
