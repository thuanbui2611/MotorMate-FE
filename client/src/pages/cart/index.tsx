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

export default function Cart() {
  const [confirmDelete, setConfirmDelete] = useState<Boolean>(false);
  const [vehicleDeleted, setVehicleDeleted] = useState<Vehicle>({} as Vehicle);
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
  const handleClickItem = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    vehicleId: string
  ) => {
    const target = event.target as HTMLElement;
    const isInputClicked =
      target.tagName === "INPUT" || target.parentElement?.tagName === "LABEL";
    const isSvgClicked =
      target.tagName === "svg" || target.parentElement?.tagName === "svg";
    // Exclude the first <td> with the input checkbox or the last <td> with the svg from triggering the onClick event
    if (!isInputClicked && !isSvgClicked) {
      navigate("/product-detail/" + vehicleId);
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
            {cart?.shops.length === 0 ? (
              <div className="flex items-center justify-center text-center text-xl font-semibold text-orange-based brightness-90">
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

                    <div className="max-w-full overflow-x-auto scrollbar">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className=" bg-gray-200/50 text-left text-sm md:text-base lg:text-lg font-bold">
                            <th className="py-4 px-4"></th>
                            <th className="min-w-[300px] py-4 px-4 text-black xl:pl-11">
                              Vehicle
                            </th>
                            <th className="min-w-[120px] py-4 px-4 text-black">
                              Brand
                            </th>
                            <th className="min-w-[120px] py-4 px-4 text-black">
                              License plates
                            </th>
                            <th className="min-w-[150px] py-4 px-4 text-black">
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
                                className="border-[#eee] border-b cursor-pointer hover:bg-gray-100"
                                onClick={(event) =>
                                  handleClickItem(event, vehicle.vehicleId)
                                }
                              >
                                <td>
                                  <label className="flex items-center ml-1 ">
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 mr-2"
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
                                <td className="py-5 px-4 pl-9 xl:pl-11">
                                  <div className="flex items-center h-full ">
                                    <div className="h-20 w-20 rounded-md">
                                      <img
                                        className="h-full w-full rounded-md object-cover"
                                        src={vehicle.image}
                                        alt="Vehicle image"
                                      />
                                    </div>
                                    <div className="ml-3 flex flex-col">
                                      <h5 className="font-medium text-black text-xl">
                                        {vehicle.vehicleName}
                                      </h5>
                                      <p className="text-sm">{vehicle.color}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-5 px-4">
                                  <p className="text-black">{vehicle.brand}</p>
                                </td>
                                <td className="py-5 px-4">
                                  <p className="text-black">
                                    {vehicle.licensePlate}
                                  </p>
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
