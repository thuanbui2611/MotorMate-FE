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

interface MyOrderState {
  myOrders: ParentOrder | null;
  myOrdersLoaded: boolean;
  myOrdersParams: TripRequestParams;
  metaData: MetaData | null;
}

const myOrdersAdapter = createEntityAdapter<ParentOrder>({
  selectId: (order) => order.parentOrderId,
});

function getAxiosParams(myOrdersParams: TripRequestParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", myOrdersParams.pageNumber.toString());
  params.append("pageSize", myOrdersParams.pageSize.toString());

  // if (productParams.Search) {
  //   params.append("Search", productParams.Search);
  // }
  return params;
}

export const getMyOrdersAsync = createAsyncThunk<
  ParentOrder[],
  string,
  { state: RootState }
>("myOrder/getMyOrdersAsync", async (lesseeId, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().myOrder.myOrdersParams);
  try {
    const response = await agent.TripRequest.ordersOfUser(lesseeId, params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const updateStatusMyOrdersAsync = createAsyncThunk<
  ParentOrder,
  { status: string; requestIds: string[]; reason: string },
  { state: RootState }
>("myOrder/updateStatusMyOrdersAsync", async (data, ThunkAPI) => {
  try {
    //Not add addCase to update state yet.
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

export const MyOrderSlice = createSlice({
  name: "my-orders",
  initialState: myOrdersAdapter.getInitialState<MyOrderState>({
    myOrders: null,
    myOrdersLoaded: false,
    myOrdersParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setMyOrdersParams: (state, action) => {
      state.myOrdersParams = {
        ...state.myOrdersParams,
        ...action.payload,
      };
    },
    resetMyOrdersParams: (state) => {
      state.myOrdersParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.myOrdersLoaded = false;
      state.myOrdersParams = {
        ...state.myOrdersParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrdersAsync.fulfilled, (state, action) => {
        myOrdersAdapter.setAll(state, action.payload);
        state.myOrdersLoaded = false;
      })
      .addCase(getMyOrdersAsync.pending, (state, action) => {
        state.myOrdersLoaded = true;
      })
      .addCase(getMyOrdersAsync.rejected, (state, action) => {
        console.log("Get my orders rejected: ", action);
        state.myOrdersLoaded = false;
      })
      .addCase(updateStatusMyOrdersAsync.fulfilled, (state, action) => {
        myOrdersAdapter.setOne(state, action.payload);
        toast.success("Cancel order successfully!");
      });
  },
});

export const myOrderSelectors = myOrdersAdapter.getSelectors(
  (state: RootState) => state.myOrder
);

export const {
  setMyOrdersParams,
  resetMyOrdersParams,
  setMetaData,
  setPageNumber,
} = MyOrderSlice.actions;
