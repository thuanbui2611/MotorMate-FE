import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { UserDetail } from "../../app/models/User";
import { ConvertDatetimeToDisplay } from "../../app/utils/ConvertDatetimeToDate";

interface Props {
  user: UserDetail | null;
  onClose: () => void;
}
export default function UserDetails({ user, onClose }: Props) {
  return (
    <>
      <Dialog
        size="lg"
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
              User Detail
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
                          src={user?.image.imageUrl}
                          className="object-cover w-16 h-16 rounded-md inline-block relative object-center shadow-lg shadow-blue-gray-500/40"
                          alt="avatar"
                        />
                        <div className="flex flex-col items-start justify-start space-y-2">
                          <p className="text-lg font-semibold leading-4 text-left text-black">
                            {user?.fullName}
                          </p>
                          <p className="text-sm leading-4 text-gray-600 text-bold">
                            {user?.roles[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 mb-4">
                    <div className="flex flex-col items-stretch justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                      <div className="flex flex-col w-full text-left space-y-2">
                        <h2 className="mb-2 text-xl font-bold text-black md:text-left ">
                          Basic Information
                        </h2>
                        <div className="flex flex-col items-start justify-center w-full pb-4 space-y-4 border-b border-gray-200 md:border-0">
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Fullname:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {user?.fullName}
                            </p>
                          </div>

                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Username:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {user?.username}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Email:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {user?.email}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Phone number:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {user?.phoneNumber
                                ? user?.phoneNumber
                                : "No phone number"}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Date of birth:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {user?.dateOfBirth
                                ? ConvertDatetimeToDisplay(user?.dateOfBirth)
                                : "No date of birth"}
                            </p>
                          </div>
                          <div className="flex justify-center items-center">
                            <p className="text-sm leading-5 text-black font-bold">
                              Address:
                            </p>
                            <p className="ml-1 text-base leading-4 text-black break-all">
                              {user?.address ? user?.address : "No address"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full text-left space-y-4">
                        <div className="space-y-2">
                          <h2 className="mb-2 text-xl font-bold text-black ">
                            Others
                          </h2>
                          <div className="flex flex-col items-start justify-center w-full pb-4 space-y-4 border-b border-gray-200 ">
                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                IsLocked:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {/* {vehicle?.licensePlate} */}
                              </p>
                            </div>

                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                Insurance Number:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {/* {vehicle?.insuranceNumber} */}
                              </p>
                            </div>
                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                Insurance expiration:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {/* {ConvertDatetimeToDisplay(
                                  vehicle!.insuranceExpiry
                                )} */}
                              </p>
                            </div>
                            <div className="flex justify-center items-center">
                              <p className="text-sm leading-5 text-black font-bold">
                                Price:
                              </p>
                              <p className="ml-1 text-base leading-4 text-black break-all">
                                {/* {vehicle?.price + " VND"} */}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
