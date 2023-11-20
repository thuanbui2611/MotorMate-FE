import { Link } from "react-router-dom";
import ConfirmDeleteDialog from "../../app/components/ConfirmDeleteDialog";
import { useState } from "react";
import ReviewFormDialog from "../../app/components/ReviewFormDialog";

export default function OrderDetail() {
  const [isOpenConfirmCancelDialog, setIsOpenConfirmCancelDialog] =
    useState(false);
  const [isOpenReviewDialog, setIsOpenReviewDialog] = useState(false);
  const data = ["1", "2", "3", "4", "5"];

  // Hover to see
  let hoverTimer: ReturnType<typeof setTimeout>;
  function startHoverTimer(idDiv: string) {
    hoverTimer = setTimeout(() => showMessage(idDiv), 300);
  }

  function resetHoverTimer(idDiv: string) {
    clearTimeout(hoverTimer);
    hideMessage(idDiv);
  }

  function showMessage(idDiv: string): void {
    const hiddenDiv = document.getElementById(idDiv) as HTMLElement;
    hiddenDiv.classList.remove("hidden");
  }
  function hideMessage(idDiv: string): void {
    const hiddenDiv = document.getElementById(idDiv) as HTMLElement;
    hiddenDiv.classList.add("hidden");
  }
  const handleCloseReviewDialog = () => {
    setIsOpenReviewDialog(false);
  };
  const handleCloseConfirmCancelDialog = () => {
    setIsOpenConfirmCancelDialog(false);
  };
  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start items-start space-y-2">
            <h1 className="text-3xl   lg:text-4xl font-semibold leading-7 lg:leading-9 text-black">
              Order #13432
            </h1>
            <p className="text-base dark:text-gray-500 font-medium leading-6 text-gray-600">
              21st Mart 2021 at 10:34 PM
            </p>
          </div>
          <div className=" font-bold text-blue-600 w-fit h-fit p-2  bg-blue-200 rounded-full">
            Pending
          </div>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            {/* <p className="text-lg md:text-xl   font-semibold leading-6 xl:leading-5 text-black">
              Customer’s Cart
            </p> */}
            <div className="flex flex-col justify-start items-start rounded-lg shadow-md bg-gray-50 border border-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full max-h-[30rem] scrollbar overflow-auto">
              {/* Shop information */}
              <div className="flex items-center justify-start mb-4">
                <Link to={"/profile/" + ""} className="w-fit rounded p-2 pl-0">
                  <div className="flex items-center no-underline hover:underline text-black ">
                    {/* img size 32x32 */}
                    <img
                      alt="Placeholder"
                      className="block rounded-full h-8 w-8"
                      src="https://images2.thanhnien.vn/Uploaded/phucndh/2023_01_15/z4040523388756-c00d06cee10967450c92ab5ef4b703af-8795.jpg"
                    />
                    <div className="ml-2 text-sm font-bold">Shop name</div>
                  </div>
                </Link>
              </div>
              {/* Item start */}
              <div className="w-full h-fit bg-white rounded-lg">
                {data.map((item, index) => (
                  <div
                    className="relative mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-center md:space-x-6 xl:space-x-8 w-[95%] mx-4"
                    key={index}
                  >
                    <div className="absolute top-0 right-0 font-bold text-blue-600 w-fit h-fit p-1 bg-blue-200 rounded-full text-xs sm">
                      Pending
                    </div>
                    <div className="flex justify-center items-center pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-[150px] h-[150px] md:w-full md:h-full md:block rounded-lg"
                        src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                        alt="dress"
                      />
                    </div>
                    <div className="flex justify-start items-center border-b border-gray-100 md:flex-row flex-col w-fit md:w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full md:w-1/2 flex flex-col justify-start items-start space-y-2">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-black">
                          Premium Quaility Dress
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">Brand: </span>{" "}
                            Italic Minimal Design
                          </p>
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">Color: </span> Small
                          </p>
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">
                              License plates:{" "}
                            </span>
                            Light Blue
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 flex flex-col justify-center items-start space-y-8">
                        <div className="flex justify-center items-end flex-col space-y-2">
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">From: </span>
                            13/11/2023
                          </p>
                          <p className="text-sm leading-none text-black">
                            <span className="text-gray-500">To: </span>
                            13/11/2023
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 flex flex-col items-center justify-center md:flex-row md:justify-end md:items-center">
                        <p className="text-base xl:text-lg font-semibold leading-6 text-green-600">
                          $36.00
                        </p>
                        <div className="relative">
                          {/* <svg
                            className="h-5 w-5 text-[#fa0000] hover:text-[#e00000] cursor-pointer ml-0 md:ml-3"
                            fill="currentColor"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 493.456 493.456"
                            xmlSpace="preserve"
                            stroke="#fa0000"
                            onClick={() => setIsOpenConfirmCancelDialog(true)}
                            onMouseEnter={() =>
                              startHoverTimer(index.toString())
                            }
                            onMouseLeave={() =>
                              resetHoverTimer(index.toString())
                            }
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
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
                          </svg> */}

                          <svg
                            className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 ml-0 md:ml-3"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            viewBox="0 0 256 256"
                            xmlSpace="preserve"
                            onClick={() => setIsOpenReviewDialog(true)}
                            onMouseEnter={() =>
                              startHoverTimer(index.toString())
                            }
                            onMouseLeave={() =>
                              resetHoverTimer(index.toString())
                            }
                          >
                            <defs></defs>
                            <g
                              style={{
                                stroke: "none",
                                strokeWidth: 0,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "none",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                            >
                              <path
                                d="M 56.398 44.393 H 5.083 C 2.276 44.393 0 42.117 0 39.31 V 16.523 c 0 -2.807 2.276 -5.083 5.083 -5.083 h 79.834 c 2.807 0 5.083 2.276 5.083 5.083 V 39.31 c 0 2.807 -2.276 5.083 -5.083 5.083 H 56.398"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 0,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "none",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                              />
                              <path
                                d="M 62.471 53.722 h -0.257 c -0.993 0 -1.872 0.5 -2.396 1.262 v -1.007 c 0 -1.603 -1.304 -2.907 -2.907 -2.907 h -0.257 c -0.993 0 -1.872 0.5 -2.396 1.262 v -0.237 c 0 -1.603 -1.304 -2.907 -2.907 -2.907 h -0.258 c -0.993 0 -1.871 0.5 -2.395 1.262 v -7.293 c 0 -1.603 -1.304 -2.907 -2.908 -2.907 h -0.257 c -1.603 0 -2.907 1.304 -2.907 2.907 v 14.408 l -2.083 1.581 c -1.183 0.898 -1.933 2.205 -2.111 3.679 c -0.179 1.474 0.237 2.922 1.172 4.078 l 5.596 6.918 v 2.969 c 0 1.113 0.906 2.018 2.018 2.018 H 60.69 c 1.113 0 2.018 -0.906 2.018 -2.018 v -2.837 c 1.722 -2.048 2.67 -4.637 2.67 -7.302 V 56.63 C 65.379 55.027 64.074 53.722 62.471 53.722 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(255,205,172)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                              />
                              <path
                                d="M 46.145 18.552 l 1.899 3.848 c 0.186 0.377 0.545 0.638 0.961 0.698 l 4.247 0.617 c 1.047 0.152 1.465 1.439 0.707 2.177 l -3.073 2.995 c -0.301 0.293 -0.438 0.716 -0.367 1.13 l 0.725 4.23 c 0.179 1.043 -0.916 1.838 -1.852 1.345 l -3.798 -1.997 c -0.372 -0.195 -0.816 -0.195 -1.188 0 l -3.798 1.997 c -0.936 0.492 -2.031 -0.303 -1.852 -1.345 l 0.725 -4.23 c 0.071 -0.414 -0.066 -0.836 -0.367 -1.13 l -3.073 -2.995 c -0.758 -0.738 -0.34 -2.025 0.707 -2.177 l 4.247 -0.617 c 0.416 -0.06 0.775 -0.322 0.961 -0.698 l 1.899 -3.848 C 44.324 17.603 45.676 17.603 46.145 18.552 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(255,188,83)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                              />
                              <path
                                d="M 18.68 18.552 L 20.58 22.4 c 0.186 0.377 0.545 0.638 0.961 0.698 l 4.247 0.617 c 1.047 0.152 1.465 1.439 0.707 2.177 l -3.073 2.995 c -0.301 0.293 -0.438 0.716 -0.367 1.13 l 0.725 4.23 c 0.179 1.043 -0.916 1.838 -1.852 1.345 l -3.798 -1.997 c -0.372 -0.195 -0.816 -0.195 -1.188 0 l -3.798 1.997 c -0.936 0.492 -2.031 -0.303 -1.852 -1.345 l 0.725 -4.23 c 0.071 -0.414 -0.066 -0.836 -0.367 -1.13 l -3.073 -2.995 c -0.758 -0.738 -0.34 -2.025 0.707 -2.177 l 4.247 -0.617 c 0.416 -0.06 0.775 -0.322 0.961 -0.698 l 1.899 -3.848 C 16.86 17.603 18.212 17.603 18.68 18.552 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(255,188,83)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                              />
                              <path
                                d="M 73.609 18.552 l 1.899 3.848 c 0.186 0.377 0.545 0.638 0.961 0.698 l 4.247 0.617 c 1.047 0.152 1.465 1.439 0.707 2.177 l -3.073 2.995 c -0.301 0.293 -0.438 0.716 -0.367 1.13 l 0.725 4.23 c 0.179 1.043 -0.916 1.838 -1.852 1.345 l -3.798 -1.997 c -0.372 -0.195 -0.816 -0.195 -1.188 0 l -3.798 1.997 c -0.936 0.492 -2.031 -0.303 -1.852 -1.345 l 0.725 -4.23 c 0.071 -0.414 -0.066 -0.836 -0.367 -1.13 l -3.073 -2.995 c -0.758 -0.738 -0.34 -2.025 0.707 -2.177 l 4.247 -0.617 c 0.416 -0.06 0.775 -0.322 0.961 -0.698 l 1.899 -3.848 C 71.788 17.603 73.14 17.603 73.609 18.552 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(255,188,83)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                              />
                            </g>
                          </svg>

                          <div
                            id={index.toString()}
                            className="absolute bg-gray-100 rounded-lg md:-top-4 md:-left-8 text-xs text-center w-[120px] font-medium shadow hidden"
                          >
                            Cancel this vehicle
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center flex-col md:flex-rowitems-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col justify-end items-end px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6 rounded-lg shadow-md border border-gray-100">
                {/* <h3 className="text-xl   font-semibold leading-5 text-black">
                  Summary
                </h3> */}
                {/* <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base   leading-4 text-black">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-500 leading-4 text-gray-600">
                      $56.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base   leading-4 text-black">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-black leading-3 text-black">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-500 leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base   leading-4 text-black">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-500 leading-4 text-gray-600">
                      $8.00
                    </p>
                  </div>
                </div> */}
                <div className="flex justify-between items-center w-fit gap-4">
                  <p className="text-xl   font-bold leading-4 text-black">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-500 font-semibold leading-4 text-gray-600">
                    $36.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl   font-semibold leading-5 text-black">
              Bill
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base   font-semibold leading-4 text-left text-black">
                      David Kent
                    </p>
                    <p className="text-sm dark:text-gray-500 leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-black   md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <img
                    className="dark:hidden"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                    alt="email"
                  />
                  <img
                    className="hidden dark:block"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                    alt="email"
                  />
                  <p className="cursor-pointer text-sm leading-5 ">
                    david89@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base   font-semibold leading-4 text-center md:text-left text-black">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-500 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base   font-semibold leading-4 text-center md:text-left text-black">
                      Billing Address
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-500 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex items-center justify-center space-x-4 mt-8">
          <div className="text-center bg-red-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md cursor-pointer shadow-red-900/30  hover:brightness-90">
            Cancel Order
          </div>
          <div className="text-center bg-green-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md cursor-pointer shadow-green-900/30 hover:brightness-90">
            Pay Order
          </div>
        </div>
      </div>
      {isOpenConfirmCancelDialog && (
        <ConfirmDeleteDialog
          actionName="Comfirm Cancel a Vehicle"
          objectName="Vehicle ABC"
          cancelDelete={handleCloseConfirmCancelDialog}
          content="Are you sure to cancel the vehicle:"
        />
      )}
      {isOpenReviewDialog && (
        <ReviewFormDialog onClose={handleCloseReviewDialog} />
      )}
    </>
  );
}
