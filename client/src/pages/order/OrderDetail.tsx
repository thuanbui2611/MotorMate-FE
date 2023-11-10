export default function OrderDetail() {
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
            {/* <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p> */}
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full max-h-[30rem] scrollbar overflow-auto">
              {/* Item start */}
              {data.map((item, index) => (
                <>
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start md:space-x-6 xl:space-x-8 w-full">
                    <div className="flex justify-center items-center pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-[40vw] h-[40vw] md:w-full md:h-full md:block rounded-lg"
                        src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                        alt="dress"
                      />
                    </div>
                    <div className="flex justify-between items-start border-b border-gray-200 md:flex-row flex-col w-fit md:w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          Premium Quaility Dress
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Brand:{" "}
                            </span>{" "}
                            Italic Minimal Design
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Color:{" "}
                            </span>{" "}
                            Small
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              License plates:{" "}
                            </span>
                            Light Blue
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-8 items-end w-full">
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          $36.00
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-center flex-col md:flex-rowitems-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col justify-end items-end px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                {/* <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3> */}
                {/* <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      $56.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      $8.00
                    </p>
                  </div>
                </div> */}
                <div className="flex justify-between items-center w-fit gap-4">
                  <p className="text-xl dark:text-white font-bold leading-4 text-black">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    $36.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
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
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      David Kent
                    </p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
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
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address
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
          <div className="text-center bg-red-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md cursor-pointer hover:brightness-90">
            Deny order
          </div>
          <div className="text-center bg-green-600 w-fit h-fit p-2 px-3 rounded-full text-white font-bold shadow-md cursor-pointer hover:brightness-90">
            Accept order
          </div>
        </div>
      </div>
    </>
  );
}
