import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import ProductHomepage from "./ProductHomepage";
import Loading from "../../app/components/Loading";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import { Vehicle } from "../../app/models/Vehicle";

export default function HomePage() {
  const [products, setProducts] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Vehicle.all()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <div className="cover-page flex justify-center items-center mx-auto bg-color-header px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16">
        <div className="relative mx-auto w-fit flex shrink-0 justify-center items-center ">
          <img
            className="cover-img"
            src={require("../../app/assets/images/cover/HeroCover-homepage.png")}
            alt="Cover website"
          />
          <div className="content">
            <h1>MotorMate</h1>
            <h2>A self-ride motorcycle rental platform.</h2>
            <div className="button-content">
              <Link
                to="/products"
                className="text-center align-center flex justify-center items-center w-fit h-fit md:w-fit md:h-full"
              >
                <p>Rent Motorcycles</p>
              </Link>
              <a
                className="text-center w-fit h-fit md:w-fit md:h-full"
                href="#"
              >
                <p>Become a Lessor</p>
              </a>
              <div className="spacing-button"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Choose your motorcycle */}

      <section className="bg-home-product ">
        <div className="py-8 mx-auto w-full px-0 md:px-4 md:max-w-screen-xl lg:py-20 lg:pb-44 lg:px-6 ">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16 lg:pt-10">
            <div className="flex justify-center">
              <hr className="w-1/4 pb-3"></hr>
            </div>
            <h2 className="mb-4 text-2xl md:text-4xl lg:text-6xl tracking-tight font-extrabold text-gradient">
              Choose your Motorcycle
            </h2>
            <p className="font-light text-gray-50 mx-10 md:mx-0 lg:mb-8 text-xs md:text-lg lg:text-xl ">
              With options ranging from different brands, models, and features
              for the perfect motorcycle.
            </p>
          </div>
          {/* List product */}
          <ProductHomepage products={products} />
          {/* End list product */}

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center w-fit px-3 py-2 text-xs md:text-sm lg:text-base font-medium text-center text-white bg-gradient-to-r from-[#FF6003] to-[#FF7E06] rounded-lg hover:text-black focus:ring-2 focus:ring-orange-based  transition-all transform hover:scale-110 hover:rotate-2"
            >
              See more
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Features */}
      <section className="bg-home-features">
        <div className="mx-auto pt-6 md:max-w-screen-2xl md:pt-8 md:px-4 lg:pt-10 lg:px-6">
          <div className="flex items-center justify-start gap-3 md:gap-5 lg:gap-6 ">
            <hr></hr>
            <h1>Our Features</h1>
          </div>
        </div>

        <div className="featureContainer pb-8 pt-4 mx-auto w-full px-0 md:px-4 lg:pb-20 lg:pt-8 lg:px-6 ">
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
            <div className="featureItem">
              <div className="flex flex-col items-center justify-center px-1 md:px-4 lg:px-5">
                <svg
                  fill="#000000"
                  viewBox="0 0 24 24"
                  id="motorcycle"
                  data-name="Line Color"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      id="primary"
                      d="M14,17.82a4.58,4.58,0,0,0,2.82-1.52,1,1,0,0,0,.18-.58V13a4,4,0,0,0-4-4H11a4,4,0,0,0-4,4v2.72a1,1,0,0,0,.18.58A4.58,4.58,0,0,0,10,17.82"
                      style={{
                        fill: "none",
                        stroke: "#FF7E06",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 1.56,
                      }}
                    />
                    <rect
                      id="secondary"
                      x="10"
                      y="15"
                      width="4"
                      height="6"
                      rx="2"
                      style={{
                        fill: "none",
                        stroke: "#FF7E06",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 1.56,
                      }}
                    />
                    <line
                      id="secondary-2"
                      data-name="secondary"
                      x1="15"
                      y1="6"
                      x2="18"
                      y2="6"
                      style={{
                        fill: "none",
                        stroke: "#FF7E06",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 1.56,
                      }}
                    />
                    <line
                      id="secondary-3"
                      data-name="secondary"
                      x1="9"
                      y1="6"
                      x2="6"
                      y2="6"
                      style={{
                        fill: "none",
                        stroke: "#FF7E06",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 1.56,
                      }}
                    />
                    <circle
                      id="primary-2"
                      data-name="primary"
                      cx="12"
                      cy="6"
                      r="3"
                      style={{
                        fill: "none",
                        stroke: "#FF7E06",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 1.56,
                      }}
                    />
                  </g>
                </svg>
                <h2>Diversed Selection</h2>
                <p>
                  Choose from a wide range <br></br>
                  of motorcycles for your <br></br> perfect ride
                </p>
              </div>
            </div>
            <div className="featureItem">
              <div className="flex flex-col items-center justify-center px-1 md:px-3 lg:px-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M15 12L10.8 16L9 14.2857M13 3H5V21H19V9M13 3H14L19 8V9M13 3V7C13 8 14 9 15 9H19"
                      stroke="#FF7E06"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                <h2>Insurance Coverage</h2>
                <p>
                  Ride worry-free with <br></br>
                  comprehensive insurance <br></br> included.
                </p>
              </div>
            </div>
            <div className="featureItem">
              <div className="flex flex-col items-center justify-center px-1 md:px-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M8.5 12.5L10.5 14.5L15.5 9.5"
                      stroke="#FF7E06"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.02907 13.0776C2.7032 12.3958 2.7032 11.6032 3.02907 10.9214C3.16997 10.6266 3.41023 10.3447 3.89076 9.78084C4.08201 9.55642 4.17764 9.44421 4.25796 9.32437C4.44209 9.04965 4.56988 8.74114 4.63393 8.41669C4.66188 8.27515 4.6736 8.12819 4.69706 7.83426C4.75599 7.09576 4.78546 6.72651 4.89427 6.41844C5.14594 5.70591 5.7064 5.14546 6.41893 4.89378C6.72699 4.78497 7.09625 4.7555 7.83475 4.69657C8.12868 4.67312 8.27564 4.66139 8.41718 4.63344C8.74163 4.56939 9.05014 4.4416 9.32485 4.25747C9.4447 4.17715 9.55691 4.08152 9.78133 3.89027C10.3452 3.40974 10.6271 3.16948 10.9219 3.02859C11.6037 2.70271 12.3963 2.70271 13.0781 3.02859C13.3729 3.16948 13.6548 3.40974 14.2187 3.89027C14.4431 4.08152 14.5553 4.17715 14.6752 4.25747C14.9499 4.4416 15.2584 4.56939 15.5828 4.63344C15.7244 4.66139 15.8713 4.67312 16.1653 4.69657C16.9038 4.7555 17.273 4.78497 17.5811 4.89378C18.2936 5.14546 18.8541 5.70591 19.1058 6.41844M4.89427 17.5806C5.14594 18.2931 5.7064 18.8536 6.41893 19.1053C6.72699 19.2141 7.09625 19.2435 7.83475 19.3025C8.12868 19.3259 8.27564 19.3377 8.41718 19.3656C8.74163 19.4297 9.05014 19.5574 9.32485 19.7416C9.44469 19.8219 9.55691 19.9175 9.78133 20.1088C10.3452 20.5893 10.6271 20.8296 10.9219 20.9705C11.6037 21.2963 12.3963 21.2963 13.0781 20.9705C13.3729 20.8296 13.6548 20.5893 14.2187 20.1088C14.4431 19.9175 14.5553 19.8219 14.6752 19.7416C14.9499 19.5574 15.2584 19.4297 15.5828 19.3656C15.7244 19.3377 15.8713 19.3259 16.1653 19.3025C16.9038 19.2435 17.273 19.2141 17.5811 19.1053C18.2936 18.8536 18.8541 18.2931 19.1058 17.5806C19.2146 17.2725 19.244 16.9033 19.303 16.1648C19.3264 15.8709 19.3381 15.7239 19.3661 15.5824C19.4301 15.2579 19.5579 14.9494 19.7421 14.6747C19.8224 14.5548 19.918 14.4426 20.1093 14.2182C20.5898 13.6543 20.8301 13.3724 20.971 13.0776C21.2968 12.3958 21.2968 11.6032 20.971 10.9214"
                      stroke="#FF7E06"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />{" "}
                  </g>
                </svg>
                <h2>Easy Online Booking</h2>
                <p>
                  Easy and seamless <br></br>
                  reservation process for a <br></br> hassle-free
                </p>
              </div>
            </div>
            <div className="featureItem">
              <div className="flex flex-col items-center justify-center px-1 md:px-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#FF7E06"
                      strokeWidth="1.68"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                <h2>Flexible Rentals</h2>
                <p>
                  Hourly, daily, or weekly<br></br>
                  options tailored to your <br></br> schedule
                </p>
              </div>
            </div>
            <div className="featureItem">
              <div
                className="flex flex-col items-center justify-center px-1 md:px-5"
                style={{ marginTop: "-1.4vw" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                      stroke="#FF7E06"
                      strokeWidth="1.344"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="#FF7E06"
                      strokeWidth="1.344"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                <h2>Convienient Location</h2>
                <p>
                  Flexible location for easy<br></br>
                  collection and return.
                </p>
              </div>
            </div>
            <div className="featureItem">
              <div
                className="flex flex-col items-center justify-center px-1 md:px-5"
                style={{ marginTop: "-1.4vw" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  id="_24x24_On_Light_Support"
                  data-name="24x24/On Light/Support"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <rect id="view-box" width="24" height="24" fill="none" />
                    <path
                      id="Shape"
                      d="M8,17.751a2.749,2.749,0,0,1,5.127-1.382C15.217,15.447,16,14,16,11.25v-3c0-3.992-2.251-6.75-5.75-6.75S4.5,4.259,4.5,8.25v3.5a.751.751,0,0,1-.75.75h-1A2.753,2.753,0,0,1,0,9.751v-1A2.754,2.754,0,0,1,2.75,6h.478c.757-3.571,3.348-6,7.022-6s6.264,2.429,7.021,6h.478a2.754,2.754,0,0,1,2.75,2.75v1a2.753,2.753,0,0,1-2.75,2.75H17.44A5.85,5.85,0,0,1,13.5,17.84,2.75,2.75,0,0,1,8,17.751Zm1.5,0a1.25,1.25,0,1,0,1.25-1.25A1.251,1.251,0,0,0,9.5,17.751Zm8-6.75h.249A1.251,1.251,0,0,0,19,9.751v-1A1.251,1.251,0,0,0,17.75,7.5H17.5Zm-16-2.25v1A1.251,1.251,0,0,0,2.75,11H3V7.5H2.75A1.251,1.251,0,0,0,1.5,8.751Z"
                      transform="translate(1.75 2.25)"
                      fill="#FF7E06"
                    />
                  </g>
                </svg>
                <h2>24/7 Customer Support</h2>
                <p>
                  Dedicated assistance for a <br></br>
                  smooth and enjoyable ride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogList />

      <div className="flex justify-center">
        <hr className="w-1/4"></hr>
      </div>
      <div className="mx-auto mb-8 text-center">
        <h2 className=" my-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
          Procedures
        </h2>
        <p className="font-light text-gray-500 sm:text-xl ">
          Explore the whole collection of open-source web components and
          elements built with the utility classes from Tailwind
        </p>
      </div>
      <div className="flex-col lg:flex lg:flex-row px-4 pt-10 sm:px-6 lg:px-8 lg:py-0 mx-auto">
        <section className="items-center pt-8 bg-gray-100  font-poppins md:pr-10 border max-h-fit lg:mr-4 mb-4">
          <div className="block justify-center max-w-2xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="max-w-xl mx-auto">
              <div className="text-center ">
                <div className="relative flex flex-col items-center">
                  <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] text-gray-400 font-bold opacity-10">
                    RENTING
                  </div>
                  <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-blue-500">
                    Renting motorcycles
                  </h1>
                  <div className="flex w-20 mt-1 mb-10 overflow-hidden rounded">
                    <div className="flex-1 h-2 bg-blue-200"></div>
                    <div className="flex-1 h-2 bg-blue-400"></div>
                    <div className="flex-1 h-2 bg-blue-600"></div>
                  </div>
                </div>
                <p className="mb-16 text-sm lg:text-base text-center text-gray-500">
                  Make sure that you have a valid motorcycle license and a valid
                  ID card.
                </p>
              </div>
            </div>
            <div className="w-full mx-auto lg:max-w-3xl">
              <div className="relative flex justify-between">
                <div className="hidden w-16 py-3 md:block ">
                  <h2 className="text-lg font-bold text-gray-700 text-right">
                    Step 1
                  </h2>
                </div>
                <div className="absolute inline-block w-24 py-3 left-16 -top-12 md:hidden">
                  <h2 className="text-base font-bold text-gray-700">Step 1</h2>
                </div>
                <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500   bi bi-building"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                        ></path>
                        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-blue-300"></div>
                </div>
                <div className="relative flex-1 mb-16 bg-white rounded shadow md:mb-8 ">
                  <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                    <div className="h-10 origin-top-right transform -rotate-45 bg-white  drop-shadow-lg"></div>
                  </div>
                  <div className="relative z-20 p-4">
                    <p className="mb-2 text-base lg:text-lg font-bold text-black ">
                      Find your "Motormate"
                    </p>
                    <p className="text-gray-700 text-sm lg:text-base font-medium">
                      Make sure you have selected the vehicle in the right
                      location!
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-between">
                <div className="hidden w-16 py-3 md:block ">
                  <h2 className="text-lg font-bold text-gray-700 text-right">
                    Step 2
                  </h2>
                </div>
                <div className="absolute inline-block w-24 py-3 left-16 -top-12 md:hidden ">
                  <h2 className="text-base font-bold text-gray-700 ">Step 2</h2>
                </div>
                <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500   bi bi-globe"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-blue-300"></div>
                </div>
                <div className="relative flex-1 mb-16 bg-white rounded shadow md:mb-8 ">
                  <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                    <div className="h-10 origin-top-right transform -rotate-45 bg-white  drop-shadow-lg"></div>
                  </div>
                  <div className="relative z-20 p-6">
                    <p className="mb-2 text-base lg:text-lg font-bold text-black">
                      Fill and check your information
                    </p>
                    <p className="text-gray-700 text-sm lg:text-base font-medium">
                      Choose the number of days you want to rent and fill
                      neccessary information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-between">
                <div className="hidden w-16 py-3 md:block ">
                  <h2 className="text-lg font-bold text-gray-700 text-right">
                    Step 3
                  </h2>
                </div>
                <div className="absolute inline-block w-24 py-3 left-16 -top-12 md:hidden ">
                  <h2 className="text-base font-bold text-gray-700 ">Step 3</h2>
                </div>
                <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500   bi bi-code-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-blue-300"></div>
                </div>
                <div className="relative flex-1 mb-16 bg-white rounded shadow md:mb-8 ">
                  <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                    <div className="h-10 origin-top-right transform -rotate-45 bg-white  drop-shadow-lg"></div>
                  </div>
                  <div className="relative z-20 p-6">
                    <p className="mb-2 text-base lg:text-lg font-bold text-black">
                      Payment
                    </p>
                    <p className="text-gray-700 text-sm lg:text-base font-medium">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      veniam libero facilis minus reprehenderit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="items-center py-8 bg-gray-100 font-poppins md:pr-10 border max-h-fit">
          <div className="block justify-center max-w-2xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="max-w-xl mx-auto">
              <div className="text-center ">
                <div className="relative flex flex-col items-center">
                  <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] text-gray-400 font-bold opacity-10">
                    Lessor
                  </div>
                  <h1 className="text-5xl font-bold leading-tight text-blue-500">
                    Lessor
                  </h1>
                  <div className="flex w-20 mt-1 mb-10 overflow-hidden rounded">
                    <div className="flex-1 h-2 bg-blue-200"></div>
                    <div className="flex-1 h-2 bg-blue-400"></div>
                    <div className="flex-1 h-2 bg-blue-600"></div>
                  </div>
                </div>
                <p className="mb-16 text-base text-center text-gray-500">
                  Make sure that you have a valid motorcycle license and a valid
                  ID card.
                </p>
              </div>
            </div>
            <div className="w-full mx-auto lg:max-w-3xl">
              <div className="relative flex justify-between">
                <div className="hidden w-16 py-3 md:block ">
                  <h2 className="text-lg font-bold text-gray-700 text-right">
                    Step 1
                  </h2>
                </div>
                <div className="absolute inline-block w-24 py-3 left-16 -top-12 md:hidden">
                  <h2 className="text-base font-medium text-gray-700">
                    Step 1
                  </h2>
                </div>
                <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500   bi bi-building"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                        ></path>
                        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-blue-300"></div>
                </div>
                <div className="relative flex-1 mb-16 bg-white rounded shadow md:mb-8 ">
                  <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                    <div className="h-10 origin-top-right transform -rotate-45 bg-white  drop-shadow-lg"></div>
                  </div>
                  <div className="relative z-20 p-4">
                    <p className="mb-2 text-base lg:text-lg font-bold text-black ">
                      Register
                    </p>
                    <p className="text-gray-700 text-sm lg:text-base font-medium">
                      Register your motorcycle on our website and wait for the
                      approval.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-between">
                <div className="hidden w-16 py-3 md:block ">
                  <h2 className="text-lg font-bold text-gray-700 text-right">
                    Step 2
                  </h2>
                </div>
                <div className="absolute inline-block w-24 py-3 left-16 -top-12 md:hidden ">
                  <h2 className="text-base font-bold text-gray-700 ">Step 2</h2>
                </div>
                <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500 bi bi-globe"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-blue-300"></div>
                </div>
                <div className="relative flex-1 mb-16 bg-white rounded shadow md:mb-8 ">
                  <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                    <div className="h-10 origin-top-right transform -rotate-45 bg-white  drop-shadow-lg"></div>
                  </div>
                  <div className="relative z-20 p-6">
                    <p className="mb-2 text-base lg:text-lg font-bold text-black">
                      Fill and check your information
                    </p>
                    <p className="text-gray-700 text-sm lg:text-base font-medium">
                      Choose the number of days you want to rent and fill
                      neccessary information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-between">
                <div className="hidden w-16 py-3 md:block ">
                  <h2 className="text-lg font-bold text-gray-700 text-right">
                    Step 3
                  </h2>
                </div>
                <div className="absolute inline-block w-24 py-3 left-16 -top-12 md:hidden ">
                  <h2 className="text-base font-bold text-gray-700 ">Step 3</h2>
                </div>
                <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border border-blue-500 rounded-full ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500   bi bi-code-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-blue-300"></div>
                </div>
                <div className="relative flex-1 mb-16 bg-white rounded shadow md:mb-8 ">
                  <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                    <div className="h-10 origin-top-right transform -rotate-45 bg-white  drop-shadow-lg"></div>
                  </div>
                  <div className="relative z-20 p-6">
                    <p className="mb-2 text-base lg:text-lg font-bold text-black">
                      Payment
                    </p>
                    <p className="text-gray-700 text-sm lg:text-base font-medium">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      veniam libero facilis minus reprehenderit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Our team */}
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-6">
          <div className="flex justify-center">
            <hr className="w-1/4"></hr>
          </div>
          <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 className=" my-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
              Our team
            </h2>
            <p className="font-light text-gray-500 sm:text-xl ">
              Explore the whole collection of open-source web components and
              elements built with the utility classes from Tailwind
            </p>
          </div>
          <div className="grid gap-8 lg:gap-0 md:grid-cols-3 ">
            <div className="text-center text-gray-500 ">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                alt="Helene Avatar"
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
                <a href="#">Helene Engels</a>
              </h3>
              <p>CTO/Co-founder</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <a href="#" className="text-[#39569c] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#00acee] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-900 hover:text-gray-900  ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ea4c89] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center text-gray-500 ">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png"
                alt="Leslie Avatar"
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
                <a href="#">Leslie Livingston</a>
              </h3>
              <p>Graphic Designer</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <a href="#" className="text-[#39569c] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#00acee] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-900 hover:text-gray-900  ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ea4c89] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center text-gray-500 ">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                alt="Joseph Avatar"
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
                <a href="#">Joseph Mcfall</a>
              </h3>
              <p>Sales</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <a href="#" className="text-[#39569c] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#00acee] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-900 hover:text-gray-900  ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ea4c89] hover:text-gray-900 ">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
