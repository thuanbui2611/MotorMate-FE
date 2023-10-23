import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../app/models/Cart";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/store/ConfigureStore";

interface CartState {
  cart: Cart | null;
  cartLoading: boolean;
}

const initialState: CartState = {
  cart: null,
  cartLoading: false,
};

export const getCartAsync = createAsyncThunk<Cart, string>(
  "cart/getCart",
  async (userId, thunkAPI) => {
    try {
      debugger;
      const cart = await agent.Cart.getCartByUser(userId);
      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  // {
  //   condition: () => {
  //     const userDetail = useAppSelector((state) => state.account.userDetail);
  //     if (!userDetail) return false;
  //   },
  // }
);

export const addToCartAsync = createAsyncThunk<Cart, {}>(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const response = await agent.Cart.addToCart(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.pending, (state, action) => {
      state.cartLoading = true;
    });
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartLoading = false;
    });
    builder.addCase(getCartAsync.rejected, (state, action) => {
      state.cartLoading = false;
      console.log("Get cart fail", action.error.message);
    });
    builder.addCase(addToCartAsync.pending, (state, action) => {
      state.cartLoading = true;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      try {
        debugger;
        const { shops } = action.payload;
        if (state.cart) {
          const index = state.cart.shops.findIndex(
            (x) => x.lessorId === shops[0].lessorId
          );
          if (index === -1) {
            state.cart.shops.push(shops[0]);
          } else {
            state.cart.shops[index].vehicles = [
              ...state.cart.shops[index].vehicles,
              ...shops[0].vehicles,
            ];
          }
          toast.success("Add to cart successfully");
        } else {
          state.cart = action.payload;
          toast.success("Add to cart successfully");
        }
      } catch (error) {
        console.log(error);
      }
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.cartLoading = false;
    });
  },
});

export const {} = CartSlice.actions;
