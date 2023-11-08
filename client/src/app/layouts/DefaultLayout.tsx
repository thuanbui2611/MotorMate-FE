import { useLocation, Outlet } from "react-router-dom";
import TinyChat from "../../pages/chat/TinyChat";
import Footer from "./Footer";
import Header from "./Header";
import { store } from "../store/ConfigureStore";
import TotalCartPayment from "../components/TotalCartPayment";

export default function DefaultLayout() {
  const location = useLocation();
  const userLogin = store.getState().account.user;
  return (
    <div className="flex flex-col min-h-screen relative overflow-auto bg-container scrollbar">
      <Header />
      <Outlet />
      {userLogin && <TinyChat />}
      {location.pathname === "/my-cart" && <TotalCartPayment />}
      <Footer />
    </div>
  );
}
