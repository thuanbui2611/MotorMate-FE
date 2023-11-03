import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Vehicle } from "../../app/models/Vehicle";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { removeVehiclePending } from "./VehiclePendingSlice";
import agent from "../../app/api/agent";
import { addVehicle, removeVehicle } from "./VehicleSlice";
import { addVehicleDenied, removeVehicleDenied } from "./VehicleDeniedSlice";
import { toast } from "react-toastify";
import { ConvertDatetimeToDisplay } from "../../app/utils/ConvertDatetimeToDate";

interface Props {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function VehicleDetails({ vehicle, onClose }: Props) {
  const [isApproving, setIsApproving] = useState(false);
  const [isDenying, setIsDenying] = useState(false);

  const dispatch = useAppDispatch();
  const handleSetStatus = async (vehicle: Vehicle, statusNumber: number) => {
    try {
      if (statusNumber === 1) {
        setIsApproving(true);
      } else if (statusNumber === 2) {
        setIsDenying(true);
      }
      //0: pending, 1: approve, 2: deny
      const response = await agent.Vehicle.updateStatusVehicle(
        vehicle.id,
        statusNumber
      );
      if (response) {
        switch (statusNumber) {
          case 1: //Approve
            if (vehicle.status.trim().toLowerCase() === "pending") {
              dispatch(removeVehiclePending(vehicle.id));
            } else if (vehicle.status.trim().toLowerCase() === "denied") {
              dispatch(removeVehicleDenied(vehicle.id));
            }
            dispatch(addVehicle(response));
            toast.success(
              "Approve vehicle: " + vehicle.licensePlate + " successfully"
            );
            break;
          case 2: //Deny
            if (vehicle.status.trim().toLowerCase() === "pending") {
              dispatch(removeVehiclePending(vehicle.id));
            } else if (vehicle.status.trim().toLowerCase() === "approved") {
              dispatch(removeVehicle(vehicle.id));
            }
            dispatch(addVehicleDenied(response));
            toast.success(
              "Deny vehicle: " + vehicle.licensePlate + " successfully"
            );
            break;
        }
      }
      setIsApproving(false);
      setIsDenying(false);
      onClose();
    } catch (error) {
      console.error("Error when update status", error);
    }
  };
  return (
    <>
      <Dialog
        size="md"
        open={true}
        handler={onClose}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto ">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-1 top-1 rounded-md bg-blue-gray-50 flex text-gray-500 hover:text-gray-800 hover:bg-blue-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <CardHeader className=" mx-auto text-center w-fit px-10 bg-orange-500">
            <Typography
              variant="h3"
              className="text-center py-4 text-white rounded-sm "
            >
              Vehicle Detail
            </Typography>
          </CardHeader>
          <CardBody className=" max-h-[35rem] lg:max-h-[40rem] overflow-auto scrollbar p-0">
            <section className="flex items-center bg-gray-100 ">
              <div className="justify-center flex-1 max-w-6xl px-8 py-4 mx-auto">
                <div>
                  <div className="flex border-b border-gray-200   items-stretch justify-start w-full h-full px-4 mb-8 md:flex-row xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0">
                    <div className="flex items-start justify-start flex-shrink-0">
                      <div className="flex items-center justify-center w-full pb-6 space-x-4 md:justify-start">
                        <img
                          src={vehicle?.owner.picture}
                          className="object-cover w-16 h-16 rounded-md inline-block relative object-center shadow-lg shadow-blue-gray-500/40"
                          alt="avatar"
                        />
                        <div className="flex flex-col items-start justify-start space-y-2">
                          <p className="text-lg font-semibold leading-4 text-left text-black">
                            {vehicle?.owner.name}
                          </p>
                          {/* <p className="text-sm leading-4 text-gray-600 ">
                          10 Vehicles
                        </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center pb-4 mb-7 border-b border-gray-200 md:flex-row">
                    <div className="flex w-full md:w-1/2">
                      <div className="px-4 mb-4 w-1/2">
                        <p className="mb-2 text-sm leading-5 text-black font-bold">
                          Email:
                        </p>
                        <p className="text-base leading-4 text-blue-700 break-all">
                          {vehicle?.owner.email}
                        </p>
                      </div>
                      <div className="px-4 mb-4 w-1/2">
                        <p className="mb-2 text-sm leading-5 text-black font-bold">
                          Phone Number:
                        </p>
                        <p className="text-base leading-4 text-black reak-all">
                          {vehicle?.owner.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-4 md:w-2/4">
                      <p className="mb-2 text-sm leading-5 text-black font-bold">
                        Address:
                      </p>
                      <p className="text-base leading-4 text-black break-all">
                        {vehicle?.owner.address}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 mb-4">
                    <div className="flex flex-col items-stretch justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                      <div className="flex flex-col w-full text-left space-y-2">
                        <h2 className="mb-2 text-xl font-bold text-black md:text-left ">
                          Vehicle details
                        </h2>
                        <div className="flex flex-col items-start justify-center w-full pb-4 space-y-4 border-b border-gray-200 md:border-0">
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Brand:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {vehicle?.specifications.brandName}
                            </p>
                          </div>

                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Collection:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {vehicle?.specifications.collectionName}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Model:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {vehicle?.specifications.modelName}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Color:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {vehicle?.specifications.color}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Year:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {vehicle?.specifications.year}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Condition:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {vehicle?.conditionPercentage + "%"}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Purchase date:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {ConvertDatetimeToDisplay(vehicle!.purchaseDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full text-left space-y-4">
                        <div className="space-y-2">
                          <h2 className="mb-2 text-xl font-bold text-black ">
                            Specific information
                          </h2>
                          <div className="flex flex-col items-start justify-center w-full pb-4 space-y-4 border-b border-gray-200 ">
                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                Lisence Plate:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {vehicle?.licensePlate}
                              </p>
                            </div>

                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                Insurance Number:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {vehicle?.insuranceNumber}
                              </p>
                            </div>
                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                Insurance expiration:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {ConvertDatetimeToDisplay(
                                  vehicle!.insuranceExpiry
                                )}
                              </p>
                            </div>
                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                Price:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {vehicle?.price + " VND"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h2 className="mb-2 text-xl font-bold text-black ">
                            Overseeing
                          </h2>
                          <div className="flex flex-row items-center flex-wrap justify-start w-full pb-4 space-y-2">
                            <div className="w-1/2 justify-start flex items-center min-w-fit mt-2">
                              <p className="text-sm leading-5 text-black font-bold">
                                Profit:
                              </p>
                              <p className="ml-1 text-base leading-4 text-meta-3 break-all ">
                                1000 VND
                              </p>
                            </div>
                            <div className="w-1/2 justify-start flex items-center min-w-fit">
                              <p className="text-sm leading-5 text-black font-bold">
                                Available:
                              </p>
                              <p className="ml-1 text-sm leading-4 break-all inline-flex rounded-full bg-success bg-opacity-10 py-1 px-2 font-bold  text-meta-3">
                                Available
                              </p>
                            </div>
                            <div className="w-1/2 justify-start flex items-center min-w-fit">
                              <p className="text-sm leading-5 text-black font-bold">
                                Lock:
                              </p>
                              <p
                                className={`ml-1 text-sm leading-4 break-all inline-flex rounded-full bg-opacity-10  py-1 px-2 font-bold  ${
                                  vehicle?.isLocked
                                    ? "bg-danger text-danger"
                                    : "text-meta-3 bg-success"
                                }`}
                              >
                                {vehicle?.isLocked ? "Locked" : "Active"}
                              </p>
                            </div>
                            <div className="w-1/2 justify-start flex items-center min-w-fit">
                              <p className="text-sm leading-5 text-black font-bold">
                                Status:
                              </p>
                              <p
                                className={`ml-1 text-sm leading-4 break-all inline-flex rounded-full  py-1 px-2 font-bold ${
                                  vehicle?.status.toLowerCase() === "pending"
                                    ? "bg-blue-500 bg-opacity-30 text-blue-800"
                                    : vehicle?.status.toLowerCase() ===
                                      "approved"
                                    ? "bg-success bg-opacity-10 text-meta-3"
                                    : "bg-danger bg-opacity-10 text-danger"
                                } `}
                              >
                                {vehicle?.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {vehicle?.status.trim().toLowerCase() !== "approved" && (
                      <LoadingButton
                        loading={isApproving}
                        disabled={isApproving || isDenying}
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 600, width: "100px" }}
                        onClick={() => handleSetStatus(vehicle!, 1)}
                      >
                        Approve
                      </LoadingButton>
                    )}
                    {vehicle?.status.trim().toLowerCase() !== "denied" && (
                      <LoadingButton
                        loading={isDenying}
                        disabled={isApproving || isDenying}
                        type="submit"
                        variant="contained"
                        color="error"
                        sx={{ fontWeight: 600, width: "100px" }}
                        onClick={() => handleSetStatus(vehicle!, 2)}
                      >
                        Deny
                      </LoadingButton>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
