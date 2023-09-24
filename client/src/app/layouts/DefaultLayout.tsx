import { useLocation, Outlet } from "react-router-dom";
import TinyChat from "../../pages/chat/TinyChat";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-auto">
      <Header />
      <Outlet />
      <TinyChat />
      <Footer />
    </div>
  );
}
