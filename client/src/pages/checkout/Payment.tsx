import { Link } from "react-router-dom";
import ProcessingBar from "../../app/components/ProcessingBar";
import PaymentForm from "../../app/components/PaymentForm";

export default function Payment() {
  return (
    <>
      <section className="pt-12 pb-24 bg-gray-100 overflow-hidden">
        <div className="container px-4 mx-auto">
          <ProcessingBar processing="payment" />
        </div>
        <div className="flex items-center justify-center mt-12">
          <PaymentForm />
        </div>
      </section>
      <Link
        to="/bill"
        className="bg-orange-based p-5 text-white text-center font-bold text-xl"
      >
        Next
      </Link>
    </>
  );
}
