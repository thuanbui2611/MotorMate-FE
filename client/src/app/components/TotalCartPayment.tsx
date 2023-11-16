import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/ConfigureStore";
import { Vehicle } from "../models/Cart";
import Payment_btn from "./Payment_btn";

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
  return selectedVehicles.length === 0 ? (
    <></>
  ) : (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center justify-center mt-5 p-3 rounded-md rounded-b-none bg-white border border-gray-300 shadow-lg w-52 md:w-fit">
      <div className="flex flex-col md:flex-row justify-center items-center mb-0 md:mb-3">
        <p className="mr-2 font-bold text-black text-sm md:text-base lg:text-lg">
          Total payment ({selectedVehicles.length} items):
        </p>
        <p className="font-bold text-green-400 text-base md:text-lg lg:text-xl">
          {totalPayment.toLocaleString()} VND
        </p>
      </div>
      <Link
        to="/check-out"
        className="flex items-center justify-center w-full h-full"
      >
        <Payment_btn />
      </Link>
    </div>
  );
}
