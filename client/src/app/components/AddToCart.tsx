import { toast } from "react-toastify";
import { addToCartAsync } from "../../pages/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { useEffect, useState } from "react";

interface Props {
  userId: string | undefined;
  vehicleId: string;
}

export default function AddToCart({ userId, vehicleId }: Props) {
  const [itemAddedToCart, setItemAddedToCart] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      cart &&
      cart?.shops.some((shop) =>
        shop.vehicles.some((vehicle) => vehicle.vehicleId === vehicleId)
      )
    ) {
      setItemAddedToCart(true);
    }
  }, [cart]);

  const handleAddVehicleToCart = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (!userId) return toast.error("Please login to add to cart");
    await dispatch(addToCartAsync({ userId, vehicleId }));
    setItemAddedToCart(true);
  };

  return (
    <>
      <div
        className="absolute cursor top-1 left-[5px] md:top-2 md:left-2"
        onClick={(event) => handleAddVehicleToCart(event)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`hover:text-red-600 h-2 w-2 md:h-3 md:w-3 ${
            itemAddedToCart ? "text-red-600" : "text-white"
          }`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          ></path>
        </svg>
      </div>
    </>
  );
}
