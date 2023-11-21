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
                <div className="border-l-4 border-orange-based">
                  <span className="pl-2 text-sm text-orange-based uppercase">
                    About us
                  </span>
                  <h1 className="pl-2 text-3xl font-bold border-orange-based md:text-5xl text-gradient">
                    Wellcome to MotorMate!
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
                  <div className="px-4 pl-4 mb-6 border-l-4 border-orange-based">
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
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 border-l-4 border-orange-based">
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
