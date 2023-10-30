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
import { Collection, CollectionParams } from "../../app/models/Collection";

interface CollectionState {
  collection: Collection | null;
  collectionLoaded: boolean;
  collectionParams: CollectionParams;
  metaData: MetaData | null;
}

const collectionsAdapter = createEntityAdapter<Collection>();

function getAxiosParams(collectionParams: CollectionParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", collectionParams.pageNumber.toString());
  params.append("pageSize", collectionParams.pageSize.toString());
  return params;
}

export const getCollectionsAsync = createAsyncThunk<
  Collection[],
  void,
  { state: RootState }
>("collection/getCollectionsAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(
    ThunkAPI.getState().collection.collectionParams
  );
  try {
    const response = await agent.Collection.list(params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addCollectionAsync = createAsyncThunk<Collection, FieldValues>(
  "collection/addCollectionAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Collection.create(data);
      response.brand = data.brand;
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateCollectionAsync = createAsyncThunk<Collection, FieldValues>(
  "collection/updateCollectionAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Collection.update(data.id, data);
      ////////////////
      response.brand = data.brand;
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteCollectionAsync = createAsyncThunk(
  "collection/deleteCollectionAsync",
  async (id: string) => {
    try {
      await agent.Collection.delete(id);
      toast.success("Delete collection successfully!");
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

export const CollectionSlice = createSlice({
  name: "collection",
  initialState: collectionsAdapter.getInitialState<CollectionState>({
    collection: null,
    collectionLoaded: false,
    collectionParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setCollectionParams: (state, action) => {
      state.collectionParams = { ...state.collectionParams, ...action.payload };
    },

    resetCollectionParams: (state) => {
      state.collectionParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.collectionLoaded = false;
      state.collectionParams = { ...state.collectionParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectionsAsync.fulfilled, (state, action) => {
        collectionsAdapter.setAll(state, action.payload);
        state.collectionLoaded = false;
      })
      .addCase(getCollectionsAsync.pending, (state, action) => {
        state.collectionLoaded = true;
      })
      .addCase(getCollectionsAsync.rejected, (state, action) => {
        console.log("Get collection rejected: ", action);
        state.collectionLoaded = false;
      });

    builder.addCase(addCollectionAsync.fulfilled, (state, action) => {
      toast.success("Add collection successfully!");
      collectionsAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateCollectionAsync.fulfilled, (state, action) => {
      toast.success("Update collection successfully!");
      collectionsAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteCollectionAsync.fulfilled, (state, action) => {
      collectionsAdapter.removeOne(state, action.payload);
    });
  },
});

export const collectionSelectors = collectionsAdapter.getSelectors(
  (state: RootState) => state.collection
);

export const {
  setCollectionParams,
  resetCollectionParams,
  setMetaData,
  setPageNumber,
} = CollectionSlice.actions;
