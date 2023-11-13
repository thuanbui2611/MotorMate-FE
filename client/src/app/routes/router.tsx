import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../../pages/home";
import About from "../../pages/about";
import Products from "../../pages/products";
import ProductDetails from "../../pages/products/ProductDetails";
import Checkout from "../../pages/checkout/Checkout";
import Payment from "../../pages/checkout/Payment";
import Bill from "../../pages/checkout/Bill";
import SettingProfile from "../../pages/profile/SettingProfile";
import Cart from "../../pages/cart";
import Login from "../../pages/account/Login";
import ServerErrors from "../errors/ServerErrors";
import Contact from "../../pages/contact";
import SignUpPage from "../../pages/account/SignUpPage";
import Orders from "../../pages/order";
import ForgotPassword from "../../pages/account/ForgotPassword";
import ChangePassword from "../../pages/account/ChangePassword";
import NotFound from "../errors/NotFound";
import Profile from "../../pages/profile";
import BlogPage from "../../pages/blog";
import BlogDetails from "../../pages/blog/BlogDetails";
import MyProducts from "../../pages/profile/MyProducts";
import ProfileDetails from "../components/ProfileDetails";
import OrderDetail from "../../pages/order/OrderDetail";
import ShopOrderDetail from "../../pages/shop-order/ShopOrderDetail";
import ShopOrders from "../../pages/shop-order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "", element: <HomePage /> },
          {
            path: "profile/:username/",
            element: <Profile />,
            children: [
              { path: "", element: <ProfileDetails /> },
              { path: "settings", element: <SettingProfile /> },
              { path: "my-products", element: <MyProducts /> },
            ],
          },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
          { path: "blog", element: <BlogPage /> },
          { path: "blog/:id", element: <BlogDetails /> },
          { path: "products", element: <Products /> },
          { path: "product-detail/:id", element: <ProductDetails /> },
          { path: "check-out/:id", element: <Checkout /> },
          { path: "payment", element: <Payment /> },
          { path: "bill", element: <Bill /> },
          { path: "my-orders", element: <Orders /> },
          { path: "my-orders/:id", element: <OrderDetail /> },
          { path: "shop-orders", element: <ShopOrders /> },
          { path: "shop-orders/:id", element: <ShopOrderDetail /> },
          { path: "my-cart", element: <Cart /> },
          { path: "server-error", element: <ServerErrors /> },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "forgot-password/:resetCode", element: <ChangePassword /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
