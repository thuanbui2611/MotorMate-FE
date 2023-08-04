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
import LoginFormPopUp from "../../features/login/LoginFormPopUp";
import LoginPage from "../../features/login/LoginPage";
import SignUpPage from "../../features/signup/SignUpPage";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginFormOpen = () => {
    setShowLoginForm(true);
    document.body.style.overflow = "hidden";
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
    document.body.style.overflow = "auto";
  };
  const location = useLocation();
  const hiddenPaths = ["/login", "/signup"];
  const shouldHideHeaderFooter = hiddenPaths.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideHeaderFooter && <Header />}
      <Route exact path="/" component={HomePage} />
      <Route path="/books" component={Books} />
      <Route path="/book-detail/:id" component={BookDetails} />
      <Route exact path="/my-cart" component={Cart} />
      {showLoginForm && <LoginFormPopUp onClose={handleLoginFormClose} />}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
