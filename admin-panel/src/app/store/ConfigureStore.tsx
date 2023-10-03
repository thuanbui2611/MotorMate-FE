import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BrandSlice } from "../../pages/brand/BrandSlice";
import { AccountSlice } from "../../pages/account/AccountSlice";
import { CollectionSlice } from "../../pages/collection/CollectionSlice";
import { ModelVehicleSlice } from "../../pages/modelVehicle/ModelVehicleSlice";
import { VehicleSlice } from "../../pages/vehicles/VehicleSlice";
import { ColorSlice } from "../../pages/color/ColorSlice";
import { VehiclePendingSlice } from "../../pages/vehicles/VehiclePendingSlice";
import { VehicleDeniedSlice } from "../../pages/vehicles/VehicleDeniedSlice";

export const store = configureStore({
  reducer: {
    brand: BrandSlice.reducer,
    account: AccountSlice.reducer,
    collection: CollectionSlice.reducer,
    modelVehicle: ModelVehicleSlice.reducer,
    vehicle: VehicleSlice.reducer,
    vehiclePending: VehiclePendingSlice.reducer,
    vehicleDenied: VehicleDeniedSlice.reducer,
    color: ColorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
