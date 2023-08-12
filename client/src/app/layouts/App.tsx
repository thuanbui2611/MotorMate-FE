import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import "./../../styles.css";
import Header from "./Header";

import "flowbite";
import Footer from "./Footer";
import Cart from "../../features/cart/Cart";
import SignUpPage from "../../features/signup/SignUpPage";
import About from "../../features/about/About";
import Contact from "../../features/contact/Contact";
import Checkout from "../../features/checkout/Checkout";
import Payment from "../../features/checkout/Payment";
import Bill from "../../features/checkout/Bill";
import Chat from "../../features/chat/Chat";
import TinyChat from "../../features/chat/TinyChat";
import AllOrders from "../../features/order/AllOrders";
import MyProfile from "../../features/profile/MyProfile";
import SettingProfile from "../../features/profile-settings/SettingProfile";
import Login from "../../features/login/Login";
import ProductDetails from "../../features/products/ProductDetails";
import Products from "../../features/products/Products";

function App() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup"];
  const shouldHideComponent = hiddenPaths.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen relative ">
      {!shouldHideComponent && <Header />}
      <Route exact path={["/", "/home"]} component={HomePage} />
      <Route exact path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/profile" component={MyProfile} />
      <Route path="/products" component={Products} />
      <Route path="/product-detail/:id" component={ProductDetails} />
      <Route path="/check-out/:id" component={Checkout} />
      <Route path="/payment" component={Payment} />
      <Route path="/bill" component={Bill} />
      <Route path="/your-orders" component={AllOrders} />
      <Route path="/profile-setting" component={SettingProfile} />
      <Route exact path="/my-cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/chat" component={Chat} />
      {!shouldHideComponent && <TinyChat />}
      {!shouldHideComponent && <Footer />}
    </div>
  );
}

export default App;
