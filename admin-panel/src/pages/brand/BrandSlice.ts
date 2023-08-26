import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Brand, BrandParams } from "../../app/models/Brand";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/ConfigureStore";

interface BrandState {
  brand: Brand | null;
  brandLoaded: boolean;
  brandParams: BrandParams;
}

const brandsAdapter = createEntityAdapter<Brand>();

function getAxiosParams(brandParams: BrandParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", brandParams.pageNumber.toString());
  params.append("pageSize", brandParams.pageSize.toString());
  return params;
}

export const getBrandsAsync = createAsyncThunk<
  Brand[],
  void,
  { state: RootState }
>("brand/getBrandsAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().brand.brandParams);
  try {
    const response = await agent.Brand.list(params);
    return response;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 10,
  };
}

export const BrandSlice = createSlice({
  name: "brand",
  initialState: brandsAdapter.getInitialState<BrandState>({
    brand: null,
    brandLoaded: false,
    brandParams: initParams(),
  }),
  reducers: {
    setBrandParams: (state, action) => {
      state.brandLoaded = false;
      state.brandParams = { ...state.brandParams, ...action.payload };
    },
    resetBrandParams: (state) => {
      state.brandParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBrandsAsync.pending, (state, action) => {});
    builder.addCase(getBrandsAsync.fulfilled, (state, action) => {
      brandsAdapter.setAll(state, action.payload);
      state.brandLoaded = false;
    });
    builder.addCase(getBrandsAsync.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const brandSelectors = brandsAdapter.getSelectors(
  (state: RootState) => state.brand
);

export const { setBrandParams, resetBrandParams } = BrandSlice.actions;
