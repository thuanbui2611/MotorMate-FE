import { Link } from "react-router-dom";
import "./../assets/css/payment_btn.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/ConfigureStore";
import { Vehicle } from "../models/Cart";

export default function TotalCartPayment() {
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const { selectedVehicles } = useAppSelector((state) => state.cart);
  useEffect(() => {
    let total = 0;
    selectedVehicles.forEach((shop) => {
      shop.vehicles.forEach((vehicle: Vehicle) => {
        total += +vehicle.price;
      });
    });
    setTotalPayment(total);
  }, [selectedVehicles]);
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center justify-center mt-5 p-3 rounded-md rounded-b-none bg-white border border-gray-300 shadow-lg w-52 md:w-fit">
      <div className="flex flex-col md:flex-row justify-center items-center mb-0 md:mb-3">
        <p className="mr-2 font-bold text-black text-sm md:text-base lg:text-lg">
          Total payment ({selectedVehicles.length} items):
        </p>
        <p className="font-bold text-green-400 text-base md:text-lg lg:text-xl">
          {totalPayment.toLocaleString()} VND
        </p>
      </div>
      <div className="flex justify-center">
        <Link
          to="/check-out/1"
          className="container-paymentBTN border border-[#80ea69] shadow-sm shadow-[#73c661]"
        >
          <div className="left-side">
            <div className="card">
              <div className="card-line"></div>
              <div className="buttons"></div>
            </div>
            <div className="post">
              <div className="post-line"></div>
              <div className="screen">
                <div className="dollar">$</div>
              </div>
              <div className="numbers"></div>
              <div className="numbers-line2"></div>
            </div>
          </div>
          <div className="right-side">
            <div className="new">Check out</div>
            <svg
              viewBox="0 0 440 440"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                fill="#06bf44"
                data-old_color="#000000"
                className="active-path"
                data-original="#000000"
                d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
              ></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
