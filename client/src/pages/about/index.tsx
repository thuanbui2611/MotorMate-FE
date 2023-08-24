export default function About() {
  return (
    <>
      <section className="flex items-center py-10 bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg"
                  alt=""
                  className="relative z-40 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded"
                />
                <div className="absolute z-10 hidden w-full h-full bg-blue-400 rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
              </div>
            </div>
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="relative">
                <h1 className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden">
                  About Us
                </h1>
                <h1 className="pl-2 text-3xl font-bold border-l-8 border-blue-400 md:text-5xl dark:text-white">
                  Welcome to our site
                </h1>
              </div>
              <p className="mt-6 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor
                sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniamLorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor
              </p>
              <a
                href="#"
                className="px-4 py-3 text-gray-50 transition-all transform bg-blue-400 rounded-[80px] hover:bg-blue-500 dark:hover:text-gray-100 dark:text-gray-100 "
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 lg:py-20 bg-stone-100 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="lg:max-w-md">
                <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                  <span className="text-sm text-gray-600 uppercase dark:text-gray-400">
                    Who we are?
                  </span>
                  <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                    About Us
                  </h1>
                </div>
                <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam Lorem ipsum dolor sit amet.
                </p>
                <div className="flex flex-wrap items-center">
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="w-10 h-10"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                          <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                        </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                        2097
                      </p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">
                        Projects and Plans
                      </h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="w-10 h-10"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path
                            fillRule="evenodd"
                            d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                          />
                          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                        3,590
                      </p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">
                        Helped people
                      </h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="w-10 h-10"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                        74
                      </p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">
                        Volunteer
                      </h2>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <span className="text-blue-500 dark:text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="w-10 h-10"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                        </svg>
                      </span>
                      <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">
                        100
                      </p>
                      <h2 className="text-sm text-gray-700 dark:text-gray-400">
                        Timing
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <img
                src="https://i.postimg.cc/9MW8G96J/pexels-the-coach-space-2977565.jpg"
                alt=""
                className="relative z-40 object-cover w-full h-full rounded"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <span className="text-xs font-semibold text-blue-400 uppercase">
                Who we are
              </span>
              <h2 className="mt-2 mb-6 text-2xl font-bold dark:text-gray-300">
                We are the large business expert in Europe and Asia
              </h2>
              <p className="mb-10 text-gray-600 dark:text-gray-400 ">
                Lorem ipsum dolor sit amet, consectetur domino act Lorem ipsum
                dolor sit amet, consectetur domino act Lorem ipsum dolor sit
                amet, consectetur domino act
              </p>
              <a
                href="#"
                className="px-4 py-3 text-gray-100 uppercase transition-all transform bg-blue-400 rounded hover:bg-blue-500 dark:hover:bg-blue-500 dark:hover:text-gray-50 dark:text-gray-100 hover:text-gray-100"
              >
                About Us
              </a>
            </div>
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/kGjX7T1M/pexels-andrea-piacquadio-3756679.jpg"
                  alt="aboutimage"
                  className="relative z-10 object-cover w-full h-full rounded"
                />

                <div className="absolute hidden w-full h-full bg-blue-400 rounded -bottom-6 left-6 lg:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 lg:h-screen">
        <div className="px-4 py-20 mx-auto max-w-7xl">
          <div className="flex flex-wrap">
            <div className="relative w-full mb-10 lg:mb-0 lg:mr-20 lg:w-2/5">
              <div className="absolute z-10 hidden w-full h-full bg-blue-400 rounded -top-6 left-6 lg:block"></div>
              <img
                className="relative z-20 object-cover w-full h-full rounded"
                src="https://i.postimg.cc/y8Y7CDZn/pexels-hammad-khalid-1786433.jpg"
                alt=""
              />
            </div>
            <div className="flex-1 pl-0 lg:pl-4">
              <div className="mb-12">
                <div className="relative">
                  <h1 className="absolute -top-14 -left-44 text-[120px] font-bold opacity-5">
                    {" "}
                    FEATURE
                  </h1>
                  <h1 className="text-5xl font-bold dark:text-white">
                    {" "}
                    Our <span className="text-blue-500">Features</span>{" "}
                  </h1>
                  <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
                    <div className="flex-1 h-2 bg-blue-200"></div>
                    <div className="flex-1 h-2 bg-blue-400"></div>
                    <div className="flex-1 h-2 bg-blue-600"></div>
                  </div>
                </div>
                <p className="mb-16 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Delectus magni eius eaque? Pariatur numquam, odio quod nobis
                  ipsum ex cupiditate? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Amet, cum.
                </p>
              </div>
              <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                <div className="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                  <div className="inline-block p-4 mb-4 bg-blue-400 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="text-white"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.5 5a.5.5 0 0 1 1 0v1.5H10a.5.5 0 0 1 0 1H8.5V9a.5.5 0 0 1-1 0V7.5H6a.5.5 0 0 1 0-1h1.5V5z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {" "}
                    Power Shields{" "}
                  </h3>
                </div>
                <div className="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                  <div className="inline-block p-4 mb-4 bg-blue-400 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {" "}
                    Power Cogs{" "}
                  </h3>
                </div>
                <div className="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                  <div className="inline-block p-4 mb-4 bg-blue-400 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="text-white"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.5 5a.5.5 0 0 1 1 0v1.5H10a.5.5 0 0 1 0 1H8.5V9a.5.5 0 0 1-1 0V7.5H6a.5.5 0 0 1 0-1h1.5V5z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {" "}
                    Power Shields{" "}
                  </h3>
                </div>
                <div className="w-full p-8 text-center transition-all bg-white rounded shadow dark:bg-gray-700 hover:shadow-lg">
                  <div className="inline-block p-4 mb-4 bg-blue-400 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {" "}
                    Power Cogs{" "}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
