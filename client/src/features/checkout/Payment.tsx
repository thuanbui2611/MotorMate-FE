export default function Payment() {
  return (
    <>
      <section className="pt-12 pb-24 bg-blue-100 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="justify-center flex-1 max-w-6xl py-5 mx-auto bg-white rounded-2xl">
            <div className="flex flex-wrap items-center justify-center ">
              <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
                <div className="absolute hidden top-5 lg:block left-1/2 ">
                  <span className="mb-3 border-b-2 border-r border-blue-600 w-72 md:block left-1/2 dark:border-blue-400 inset-px"></span>
                </div>
                <div className="relative text-center">
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
                  <h2 className="text-lg font-medium dark:text-gray-400 ">
                    Order information
                  </h2>
                </div>
              </div>
              <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 lg:mb-0">
                <div className="absolute hidden top-5 lg:block left-1/2">
                  <span className="mb-3 border-b-2 border-r border-gray-300 w-72 md:block left-1/2 inset-px"></span>
                </div>
                <div className="relative text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-100 bg-blue-600 rounded-full shadow-md dark:bg-blue-400">
                    2
                  </span>
                  <h2 className="text-lg font-medium dark:text-gray-400">
                    Payment
                  </h2>
                </div>
              </div>
              <div className="relative w-full px-4 mb-16 md:w-1/2 lg:w-1/4 md:mb-0">
                <div className="relative text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 mb-8 text-lg text-gray-700 bg-gray-200 rounded-full shadow-md dark:text-gray-400 dark:bg-gray-700">
                    3
                  </span>
                  <h2 className="text-lg font-medium dark:text-gray-400">
                    Done
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
