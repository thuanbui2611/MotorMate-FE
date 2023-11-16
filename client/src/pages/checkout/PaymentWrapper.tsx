import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);
export default function PaymentWrapper() {
  const options = {
    clientSecret:
      "pi_3OCz3sETkkliUm4y1SOxwMm9_secret_GZ1DSabem0gNVcFFmFJ9gzb1b",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <Payment />
    </Elements>
  );
}
