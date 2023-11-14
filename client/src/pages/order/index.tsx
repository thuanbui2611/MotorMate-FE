import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store/ConfigureStore";
import Loading from "../../app/components/Loading";
import { MouseEvent, useEffect } from "react";
import { toast } from "react-toastify";

export default function Orders() {
  const userLogin = useAppSelector((state) => state.account.userDetail);

  const { cart, cartLoading, selectedVehicles } = useAppSelector(
    (state) => state.cart
  );
  const data = ["1", "2", "3", "4", "5"];
  useEffect(() => {
    if (!userLogin) {
      toast.error("You need to login to view your orders!");
      navigate(-1);
    }
  }, [userLogin]);
  const navigate = useNavigate();

  return cartLoading ? (
    <Loading />
  ) : (
    <>
      <section
        className={`bg-gray-100 h-fit ${
          cart?.shops.length === 0 && "min-h-screen"
        }`}
      >
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div>
            <div className="flex items-center justify-center mt-4 mb-4 text-2xl md:text-4xl lg:text-6xl tracking-tight font-extrabold text-gradient">
              My Orders
            </div>
            {/* Start cart */}
            {cart?.shops.length === 0 ? (
              <div className="flex items-center justify-center text-center text-xl font-semibold text-orange-based brightness-90">
                Empty order history. <br></br>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/my-orders/1"
                    className="text-xl py-2 md:text-2xl md:py-4 text-blue-600 hover:underline font-bold"
                  >
                    Order #111
                  </Link>
                  <div className="w-fit py-1 px-2 bg-red-200 text-red-600 rounded-full font-bold text-xs md:text-sm">
                    Deny
                  </div>
                </div>

                {cart?.shops.map((shop) => (
                  <div
                    className="p-6 mb-8 border bg-gray-50"
                    key={shop.lessorId}
                  >
                    <div className="flex items-center justify-start mb-4">
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
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {shop.vehicles.map((vehicle) => (
                              <tr
                                key={vehicle.vehicleId}
                                className="border-[#eee] border-b cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                  navigate(
                                    "/product-detail/" + vehicle.vehicleId
                                  )
                                }
                              >
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
                              </tr>
                            ))}
                          </>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* End cart */}
          </div>
        </div>
      </section>
    </>
  );
}
