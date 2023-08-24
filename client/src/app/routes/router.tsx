import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../../pages/home";
import About from "../../pages/about";
import MyProfile from "../../pages/profile/MyProfile";
import Products from "../../pages/products";
import ProductDetails from "../../pages/products/ProductDetails";
import Checkout from "../../pages/checkout/Checkout";
import Payment from "../../pages/checkout/Payment";
import Bill from "../../pages/checkout/Bill";
import SettingProfile from "../../pages/profile/SettingProfile";
import Cart from "../../pages/cart";
import Login from "../../pages/account/Login";
import Chat from "../../pages/chat/Chat";
import ServerErrors from "../errors/ServerErrors";
import Contact from "../../pages/contact";
import SignUpPage from "../../pages/account/SignUpPage";
import Orders from "../../pages/order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
          { path: "profile", element: <MyProfile /> },
          { path: "products", element: <Products /> },
          { path: "product-detail/:id", element: <ProductDetails /> },
          { path: "check-out/:id", element: <Checkout /> },
          { path: "payment", element: <Payment /> },
          { path: "bill", element: <Bill /> },
          { path: "my-orders", element: <Orders /> },
          { path: "profile-setting", element: <SettingProfile /> },
          { path: "my-cart", element: <Cart /> },
          { path: "login", element: <Login /> },
          { path: "sign-up", element: <SignUpPage /> },
          { path: "chat", element: <Chat /> },
          { path: "server-error", element: <ServerErrors /> },
        ],
      },
    ],
  },
]);
