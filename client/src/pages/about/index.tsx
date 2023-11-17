import FadeInSection from "../../app/components/FadeInSection";

export default function About() {
  return (
    <>
      <FadeInSection options="fade-in-scale">
        <section className="flex items-center xl:h-screen">
          <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap ">
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                <div className="relative">
                  <img
                    src="https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg"
                    alt=""
                    className="relative md:z-20 z-0 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded"
                  />
                  <div className="absolute z-10 hidden w-full h-full bg-white bg-opacity-20 rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
                </div>
              </div>
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                <div className="relative">
                  <h1 className="absolute -top-20  left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold opacity-5 md:block hidden">
                    About Us
                  </h1>
                  <h1 className="pl-2 text-3xl font-bold border-l-8 border-orange-based md:text-5xl text-gradient">
                    Welcome to our site
                  </h1>
                </div>
                <p className="mt-6 mb-10 text-base leading-7 text-gray-200 ">
                  MotorMate is a self-ride motorcycle rental platform. Our
                  platform connects people who have high-quality motorcycles for
                  rent with those who want an excellent rental experience. Our
                  platform provides an easy-to-use interface for users to search
                  for and book the ideal motorcycle rental based on their needs
                  and preferences.
                </p>
                <a
                  href="#"
                  className="px-4 py-3 text-gray-50 transition-all transform bg-gradient-to-r from-[#FF6003] to-[#FF7E06] rounded-full font-semibold hover:brightness-125"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection options="fade-in-scale">
        <section className="py-10 lg:py-20">
          <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap ">
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                <div className="lg:max-w-md">
                  <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                    <span className="text-sm text-orange-based uppercase">
                      About us
                    </span>
                    <h1 className="mt-2 text-3xl font-black text-gradient md:text-5xl">
                      Missions
                    </h1>
                  </div>
                  <p className="px-4 mb-2 text-base leading-7 text-gray-200">
                    MotorMate's goal is to provide a simple and user-friendly
                    application that allows users to select the type of bike
                    they want to rent and connect with reputable rental service
                    providers.
                  </p>
                  <p className="px-4 mb-2 text-base leading-7 text-gray-200">
                    MotorMate provides travelers with the peace of mind that
                    they are renting from reputable providers and can enjoy
                    their travels without worry.
                  </p>
                  <p className="px-4 mb-10 text-base leading-7 text-gray-200">
                    Our mission is to be a leading platform for outstanding
                    motorcycle rental services. Our mission is to provide users
                    with an outstanding experience by providing them with a
                    platform to connect with high-quality motorcycles for rent.
                  </p>
                  <div className="flex flex-wrap items-center">
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-white ">
                        <span className="text-blue-500 ">
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
                        <p className="mt-4 mb-2 text-3xl font-bold text-gray-700  ">
                          2097
                        </p>
                        <h2 className="text-sm text-gray-700  ">
                          Projects and Plans
                        </h2>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-white ">
                        <span className="text-blue-500 ">
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
                        <p className="mt-4 mb-2 text-3xl font-bold text-gray-700  ">
                          3,590
                        </p>
                        <h2 className="text-sm text-gray-700  ">
                          Helped people
                        </h2>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-white ">
                        <span className="text-blue-500 ">
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
                        <p className="mt-4 mb-2 text-3xl font-bold text-gray-700">
                          74
                        </p>
                        <h2 className="text-sm text-gray-700">Volunteer</h2>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-white ">
                        <span className="text-blue-500 ">
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
                        <p className="mt-4 mb-2 text-3xl font-bold text-gray-700  ">
                          100
                        </p>
                        <h2 className="text-sm text-gray-700  ">Timing</h2>
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
      </FadeInSection>
      <FadeInSection options="fade-in-scale">
        <section className="flex items-center xl:h-screen pb-20">
          <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap ">
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                <span className="text-sm text-orange-based uppercase  ">
                  About us
                </span>
                <h2 className="mt-2 text-3xl font-black text-gradient md:text-5xl mb-10">
                  Vission
                </h2>
                <p className="mb-10 text-gray-200">
                  Our vision is to be acknowledged as the leading platform for
                  self-ride motorcycle rentals, with an emphasis on quality,
                  customer service, and innovation. We intend to expand our
                  platform to new locations and continuously improve our
                  offerings in order to provide motorcycle riders in Vietnam
                  with an exclusive rental experience. MotorMate also intend to
                  expand our service by providing car rental service.
                </p>
              </div>
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                <div className="relative">
                  <img
                    src="https://i.postimg.cc/kGjX7T1M/pexels-andrea-piacquadio-3756679.jpg"
                    alt="aboutimage"
                    className="relative z-10 object-cover w-full h-full rounded"
                  />

                  <div className="absolute hidden w-full h-full bg-white bg-opacity-20 rounded -bottom-6 left-6 lg:block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
