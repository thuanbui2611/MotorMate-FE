import { useLocation, Outlet } from "react-router-dom";
import TinyChat from "../../pages/chat/TinyChat";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/sign-up"];
  const shouldHideComponent = hiddenPaths.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen relative overflow-auto">
      {!shouldHideComponent && <Header />}
      <Outlet />
      {!shouldHideComponent && <TinyChat />}
      {!shouldHideComponent && <Footer />}
    </div>
  );
}
