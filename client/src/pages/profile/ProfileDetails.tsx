import { useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "../../app/components/Loading";
import VehicleForm from "./VehicleForm";
import { useParams } from "react-router-dom";
import { UserDetail } from "../../app/models/User";
import agentTest from "../../app/api/agentTest";

export default function ProfileDetails() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [currentUserLogin, setCurrentUserLogin] = useState<UserDetail>();
  const { username } = useParams();
  useEffect(() => {
    agent.Product.all()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    //Fetch user detail
    if (username) {
      agentTest.Account.getDetailsByUserName(username)
        .then((user) => setUserDetail(user))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }

    //Fetch user login
    agentTest.Account.userDetails()
    .then((userLogin) => setCurrentUserLogin(userLogin))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }, []);

  const cancelVehicleForm = () => {
    setOpenVehicleForm((cur) => !cur);
  };

  const handleAddVehicle = () => {
    setOpenVehicleForm((cur) => !cur);
  };
  if (loading) return <Loading />;
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
                          {userDetail?.email}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-bold">Contact Number</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm break-all">
                          {userDetail?.phoneNumber}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-bold">Address</span>
                      <span className="ml-auto text-right break-all">
                        {userDetail?.address}
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
                </div>

                <div className="mx-10 py-5">
                  <Swiper
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    onSwiper={(swiper) => {
                      swiper.pagination.render();
                      swiper.pagination.update();
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    freeMode={true}
                    navigation={true}
                    modules={[FreeMode, Pagination, Autoplay, Navigation]}
                    breakpoints={{
                      // when window width is >= 320px
                      0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                      },
                      // when window width is >= 480px
                      480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      // when window width is >= 640px
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                      },
                      1020: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },

                      1280: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },

                      1535: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      },
                    }}
                  >
                    <div className="mb-6 lg:mb-8 -mx-10">
                      {products.slice(0, 8).map((product, id) => (
                        <SwiperSlide key={id} className="custom-slide">
                          <div className="items-center sm:flex w-60 mb-8 mx-auto ">
                            <div>
                              <a
                                className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition"
                                href={"/product-detail/" + product.id}
                              >
                                <div className="relative aspect-w-16 aspect-h-9">
                                  <img
                                    className="object-scale-down h-40 rounded-t-xl hover:scale-110 transition-all"
                                    style={{ width: "100vw" }}
                                    src={product.image}
                                    alt="Image Book"
                                  />
                                  <button
                                    className="absolute top-0 left-0 p-3 bg-blue-500 rounded-l-none hover:bg-blue-600 rounded-b-xl"
                                    // onClick={handleAddItem}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      fill="currentColor"
                                      className="text-white"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                                <div
                                  className="p-4 md:p-5 min-h-[128px]"
                                  style={{ lineClamp: 2 }}
                                >
                                  <div style={{ display: "inline-flex" }}>
                                    <svg
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 1024 1024"
                                      className="icon mr-1 mt-1"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#000000"
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
                                        <path
                                          d="M522.24 81.984a308.288 308.288 0 0 0-308.352 308.352c0 224.96 308.352 461.632 308.352 461.632s85.056-65.6 165.888-160.256a22.4 22.4 0 0 0-15.744-38.4 22.016 22.016 0 0 0-17.152 8.512l-0.064-0.064 74.496-109.376 3.52 2.176a21.568 21.568 0 0 0-3.968 11.968 22.4 22.4 0 0 0 22.4 22.464 22.272 22.272 0 0 0 20.992-15.36c33.92-58.56 57.92-121.216 57.92-183.232A308.224 308.224 0 0 0 522.24 81.984z"
                                          fill=""
                                        ></path>
                                        <path
                                          d="M716.864 620.416m-22.4 0a22.4 22.4 0 1 0 44.8 0 22.4 22.4 0 1 0-44.8 0Z"
                                          fill=""
                                        ></path>
                                        <path
                                          d="M522.24 126.784a263.808 263.808 0 0 0-263.552 263.552c0 163.008 191.168 341.824 263.552 403.648 72.384-61.824 263.552-240.64 263.552-403.648A263.872 263.872 0 0 0 522.24 126.784z m0 432.576a172.032 172.032 0 1 1 0-344.064 172.032 172.032 0 0 1 0 344.064z"
                                          fill="#F15D43"
                                        ></path>
                                        <path
                                          d="M522.24 387.328m-127.168 0a127.168 127.168 0 1 0 254.336 0 127.168 127.168 0 1 0-254.336 0Z"
                                          fill="#FFFFFF"
                                        ></path>
                                        <path
                                          d="M186.304 936.384m-22.4 0a22.4 22.4 0 1 0 44.8 0 22.4 22.4 0 1 0-44.8 0Z"
                                          fill=""
                                        ></path>
                                        <path
                                          d="M263.04 913.984a22.464 22.464 0 0 0-22.4 22.4v0.064c0 12.288 10.112 22.4 22.4 22.4h595.2c12.288 0 22.4-10.048 22.4-22.4v-0.064a22.464 22.464 0 0 0-22.4-22.4h-595.2z"
                                          fill=""
                                        ></path>
                                        <path
                                          d="M292.8 359.36a16 16 0 0 1-15.744-18.816c25.6-144 153.28-183.616 158.656-185.216a16 16 0 0 1 9.152 30.656c-4.672 1.408-114.24 35.968-136.384 160.192a16 16 0 0 1-15.68 13.184z"
                                          fill="#FFFFFF"
                                        ></path>
                                      </g>
                                    </svg>
                                    <p className="mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
                                      {product.category}
                                    </p>
                                  </div>

                                  <h3 className="mt-2 text-base font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-white line-clamp-1 text-justify">
                                    {product.title}
                                  </h3>
                                </div>

                                <div className="flex">
                                  <div className="w-2/3 px-5 pb-3">
                                    <p className="text-base font-bold text-blue-500 dark:text-blue-300">
                                      100.000 VND
                                    </p>
                                    <span className="block -mt-1 text-xs font-semibold text-gray-400 ">
                                      per day
                                    </span>
                                  </div>
                                  <button className="flex-1 text-base w-2 font-bold text-white transition-all bg-blue-500 rounded-r-none hover:bg-blue-600 rounded-t-xl">
                                    Renting
                                  </button>
                                </div>
                              </a>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </div>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openVehicleForm && <VehicleForm currentUser={currentUserLogin} cancelForm={cancelVehicleForm} />}
    </>
  );
}
