import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BrandSlice } from "../../pages/brand/BrandSlice";
import { AccountSlice } from "../../pages/account/AccountSlice";
import { CollectionSlice } from "../../pages/collection/CollectionSlice";

export const store = configureStore({
  reducer: {
    brand: BrandSlice.reducer,
    account: AccountSlice.reducer,
    collection: CollectionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
