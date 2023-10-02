import { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";
import ProductHomepage from "./ProductHomepage";
import Loading from "../../app/components/Loading";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { Link } from "react-router-dom";
import BlogList from "./BlogList";
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
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
      {/* <div className=" text-center max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-8 md:gap-12">
          <div className="flex flex-col min-h- items-center border-1 border-orange-based rounded-lg pt-2 pb-2 shadow-xl shadow-orange-based md:shadow-lg md:shadow-orange-based ">
            <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl mt-2 before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
              <svg
                width="100px"
                height="100px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600"
                fill="currentColor"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <defs> </defs> <title></title>{" "}
                  <g data-name="Layer 4" id="Layer_4">
                    {" "}
                    <path
                      className="cls-1"
                      d="M171,226v93s-62,15-62-49C109,215,171,226,171,226Z"
                    ></path>{" "}
                    <path
                      className="cls-2"
                      d="M343,226v93s60,15,60-49C403,215,343,226,343,226Z"
                    ></path>{" "}
                    <path d="M369.87,216.24V203.48c0-30.55-10.81-58.94-30.41-80C319.37,101.86,291.75,90,261.62,90H251.08c-30.13,0-57.75,11.86-77.84,33.48-19.6,21.06-30.41,49.45-30.41,80v12.76a45.81,45.81,0,0,0-42.69,45.62v19.95a45.75,45.75,0,0,0,45.68,45.68h25.74a8.39,8.39,0,0,0,8.37-8.37V224.47a8.39,8.39,0,0,0-8.37-8.37h-12V203.48c0-55.17,39.34-96.74,91.44-96.74h10.53c52.17,0,91.44,41.57,91.44,96.74V216.1H341a8.39,8.39,0,0,0-8.37,8.37v94.58a8.39,8.39,0,0,0,8.37,8.37h11.72c-3.42,43.66-33.48,53.78-47.43,56.08a29.43,29.43,0,0,0-28-20.3H256.39a29.4,29.4,0,0,0,0,58.8h21a29.44,29.44,0,0,0,28.32-21.62,79.17,79.17,0,0,0,28.39-9.69c15.14-8.86,33.06-26.92,35.43-63.33a45.74,45.74,0,0,0,42.89-45.62V261.79A45.57,45.57,0,0,0,369.87,216.24ZM163.34,310.68H146A29,29,0,0,1,117,281.74V261.79A29,29,0,0,1,146,232.84h17.37Zm114,94.58h-21a12.62,12.62,0,1,1,0-25.25h21a12.62,12.62,0,0,1,0,25.25ZM395.74,281.74a29,29,0,0,1-28.95,28.95H349.43V232.84H366.8a29,29,0,0,1,28.95,28.95Z"></path>{" "}
                    <path d="M296.15,263.82H296l-79,.37a8.5,8.5,0,0,1-.08-17l79-.37a8.5,8.5,0,0,1,.19,17Z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="text-2xl font-bold text-gray-800 ">
                24/7 Support
              </h3>
              <p className="mt-1 text-gray-600  mx-1 mb-3">
                Contact us 24 hours a day, 7 days a week
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center border-1 border-orange-based rounded-lg pt-2 pb-2 shadow-xl shadow-orange-based md:shadow-lg md:shadow-orange-based ">
            <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl mt-2 before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
              <svg
                className="w-7 h-7 text-blue-600 "
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2z" />
                <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm.535-10a3.975 3.975 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126c.091-.355.23-.69.41-1H4a2 2 0 1 0 0 4h2.535z" />
                <path d="M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="text-2xl font-bold text-gray-800 ">
                Motorcycle Reservation Anytime
              </h3>
              <p className="mt-1 text-gray-600  mx-1 mb-3">
                Feel free to choose time and date for your reservation
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center border-1 border-orange-based rounded-lg pt-2 pb-2 shadow-xl shadow-orange-based md:shadow-lg md:shadow-orange-based ">
            <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl mt-2 before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
              <svg
                className="w-7 h-7 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="text-2xl font-bold text-gray-800 ">
                Lots Of Pickup Locations
              </h3>
              <p className="mt-1 text-gray-600  mx-1 mb-3">
                Every component and plugin is well documented
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center border-1 border-orange-based rounded-lg pt-2 pb-2 shadow-xl shadow-orange-based md:shadow-lg md:shadow-orange-based ">
            <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl mt-2 before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
              <svg
                className="w-7 h-7 text-blue-600 "
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="text-2xl font-bold text-gray-800 ">
                24/7 Support
              </h3>
              <p className="mt-1 text-gray-600  mx-1 mb-3">
                Contact us 24 hours a day, 7 days a week
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="text-center pt-10">
        <div className="">
          <div className="flex justify-center">
            <hr className="w-1/4"></hr>
          </div>
          <div className="w-full py-8 mx-auto flex justify-center ">
            <h1 className=" bg-cyan-500 shadow-lg shadow-cyan-500/50 pb-2 text-center text-uppercase text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl px-6">
              <span className="drop-shadow-lg text-white ">WELCOME TO </span>
              <span className=" text-black drop-shadow-lg">MOTORMATE</span>
            </h1>
          </div>

          <div className="flex justify-center pb-10">
            <AdsHomepage />

            <div className="homepage-welcome">
              <img
                className="w-full mb-4"
                src={require("../../app/assets/images/image1.png")}
                alt=""
              />
              <p className="leading-loose md:text-base text-sm">
                Justo et eos et ut takimata sed sadipscing dolore lorem, et
                elitr labore labore voluptua no rebum sed, stet voluptua amet
                sed elitr ea dolor dolores no clita. Dolores diam magna clita ea
                eos amet, amet rebum voluptua vero vero sed clita accusam
                takimata. Nonumy labore ipsum sea voluptua sea eos sit justo, no
                ipsum sanctus sanctus no et no ipsum amet, tempor labore est
                labore no. Eos diam eirmod lorem ut eirmod, ipsum diam
                sadipscing stet dolores elitr elitr eirmod dolore. Magna elitr
                accusam takimata labore, et at erat eirmod consetetur tempor
                eirmod invidunt est, ipsum nonumy at et.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {/* Choose your motorcycle */}

      <section className=" bg-home-product ">
        <div className="py-8  mx-auto w-full px-0 md:px-4 md:max-w-screen-xl lg:py-10 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <div className="flex justify-center">
              <hr className="w-1/4 pb-3"></hr>
            </div>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
              Choose your Motorcycle
            </h2>
            <p className="font-light text-gray-50 lg:mb-8 sm:text-xl ">
              Explore the whole collection of open-source web components and
              elements built with the utility classes from Tailwind
            </p>
          </div>
          {/* List product */}
          <ProductHomepage products={products} />
          {/* End list product */}

          {/* Other list product */}
          {/* <section className="flex items-center py-20 bg-gray-100 lg:h-screen">
            <div className="px-4 mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-4 lg:gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {products.slice(0, 8).map((product) => (
                  <div className="relative overflow-hidden bg-white shadow rounded-xl">
                    <div className="relative overflow-hidden">
                      <div className="mb-5 overflow-hidden">
                        <img
                          className="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110"
                          src={product.image}
                          alt=""
                        />
                      </div>
                      <button className="absolute top-0 left-0 p-3 bg-blue-500 rounded-l-none hover:bg-blue-600 rounded-b-xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                    <a>
                      <h3 className="px-5 mb-4 text-lg font-bold ">
                        {product.title}
                      </h3>
                    </a>
                    <div className="flex">
                      <div className="w-1/2 px-5 pb-3">
                        <p className="text-lg font-bold text-blue-500 ">
                          $299.99
                        </p>
                      </div>
                      <button className="flex-1 text-sm text-white transition-all bg-blue-500 rounded-r-none hover:bg-blue-600 rounded-t-xl">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section> */}
          {/* End of other list product */}
          <div className="text-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gradient-to-r from-[#FF6003] to-[#FF7E06] rounded-lg hover:text-black focus:ring-2 focus:ring-orange-based  transition-all transform hover:scale-110 hover:rotate-2"
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
            </a>
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
