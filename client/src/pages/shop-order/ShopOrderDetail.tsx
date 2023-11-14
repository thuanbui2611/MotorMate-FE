export default function ShopOrderDetail() {
  const data = ["1", "2", "3", "4", "5"];
  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start items-start space-y-2">
            <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Order #13432
            </h1>
            <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
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
            <div className="flex flex-col justify-start items-start bg-gray-50 border border-gray-100 rounded-lg shadow-md px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full max-h-[30rem] scrollbar overflow-auto">
              {/* Item start */}
              {data.map((item, index) => (
                <>
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-center  md:space-x-6 xl:space-x-8 w-full">
                    <div className="flex justify-center items-center pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-[150px] h-[150px] md:w-full md:h-full md:block rounded-lg shadow-md"
                        src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                        alt="dress"
                      />
                    </div>
                    <div className="flex justify-start items-center border-b border-gray-200 md:flex-row flex-col w-fit md:w-full pb-8 space-y-4 md:space-y-0">
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
                      <div className="w-full md:w-1/4 flex justify-end space-x-8 items-end">
                        <p className="text-base xl:text-lg font-semibold leading-6 text-black">
                          $36.00
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-center flex-col md:flex-rowitems-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col justify-end items-end px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 rounded-lg shadow-md space-y-6">
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
          <div className="bg-gray-50 h-fit w-full rounded-lg shadow-md border border-gray-100 xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      David Kent
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center text-gray-800 md:justify-start items-start py-4 border-b border-gray-200 w-full">
                  <div className="flex space-x-2">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill-rule="evenodd"
                          clipRule="evenodd"
                          d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                          fill="#080341"
                        ></path>
                      </g>
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 text-blue-500 hover:underline">
                      david89@gmail.com
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                          fill="#1C274C"
                        ></path>
                      </g>
                    </svg>
                    <p className="cursor-pointer text-sm leading-5">
                      0999.999.999
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-8">
          <div className="text-center bg-red-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md shadow-red-900/30 cursor-pointer hover:brightness-90">
            Deny order
          </div>
          <div className="text-center bg-green-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md shadow-green-900/30 cursor-pointer hover:brightness-90">
            Accept order
          </div>
        </div>
      </div>
    </>
  );
}
