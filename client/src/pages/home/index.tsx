import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import ProductHomepage from "./ProductHomepage";
import Loading from "../../app/components/Loading";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
import { Vehicle } from "../../app/models/Vehicle";

import "../../app/assets/css/defaultScrollbar.css";
import FadeInSection from "../../app/components/FadeInSection";

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
      <FadeInSection options="fade-in-section">
        <div className="cover-page flex justify-center items-center mx-auto bg-color-header px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16">
          <div className="relative mx-auto w-fit flex shrink-0 justify-center items-center ">
            <div className="h-[55.9vw] w-full max-h-[1080px]">
              <img
                className="cover-img"
                src={require("../../app/assets/images/cover/HeroCover-homepage.png")}
                alt="Cover website"
              />
            </div>
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
      </FadeInSection>

      {/* Choose your motorcycle */}
      <FadeInSection options="fade-in-section">
        <section className="bg-home-product">
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
      </FadeInSection>
      {/* Our Features */}
      <FadeInSection options="fade-in-scale">
        <section className="bg-home-features">
          <div className="featureContainer pb-8 pt-4 mx-auto w-full px-0 md:px-4 lg:pb-20 lg:pt-8 lg:px-6">
            <div className="mx-auto pt-6">
              <div className="relative flex items-center justify-start">
                <div className="hrDiv">
                  <hr></hr>
                </div>
                <h1>Our Features</h1>
              </div>
            </div>
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
      </FadeInSection>

      <FadeInSection options="fade-in-scale">
        <BlogList />
      </FadeInSection>
      <FadeInSection options="fade-in-scale">
        <section className="pt-10">
          <div className="mx-auto mb-4 text-center">
            <h2 className="text-4xl lg:text-6xl tracking-tight font-extrabold procedure-title">
              Procedure
            </h2>
          </div>
          <div className="flex justify-center">
            <hr className="w-[20%] lg:w-[200px] border border-[#ff7e06]"></hr>
          </div>

          <div className="flex justify-center">
            <hr className="w-[10%] mt-2 lg:w-[140px] border border-[#ff7e06]"></hr>
          </div>
          <div className="flex-col px-4 pt-10 sm:px-6 lg:px-8 lg:py-0 mx-auto justify-center items-start">
            <section className="mx-auto max-w-screen-xl mb-8">
              <div className="flex flex-col md:flex-row justify-center w-fit px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex items-center justify-center w-fit mx-auto">
                  <div className="text-center">
                    <div className="relative flex flex-col items-center">
                      <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] text-white font-bold opacity-10">
                        LESSEES
                      </div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#ff7e06]">
                        Lessees
                      </h1>
                      <div className="flex w-20 mt-1 mb-4 overflow-hidden rounded">
                        <div className="flex-1 h-2 bg-orange-200"></div>
                        <div className="flex-1 h-2 bg-orange-300"></div>
                        <div className="flex-1 h-2 bg-orange-400"></div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm lg:text-base text-center text-white">
                      Make sure that you have a valid motorcycle license and a
                      valid ID card.
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col mx-auto lg:max-w-3xl">
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border border-[#ff7e06] text-[#ff7e06] font-bold rounded-full">
                          1
                        </div>
                      </div>
                      <div className="w-px h-full bg-[#ff7e06]"></div>
                    </div>
                    <div className="relative flex-1 bg-[#242424] border boder-2 border-[#ff7e06] rounded shadow mb-8">
                      <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                        <div className="h-10 origin-top-right transform -rotate-45 bg-[#242424] border boder-2 border-[#ff7e06] drop-shadow-lg"></div>
                      </div>
                      <div className="relative z-20 p-4">
                        <p className="mb-2 text-base lg:text-lg font-bold text-[#ff7e06]">
                          Research and Choose
                        </p>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            1.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Research and select a reputable motorcycle rental
                            company.
                          </p>
                        </div>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            2.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Consider factors like bike types, rates, and
                            reviews.
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            3.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Confirm availability and make your reservation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border border-[#ff7e06] text-[#ff7e06] font-bold rounded-full">
                          2
                        </div>
                      </div>
                      <div className="w-px h-full bg-[#ff7e06]"></div>
                    </div>
                    <div className="relative flex-1 bg-[#242424] border boder-2 border-[#ff7e06] rounded shadow mb-8">
                      <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                        <div className="h-10 origin-top-right transform -rotate-45 bg-[#242424] border boder-2 border-[#ff7e06] drop-shadow-lg"></div>
                      </div>
                      <div className="relative z-20 p-6">
                        <p className="mb-2 text-base lg:text-lg font-bold text-[#ff7e06]">
                          Reservation Details
                        </p>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            1.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Provide your personal info, rental dates, and
                            motorcycle preference.
                          </p>
                        </div>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            2.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Discuss additional services like insurance and
                            equipment.
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            3.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Understand the terms and conditions before
                            confirming.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border border-[#ff7e06] text-[#ff7e06] font-bold rounded-full">
                          3
                        </div>
                      </div>
                      <div className="w-px h-full bg-[#ff7e06]"></div>
                    </div>
                    <div className="relative flex-1 bg-[#242424] border boder-2 border-[#ff7e06] rounded shadow mb-8">
                      <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                        <div className="h-10 origin-top-right transform -rotate-45 bg-[#242424] border boder-2 border-[#ff7e06] drop-shadow-lg"></div>
                      </div>
                      <div className="relative z-20 p-6">
                        <p className="mb-2 text-base lg:text-lg font-bold text-[#ff7e06]">
                          Pick Up and Return
                        </p>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            1.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Inspect the motorcycle for damage before leaving.
                          </p>
                        </div>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            2.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Complete the payment and deposit process.
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            3.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Return the bike in the same condition to avoid
                            additional charges.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-screen-xl">
              <div className="flex flex-col md:flex-row justify-center w-fit px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex items-center justify-center w-fit mx-auto">
                  <div className="text-center">
                    <div className="relative flex flex-col items-center">
                      <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] text-white font-bold opacity-10">
                        LESSORS
                      </div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#ff7e06]">
                        Lessors
                      </h1>
                      <div className="flex w-20 mt-1 mb-4 overflow-hidden rounded">
                        <div className="flex-1 h-2 bg-orange-200"></div>
                        <div className="flex-1 h-2 bg-orange-300"></div>
                        <div className="flex-1 h-2 bg-orange-400"></div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm lg:text-base text-center text-white">
                      Make sure that you have a valid motorcycle license and a
                      valid ID card.
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col mx-auto lg:max-w-3xl">
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border border-[#ff7e06] text-[#ff7e06] font-bold rounded-full">
                          1
                        </div>
                      </div>
                      <div className="w-px h-full bg-[#ff7e06]"></div>
                    </div>
                    <div className="relative flex-1 bg-[#242424] border boder-2 border-[#ff7e06] rounded shadow mb-8">
                      <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                        <div className="h-10 origin-top-right transform -rotate-45 bg-[#242424] border boder-2 border-[#ff7e06] drop-shadow-lg"></div>
                      </div>
                      <div className="relative z-20 p-4">
                        <p className="mb-2 text-base lg:text-lg font-bold text-[#ff7e06]">
                          Prepare Your Motorcycle(s)
                        </p>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            1.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Ensure your motorcycle is in good working condition.
                          </p>
                        </div>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            2.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Perform necessary maintenance and safety checks.
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            3.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Consider providing safety gear like helmets and
                            gloves for renters.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border border-[#ff7e06] text-[#ff7e06] font-bold rounded-full">
                          2
                        </div>
                      </div>
                      <div className="w-px h-full bg-[#ff7e06]"></div>
                    </div>
                    <div className="relative flex-1 bg-[#242424] border boder-2 border-[#ff7e06] rounded shadow mb-8">
                      <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                        <div className="h-10 origin-top-right transform -rotate-45 bg-[#242424] border boder-2 border-[#ff7e06] drop-shadow-lg"></div>
                      </div>
                      <div className="relative z-20 p-6">
                        <p className="mb-2 text-base lg:text-lg font-bold text-[#ff7e06]">
                          Set Up Your Rental Business
                        </p>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            1.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Register your business and obtain any necessary
                            licenses.
                          </p>
                        </div>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            2.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Create rental agreements outlining terms,
                            conditions, and insurance coverage.
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            3.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Set competitive rental rates and decide on deposit
                            requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center w-10 mr-4 md:w-16">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border border-[#ff7e06] text-[#ff7e06] font-bold rounded-full">
                          3
                        </div>
                      </div>
                      <div className="w-px h-full bg-[#ff7e06]"></div>
                    </div>
                    <div className="relative flex-1 bg-[#242424] border boder-2 border-[#ff7e06] rounded shadow mb-8">
                      <div className="absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-7 -left-4">
                        <div className="h-10 origin-top-right transform -rotate-45 bg-[#242424] border boder-2 border-[#ff7e06] drop-shadow-lg"></div>
                      </div>
                      <div className="relative z-20 p-6">
                        <p className="mb-2 text-base lg:text-lg font-bold text-[#ff7e06]">
                          Market and Manage Rentals
                        </p>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            1.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Advertise your rental services online and in local
                            communities.
                          </p>
                        </div>
                        <div className="flex mb-[2px]">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            2.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Screen potential renters, verify their licenses, and
                            maintain records.
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-2 text-white text-sm lg:text-base font-medium">
                            3.
                          </p>
                          <p className="text-white text-sm lg:text-base font-medium ml-2">
                            Offer excellent customer service, assist with
                            pick-up, and address any issues promptly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </FadeInSection>

      {/* Our team */}
      <FadeInSection options="fade-in-scale">
        <section>
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-6">
            <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
              <h2 className="mb-4 text-2xl md:text-4xl lg:text-6xl tracking-tight font-extrabold text-gradient">
                Our team
              </h2>
              <p className="font-light text-white sm:text-xl">
                Meet our road-loving team at Motormate, where every member is
                revved up to make your two-wheeled adventures unforgettable! 🏍️
              </p>
            </div>
            <div className="grid gap-8 lg:gap-0 md:grid-cols-3 ">
              <div className="flex flex-col items-center justify-center ">
                <img
                  className="mx-auto mb-4 w-36 h-36 rounded-full"
                  src="https://res.cloudinary.com/dmwvl1lok/image/upload/v1700536475/motormate/Founders/dundon_b6v8ej.jpg"
                  alt="DungDTGCS200419 Avatar"
                />
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-gradient ">
                  <a href="#">Doan Thanh Dung</a>
                </h3>
                <p className="text-white">CTO/Co-founder</p>
                <ul className="flex items-center justify-center mt-4 space-x-4 bg-white rounded-2xl px-2 py-1 w-fit">
                  <li>
                    <a
                      href="https://www.facebook.com/DTN.AML"
                      target="_blank"
                      className="text-[#39569c] hover:text-gray-900 "
                    >
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
                    <a
                      href="https://www.linkedin.com/in/dung-doan-thanh"
                      target="_blank"
                      className="text-[#00acee] hover:text-gray-900"
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#0288D1"
                          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/DungDoan3001"
                      target="_blank"
                      className="text-gray-900 hover:text-gray-900  "
                    >
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
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  className="mx-auto mb-4 w-36 h-36 rounded-full"
                  src="https://res.cloudinary.com/dmwvl1lok/image/upload/v1700536474/motormate/Founders/anhtt_lvw1a5.jpg"
                  alt="AnhTTBCS200426 Avatar"
                />
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-gradient ">
                  <a href="#">Trinh Tuong Anh</a>
                </h3>
                <p className="text-white">CEO/Co-founder</p>
                <ul className="flex items-center justify-center mt-4 space-x-4 bg-white rounded-2xl px-2 py-1 w-fit">
                  <li>
                    <a
                      href="https://www.facebook.com/tuonganh.trinh"
                      target="_blank"
                      className="text-[#39569c] hover:text-gray-900 "
                    >
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
                    <a
                      href="https://www.linkedin.com/in/tuong-anh-trinh"
                      target="_blank"
                      className="text-[#00acee] hover:text-gray-900"
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#0288D1"
                          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <img
                  className="mx-auto mb-4 w-36 h-36 rounded-full"
                  src="https://res.cloudinary.com/dmwvl1lok/image/upload/v1700536474/motormate/Founders/thuanbc_tkeb3d.jpg"
                  alt="ThuanBCGCS200424 Avatar"
                />
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-gradient ">
                  <a href="#">Bui Cong Thuan</a>
                </h3>
                <p className="text-white">CFO/Co-founder</p>
                <ul className="flex items-center justify-center mt-4 space-x-4 bg-white rounded-2xl px-2 py-1 w-fit">
                  <li>
                    <a
                      href="https://www.facebook.com/BC.Thuan2611"
                      target="_blank"
                      className="text-[#39569c] hover:text-gray-900 "
                    >
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
                    <a
                      href="https://www.linkedin.com/in/thuan2611"
                      target="_blank"
                      className="text-[#00acee] hover:text-gray-900"
                    >
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#0288D1"
                          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/thuanbui2611"
                      target="_blank"
                      className="text-gray-900 hover:text-gray-900  "
                    >
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
                </ul>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
