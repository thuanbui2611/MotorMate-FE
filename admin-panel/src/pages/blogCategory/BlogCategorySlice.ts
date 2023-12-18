import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/ConfigureStore";
import { toast } from "react-toastify";
import { Category } from "../../app/models/Category";

interface BlogCategoryState {
  blogCategory: Category | null;
  blogCategoryLoaded: boolean;
}

const blogCategorysAdapter = createEntityAdapter<Category>();

export const getBlogCategoriesAsync = createAsyncThunk<
  Category[],
  void,
  { state: RootState }
>("blogCategory/getBlogCategoriesAsync", async (_, ThunkAPI) => {
  try {
    const response = await agent.Category.all();
    return response;
  } catch (error: any) {
    return ThunkAPI.rejectWithValue({ error: error.data });
  }
});

export const addBlogCategoryAsync = createAsyncThunk<Category, FieldValues>(
  "blogCategory/addBlogCategoryAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Category.create(data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateBlogCategoryAsync = createAsyncThunk<Category, FieldValues>(
  "blogCategory/updateBlogCategoryAsync",
  async (data, ThunkAPI) => {
    try {
      const response = await agent.Category.update(data.id, data);
      return response;
    } catch (error: any) {
      return ThunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteBlogCategoryAsync = createAsyncThunk(
  "blogCategory/deleteBlogCategoryAsync",
  async (id: string) => {
    try {
      await agent.Category.delete(id);
      toast.success("Delete category successfully!");
      return id;
    } catch (error: any) {
      toast.error(error.data.message);
      throw error;
    }
  }
);

export const BlogCategorySlice = createSlice({
  name: "blogCategory",
  initialState: blogCategorysAdapter.getInitialState<BlogCategoryState>({
    blogCategory: null,
    blogCategoryLoaded: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategoriesAsync.fulfilled, (state, action) => {
        blogCategorysAdapter.setAll(state, action.payload);
        state.blogCategoryLoaded = false;
      })
      .addCase(getBlogCategoriesAsync.pending, (state, action) => {
        state.blogCategoryLoaded = true;
      })
      .addCase(getBlogCategoriesAsync.rejected, (state, action) => {
        console.log("Get blog categories rejected: ", action);
        state.blogCategoryLoaded = false;
      });

    builder.addCase(addBlogCategoryAsync.fulfilled, (state, action) => {
      toast.success("Add category successfully!");
      blogCategorysAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateBlogCategoryAsync.fulfilled, (state, action) => {
      toast.success("Update category successfully!");
      blogCategorysAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(deleteBlogCategoryAsync.fulfilled, (state, action) => {
      blogCategorysAdapter.removeOne(state, action.payload);
    });
  },
});

export const blogCategorySelectors = blogCategorysAdapter.getSelectors(
  (state: RootState) => state.blogCategory
);

export const {} = BlogCategorySlice.actions;
