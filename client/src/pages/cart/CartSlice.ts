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

export const deleteItemInCartAsync = createAsyncThunk(
  "cart/deleteVehicleInCart",
  async (data: { userId: string; vehicleId: string }) => {
    try {
      debugger;
      await agent.Cart.deleteItem(data.userId, data.vehicleId);

      return data;
    } catch (error: any) {
      toast.error(error.data.message);
      throw error;
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
      state.cart = action.payload;
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.cartLoading = false;
    });
    builder.addCase(deleteItemInCartAsync.fulfilled, (state, action) => {
      const { vehicleId } = action.payload;
      if (state.cart) {
        state.cart.shops.forEach((shop) => {
          const vehicleIndex = shop.vehicles.findIndex(
            (v) => v.vehicleId === vehicleId
          );
          if (vehicleIndex !== -1) {
            shop.vehicles.splice(vehicleIndex, 1);
          }
        });
        // Remove shops without vehicles
        state.cart.shops = state.cart.shops.filter(
          (shop) => shop.vehicles.length > 0
        );
      }
    });
  },
});

export const {} = CartSlice.actions;
