import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Checkout } from "../../app/models/Checkout";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

interface CheckoutState {
  checkout: Checkout | null;
  checkoutLoaded: boolean;
}

const initialState: CheckoutState = {
  checkout: null,
  checkoutLoaded: false,
};

export const createCheckoutAsync = createAsyncThunk<Checkout, {}>(
  "checkout/create",
  async (data: any, thunkAPI) => {
    try {
      const vehiclesConverted = data.vehicles.map((vehicle: any) => {
        return {
          vehicleId: vehicle.vehicleId,
          pickUpDateTime: vehicle.pickUpDateTime.toISOString(),
          dropOffDateTime: vehicle.dropOffDateTime.toISOString(),
          pickUpLocation: vehicle.pickUpLocation,
      dropOffLocation: vehicle.dropOffLocation,
        }
      })
      const convertedData = {
        userId: data.userId,
        vehicles: vehiclesConverted
      }
      debugger;
      const response = await agent.Checkout.create(convertedData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const CheckoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCheckoutAsync.pending, (state, action) => {
      state.checkoutLoaded = true;
    });
    builder.addCase(createCheckoutAsync.fulfilled, (state, action) => {
      state.checkoutLoaded = false;
      state.checkout = action.payload;
    });
    builder.addCase(createCheckoutAsync.rejected, (state, action) => {
      state.checkoutLoaded = false;
      toast.error(action.error.message);
    });
  },
});

export const {} = CheckoutSlice.actions;
