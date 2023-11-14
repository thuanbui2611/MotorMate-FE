import { Link } from "react-router-dom";
import ProcessingBar from "../../app/components/ProcessingBar";

export default function Bill() {
  return (
    <>
      <section className="pt-12 pb-24 bg-gray-100 overflow-hidden">
        <div className="container px-4 mx-auto">
          {/* <div className="justify-center flex-1 max-w-6xl py-5 mx-auto bg-white rounded-2xl">
            <div className="flex flex-wrap items-center justify-center ">
              <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
                <div className="absolute hidden top-5 lg:block left-1/2 ">
                  <span className="mb-3 border-b-2 border-r border-blue-600 w-72 md:block left-1/2 inset-px"></span>
                </div>
                <div className="relative text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-white bg-blue-600 rounded-full shadow-md dark:bg-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-6 h-6 bi bi-check-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                  </span>
                  <h2 className="text-lg font-medium dark:text-gray-400 ">
                    Order information
                  </h2>
                </div>
              </div>
              <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
                <div className="absolute hidden top-5 lg:block left-1/2">
                  <span className="mb-3 border-b-2 border-r border-blue-600 w-72 md:block left-1/2 inset-px"></span>
                </div>
                <div className="relative text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-white bg-blue-600 rounded-full shadow-md ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-6 h-6 bi bi-check-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                  </span>
                  <h2 className="text-lg font-medium ">Payment</h2>
                </div>
              </div>
              <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 md:mb-0">
                <div className="relative text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-white bg-blue-600  rounded-full shadow-md  ">
                    3
                  </span>
                  <h2 className="text-lg font-medium ">Done</h2>
                </div>
              </div>
            </div>
          </div> */}
          <ProcessingBar processing="done" />
        </div>
        <div className="flex items-center mt-10">
          <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto bg-white border rounded-2xl shadow-md md:py-10 md:px-10">
            <div>
              <h1 className="px-4 mb-8 text-2xl font-semibold tracking-wide text-gray-700  ">
                Thank you. Your order has been received.
              </h1>
              <div className="flex border-b border-gray-200  items-stretch justify-start w-full h-full px-4 mb-8 md:flex-row xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex items-start justify-start flex-shrink-0">
                  <div className="flex items-center justify-center w-full pb-6 space-x-4 md:justify-start">
                    <img
                      src="https://i.postimg.cc/RhQYkKYk/pexels-italo-melo-2379005.jpg"
                      className="object-cover w-16 h-16 rounded-md"
                      alt="avatar"
                    />
                    <div className="flex flex-col items-start justify-start space-y-2">
                      <p className="text-lg font-semibold leading-4 text-left text-gray-800 cursor-pointer">
                        Rahul Sharma
                      </p>

                      <p className="text-sm leading-4 cursor-pointer hover:underline text-blue-500 font-medium">
                        rahul@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-wrap items-center py-10 mb-10 border-b border-gray-200">
                <div className="w-full px-4 mb-4 md:w-1/4">
                  <p className="mb-2 text-sm leading-5 text-gray-600  ">
                    Order Tag:
                  </p>
                  <p className="text-base font-medium leading-4 text-blue-600 ">
                    #001
                  </p>
                </div>
                <div className="w-full px-4 mb-4 md:w-1/4">
                  <p className="mb-2 text-sm leading-5 text-gray-600  ">
                    Date:
                  </p>
                  <p className="text-base font-medium leading-4 text-gray-800 ">
                    March 18, 2022
                  </p>
                </div>
                <div className="w-full px-4 mb-4 md:w-1/4">
                  <p className="mb-2 text-sm leading-5 text-gray-600">
                    Payment method:
                  </p>
                  <p className="text-base font-medium leading-4 text-blue-600 ">
                    VISA
                  </p>
                </div>
                <div className="w-full px-4 mb-4 md:w-1/4">
                  <p className="mb-2 text-sm leading-5 text-gray-600  ">
                    Total:
                  </p>
                  <p className="text-base font-medium leading-4 text-green-600">
                    500.000 VND
                  </p>
                </div>
                <div className="w-full px-4 mb-4 md:w-1/4">
                  <p className="mb-2 text-sm leading-5 text-gray-600  ">
                    Delivery method:
                  </p>
                  <p className="text-base font-medium leading-4 text-gray-800">
                    Self Pick Up
                  </p>
                </div>
                <div className="w-full px-4 mb-4 md:w-3/4">
                  <p className="mb-2 text-sm leading-5 text-gray-600  ">
                    Address:
                  </p>
                  <p className="text-base font-medium leading-4 text-gray-800">
                    ABC ABC ABC ABC ABC ABC ABC ABC ABC ABC ABC ABC ABC ABC
                  </p>
                </div>
              </div>
              {/* <div className="px-4 mb-10">
                <div className="flex flex-col items-stretch justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                  <div className="flex flex-col w-full space-y-6 ">
                    <h2 className="mb-2 text-xl font-semibold text-gray-700 ">
                      Order details
                    </h2>
                    <div className="flex flex-col items-center justify-center w-full pb-4 space-y-4 border-b border-gray-200 ">
                      <div className="flex justify-between w-full">
                        <p className="text-base leading-4 text-gray-800 ">
                          Subtotal
                        </p>
                        <p className="text-base leading-4 text-gray-600 ">
                          Rs.1000
                        </p>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-base leading-4 text-gray-800 ">
                          Discount
                        </p>
                        <p className="text-base leading-4 text-gray-600 ">
                          10%
                        </p>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-base leading-4 text-gray-800 ">
                          Shipping
                        </p>
                        <p className="text-base leading-4 text-gray-600 ">
                          Rs.100
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base font-semibold leading-4 text-gray-800 ">
                        Total
                      </p>
                      <p className="text-base font-semibold leading-4 text-gray-600 ">
                        Rs.700
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full px-2 space-y-4 md:px-8 ">
                    <h2 className="mb-2 text-xl font-semibold text-gray-700 ">
                      Shipping
                    </h2>
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-6 h-6 text-blue-600 bi bi-truck"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                          </svg>
                        </div>
                        <div className="flex flex-col items-center justify-start">
                          <p className="text-lg font-semibold leading-6 text-gray-800 ">
                            Delivery
                            <br />
                            <span className="text-sm font-normal">
                              Delivery with 24 Hours
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold leading-6 text-gray-800 ">
                        Rs.50
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="flex items-center justify-center gap-4 px-4 mt-8">
                <Link
                  to="/products"
                  className="w-fit px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 font-semibold"
                >
                  See More Vehicles
                </Link>
                <Link
                  to="/my-orders/1"
                  className="w-fit px-4 py-2 bg-blue-500 rounded-lg text-gray-50 md:w-auto font-semibold hover:bg-blue-600"
                >
                  View Order Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
