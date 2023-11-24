import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/Pagination";
import { ParentOrder, TripRequestParams } from "../../app/models/TripRequest";
import { RootState } from "../../app/store/ConfigureStore";
import { toast } from "react-toastify";

interface ShopOrderState {
  shopOrder: ParentOrder | null;
  shopOrderLoaded: boolean;
  shopOrderParams: TripRequestParams;
  metaData: MetaData | null;
}

const shopOrderAdapter = createEntityAdapter<ParentOrder>({
  selectId: (order) => order.parentOrderId,
});

function getAxiosParams(shopOrderParams: TripRequestParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", shopOrderParams.pageNumber.toString());
  params.append("pageSize", shopOrderParams.pageSize.toString());

  // if (productParams.Search) {
  //   params.append("Search", productParams.Search);
  // }
  return params;
}

export const getShopOrdersAsync = createAsyncThunk<
  ParentOrder[],
  string,
  { state: RootState }
>("shopOrder/getShopOrdersAsync", async (lessorId, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().shopOrder.shopOrderParams);
  try {
    const response = await agent.TripRequest.ordersOfLessor(lessorId, params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const updateStatusShopOrdersAsync = createAsyncThunk<
  ParentOrder,
  { status: string; requestIds: string[]; reason: string },
  { state: RootState }
>("shopOrder/updateStatusShopOrdersAsync", async (data, ThunkAPI) => {
  try {
    const response = await agent.TripRequest.updateStatusOrder(data);
    return response;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 5,
  };
}

export const ShopOrderSlice = createSlice({
  name: "my-orders",
  initialState: shopOrderAdapter.getInitialState<ShopOrderState>({
    shopOrder: null,
    shopOrderLoaded: false,
    shopOrderParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setShopOrdersParams: (state, action) => {
      state.shopOrderParams = {
        ...state.shopOrderParams,
        ...action.payload,
      };
    },
    resetShopOrdersParams: (state) => {
      state.shopOrderParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.shopOrderLoaded = false;
      state.shopOrderParams = {
        ...state.shopOrderParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShopOrdersAsync.fulfilled, (state, action) => {
        shopOrderAdapter.setAll(state, action.payload);
        state.shopOrderLoaded = false;
      })
      .addCase(getShopOrdersAsync.pending, (state, action) => {
        state.shopOrderLoaded = true;
      })
      .addCase(getShopOrdersAsync.rejected, (state, action) => {
        console.log("Get shop orders rejected: ", action);
        state.shopOrderLoaded = false;
      })
      .addCase(updateStatusShopOrdersAsync.fulfilled, (state, action) => {
        const orderUpdated = action.payload;
        shopOrderAdapter.setOne(state, orderUpdated);
      })
      .addCase(updateStatusShopOrdersAsync.rejected, (state, action) => {
        console.log("Update status shop orders rejected: ", action);
      });
  },
});

export const shopOrderSelectors = shopOrderAdapter.getSelectors(
  (state: RootState) => state.shopOrder
);

export const {
  setShopOrdersParams,
  resetShopOrdersParams,
  setMetaData,
  setPageNumber,
} = ShopOrderSlice.actions;
