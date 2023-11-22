import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/ConfigureStore";
import { Vehicle } from "../models/Cart";
import Payment_btn from "./Payment_btn";
import FadeInSection from "./FadeInSection";

export default function TotalCartPayment() {
  const { selectedVehicles } = useAppSelector((state) => state.cart);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  useEffect(() => {
    let total = 0;
    selectedVehicles.forEach((shop) => {
      shop.vehicles.forEach((vehicle) => {
        const { price, pickUpDateTime, dropOffDateTime } = vehicle;
        const pricePerDay = +price;
        const startDate = new Date(pickUpDateTime);
        const endDate = new Date(dropOffDateTime);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const numberOfDays = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
        const roundedNumberOfDays =
          numberOfDays < 4.5
            ? Math.floor(numberOfDays)
            : Math.ceil(numberOfDays);
        total += pricePerDay * roundedNumberOfDays;
      });
    });
    setTotalPayment(total);
  }, [selectedVehicles]);
  return selectedVehicles.length === 0 ? (
    <></>
  ) : (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 ">
      <FadeInSection options="fade-in-scale">
        <div className="flex flex-col items-center justify-center mt-5 p-3 rounded-md rounded-b-none bg-white border border-gray-300 shadow-lg w-52 md:w-fit">
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
      </FadeInSection>
    </div>
  );
}
