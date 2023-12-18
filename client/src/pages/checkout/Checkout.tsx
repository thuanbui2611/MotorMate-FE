import { useEffect, useRef, useState } from "react";
import ProcessingBar from "../../app/components/ProcessingBar";
import { useAppSelector } from "../../app/store/ConfigureStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shop, Vehicle } from "../../app/models/Cart";
import Payment_btn from "../../app/components/Payment_btn";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { createCheckoutAsync } from "./CheckoutSlice";
import { toast } from "react-toastify";
import LoaderButton from "../../app/components/LoaderButton";
import { scrollToTop } from "../../app/utils/ScrollToTop";
import { Autocomplete } from "@react-google-maps/api";
import MapsDialog from "../../app/components/MapsDialog";

export default function Checkout() {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState("cashOnDelivery");
  const [vehiclesCheckout, setVehiclesCheckout] = useState<Shop[]>([]);

  const [deliveryOption, setDeliveryOption] = useState("");
  const [totalVehicleCount, setTotalVehicleCount] = useState<number>(0);
  const { selectedVehicles } = useAppSelector((state) => state.cart);
  const { userDetail, userLoading } = useAppSelector((state) => state.account);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  const [mapInfor, setMapInfor] = useState<{
    originLocation: string;
    destinationLocation: string;
  } | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

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

  useEffect(() => {
    if (userLoading) return;
    if (userDetail?.address && userDetail?.email && userDetail?.phoneNumber) {
      scrollToTop();
      setDeliveryAddress(userDetail?.address);
    } else {
      navigate(`/profile/${userDetail?.username}/settings`);
      toast.error("Please update your profile to check out!");
      return;
    }
  }, [userLoading]);

  useEffect(() => {
    if (vehiclesCheckout && vehiclesCheckout.length === 0) {
      if (state) {
        setVehiclesCheckout(state.vehicleCheckout);
      } else if (selectedVehicles?.length === 0) {
        toast.error("You need to choose at least one vehicle for checkout!");
        navigate("/my-cart");
        return;
      } else {
        setVehiclesCheckout(selectedVehicles);
      }
    }
  }, [selectedVehicles]);

  useEffect(() => {
    if (vehiclesCheckout && vehiclesCheckout.length > 0) {
      let count = 0;
      vehiclesCheckout.forEach((shop) => {
        shop.vehicles.forEach((vehicle: Vehicle) => {
          count += 1;
        });
      });
      setTotalVehicleCount(count);
    }
  }, [vehiclesCheckout]);

  //Select option Payment Method
  const handlePaymentOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentOption(e.target.value);
  };
  //End of select option Payment Method

  //Select option delivery
  const handleDeliveryOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeliveryOption(e.target.value);
  };
  //End of select option delivery

  const handleAddressSelect = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    const address: any = autocompleteRef.current;
    const fullAddress = address.gm_accessors_.place.em.formattedPrediction;
    if (!place) {
      toast.error("Please select a valid address");
      return;
    }
    const { place_id } = place;

    // Validate the place_id to ensure it is a valid selection
    if (place_id) {
      setDeliveryAddress(fullAddress);
    } else {
      setDeliveryAddress("");
      toast.error("Please select a valid address");
    }
  };

  const handleClickMap = (vehicle: Vehicle) => {
    setIsOpenMap(true);
    const mapInfor = {
      originLocation: deliveryAddress,
      destinationLocation: vehicle.address,
    };
    setMapInfor(mapInfor);
  };

  const handleCloseMap = () => {
    setIsOpenMap(false);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (deliveryAddress === "") {
      toast.error("You need to choose a delivery address!");
      return;
    }
    let vehiclesSelected;
    if (deliveryOption === "") {
      toast.error("You need to choose a delivery option!");
      return;
    } else if (deliveryOption === "standardShipping") {
      const address = deliveryAddress;

      vehiclesSelected = vehiclesCheckout.flatMap((shop) =>
        shop.vehicles.map((vehicle) => ({
          vehicleId: vehicle.vehicleId,
          pickUpDateTime: vehicle.pickUpDateTime,
          dropOffDateTime: vehicle.dropOffDateTime,
          pickUpLocation: address,
          dropOffLocation: address,
        }))
      );
    } else {
      vehiclesSelected = vehiclesCheckout.flatMap((shop) =>
        shop.vehicles.map((vehicle) => ({
          vehicleId: vehicle.vehicleId,
          pickUpDateTime: vehicle.pickUpDateTime,
          dropOffDateTime: vehicle.dropOffDateTime,
          pickUpLocation: "Pick up at the Vehicle Address",
          dropOffLocation: "Drop off at the Vehicle Address",
        }))
      );
    }

    const formData = {
      //Pick up in vehicle address
      userId: userDetail?.id,
      vehicles: vehiclesSelected,
    };
    const result = await dispatch(createCheckoutAsync(formData));
    if (result.meta.requestStatus.includes("fulfilled")) {
      navigate("/payment");
    }
    setLoading(false);
  };
  return (
    <>
      <section className="pt-12 pb-24 bg-gray-100">
        <div className="container px-4 mx-auto">
          <ProcessingBar processing="checkout" />

          {/* <div className="pb-9 mb-7 text-center border-b border-black border-opacity-5">
            <h2 className=" text-7xl xl:text-10xl leading-normal font-heading font-medium text-center">
              Checkout
            </h2>
          </div> */}
          <form
            onSubmit={onSubmit}
            className="flex flex-wrap -mx-4 mb-14 justify-center items-center lg:items-start xl:mb-24 pt-10"
          >
            <div className=" w-full lg:w-2/4 px-4 mb-14 md:mb-0">
              <h2 className="mb-7 text-3xl font-heading font-bold">
                Lessee information
              </h2>
              <div className="py-12 px-8 bg-white rounded-3xl">
                <div className="pb-4 border-b border-gray-200 border-opacity-30">
                  <div className="mx-auto">
                    <div className="flex flex-wrap mb-6 items-center">
                      <div className="w-full md:w-1/3 mb-2 md:mb-0 text-left">
                        <label className="text-lg">Lessee name:</label>
                      </div>
                      <div className="w-full md:w-2/3">
                        <input
                          className="w-full h-1/3 px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                          type="text"
                          disabled
                          value={userDetail?.fullName}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-6 items-center">
                      <div className="w-full md:w-1/3 mb-2 md:mb-0 text-left">
                        <label className="text-lg">Phone number:</label>
                      </div>
                      <div className="w-full md:w-2/3">
                        <input
                          className="w-full h-1/3 px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                          type="text"
                          disabled
                          value={
                            userDetail?.phoneNumber
                              ? userDetail?.phoneNumber
                              : "N/A"
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-6 items-center">
                      <div className="w-full md:w-1/3 mb-2 md:mb-0 text-left">
                        <label className="text-lg  ">Email:</label>
                      </div>
                      <div className="w-full md:w-2/3">
                        <input
                          className="w-full h-1/3 px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                          type="text"
                          disabled
                          value={userDetail?.email ? userDetail?.email : "N/A"}
                        />
                      </div>
                    </div>
                    <div className=" flex flex-col items-center">
                      <div className="mb-6">
                        <select
                          id="DeliverOption"
                          value={deliveryOption}
                          onChange={handleDeliveryOptionChange}
                          required
                          className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                        >
                          <option defaultValue="">
                            Choose your Delivery Option
                          </option>
                          <option value="selfPickup">Self Pick-up</option>
                          <option value="standardShipping">
                            Standard Shipping
                          </option>
                        </select>
                      </div>
                    </div>

                    {deliveryOption === "standardShipping" && (
                      <>
                        <div className="flex flex-wrap mb-6 items-center">
                          <div className="w-full md:w-1/3 mb-2 md:mb-0 text-left">
                            <label className="text-lg">Delivery address:</label>
                          </div>
                          <div className="w-full md:w-2/3">
                            <Autocomplete
                              options={{
                                componentRestrictions: { country: "vn" },
                              }}
                              onLoad={(autocomplete) =>
                                (autocompleteRef.current = autocomplete)
                              }
                              onPlaceChanged={handleAddressSelect}
                            >
                              <input
                                className="w-full h-1/3 px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                                type="text"
                                placeholder="Enter your address"
                                defaultValue={deliveryAddress}
                                required
                              />
                            </Autocomplete>
                          </div>
                        </div>
                      </>
                    )}

                    {deliveryOption === "selfPickup" && (
                      <div className="flex flex-wrap mb-6 items-center justify-center font-semibold">
                        You have to follow the vehicle address to pick up your
                        vehicle.
                        {/* <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                          <label className="text-lg  ">Pick-up Address:</label>
                        </div>
                        <div className="w-full md:w-2/3">
                          <input
                            className="w-full h-1/3 px-5 py-3 text-lg leading-9 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                            type="text"
                            value="Q12 HCM"
                            disabled
                          />
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
                <div className=" border-b border-gray-200 border-opacity-30">
                  <div className="mx-auto mb-6">
                    <div className="flex flex-wrap mb-6 items-center">
                      <div className="w-full md:w-1/3 mb-2 md:mb-0 md:pr-10 md:text-right">
                        <label className="text-lg">Payment method:</label>
                      </div>
                      <div className="w-full md:w-2/3">
                        <div className="grid grid-rows-1 mt-5">
                          {/* <label className="relative inline-flex mb-5 mr-16 items-center">
                            <input
                              className="relative appearance-none mr-3"
                              type="radio"
                              value="cashOnDelivery"
                              checked={
                                selectedPaymentOption === "cashOnDelivery"
                              }
                              onChange={handlePaymentOptionChange}
                            />
                            <img
                              style={{ width: "76px", height: "30px" }}
                              src={require("../../app/assets/images/icon/CashOnDelivery_icon.png")}
                            />

                            <span className="ml-2 text-sm text-black leading-3 font-bold">
                              COD
                            </span>
                          </label> */}
                          <label className="relative flex mb-5 mr-16 items-center">
                            <input
                              className="relative appearance-none mr-3"
                              type="radio"
                              value="visa"
                              // checked={selectedPaymentOption === "visa"}
                              onChange={handlePaymentOptionChange}
                              checked={true}
                            />
                            <img
                              style={{ width: "100px", height: "60px" }}
                              src={require("../../app/assets/images/icon/paymentCard_ic.jpg")}
                            />

                            <span className="ml-2 text-sm text-black leading-3 font-bold flex-1">
                              International payment cards
                            </span>
                          </label>

                          {/* <label className="relative inline-flex mb-5 items-center font-bold">
                            <input
                              className="relative appearance-none mr-3"
                              type="radio"
                              value="momo"
                              checked={selectedPaymentOption === "momo"}
                              onChange={handlePaymentOptionChange}
                            />
                            <img
                              className=" h-10 w-10"
                              src={require("../../app/assets/images/icon/MoMo_icon.png")}
                            />

                            <span className="ml-2 text-sm text-black leading-3">
                              MoMo
                            </span>
                          </label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:ml-16">
                    <label className="relative flex mb-8 items-center">
                      <input
                        className="relative ml-10 appearance-none"
                        type="checkbox"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-400">
                        I agree with the terms and conditions.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/4 px-4 mb-14 md:mb-0">
              <div>
                <h2 className="mb-7 text-3xl font-heading font-bold">
                  Order summary ({totalVehicleCount} vehicles)
                </h2>
                <div className="flex flex-col items-center justify-start max-h-[600px] lg:max-h-[30vw] scrollbar overflow-y-auto mb-5 border border-gray-300 rounded-lg shadow-sm">
                  {/* List of products */}
                  {vehiclesCheckout.map((shop) => (
                    <div className="flex flex-col w-fit h-fit">
                      <Link
                        to={"/profile/" + shop.lessorName}
                        className=" w-fit rounded p-2 mb-2"
                      >
                        <div className="flex items-center no-underline hover:underline text-black ">
                          <img
                            alt="Placeholder"
                            className="block rounded-full h-8 w-8"
                            src={shop.lessorImage}
                          />
                          <div className="ml-2 text-sm font-bold">
                            {shop.lessorName}
                          </div>
                        </div>
                      </Link>
                      {shop.vehicles.map((vehicle) => (
                        <div className="flex flex-col sm:flex-row p-5 mb-8 bg-white rounded-md shadow items-center mx-10">
                          <div className="w-fit h-full mr-4">
                            <img
                              className="w-[40vw] h-[40vw] mb-4 sm:mb-0 sm:w-full sm:h-full lg:w-[140px] lg:h-[100px] object-cover mx-auto rounded-md"
                              src={vehicle.image}
                              alt="vehicle image"
                            />
                          </div>
                          <div className="w-full flex-col justify-center items-center">
                            <div className="relative">
                              <Link
                                to={"/product-detail/" + vehicle.vehicleId}
                                className="inline-block mb-1 text-lg font-bold hover:underline"
                              >
                                {vehicle.vehicleName}
                              </Link>
                              <div
                                className="absolute -right-1 top-0 flex text-xs items-center justify-end font-semibold hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer border border-gray-300"
                                onClick={() => handleClickMap(vehicle)}
                              >
                                <svg
                                  className="mr-[2px]"
                                  height="16px"
                                  width="16px"
                                  version="1.1"
                                  id="Layer_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  viewBox="0 0 512 512"
                                  xmlSpace="preserve"
                                  fill="#000000"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    <polygon points="154.64,420.096 154.64,59.496 0,134 0,512 "></polygon>
                                    <polygon
                                      style={{ fill: "#333333" }}
                                      points="309.288,146.464 309.288,504.472 154.64,420.096 154.64,59.496 "
                                    ></polygon>
                                    <polygon points="463.928,50.152 309.288,146.464 309.288,504.472 463.928,415.68 "></polygon>
                                    <path
                                      style={{ fill: "#E21B1B" }}
                                      d="M414.512,281.656l-11.92-15.744c-8.8-11.472-85.6-113.984-85.6-165.048 C317.032,39.592,355.272,0,414.512,0S512,39.592,512,100.864c0,50.992-76.8,153.504-85.488,165.048L414.512,281.656z"
                                    ></path>
                                    <circle
                                      style={{ fill: "#FFFFFF" }}
                                      cx="414.512"
                                      cy="101.536"
                                      r="31.568"
                                    ></circle>
                                  </g>
                                </svg>
                                Maps
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1">
                              <p className="mr-4 text-sm font-medium">
                                <span className="font-semibold">Color:</span>
                                <span className="ml-2 text-gray-800">
                                  {vehicle.color}
                                </span>
                              </p>
                              <p className="mr-4 text-sm font-medium">
                                <span className="font-semibold">Brand:</span>
                                <span className="ml-2 text-gray-800">
                                  Honda
                                </span>
                              </p>
                              <p className="mr-4 text-sm font-medium">
                                <span className="font-semibold">
                                  License plates:
                                </span>
                                <span className="ml-2 text-gray-800">
                                  {vehicle.licensePlate}
                                </span>
                              </p>
                              <p className="mr-4 text-sm font-medium w-full">
                                <span className="font-semibold">Address:</span>
                                <span className="ml-2 text-gray-800">
                                  {vehicle.address}
                                </span>
                              </p>
                              <p className="mr-4 text-sm font-medium w-full">
                                <span className="font-semibold">
                                  Date Rent:
                                </span>
                                <span className="ml-2 text-blue-600">
                                  {vehicle.pickUpDateTime.toLocaleString([], {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  <span className="text-black">to</span>{" "}
                                  {vehicle.dropOffDateTime.toLocaleString([], {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </p>
                              <p className="text-sm font-semibold">
                                <span>Price:</span>
                                <span className="ml-2 text-green-500">
                                  {vehicle.price.toLocaleString()} VND
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* <div className="flex items-center w-1/2 justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                  <span>Subtotal</span>
                  <span className="flex items-center text-xl">
                    <span className="mr-2 text-base">$</span>
                    <span>710,70</span>
                  </span>
                </div>
                <div className="flex items-center w-1/2 justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                  <span>Shipping</span>
                  <span className="flex items-center text-xl">
                    <span className="mr-2 text-base">$</span>
                    <span>10,00</span>
                  </span>
                </div> */}
                <div className="flex items-center w-fit justify-between py-4 px-10 mb-10 leading-8 bg-white font-heading font-medium rounded-3xl">
                  <span className="font-bold">Total</span>
                  <span className="flex items-center justify-center text-xl text-green-500 font-semibold ml-2">
                    <span>{totalPayment.toLocaleString()} VND</span>
                  </span>
                </div>
                {/* <div className="flex">
                  <h4
                    className=" mb-4 text-xl font-heading font-medium mr-3"
                    style={{ marginTop: "2px" }}
                  >
                    Discount code
                  </h4>
                  <div className="relative mb-3 lg:mb-10">
                    <input
                      className="flex-grow outline-none px-5 py-4 w-1/2 h-1/2 leading-7 bg-white border-2 border-blue-500 rounded mr-6"
                      type="text"
                    />
                    <a
                      className="w-auto py-3 px-8 text-lg leading-7 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                      href="#"
                    >
                      Apply
                    </a>
                  </div>
                </div> */}
                <div className="flex items-center justify-start w-full h-fit gap-10">
                  <Link
                    className="block py-4 px-5 w-fit text-base leading-6 font-bold tracking-tighter font-heading text-center bg-red-100 hover:bg-red-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                    to="/my-cart"
                  >
                    Back to cart
                  </Link>
                  <button className="w-fit h-fit" type="submit">
                    {loading ? <LoaderButton /> : <Payment_btn />}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      {isOpenMap && (
        <MapsDialog
          originLocation={mapInfor?.originLocation}
          destinationLocation={mapInfor?.destinationLocation}
          onClose={handleCloseMap}
        />
      )}
    </>
  );
}
