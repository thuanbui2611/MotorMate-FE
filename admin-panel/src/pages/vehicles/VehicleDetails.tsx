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
import { ConvertDatetimeToDate } from "../../app/utils/ConvertDatetimeToDate";

interface Props {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function VehicleDetails({ vehicle, onClose }: Props) {
  return (
    <>
      <Dialog
        size="md"
        open={true}
        handler={onClose}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto ">
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
                          src="https://i.postimg.cc/RhQYkKYk/pexels-italo-melo-2379005.jpg"
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
                              {vehicle?.color}
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
                              {ConvertDatetimeToDate(vehicle!.purchaseDate)}
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
                                {ConvertDatetimeToDate(
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
                              <p className="ml-1 text-sm leading-4 break-all inline-flex rounded-full bg-success bg-opacity-10 py-1 px-2 font-medium text-meta-3">
                                Available
                              </p>
                            </div>
                            <div className="w-1/2 justify-start flex items-center min-w-fit">
                              <p className="text-sm leading-5 text-black font-bold">
                                Lock:
                              </p>
                              <p className="ml-1 text-sm leading-4 break-all inline-flex rounded-full bg-success bg-opacity-10 py-1 px-2 font-medium text-meta-3">
                                Active
                              </p>
                            </div>
                            <div className="w-1/2 justify-start flex items-center min-w-fit">
                              <p className="text-sm leading-5 text-black font-bold">
                                Status:
                              </p>
                              <p className="ml-1 text-sm leading-4 break-all inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-2 font-medium text-danger">
                                Renting
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center">
                    <button
                      className="w-20 px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-600"
                      onClick={onClose}
                    >
                      OK
                    </button>
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
