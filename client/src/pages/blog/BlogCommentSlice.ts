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
import {
  BlogComment,
  BlogCommentParams,
  Comment,
} from "../../app/models/CommentBlog";

interface BlogCommentState {
  blogComment: Comment | null;
  blogCommentLoaded: boolean;
  blogCommentParams: BlogCommentParams;
  metaData: MetaData | null;
}

const blogCommentsAdapter = createEntityAdapter<BlogComment>({
  selectId: (blogComment) =>
    blogComment.comments.length > 0
      ? blogComment.comments[0].blogId
      : "defaultId",
});

function getAxiosParams(blogCommentParams: BlogCommentParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", blogCommentParams.pageNumber.toString());
  params.append("pageSize", blogCommentParams.pageSize.toString());
  return params;
}

export const getBlogCommentsAsync = createAsyncThunk<
  BlogComment,
  string,
  { state: RootState }
>("blogComment/getBlogsAsync", async (blogId, ThunkAPI) => {
  const params = getAxiosParams(
    ThunkAPI.getState().blogComment.blogCommentParams
  );
  try {
    const response = await agent.Blog.getCommentOfBlog(blogId, params);
    ThunkAPI.dispatch(setMetaData(response.metaData));
    const blogCommentResponse: BlogComment = {
      comments: response.items,
    };
    return blogCommentResponse;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addCommentAsync = createAsyncThunk<Comment, FieldValues>(
  "blogComment/addCommentAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Blog.createCommentForBlog(data, data.blogId);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 5,
  };
}

export const BlogCommentSlice = createSlice({
  name: "blogComment",
  initialState: blogCommentsAdapter.getInitialState<BlogCommentState>({
    blogComment: null,
    blogCommentLoaded: false,
    blogCommentParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setBlogCommentParams: (state, action) => {
      state.blogCommentParams = {
        ...state.blogCommentParams,
        ...action.payload,
      };
    },
    resetBlogCommentParams: (state) => {
      state.blogCommentParams = initParams();
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action) => {
      state.blogCommentLoaded = false;
      state.blogCommentParams = {
        ...state.blogCommentParams,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCommentsAsync.fulfilled, (state, action) => {
        blogCommentsAdapter.upsertOne(state, action.payload);
        state.blogCommentLoaded = false;
      })
      .addCase(getBlogCommentsAsync.pending, (state, action) => {
        state.blogCommentLoaded = true;
      })
      .addCase(getBlogCommentsAsync.rejected, (state, action) => {
        console.log("Get blogComment rejected: ", action);
        state.blogCommentLoaded = false;
      });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      toast.success("Add comment successfully!");
      const { blogId } = action.payload;
      state.entities[blogId]?.comments.unshift(action.payload);
    });
    builder.addCase(addCommentAsync.rejected, (state, action) => {
      toast.success("Add comment failed!");
      console.log("Add comment failed: ", action);
    });
  },
});

export const blogCommentSelectors = blogCommentsAdapter.getSelectors(
  (state: RootState) => state.blogComment
);

export const {
  setBlogCommentParams,
  resetBlogCommentParams,
  setMetaData,
  setPageNumber,
} = BlogCommentSlice.actions;
