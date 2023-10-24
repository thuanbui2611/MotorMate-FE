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

interface ProductState {
  product: Vehicle | null;
  productLoaded: boolean;
  productParams: VehicleParams;
  metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Vehicle>();

function getAxiosParams(productParams: VehicleParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  if (productParams.Models!.length > 0) {
    productParams.Models!.forEach((model) => {
      params.append("Models", model);
    });
  }
  if (productParams.Brands!.length > 0) {
    productParams.Brands!.forEach((brand) => {
      params.append("Brands", brand);
    });
  }
  if (productParams.Collections!.length > 0) {
    productParams.Collections!.forEach((collection) => {
      params.append("Collections", collection);
    });
  }
  if (productParams.Cities!.length > 0) {
    productParams.Cities!.forEach((city) => {
      params.append("Cities", city);
    });
  }
  debugger;
  if (productParams.IsSortPriceDesc) {
    params.append("IsSortPriceDesc", productParams.IsSortPriceDesc.toString());
  }
  return params;
}

export const getProductsAsync = createAsyncThunk<
  Vehicle[],
  void,
  { state: RootState }
>("product/getProductsAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().product.productParams);
  try {
    const response = await agent.Vehicle.list(params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addProductAsync = createAsyncThunk<Vehicle, FieldValues>(
  "product/addProductAsync",
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
  "product/updateProductAsync",
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
  "product/deleteProductAsync",
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

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 5,
    Brands: [],
    Collections: [],
    Models: [],
    Cities: [],
    IsSortPriceDesc: null,
  };
}

export const ProductSlice = createSlice({
  name: "product",
  initialState: productsAdapter.getInitialState<ProductState>({
    product: null,
    productLoaded: false,
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productParams = {
        ...state.productParams,
        ...action.payload,
      };
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.productLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.productLoaded = false;
      })
      .addCase(getProductsAsync.pending, (state, action) => {
        state.productLoaded = true;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        console.log("Get products rejected: ", action);
        state.productLoaded = false;
      });

    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      toast.success("Add product successfully!");
      productsAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      toast.success("Update product successfully!");
      productsAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      productsAdapter.removeOne(state, action.payload);
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.product
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = ProductSlice.actions;
