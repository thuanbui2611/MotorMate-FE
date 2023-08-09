import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import "./../../styles.css";
import Header from "./Header";
import BookDetails from "../../features/books/BookDetails";
import Books from "../../features/books/Books";

import "flowbite";
import Footer from "./Footer";
import Cart from "../../features/cart/Cart";
import { useState } from "react";
import LoginPage from "../../features/login/LoginPage";
import SignUpPage from "../../features/signup/SignUpPage";
import About from "../../features/about/About";
import Contact from "../../features/contact/Contact";
import Checkout from "../../features/checkout/Checkout";
import Payment from "../../features/checkout/Payment";
import Bill from "../../features/checkout/Bill";
import Chat from "../../features/chat/Chat";
import TinyChat from "../../features/chat/TinyChat";

function App() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup"];
  const shouldHideComponent = hiddenPaths.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen relative ">
      {!shouldHideComponent && <Header />}
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/books" component={Books} />
      <Route path="/book-detail/:id" component={BookDetails} />
      <Route path="/check-out/:id" component={Checkout} />
      <Route path="/payment" component={Payment} />
      <Route path="/bill" component={Bill} />
      <Route exact path="/my-cart" component={Cart} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/chat" component={Chat} />
      {!shouldHideComponent && <TinyChat />}
      {!shouldHideComponent && <Footer />}
    </div>
  );
}

export default App;
