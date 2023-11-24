import { useEffect, useState } from "react";
import { ParentOrder, Vehicle } from "../../app/models/TripRequest";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { useParams } from "react-router-dom";
import {
  shopOrderSelectors,
  updateStatusShopOrdersAsync,
} from "./ShopOrderSlice";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/components/Loading";
import ConfirmCancelDialog from "../../app/components/ConfirmCancelDialog";
import ConfirmDeleteDialog from "../../app/components/ConfirmDeleteDialog";
import { toast } from "react-toastify";

type StatusOrder = "Canceled" | "Approved" | "Completed";
export default function ShopOrderDetail() {
  const [isOpenConfirmCancelDialog, setIsOpenConfirmCancelDialog] =
    useState(false);
  const [isOpenConfirmStatusActionDialog, setIsOpenConfirmStatusActionDialog] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<ParentOrder>();
  const [selectedVehiclesToUpdate, setSelectedVehiclesToUpdate] = useState<
    Vehicle[]
  >([]);
  const [statusToUpdate, setStatusToUpdate] = useState<string>("");

  const dispatch = useAppDispatch();
  const { parentOrderId } = useParams();
  const order = useAppSelector((state) =>
    shopOrderSelectors.selectById(state, parentOrderId!)
  );

  useEffect(() => {
    if (order) {
      setOrderDetails(order);
      setIsLoading(false);
    }
  }, [order]);

  useEffect(() => {
    if (!orderDetails && parentOrderId && !order) {
      setIsLoading(true);
      agent.TripRequest.parentOrder(parentOrderId).then((response) => {
        if (response) {
          setOrderDetails(response);
          setIsLoading(false);
        }
      });
    }
  }, [orderDetails, parentOrderId]);
  // Hover to see
  let hoverTimer: ReturnType<typeof setTimeout>;
  function startHoverTimer(idDiv: string) {
    hoverTimer = setTimeout(() => showMessage(idDiv), 300);
  }

  function resetHoverTimer(idDiv: string) {
    clearTimeout(hoverTimer);
    hideMessage(idDiv);
  }

  function showMessage(idDiv: string): void {
    const hiddenDiv = document.getElementById(idDiv) as HTMLElement;
    hiddenDiv.classList.remove("hidden");
  }
  function hideMessage(idDiv: string): void {
    const hiddenDiv = document.getElementById(idDiv) as HTMLElement;
    hiddenDiv.classList.add("hidden");
  }

  const handleUpdateStatusOrder = async (reasonCancel?: string) => {
    if (
      !orderDetails ||
      orderDetails?.shops[0].vehicles.length === 0 ||
      !statusToUpdate
    )
      return;

    let requestIds: string[] = [];
    switch (statusToUpdate) {
      case "Canceled":
        //Cancel vehicle pending or approved (on going)
        requestIds = selectedVehiclesToUpdate
          .filter(
            (vehicle) =>
              vehicle.status.toLowerCase() !== "canceled" &&
              vehicle.status.toLowerCase() !== "completed"
          )
          .map((vehicle) => vehicle.requestId);
        break;
      case "Approved":
        //Approve vehicle pending
        requestIds = selectedVehiclesToUpdate
          .filter((vehicle) => vehicle.status.toLowerCase() === "pending")
          .map((vehicle) => vehicle.requestId);
        break;
      case "Completed":
        //Complete vehicle approved (ongoing)
        requestIds = selectedVehiclesToUpdate
          .filter((vehicle) => vehicle.status.toLowerCase() === "on going")
          .map((vehicle) => vehicle.requestId);
        break;
    }
    debugger;
    if (requestIds.length === 0) return;

    const result = await dispatch(
      updateStatusShopOrdersAsync({
        status: statusToUpdate,
        requestIds: requestIds,
        reason: reasonCancel ? reasonCancel : "",
      })
    );
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        `${statusToUpdate} ${
          requestIds.length <= 1 ? "vehicle" : "order"
        }  successfully!`
      );
    }
    setIsOpenConfirmCancelDialog(false);
    setIsOpenConfirmStatusActionDialog(false);
  };

  const handleOpenConfirmCancelDialog = (vehicleToUpdate?: Vehicle) => {
    if (vehicleToUpdate) {
      //Set one vehicle to update
      setSelectedVehiclesToUpdate([vehicleToUpdate]);
    } else if (orderDetails) {
      //Set all vehicle to update all
      setSelectedVehiclesToUpdate(orderDetails.shops[0].vehicles);
    }
    setStatusToUpdate("Canceled");
    setIsOpenConfirmCancelDialog(true);
  };

  const handleCloseConfirmCancelDialog = () => {
    setStatusToUpdate("");
    setIsOpenConfirmCancelDialog(false);
    setSelectedVehiclesToUpdate([]);
  };

  const handleOpenConfirmOrderStatusDialog = (
    statusAction: StatusOrder,
    vehicleToUpdate?: Vehicle
  ) => {
    debugger;
    if (vehicleToUpdate) {
      //Set one vehicle to update
      setSelectedVehiclesToUpdate([vehicleToUpdate]);
    } else if (orderDetails) {
      //Set all vehicle to update all
      setSelectedVehiclesToUpdate(orderDetails.shops[0].vehicles);
    }
    setStatusToUpdate(statusAction);
    setIsOpenConfirmStatusActionDialog(true);
  };

  const handleCloseConfirmOrderStatusDialog = () => {
    setStatusToUpdate("");
    setIsOpenConfirmStatusActionDialog(false);
  };

  if (!orderDetails && !isLoading) return <NotFound />;

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start items-start space-y-2">
            <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Order{" "}
              <span className="text-blue-600">
                #{orderDetails && orderDetails.parentOrderId.toUpperCase()}
              </span>
            </h1>
            <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
              21st Mart 2021 at 10:34 PM
            </p>
          </div>
          <div className=" font-bold text-blue-600 w-fit h-fit p-2  bg-blue-200 rounded-full">
            Pending
          </div>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            {/* <p className="text-lg md:text-xl   font-semibold leading-6 xl:leading-5 text-black">
              Customer’s Cart
            </p> */}
            <div className="flex flex-col justify-start items-start bg-gray-50 border border-gray-100 rounded-lg shadow-md px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full max-h-[30rem] scrollbar overflow-auto">
              {/* Item start */}
              {orderDetails?.shops[0].vehicles.map((vehicle) => (
                <>
                  <div
                    className="relative mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-center md:space-x-6 xl:space-x-8 w-full"
                    key={vehicle.vehicleId}
                  >
                    <div
                      className={`absolute top-0 right-0 font-bold w-fit h-fit p-1  rounded-full text-xs ${
                        vehicle.status === "Pending"
                          ? "text-blue-600 bg-blue-200"
                          : vehicle.status === "Canceled"
                          ? "text-red-600 bg-red-200"
                          : vehicle.status.toLowerCase() === "on going"
                          ? "text-orange-based bg-orange-100"
                          : "text-green-600 bg-green-200"
                      } `}
                    >
                      {vehicle.status}
                    </div>
                    <div className="flex justify-center items-center pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-[150px] h-[150px] md:w-full md:h-full md:block rounded-lg shadow-lg"
                        src={vehicle.image}
                        alt="Vehicle Image"
                      />
                    </div>
                    <div className="flex justify-start items-center border-b border-gray-200 md:flex-row flex-col w-fit md:w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full md:w-[40%] flex flex-col justify-start items-start space-y-2">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-black">
                          {vehicle.vehicleName}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">Brand: </span>{" "}
                            {vehicle.brand}
                          </p>
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">Color: </span>{" "}
                            {vehicle.color}
                          </p>
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">
                              License plates:{" "}
                            </span>
                            {vehicle.licensePlate}
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 flex flex-col justify-center items-start space-y-8">
                        <div className="flex justify-center items-end flex-col space-y-2">
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">From: </span>
                            {new Date(vehicle.pickUpDateTime).toLocaleString(
                              [],
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">To: </span>
                            {new Date(vehicle.dropOffDateTime).toLocaleString(
                              [],
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 flex-1 flex justify-end space-x-8 items-end">
                        <p className="text-base xl:text-lg font-semibold leading-6 text-green-600">
                          {vehicle.price.toLocaleString()} VND
                        </p>
                        <div
                          className={`relative flex items-center justify-center space-x-1 ${
                            (vehicle.status === "Canceled" && "hidden") ||
                            (vehicle.status === "Completed" && "hidden")
                          }`}
                        >
                          {vehicle.status.toLowerCase() === "on going" && (
                            <>
                              {/* complete status button */}
                              <svg
                                className="h-5 w-5 lg:h-6 lg:w-6 text-[#14d233] cursor-pointer hover:text-[#11bb2e]"
                                fill="currentColor"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 493.464 493.464"
                                xmlSpace="preserve"
                                stroke="#11d45c"
                                onClick={() =>
                                  handleOpenConfirmOrderStatusDialog(
                                    "Completed",
                                    vehicle
                                  )
                                }
                                onMouseEnter={() =>
                                  startHoverTimer(
                                    vehicle.vehicleId.toString() + "completed"
                                  )
                                }
                                onMouseLeave={() =>
                                  resetHoverTimer(
                                    vehicle.vehicleId.toString() + "completed"
                                  )
                                }
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <g>
                                      <path d="M246.736,0C110.692,0,0.004,110.68,0.004,246.732c0,136.06,110.688,246.732,246.732,246.732 c136.048,0,246.724-110.672,246.724-246.732C493.456,110.68,382.78,0,246.736,0z M360.524,208.716L230.98,338.268 c-2.82,2.824-7.816,2.824-10.64,0l-86.908-86.912c-1.412-1.416-2.192-3.3-2.192-5.324c0.004-2.016,0.784-3.912,2.192-5.336 l11.108-11.104c1.412-1.408,3.3-2.18,5.328-2.18c2.016,0,3.908,0.772,5.316,2.18l67.752,67.752c1.5,1.516,3.94,1.516,5.444,0 l110.392-110.392c2.824-2.824,7.828-2.824,10.644,0l11.108,11.124c1.412,1.4,2.208,3.304,2.208,5.308 C362.732,205.412,361.936,207.3,360.524,208.716z"></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </>
                          )}
                          {vehicle.status === "Pending" && (
                            <>
                              {/* approve status button */}
                              <svg
                                className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 cursor-pointer hover:text-blue-700"
                                fill="currentColor"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 493.464 493.464"
                                xmlSpace="preserve"
                                stroke="#11d45c"
                                onClick={() =>
                                  handleOpenConfirmOrderStatusDialog(
                                    "Approved",
                                    vehicle
                                  )
                                }
                                onMouseEnter={() =>
                                  startHoverTimer(
                                    vehicle.vehicleId.toString() + "approved"
                                  )
                                }
                                onMouseLeave={() =>
                                  resetHoverTimer(
                                    vehicle.vehicleId.toString() + "approved"
                                  )
                                }
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <g>
                                      <path d="M246.736,0C110.692,0,0.004,110.68,0.004,246.732c0,136.06,110.688,246.732,246.732,246.732 c136.048,0,246.724-110.672,246.724-246.732C493.456,110.68,382.78,0,246.736,0z M360.524,208.716L230.98,338.268 c-2.82,2.824-7.816,2.824-10.64,0l-86.908-86.912c-1.412-1.416-2.192-3.3-2.192-5.324c0.004-2.016,0.784-3.912,2.192-5.336 l11.108-11.104c1.412-1.408,3.3-2.18,5.328-2.18c2.016,0,3.908,0.772,5.316,2.18l67.752,67.752c1.5,1.516,3.94,1.516,5.444,0 l110.392-110.392c2.824-2.824,7.828-2.824,10.644,0l11.108,11.124c1.412,1.4,2.208,3.304,2.208,5.308 C362.732,205.412,361.936,207.3,360.524,208.716z"></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </>
                          )}
                          {vehicle.status === "Pending" ||
                          vehicle.status.toLowerCase() === "on going" ? (
                            //cancel status button
                            <svg
                              className="h-5 w-5 lg:w-6 lg:h-6 text-[#fa0000] hover:text-[#e00000] cursor-pointer"
                              fill="currentColor"
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 493.456 493.456"
                              xmlSpace="preserve"
                              stroke="#fa0000"
                              onClick={() =>
                                handleOpenConfirmCancelDialog(vehicle)
                              }
                              onMouseEnter={() =>
                                startHoverTimer(
                                  vehicle.vehicleId.toString() + "cancel"
                                )
                              }
                              onMouseLeave={() =>
                                resetHoverTimer(
                                  vehicle.vehicleId.toString() + "cancel"
                                )
                              }
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <g>
                                  <g>
                                    <path d="M246.73,0C110.682,0,0.002,110.684,0.002,246.744c0,136.032,110.68,246.712,246.728,246.712 s246.724-110.68,246.724-246.712C493.454,110.684,382.778,0,246.73,0z M360.258,348.776l-11.112,11.12 c-2.808,2.836-7.82,2.836-10.644,0l-88.68-88.672c-0.728-0.74-1.704-1.136-2.732-1.136c-1.028,0-2.004,0.4-2.732,1.136 L155.682,359.9c-2.82,2.836-7.828,2.836-10.648,0l-11.108-11.12c-1.412-1.404-2.196-3.304-2.196-5.3 c0-2.02,0.784-3.916,2.196-5.344l88.68-88.672c1.508-1.512,1.508-3.948,0-5.452l-88.68-88.68c-1.412-1.416-2.196-3.308-2.196-5.32 c0-2.02,0.784-3.916,2.196-5.328l11.108-11.108c2.82-2.82,7.828-2.82,10.648,0l88.68,88.672c1.444,1.444,4.016,1.444,5.46,0 l88.676-88.676c2.824-2.824,7.836-2.824,10.644,0l11.112,11.112c2.928,2.924,2.928,7.716,0,10.648l-88.692,88.676 c-1.504,1.504-1.504,3.94,0,5.452l88.696,88.672C363.186,341.072,363.186,345.844,360.258,348.776z"></path>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          ) : (
                            <></>
                          )}
                          <div
                            id={vehicle.vehicleId.toString() + "completed"}
                            className="absolute bg-green-100 text-green-600 rounded-lg md:-top-4 md:-left-8 text-xs text-center w-fit px-1 font-medium shadow hidden"
                          >
                            Complete
                          </div>
                          <div
                            id={vehicle.vehicleId.toString() + "approved"}
                            className="absolute bg-blue-100 text-blue-600 rounded-lg md:-top-4 md:-left-5 text-xs text-center w-fit px-1 font-medium shadow hidden "
                          >
                            Approve
                          </div>
                          <div
                            id={vehicle.vehicleId.toString() + "cancel"}
                            className="absolute bg-red-100 text-red-600 rounded-lg md:-top-4 md:right-0 text-xs text-center w-fit px-1 font-medium shadow hidden"
                          >
                            Cancel
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-center flex-col md:flex-rowitems-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col justify-end items-end px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 rounded-lg shadow-md space-y-6">
                {/* <h3 className="text-xl   font-semibold leading-5 text-black">
                  Summary
                </h3> */}
                {/* <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base   leading-4 text-black">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-500 leading-4 text-gray-600">
                      $56.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base   leading-4 text-black">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-black leading-3 text-black">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-500 leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base   leading-4 text-black">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-500 leading-4 text-gray-600">
                      $8.00
                    </p>
                  </div>
                </div> */}
                <div className="flex justify-between items-center w-fit gap-4">
                  <p className="text-xl font-bold leading-4 text-black">
                    Total
                  </p>
                  <p className="text-lg font-bold leading-4 text-green-600">
                    {orderDetails?.totalAmmount.toLocaleString()} VND
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 h-fit w-fit mx-auto max-w-xs md:max-w-3xl rounded-lg shadow-md border border-gray-100 md:w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-2xl font-bold leading-5 text-gradient">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-3 py-8 border-b border-gray-200">
                  <img
                    className="rounded-full w-12 h-12 shadow-lg"
                    src={orderDetails?.avatar}
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      {orderDetails?.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center text-gray-800 md:justify-start items-start py-4 border-b border-gray-200 w-full">
                  <div className="flex space-x-2">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill-rule="evenodd"
                          clipRule="evenodd"
                          d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                          fill="#080341"
                        ></path>
                      </g>
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 text-blue-500 hover:underline">
                      {orderDetails?.email}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                          fill="#1C274C"
                        ></path>
                      </g>
                    </svg>
                    <p className="cursor-pointer text-sm leading-5">
                      {orderDetails?.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex w-full justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">
                      {orderDetails?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-8">
          <div
            className="text-center bg-red-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md shadow-red-900/30 cursor-pointer hover:brightness-90"
            onClick={() => handleOpenConfirmCancelDialog()}
          >
            Deny order
          </div>
          <div
            className="text-center bg-blue-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md shadow-green-900/30 cursor-pointer hover:brightness-90"
            onClick={() => handleOpenConfirmOrderStatusDialog("Approved")}
          >
            Accept order
          </div>
          <div
            className="text-center bg-green-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md shadow-blue-900/30 cursor-pointer hover:brightness-90"
            onClick={() => handleOpenConfirmOrderStatusDialog("Completed")}
          >
            Complete order
          </div>
        </div>
      </div>
      {isOpenConfirmCancelDialog && (
        <ConfirmCancelDialog
          actionName={"Cancel Order"}
          objectName={
            selectedVehiclesToUpdate.length <= 1
              ? `${selectedVehiclesToUpdate[0].vehicleName}, ${selectedVehiclesToUpdate[0].licensePlate}`
              : "This Order"
          }
          onClose={handleCloseConfirmCancelDialog}
          content={"Are you sure to cancel:"}
          actionCancel={(reasonCancel: string) =>
            handleUpdateStatusOrder(reasonCancel)
          }
        />
      )}
      {isOpenConfirmStatusActionDialog && (
        <ConfirmDeleteDialog
          actionName="Approve Vehicle"
          objectName={
            selectedVehiclesToUpdate.length <= 1
              ? `${selectedVehiclesToUpdate[0].vehicleName}, ${selectedVehiclesToUpdate[0].licensePlate}`
              : "This Order"
          }
          content="Are you sure to approved:"
          onClose={handleCloseConfirmOrderStatusDialog}
          actionDelete={() => handleUpdateStatusOrder()}
          color={
            statusToUpdate === "Canceled"
              ? "red"
              : statusToUpdate === "Approved"
              ? "blue"
              : "green"
          }
        />
      )}
    </>
  );
}
