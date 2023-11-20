import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import Loading from "../../app/components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Shop, Vehicle } from "../../app/models/Cart";
import ConfirmDeleteDialog from "../../app/components/ConfirmDeleteDialog";
import {
  addRemoveSelectedVehicle,
  addSelectAllVehicles,
  deleteItemInCartAsync,
  removeAllVehiclesInShop,
  removeVehicleInCart,
} from "./CartSlice";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

export default function Cart() {
  const [confirmDelete, setConfirmDelete] = useState<Boolean>(false);
  const [vehicleDeleted, setVehicleDeleted] = useState<Vehicle>({} as Vehicle);
  const [isEditDateRent, setIsEditDateRent] = useState<string>();
  const [timeStart, setTimeStart] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [timeEnd, setTimeEnd] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userDetail, userLoading } = useAppSelector((state) => state.account);
  const userLogin = userDetail;
  const { cart, selectedVehicles, cartLoading } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (!userLogin && !userLoading) {
      toast.error("You need to login to view your cart!");
      navigate(-1);
    }
  }, [userLogin]);

  const openConfirmDeleteDialog = (vehicle: Vehicle) => {
    setConfirmDelete(true);
    setVehicleDeleted(vehicle);
  };

  const cancelConfirmDeleteDialog = () => setConfirmDelete(false);

  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    if (userLogin) {
      toast.success("Remove vehicle from cart successfully!");
      dispatch(removeVehicleInCart({ vehicleId: vehicle.vehicleId }));
      const result = await dispatch(
        deleteItemInCartAsync({
          vehicleId: vehicle.vehicleId,
          userId: userLogin.id,
        })
      );
      if (result.meta.requestStatus === "rejected") {
        toast.error("Something wrong, remove vehicle from cart failed!");
      }
    }
  };

  const handleSelectShopChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    shop: Shop
  ) => {
    const checked = event.target.checked;
    if (checked) {
      dispatch(addSelectAllVehicles(shop));
    } else {
      dispatch(removeAllVehiclesInShop(shop));
    }
  };

  const handleSelectVehicleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    vehicle: Vehicle,
    shop: Shop
  ) => {
    dispatch(addRemoveSelectedVehicle({ vehicle, shop }));
  };

  const handleCancelUpdateDateRent = () => {
    setIsEditDateRent(undefined);
  };

  const onSubmitDateRent = async (vehicleId: string) => {
    setIsEditDateRent(undefined);
  };

  const disabledDates = [
    "2023-11-18T06:55:01.860Z",
    "2023-11-19T08:30:00.000Z",
    "2023-11-22T06:55:01.860Z",
    "2023-11-24T08:30:00.000Z",
  ];
  const shouldDisableDateStart = (date: any) => {
    const dateOption = new Date(date);
    const dateOnly = new Date(
      dateOption.getFullYear(),
      dateOption.getMonth(),
      dateOption.getDate()
    );
    return disabledDates.some((disabledDate) => {
      const disabledDateOnly = new Date(disabledDate);
      return (
        dateOnly.getFullYear() === disabledDateOnly.getFullYear() &&
        dateOnly.getMonth() === disabledDateOnly.getMonth() &&
        dateOnly.getDate() === disabledDateOnly.getDate()
      );
    });
  };

  const shouldDisableDateEnd = (date: any) => {
    const dateOption = new Date(date);
    const dateFrom = new Date(startDate);
    const dateFromOption = new Date(
      dateOption.getFullYear(),
      dateOption.getMonth(),
      dateOption.getDate()
    );
    const dateStart = new Date(
      dateFrom.getFullYear(),
      dateFrom.getMonth(),
      dateFrom.getDate()
    );
    if (dateFromOption <= dateStart) return true;
    const closestDisabledDate = findClosestDisabledDate(
      dateStart,
      disabledDates
    );
    if (!closestDisabledDate) return false;
    const closestDisabledOnlyDate = new Date(
      closestDisabledDate.getFullYear(),
      closestDisabledDate.getMonth(),
      closestDisabledDate.getDate()
    );
    if (closestDisabledDate && closestDisabledOnlyDate > dateStart) {
      const check = dateFromOption >= closestDisabledOnlyDate;
      return check; // Disable all dates after the closest disabled date
    }

    return false; // Enable all other dates
  };

  const findClosestDisabledDate = (
    startDate: Date,
    disabledDates: string[]
  ) => {
    let closestDisabledDate = null;
    let closestDiff = Infinity;
    for (const dateString of disabledDates) {
      const disabledDate = new Date(dateString);
      if (disabledDate > startDate) {
        const diff = disabledDate.getTime() - startDate.getTime();
        if (diff < closestDiff) {
          closestDiff = diff;
          closestDisabledDate = disabledDate;
        }
      }
    }

    return closestDisabledDate;
  };
  return cartLoading || userLoading ? (
    <Loading />
  ) : (
    <>
      <section className={`bg-gray-100 h-fit min-h-screen`}>
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div>
            <h2 className="text-center my-6 text-2xl md:text-4xl lg:text-5xl tracking-tight font-extrabold text-gradient">
              My Cart
            </h2>
            {/* Start cart */}
            {!cart || cart.shops.length === 0 ? (
              <div className="flex items-center justify-center text-center text-xl font-semibold text-orange-based brightness-90 h-40">
                Empty cart. <br></br>
                Please add more vehicles to the cart to have a variety of
                decisions for your trip!
              </div>
            ) : (
              <>
                {cart?.shops.map((shop) => (
                  <div
                    className="p-6 mb-8 border bg-gray-50"
                    key={shop.lessorId}
                  >
                    <div className="flex items-center justify-start mb-4">
                      <label className="flex items-center ">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mr-2"
                          checked={
                            selectedVehicles.some(
                              (s) => s.lessorId === shop.lessorId
                            ) &&
                            selectedVehicles.some(
                              (v) => v.vehicles.length === shop.vehicles.length
                            )
                          }
                          onChange={(event) =>
                            handleSelectShopChange(event, shop)
                          }
                        />
                      </label>
                      <Link
                        to={"/profile/" + shop.lessorName}
                        className=" w-fit rounded p-2"
                      >
                        <div className="flex items-center no-underline hover:underline text-black ">
                          {/* img size 32x32 */}
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
                    </div>

                    <div className="max-w-full overflow-x-auto scrollbar rounded-lg border shadow">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className=" bg-gray-200/50 text-left text-sm md:text-base lg:text-lg font-bold">
                            <th className="py-4"></th>
                            <th className="min-w-[280px] py-4 px-4 text-black text-base">
                              Vehicle
                            </th>
                            <th className="min-w-[120px] py-4 px-4 text-black text-base">
                              Brand
                            </th>
                            <th className="min-w-[150px] py-4 px-4 text-black text-base">
                              License Plates
                            </th>
                            <th className="min-w-[300px] w-fit py-4 px-4 text-black text-center text-base">
                              Date Rent
                            </th>
                            <th className="min-w-[150px] py-4 px-4 text-black text-base">
                              Price (per day)
                            </th>
                            <th className="py-4 px-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {shop.vehicles.map((vehicle) => (
                              <tr
                                key={vehicle.vehicleId}
                                className="border-[#eee] border-b"
                              >
                                <td>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 ml-3"
                                      checked={selectedVehicles.some((shop) =>
                                        shop.vehicles.some(
                                          (v) =>
                                            v.vehicleId === vehicle.vehicleId
                                        )
                                      )}
                                      onChange={(event) =>
                                        handleSelectVehicleChange(
                                          event,
                                          vehicle,
                                          shop
                                        )
                                      }
                                    />
                                  </label>
                                </td>
                                <td className="py-5 px-4">
                                  <Link
                                    to={"/product-detail/" + vehicle.vehicleId}
                                    className="flex items-center h-full cursor-pointer hover:bg-gray-100 rounded-lg"
                                  >
                                    <div className="h-20 w-20 rounded-md">
                                      <img
                                        className="h-full w-full rounded-md object-cover"
                                        src={vehicle.image}
                                        alt="Vehicle image"
                                      />
                                    </div>
                                    <div className="ml-3 flex flex-col">
                                      <h5 className="font-semibold text-black text-xl line-clamp-1">
                                        {vehicle.vehicleName}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        {vehicle.color}
                                      </p>
                                    </div>
                                  </Link>
                                </td>
                                <td className="py-5 px-4">
                                  <p className="text-black">{vehicle.brand}</p>
                                </td>
                                <td className="py-5 px-4">
                                  <p className="text-black">
                                    {vehicle.licensePlate}
                                  </p>
                                </td>
                                <td className="py-3 px-4">
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <div className="flex items-center justify-center">
                                      <div className="flex flex-col items-center justify-center gap-4 text-center">
                                        {isEditDateRent ===
                                        vehicle.vehicleId ? (
                                          <>
                                            <DatePicker
                                              label="Start Date"
                                              sx={{
                                                "& .MuiOutlinedInput-input": {
                                                  padding: 1,
                                                  width: "80px",
                                                  fontSize: "14px",
                                                },
                                                "& .MuiFormLabel-root": {
                                                  top: "-6px",
                                                  fontSize: "14px",
                                                },
                                              }}
                                              onChange={(date: any) => {
                                                setStartDate(date);
                                                console.log(date);
                                              }}
                                              format="DD/MM/YYYY"
                                              shouldDisableDate={(date: any) =>
                                                shouldDisableDateStart(date)
                                              }
                                            />
                                            <TimePicker
                                              label="Start Time"
                                              sx={{
                                                "& .MuiOutlinedInput-input": {
                                                  padding: 1,
                                                  width: "80px",
                                                  fontSize: "14px",
                                                },
                                                "& .MuiFormLabel-root": {
                                                  top: "-6px",
                                                  fontSize: "14px",
                                                },
                                              }}
                                              onChange={(time: any) =>
                                                setTimeStart(time)
                                              }
                                            />
                                          </>
                                        ) : (
                                          <span className="mr-2">
                                            12:00 AM,
                                            <br /> 12/12/2023
                                          </span>
                                        )}
                                      </div>

                                      <div className="relative flex items-center justify-center">
                                        <p className="text-sm p-1">To</p>
                                        {isEditDateRent !==
                                        vehicle.vehicleId ? (
                                          <div
                                            className="text-xs font-semibold bg-blue-500 cursor-pointer text-white absolute -bottom-9 rounded-full p-1 w-[70px] text-center hover:brightness-90"
                                            onClick={() =>
                                              setIsEditDateRent(
                                                vehicle.vehicleId
                                              )
                                            }
                                          >
                                            Edit Date
                                          </div>
                                        ) : (
                                          <div className="flex justify-center items-center absolute -bottom-[55px] space-x-2">
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
                                                onSubmitDateRent(
                                                  vehicle.vehicleId
                                                )
                                              }
                                            >
                                              <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                              ></g>
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
                                            <svg
                                              className="h-5 w-5 lg:h-6 lg:w-6 text-[#fa0000] hover:text-[#e00000] cursor-pointer"
                                              fill="currentColor"
                                              version="1.1"
                                              id="Layer_1"
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 493.456 493.456"
                                              xmlSpace="preserve"
                                              stroke="#fa0000"
                                              onClick={() =>
                                                handleCancelUpdateDateRent()
                                              }
                                            >
                                              <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                              ></g>
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
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex flex-col items-center justify-center gap-4 text-center">
                                        {isEditDateRent ===
                                        vehicle.vehicleId ? (
                                          <>
                                            <DatePicker
                                              label="End Date"
                                              sx={{
                                                "& .MuiOutlinedInput-input": {
                                                  padding: 1,
                                                  width: "80px",
                                                  fontSize: "14px",
                                                },
                                                "& .MuiFormLabel-root": {
                                                  top: "-6px",
                                                  fontSize: "14px",
                                                },
                                              }}
                                              disabled={
                                                startDate ? false : true
                                              }
                                              shouldDisableDate={(date: any) =>
                                                shouldDisableDateEnd(date)
                                              }
                                            />
                                            <TimePicker
                                              label="End Time"
                                              sx={{
                                                "& .MuiOutlinedInput-input": {
                                                  padding: 1,
                                                  width: "80px",
                                                  fontSize: "14px",
                                                },
                                                "& .MuiFormLabel-root": {
                                                  top: "-6px",
                                                  fontSize: "14px",
                                                },
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <span className="ml-2">
                                            12:00 AM,
                                            <br /> 14/12/2023
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </LocalizationProvider>
                                </td>

                                <td className="py-5 px-4">
                                  <p className="text-green-400">
                                    {vehicle.price.toLocaleString()} VND
                                  </p>
                                </td>

                                <td className="py-5 px-4">
                                  <div className="flex flex-col items-center justify-start space-y-2">
                                    <div className="flex items-center justify-center space-x-2">
                                      <button
                                        className="hover:text-red-600 hover:bg-red-600/30 rounded-full p-1"
                                        onClick={() =>
                                          openConfirmDeleteDialog(vehicle)
                                        }
                                      >
                                        <svg
                                          className="fill-current"
                                          width="18"
                                          height="18"
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                            fill=""
                                          />
                                          <path
                                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                            fill=""
                                          />
                                          <path
                                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                            fill=""
                                          />
                                          <path
                                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                            fill=""
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* End cart */}
          </div>
        </div>
      </section>

      {confirmDelete && (
        <ConfirmDeleteDialog
          objectName={
            vehicleDeleted.vehicleName + ", " + vehicleDeleted?.licensePlate
          }
          actionDelete={() => handleDeleteVehicle(vehicleDeleted)}
          cancelDelete={cancelConfirmDeleteDialog}
        />
      )}
    </>
  );
}
