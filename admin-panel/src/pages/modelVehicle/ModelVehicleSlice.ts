import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  ModelVehicle,
  ModelVehicleParams,
} from "../../app/models/ModelVehicle";
import { RootState } from "../../app/store/ConfigureStore";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { MetaData } from "../../app/models/Pagination";

interface ModelVehicleState {
  modelVehicle: ModelVehicle | null;
  modelVehicleLoaded: boolean;
  modelVehicleParams: ModelVehicleParams;
  metaData: MetaData | null;
}

const modelVehiclesAdapter = createEntityAdapter<ModelVehicle>();

function getAxiosParams(modelVehicleParams: ModelVehicleParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", modelVehicleParams.pageNumber.toString());
  params.append("pageSize", modelVehicleParams.pageSize.toString());
  return params;
}

export const getModelVehiclesAsync = createAsyncThunk<
  ModelVehicle[],
  void,
  { state: RootState }
>("modelVehicle/getModelVehiclesAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(
    ThunkAPI.getState().modelVehicle.modelVehicleParams
  );
  try {
    const response = await agent.ModelVehicle.list(params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addModelVehicleAsync = createAsyncThunk<ModelVehicle, FieldValues>(
  "modelVehicle/addModelVehicleAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.ModelVehicle.create(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateModelVehicleAsync = createAsyncThunk<
  ModelVehicle,
  FieldValues
>("modelVehicle/updateModelVehicleAsync", async (data, ThunkAPI) => {
  try {
    const response = await agent.ModelVehicle.update(data.id, data);
    return response;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const deleteModelVehicleAsync = createAsyncThunk(
  "modelVehicle/deleteModelVehicleAsync",
  async (id: string) => {
    try {
      await agent.ModelVehicle.delete(id);
      toast.success("Delete modelVehicle successfully!");
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

export const ModelVehicleSlice = createSlice({
  name: "modelVehicle",
  initialState: modelVehiclesAdapter.getInitialState<ModelVehicleState>({
    modelVehicle: null,
    modelVehicleLoaded: false,
    modelVehicleParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setModelVehicleParams: (state, action) => {
      state.modelVehicleParams = {
        ...state.modelVehicleParams,
        ...action.payload,
      };
    },

    resetModelVehicleParams: (state) => {
      state.modelVehicleParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.modelVehicleLoaded = false;
      state.modelVehicleParams = {
        ...state.modelVehicleParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModelVehiclesAsync.fulfilled, (state, action) => {
        modelVehiclesAdapter.setAll(state, action.payload);
        state.modelVehicleLoaded = false;
      })
      .addCase(getModelVehiclesAsync.pending, (state, action) => {
        state.modelVehicleLoaded = true;
      })
      .addCase(getModelVehiclesAsync.rejected, (state, action) => {
        console.log("Get ModelVehicle rejected: ", action);
        state.modelVehicleLoaded = false;
      });

    builder.addCase(addModelVehicleAsync.fulfilled, (state, action) => {
      toast.success("Add ModelVehicle successfully!");
      modelVehiclesAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateModelVehicleAsync.fulfilled, (state, action) => {
      toast.success("Update ModelVehicle successfully!");
      modelVehiclesAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteModelVehicleAsync.fulfilled, (state, action) => {
      modelVehiclesAdapter.removeOne(state, action.payload);
    });
  },
});

export const modelVehicleSelectors = modelVehiclesAdapter.getSelectors(
  (state: RootState) => state.modelVehicle
);

export const {
  setModelVehicleParams,
  resetModelVehicleParams,
  setMetaData,
  setPageNumber,
} = ModelVehicleSlice.actions;
