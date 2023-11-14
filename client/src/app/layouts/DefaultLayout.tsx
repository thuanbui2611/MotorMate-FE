import { useLocation, Outlet } from "react-router-dom";
import TinyChat from "../../pages/chat/TinyChat";
import Footer from "./Footer";
import Header from "./Header";
import { store } from "../store/ConfigureStore";
import TotalCartPayment from "../components/TotalCartPayment";
import { useEffect } from "react";

export default function DefaultLayout() {
  const location = useLocation();
  const userLogin = store.getState().account.user;
  const pathNotBackground = [
    "check-out",
    "my-cart",
    "blog",
    "profile",
    "product-detail",
    "products",
    "my-orders",
    "shop-orders",
    "check-out",
    "payment",
    "bill",
  ];
  let isBackground = true;
  if (pathNotBackground.includes(location.pathname.split("/")[1])) {
    isBackground = false;
  }
  useEffect(() => {
    if (isBackground) {
      // Add the 'hide-scrollbar' class to the body element when the component mounts
      document.body.classList.add("hide-scrollbar");
    } else {
      // Cleanup function to remove the 'hide-scrollbar' class
      document.body.classList.remove("hide-scrollbar");
    }
  }, [isBackground]);
  return (
    <div
      className={`flex flex-col min-h-screen relative overflow-auto ${
        isBackground ? "bg-container scrollbar" : ""
      }`}
    >
      <Header />
      <Outlet />
      {userLogin && <TinyChat />}
      {location.pathname === "/my-cart" && <TotalCartPayment />}
      <Footer />
    </div>
  );
}
