import { toast } from "react-toastify";
import {
  addToCartAsync,
  deleteItemInCartAsync,
  removeVehicleInCart,
} from "../../pages/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { useEffect, useState } from "react";
import { UserDetail } from "../models/User";
import { Vehicle } from "../models/Vehicle";

interface Props {
  userLogin: UserDetail | null;
  vehicle: Vehicle;
  className: string;
}

export default function AddToCart({ userLogin, vehicle, className }: Props) {
  const [itemAddedToCart, setItemAddedToCart] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      cart &&
      cart.shops.some((shop) =>
        shop.vehicles.some((v) => v.vehicleId === vehicle.id)
      )
    ) {
      setItemAddedToCart(true);
    } else {
      setItemAddedToCart(false);
    }
  }, [cart]);

  const handleAddVehicleToCart = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (!userLogin) return toast.error("Please login to add to cart");
    if (userLogin.id === vehicle.owner.ownerId)
      return toast.error("You can't add your own vehicle to cart");
    if (itemAddedToCart) {
      //remove item from cart
      setItemAddedToCart(false);
      toast.success("Remove vehicle from cart successfully!");
      dispatch(removeVehicleInCart({ vehicleId: vehicle.id }));
      const result = await dispatch(
        deleteItemInCartAsync({ userId: userLogin.id, vehicleId: vehicle.id })
      );
      if (result.meta.requestStatus === "rejected") {
        toast.error("Remove vehicle from cart failed!, please try again.");
        window.location.reload();
      }
    } else {
      //add item to cart
      setItemAddedToCart(true);
      toast.success("Add to cart successfully");
      const result = await dispatch(
        addToCartAsync({ userId: userLogin.id, vehicleId: vehicle.id })
      );
      if (result.meta.requestStatus === "rejected") {
        toast.error("Something wrong, add to cart failed!");
      }
    }
  };

  return (
    <>
      <div
        className={className}
        onClick={(event) => handleAddVehicleToCart(event)}
      >
        <svg
          className={`w-full h-full fill-current ${
            itemAddedToCart ? "text-blue-500 " : ""
          } ${
            userLogin?.id === vehicle.owner.ownerId
              ? "text-red-600"
              : "hover:text-blue-500"
          }`}
          viewBox="0 0 24 24"
          stroke="#585959"
          strokeWidth="1px"
        >
          <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
        </svg>
      </div>
    </>
  );
}
