import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../pages/account/AccountSlice";
import { ProductSlice } from "../../pages/products/ProductSlice";
import { ProfileSlice } from "../../pages/profile/ProfileSlice";
import { ChatSlice } from "../../pages/chat/ChatSlice";
import { CartSlice } from "../../pages/cart/CartSlice";
import { BlogSlice } from "../../pages/blog/BlogSlice";
import { CheckoutSlice } from "../../pages/checkout/CheckoutSlice";
import { MyOrderSlice } from "../../pages/my-order/MyOrderSlice";
import { ShopOrderSlice } from "../../pages/shop-order/ShopOrderSlice";
import { ReviewProductSlice } from "../../pages/products/ReviewProductSlice";
import { BlogCommentSlice } from "../../pages/blog/BlogCommentSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    product: ProductSlice.reducer,
    profile: ProfileSlice.reducer,
    chat: ChatSlice.reducer,
    cart: CartSlice.reducer,
    blog: BlogSlice.reducer,
    checkout: CheckoutSlice.reducer,
    myOrder: MyOrderSlice.reducer,
    shopOrder: ShopOrderSlice.reducer,
    reviewProduct: ReviewProductSlice.reducer,
    blogComment: BlogCommentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
