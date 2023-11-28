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
import { Blog, BlogParams } from "../../app/models/Blog";

interface BlogState {
  blog: Blog | null;
  blogLoaded: boolean;
  blogParams: BlogParams;
  metaData: MetaData | null;
}

const blogsAdapter = createEntityAdapter<Blog>();

function getAxiosParams(blogParams: BlogParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", blogParams.pageNumber.toString());
  params.append("pageSize", blogParams.pageSize.toString());
  return params;
}

export const getBlogsAsync = createAsyncThunk<
  Blog[],
  void,
  { state: RootState }
>("blog/getBlogsAsync", async (_, ThunkAPI) => {
  const params = getAxiosParams(ThunkAPI.getState().blog.blogParams);
  try {
    const response = await agent.Blog.list(params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addBlogAsync = createAsyncThunk<Blog, FieldValues>(
  "blog/addBlogAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Blog.create(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateBlogAsync = createAsyncThunk<Blog, FieldValues>(
  "blog/updateBlogAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Blog.update(data.id, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlogAsync",
  async (id: string) => {
    try {
      await agent.Blog.delete(id);
      toast.success("Delete blog successfully!");
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
    pageSize: 6,
  };
}

export const BlogSlice = createSlice({
  name: "blog",
  initialState: blogsAdapter.getInitialState<BlogState>({
    blog: null,
    blogLoaded: false,
    blogParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setBlogParams: (state, action) => {
      state.blogParams = { ...state.blogParams, ...action.payload };
    },

    resetBlogParams: (state) => {
      state.blogParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.blogLoaded = false;
      state.blogParams = { ...state.blogParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogsAsync.fulfilled, (state, action) => {
        blogsAdapter.setAll(state, action.payload);
        state.blogLoaded = false;
      })
      .addCase(getBlogsAsync.pending, (state, action) => {
        state.blogLoaded = true;
      })
      .addCase(getBlogsAsync.rejected, (state, action) => {
        console.log("Get blog rejected: ", action);
        state.blogLoaded = false;
      });

    builder.addCase(addBlogAsync.fulfilled, (state, action) => {
      toast.success("Add blog successfully!");
      blogsAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateBlogAsync.fulfilled, (state, action) => {
      toast.success("Update blog successfully!");
      blogsAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {
      blogsAdapter.removeOne(state, action.payload);
    });
  },
});

export const blogSelectors = blogsAdapter.getSelectors(
  (state: RootState) => state.blog
);

export const { setBlogParams, resetBlogParams, setMetaData, setPageNumber } =
  BlogSlice.actions;
