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
import { Color, ColorParams } from "../../app/models/Color";

interface ColorState {
  color: Color | null;
  colorLoaded: boolean;
  colorParams: ColorParams;
  metaData: MetaData | null;
}

const colorsAdapter = createEntityAdapter<Color>();

function getAxiosParams(colorParams: ColorParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", colorParams.pageNumber.toString());
  params.append("pageSize", colorParams.pageSize.toString());
  return params;
}

export const getColorsAsync = createAsyncThunk<
  Color[],
  void,
  { state: RootState }
>("color/getColorsAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().color.colorParams);
  try {
    const response = await agent.Color.list(params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addColorAsync = createAsyncThunk<Color, FieldValues>(
  "color/addColorAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Color.create(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateColorAsync = createAsyncThunk<Color, FieldValues>(
  "color/updateColorAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Color.update(data.id, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteColorAsync = createAsyncThunk(
  "color/deleteColorAsync",
  async (id: string) => {
    try {
      await agent.Color.delete(id);
      toast.success("Delete color successfully!");
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

export const ColorSlice = createSlice({
  name: "color",
  initialState: colorsAdapter.getInitialState<ColorState>({
    color: null,
    colorLoaded: false,
    colorParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setColorParams: (state, action) => {
      state.colorParams = { ...state.colorParams, ...action.payload };
    },

    resetColorParams: (state) => {
      state.colorParams = initParams();
    },

    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.colorLoaded = false;
      state.colorParams = { ...state.colorParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColorsAsync.fulfilled, (state, action) => {
        colorsAdapter.setAll(state, action.payload);
        state.colorLoaded = false;
      })
      .addCase(getColorsAsync.pending, (state, action) => {
        state.colorLoaded = true;
      })
      .addCase(getColorsAsync.rejected, (state, action) => {
        console.log("Get color rejected: ", action);
        state.colorLoaded = false;
      });

    builder.addCase(addColorAsync.fulfilled, (state, action) => {
      toast.success("Add color successfully!");
      colorsAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateColorAsync.fulfilled, (state, action) => {
      toast.success("Update color successfully!");
      colorsAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteColorAsync.fulfilled, (state, action) => {
      colorsAdapter.removeOne(state, action.payload);
    });
  },
});

export const colorSelectors = colorsAdapter.getSelectors(
  (state: RootState) => state.color
);

export const { setColorParams, resetColorParams, setMetaData, setPageNumber } =
  ColorSlice.actions;
