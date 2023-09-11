import { step } from "@material-tailwind/react";

type processingOption = "checkout" | "payment" | "done";

interface Props {
  processing: processingOption;
}

export default function ProcessingBar({ processing }: Props) {
  let step1: JSX.Element | null = null;
  let step2: JSX.Element | null = null;
  let step3: JSX.Element | null = null;
  let doneSvg: JSX.Element = (
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
  );

  if (processing === "checkout") {
    step1 = null;
    step2 = null;
    step3 = null;
  }
  if (processing === "payment") {
    step1 = doneSvg;
    step2 = null;
    step3 = null;
  }
  if (processing === "done") {
    step1 = doneSvg;
    step2 = doneSvg;
    step3 = doneSvg;
  }
  return (
    <>
      <div className="justify-center flex-1 max-w-6xl py-5 mx-auto bg-white shadow-md rounded-2xl">
        {/* <div className="flex flex-wrap justify-center px-20 pb-12 mb-16 text-left border-b border-gray-200 dark:border-gray-700 lg:justify-between ">
                <div className="px-4 mb-6 lg:mb-0">
                  <h2 className="mb-1 text-lg font-semibold tracking-wide dark:text-gray-300">
                    Your order has been Shipped
                  </h2>
                  <p className="text-sm text-gray-500    ">
                    by DHFL on 10th feb, 2022
                  </p>
                </div>
                <div className="px-4">
                  <button className="w-full px-4 py-2 text-blue-500 border border-blue-500 rounded-full md:w-auto hover:text-gray-100 hover:bg-blue-600 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-300">
                    Tracking details
                  </button>
                </div>
              </div> */}
        <div className="flex flex-wrap items-center justify-center ">
          <div className="relative w-full px-4 mb-16 md:w-1/3 lg:w-1/4 md:mb-0">
            <div className="absolute hidden top-5 md:block left-1/2 ">
              <span
                className={`mb-3 border-b-2 border-r w-72 md:block left-1/2 inset-px ${
                  step1 === null ? "border-gray-300" : "border-blue-600"
                }`}
              ></span>
            </div>

            {/* <div className="relative text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 bg-blue-600 rounded-full shadow-md dark:bg-blue-400">
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
                  <h2 className="text-lg font-medium     ">
                    Order information
                  </h2>
                </div> */}
            <div className="relative text-center">
              <span className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg rounded-full shadow-md text-white bg-blue-600">
                {step1 === null ? "1" : step1}
              </span>
              <h2 className="text-lg font-medium">Order information</h2>
            </div>
          </div>
          <div className="relative w-full px-4 mb-16 md:w-1/3 lg:w-1/4 md:mb-0">
            <div className="absolute hidden top-5 md:block left-1/2">
              <span
                className={`mb-3 border-b-2 border-r w-72 md:block left-1/2 inset-px ${
                  step2 === null ? "border-gray-300" : "border-blue-600"
                }`}
              ></span>
            </div>
            <div className="relative text-center">
              <span
                className={`inline-flex items-center justify-center w-10 h-10 mb-8 text-lg rounded-full shadow-md ${
                  step1 === null
                    ? "text-black bg-gray-200"
                    : "text-white bg-blue-600"
                }`}
              >
                {step2 === null ? "2" : step2}
              </span>
              <h2 className="text-lg font-medium">Payment</h2>
            </div>
          </div>
          <div className="relative w-full px-4 md:w-1/3 lg:w-1/4 ">
            <div className="relative text-center">
              <span
                className={`inline-flex items-center justify-center w-10 h-10 mb-8 text-lg rounded-full shadow-md ${
                  step2 === null
                    ? "text-black bg-gray-200"
                    : "text-white bg-blue-600"
                }`}
              >
                {step3 === null ? "3" : step3}
              </span>
              <h2 className="text-lg font-medium">Done</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
