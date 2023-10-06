import { useLocation, Outlet } from "react-router-dom";
import TinyChat from "../../pages/chat/TinyChat";
import Footer from "./Footer";
import Header from "./Header";
import { store } from "../store/ConfigureStore";

export default function DefaultLayout() {
  const userLogin = store.getState().account.user;
  return (
    <div className="flex flex-col min-h-screen relative overflow-auto">
      <Header />
      <Outlet />
      {userLogin && <TinyChat />}

      <Footer />
    </div>
  );
}
