import { Link, useNavigate } from "react-router-dom";
import ProcessingBar from "../../app/components/ProcessingBar";
import PaymentForm from "../../app/components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../app/store/ConfigureStore";
import Loading from "../../app/components/Loading";
import { toast } from "react-toastify";
import { useEffect } from "react";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);
export default function Payment() {
  const { checkoutLoaded, checkout } = useAppSelector(
    (state) => state.checkout
  );
  const { userDetail, userLoading } = useAppSelector((state) => state.account);
  const clientSecret = checkout?.clientSecret as string;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetail && !userLoading) {
      navigate("/login");
      toast.error("Please login to continue");
      return;
    }
  }, [userDetail, userLoading]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (!checkout?.clientSecret && !checkoutLoaded) {
      toast.error("Something error, please try again");
      navigate("/my-cart");
      return;
    }
    scrollToTop();
  }, [checkoutLoaded]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "flat",
    },
    loader: "auto",
  };
  return checkoutLoaded ? (
    <Loading />
  ) : (
    <Elements stripe={stripePromise} options={options}>
      <section className="pt-12 pb-24 bg-gray-100 overflow-hidden">
        <div className="container px-4 mx-auto">
          <ProcessingBar processing="payment" />
        </div>
        <div className="flex items-center justify-center mt-12">
          <PaymentForm userLogin={userDetail!} />
        </div>
      </section>
    </Elements>
  );
}
