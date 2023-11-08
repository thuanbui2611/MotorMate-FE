import { useEffect, useState } from "react";
import agent from "../api/agent";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "./Loading";
import VehicleForm from "../../pages/profile/VehicleForm";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import {
  getProductsOfUserAsync,
  profileSelectors,
} from "../../pages/profile/ProfileSlice";
import { useParams } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";

export default function ProfileDetails() {
  const { username } = useParams();
  const [openVehicleForm, setOpenVehicleForm] = useState(false);

  const userLogin = useAppSelector((state) => state.account.userDetail);
  const products = useAppSelector(profileSelectors.selectAll).filter(
    (p) => p.owner.username.toLowerCase() === username?.toLowerCase().trim()
  );
  const { productOfUserLoaded, profileUser } = useAppSelector(
    (state) => state.profile
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    //Fetch products of profileUser
    if (profileUser) {
      dispatch(getProductsOfUserAsync(profileUser.id)).catch((error) =>
        console.log(error)
      );
    }
  }, [profileUser]);

  const cancelVehicleForm = () => {
    setOpenVehicleForm((cur) => !cur);
  };

  const handleAddVehicle = () => {
    setOpenVehicleForm((cur) => !cur);
  };
  if (productOfUserLoaded) return <Loading />;
  return (
    <>
      <div className="bg-gray-100">
        <div className="w-full text-white bg-main-color">
          <div className="w-full lg:max-w-[1600px] mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-green-400 ">
                  <div className="image overflow-hidden">
                    <img
                      className="h-auto w-full mx-auto"
                      src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                      alt=""
                    />
                  </div>
                  <p className="text-gray-900 font-bold text-xl leading-8 my-1">
                    About
                  </p>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6">
                    Owner at Her Company Inc.
                  </h3>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit, eligendi dolorum sequi illum qui unde
                    aspernatur non deserunt
                  </p>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3 flex-wrap">
                      <span className="font-bold ">Email</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm break-all">
                          {profileUser?.email}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-bold">Contact Number</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm break-all">
                          {profileUser?.phoneNumber}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-bold">Address</span>
                      <span className="ml-auto text-right break-all">
                        {profileUser?.address}
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-bold">Member since</span>
                      <span className="ml-auto text-right break-all">
                        Aug 10, 2023
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="my-4"></div>
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span>Similar Profiles</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Kojstantin
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        James
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Natie
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Casey
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-9/12 mx-2 bg-white">
                <div className="flex justify-between">
                  <p className=" text-black p-5 font-bold text-2xl ">
                    Motor for rent:
                  </p>
                  {userLogin?.username === profileUser?.username && (
                    <button
                      onClick={handleAddVehicle}
                      type="button"
                      className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 21.00 21.00"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#ffffff"
                        stroke="#ffffff"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title>plus_circle [#ffffff]</title>
                          <desc>Created with Sketch.</desc> <defs> </defs>
                          <g
                            id="Page-1"
                            strokeWidth="0.00021000000000000004"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-419.000000, -520.000000)"
                              fill="#ffffff"
                            >
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                <path
                                  d="M374.55,369 L377.7,369 L377.7,371 L374.55,371 L374.55,374 L372.45,374 L372.45,371 L369.3,371 L369.3,369 L372.45,369 L372.45,366 L374.55,366 L374.55,369 Z M373.5,378 C368.86845,378 365.1,374.411 365.1,370 C365.1,365.589 368.86845,362 373.5,362 C378.13155,362 381.9,365.589 381.9,370 C381.9,374.411 378.13155,378 373.5,378 L373.5,378 Z M373.5,360 C367.70085,360 363,364.477 363,370 C363,375.523 367.70085,380 373.5,380 C379.29915,380 384,375.523 384,370 C384,364.477 379.29915,360 373.5,360 L373.5,360 Z"
                                  id="plus_circle-[#ffffff]"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Add a vehicle</span>
                    </button>
                  )}
                </div>

                <div className="mx-10 py-5">
                  <ProductCarousel userLogin={userLogin} products={products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openVehicleForm && (
        <VehicleForm
          actionName="Add a vehicle"
          vehicle={null}
          userLoggedIn={userLogin}
          cancelForm={cancelVehicleForm}
        />
      )}
    </>
  );
}
