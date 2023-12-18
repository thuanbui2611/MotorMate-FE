import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { MetaData } from "../../app/models/Pagination";
import { RootState } from "../../app/store/ConfigureStore";
import agent from "../../app/api/agent";
import { ParentOrder } from "../../app/models/TripRequest";
import { TransactionParams } from "../../app/models/Transaction";

interface TransactionState {
  transaction: ParentOrder | null;
  transactionLoaded: boolean;
  transactionParams: TransactionParams;
  metaData: MetaData | null;
}

const transactionsAdapter = createEntityAdapter<ParentOrder>({
  selectId: (order) => order.parentOrderId,
});

function getAxiosParams(transactionParams: TransactionParams) {
  const params = new URLSearchParams();

  params.append("pageNumber", transactionParams.pageNumber.toString());
  params.append("pageSize", transactionParams.pageSize.toString());

  if (transactionParams.Status) {
    params.append("Status", transactionParams.Status);
  }
  if (transactionParams.SearchQuery) {
    params.append("SearchQuery", transactionParams.SearchQuery);
  }

  return params;
}

export const getTransactionsAsync = createAsyncThunk<
  ParentOrder[],
  void,
  { state: RootState }
>("transaction/getTransactionsAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(
    ThunkAPI.getState().transaction.transactionParams
  );
  try {
    const response = await agent.TripeRequest.list(params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 5,
    Status: "",
    SearchQuery: "",
  };
}

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState: transactionsAdapter.getInitialState<TransactionState>({
    transaction: null,
    transactionLoaded: false,
    transactionParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setTransactionParams: (state, action) => {
      state.transactionParams = {
        ...state.transactionParams,
        ...action.payload,
      };
    },
    resetTransactionParams: (state) => {
      state.transactionParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.transactionLoaded = false;
      state.transactionParams = {
        ...state.transactionParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsAsync.fulfilled, (state, action) => {
        transactionsAdapter.setAll(state, action.payload);
        state.transactionLoaded = false;
      })
      .addCase(getTransactionsAsync.pending, (state, action) => {
        state.transactionLoaded = true;
      })
      .addCase(getTransactionsAsync.rejected, (state, action) => {
        console.log("Get transactions rejected: ", action);
        state.transactionLoaded = false;
      });
  },
});

export const transactionSelectors = transactionsAdapter.getSelectors(
  (state: RootState) => state.transaction
);

export const {
  setTransactionParams,
  resetTransactionParams,
  setMetaData,
  setPageNumber,
} = TransactionSlice.actions;
