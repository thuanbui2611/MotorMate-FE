import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../pages/account/AccountSlice";
import { ProductSlice } from "../../pages/products/ProductSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    product: ProductSlice.reducer,
    // profile: ProfileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
