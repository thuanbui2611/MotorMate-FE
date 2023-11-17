import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart, Shop, Vehicle } from "../../app/models/Cart";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
interface CartState {
  cart: Cart | null;
  cartLoading: boolean;
  selectedVehicles: Shop[];
}

const initialState: CartState = {
  cart: null,
  cartLoading: false,
  selectedVehicles: [],
};

export const getCartAsync = createAsyncThunk<Cart, string>(
  "cart/getCart",
  async (userId, thunkAPI) => {
    try {
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
  async (data: { userId: string; vehicleId: string }, thunkAPI) => {
    try {
      await agent.Cart.deleteItem(data.userId, data.vehicleId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error, data });
    }
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addRemoveSelectedVehicle: (state, action) => {
      const { shop, vehicle } = action.payload;
      const indexShop = state.selectedVehicles.findIndex(
        (s) => s.lessorId === shop.lessorId
      );
      if (indexShop !== -1) {
        //Add new vehicle to shop
        const selectedVehiclesInShop =
          state.selectedVehicles[indexShop].vehicles;
        const indexVehicle = selectedVehiclesInShop.findIndex(
          (v) => v.vehicleId === vehicle.vehicleId
        );
        if (indexVehicle !== -1) {
          // Vehicle already selected, remove it
          if (selectedVehiclesInShop.length > 1) {
            // Shop have more than 1 vehicle, remove vehicle only
            state.selectedVehicles[indexShop].vehicles.splice(indexVehicle, 1);
          } else {
            // Shop have only 1 vehicle, remove shop
            state.selectedVehicles.splice(indexShop, 1);
          }
        } else {
          // Vehicle not selected, add it
          state.selectedVehicles[indexShop].vehicles.push(vehicle);
        }
      } else {
        //Add new shop with selected vehicle
        const addShop: Shop = {
          lessorId: shop.lessorId,
          lessorName: shop.lessorName,
          lessorImage: shop.lessorImage,
          vehicles: [vehicle],
        };
        state.selectedVehicles.push(addShop);
      }
    },
    addSelectAllVehicles: (state, action) => {
      const shop: Shop = action.payload;
      const indexShop = state.selectedVehicles.findIndex(
        (s) => s.lessorId === shop.lessorId
      );
      if (indexShop !== -1) {
        // Add new vehicles to shop
        state.selectedVehicles[indexShop].vehicles = [...shop.vehicles];
      } else {
        //Add new shop with selected vehicles
        state.selectedVehicles.push(shop);
      }
    },
    removeAllVehiclesInShop: (state, action) => {
      const shop: Shop = action.payload;
      const indexShop = state.selectedVehicles.findIndex(
        (s) => s.lessorId === shop.lessorId
      );
      if (indexShop !== -1) {
        state.selectedVehicles.splice(indexShop, 1);
      }
    },
    setSelectedVehicle: (state, action) => {
      state.selectedVehicles = action.payload;
    },
    removeVehicleInCart: (state, action) => {
      debugger;
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
    },
  },
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
      state.cartLoading = false;
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.cartLoading = false;
      toast.error("Add to cart fail! Please try again");
      console.log("Add to cart fail: ", action.error.message);

      const { error, data } = action.payload as any;
      const { vehicleId } = data as { vehicleId: string; userId: string };
      //Check if vehicle already add in cart, remove it
      state.cart?.shops.forEach((shop) => {
        const vehicleIndex = shop.vehicles.findIndex(
          (v) => v.vehicleId === vehicleId
        );
        if (vehicleIndex !== -1) {
          shop.vehicles.splice(vehicleIndex, 1);
        }
      });
    });
    builder.addCase(deleteItemInCartAsync.fulfilled, (state, action) => {
      // const { vehicleId } = action.payload;
      // if (state.cart) {
      //   state.cart.shops.forEach((shop) => {
      //     const vehicleIndex = shop.vehicles.findIndex(
      //       (v) => v.vehicleId === vehicleId
      //     );
      //     if (vehicleIndex !== -1) {
      //       shop.vehicles.splice(vehicleIndex, 1);
      //     }
      //   });
      //   // Remove shops without vehicles
      //   state.cart.shops = state.cart.shops.filter(
      //     (shop) => shop.vehicles.length > 0
      //   );
      // }
    });
    builder.addCase(deleteItemInCartAsync.rejected, (state, action) => {
      console.log("Delete item in cart fail: ", action.error.message);
    });
  },
});

export const {
  addRemoveSelectedVehicle,
  addSelectAllVehicles,
  removeAllVehiclesInShop,
  setSelectedVehicle,
  removeVehicleInCart,
} = CartSlice.actions;
