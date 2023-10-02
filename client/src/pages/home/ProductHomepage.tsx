import { Product } from "../../app/models/Product";
import { useSpringCarousel } from "react-spring-carousel";
import { useState } from "react";
import { Link } from "react-router-dom";
interface Props {
  products: Product[];
}
export default function ProductHomepage({ products }: Props) {
  const [currentSlide, setCurrentSlide] = useState(products[0].id);

  const {
    carouselFragment,
    slideToPrevItem, // go back to previous slide
    slideToNextItem, // move to next slide
    useListenToCustomEvent, //custom hook to listen event when the slide changes
  } = useSpringCarousel({
    autoplay: true,

    itemsPerSlide: 3, // number of slides per view
    withLoop: true, // will loop
    initialStartingPosition: "center", // the active slide will be at the center
    gutter: 24, // to add the space between slides
    items: products.map((product) => {
      return {
        ...product,
        renderItem: (
          //   <div
          //     className={`grid aspect-[2] w-full place-items-center text-2xl text-white transition-all duration-700 ${
          //       currentSlide === product.id
          //         ? "z-10 scale-150 bg-yellow-600"
          //         : "bg-violet-500"
          //     }`}
          //   >
          //     "awd"
          //   </div>
          <div
            className={`card-container items-center sm:flex w-60 mb-8 mx-auto ${
              currentSlide === product.id ? "z-10 scale-150" : ""
            }`}
          >
            <div>
              <Link
                className="group flex flex-col bg-[#1D1D1D]/50 border md:border-2 border-[#FF3D00] shadow-xl rounded-lg md:rounded-2xl hover:shadow-2xl transition"
                key={product.id}
                to={"/product-detail/" + product.id}
              >
                <div className=" flex flex-col">
                  <div className="relative rounded-2xl aspect-w-16 aspect-h-9 ">
                    <img
                      className="object-scale-down max-h-40 w-full rounded-t-xl hover:scale-110 transition-all"
                      src="https://purepng.com/public/uploads/large/purepng.com-motorcyclemotorcyclemotorbikebikecycleracing-bike-1701527509882zcnub.png"
                      alt="Image Book"
                    />
                    <button
                      className="absolute top-1 left-[5px] md:top-2 md:left-2"
                      // onClick={handleAddItem}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="text-gray-200 hover:text-red-600 h-2 w-2 md:h-3 md:w-3 "
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div
                    className="p-1 px-2 md:px-5 md:py-1 h-fit"
                    style={{ lineClamp: 2 }}
                  >
                    <div className="w-full inline-flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          viewBox="0 0 1024 1024"
                          className="icon mr-[1px] md:mr-1 h-1 w-1 md:h-3 md:w-3 "
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#000000"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M522.24 81.984a308.288 308.288 0 0 0-308.352 308.352c0 224.96 308.352 461.632 308.352 461.632s85.056-65.6 165.888-160.256a22.4 22.4 0 0 0-15.744-38.4 22.016 22.016 0 0 0-17.152 8.512l-0.064-0.064 74.496-109.376 3.52 2.176a21.568 21.568 0 0 0-3.968 11.968 22.4 22.4 0 0 0 22.4 22.464 22.272 22.272 0 0 0 20.992-15.36c33.92-58.56 57.92-121.216 57.92-183.232A308.224 308.224 0 0 0 522.24 81.984z"
                              fill=""
                            ></path>
                            <path
                              d="M716.864 620.416m-22.4 0a22.4 22.4 0 1 0 44.8 0 22.4 22.4 0 1 0-44.8 0Z"
                              fill=""
                            ></path>
                            <path
                              d="M522.24 126.784a263.808 263.808 0 0 0-263.552 263.552c0 163.008 191.168 341.824 263.552 403.648 72.384-61.824 263.552-240.64 263.552-403.648A263.872 263.872 0 0 0 522.24 126.784z m0 432.576a172.032 172.032 0 1 1 0-344.064 172.032 172.032 0 0 1 0 344.064z"
                              fill="#F15D43"
                            ></path>
                            <path
                              d="M522.24 387.328m-127.168 0a127.168 127.168 0 1 0 254.336 0 127.168 127.168 0 1 0-254.336 0Z"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="M186.304 936.384m-22.4 0a22.4 22.4 0 1 0 44.8 0 22.4 22.4 0 1 0-44.8 0Z"
                              fill=""
                            ></path>
                            <path
                              d="M263.04 913.984a22.464 22.464 0 0 0-22.4 22.4v0.064c0 12.288 10.112 22.4 22.4 22.4h595.2c12.288 0 22.4-10.048 22.4-22.4v-0.064a22.464 22.464 0 0 0-22.4-22.4h-595.2z"
                              fill=""
                            ></path>
                            <path
                              d="M292.8 359.36a16 16 0 0 1-15.744-18.816c25.6-144 153.28-183.616 158.656-185.216a16 16 0 0 1 9.152 30.656c-4.672 1.408-114.24 35.968-136.384 160.192a16 16 0 0 1-15.68 13.184z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </svg>
                        <p className="card-location uppercase text-white">
                          Ho chi minh
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="card-brand flex-row uppercase text-white rounded-sm px-1 bg-orange-based justify-end">
                          Honda
                        </p>
                      </div>
                    </div>

                    <h3 className="font-medium text-white group-hover:text-orange-based line-clamp-1 text-justify">
                      Wave RSX
                    </h3>
                    <div className=" text-[8px] md:text-[10px] font-medium text-gray-400 group-hover:text-orange-based line-clamp-1 text-justify">
                      Black
                    </div>

                    <ul className="flex">
                      <li>
                        <svg
                          className="w-[2vw] md:w-4 md:h-4 lg:w-5 lg:h-5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#ffc73a"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          className="w-[2vw] md:w-4 md:h-4 lg:w-5 lg:h-5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#ffc73a"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          className="w-[2vw] md:w-4 md:h-4 lg:w-5 lg:h-5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#ffc73a"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          className="w-[2vw] md:w-4 md:h-4 lg:w-5 lg:h-5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#ffc73a"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        <svg
                          className="w-[2vw] md:w-4 md:h-4 lg:w-5 lg:h-5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id="colorGradient"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="0"
                            >
                              {/* set value for color, $.1 -> 10%, $.2 -> 20%... */}
                              <stop offset="20%" stopColor="#ffc73a" />
                              <stop offset="20%" stopColor="#ffffff" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                            fill="url(#colorGradient)"
                          ></path>
                        </svg>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-end md:flex-row">
                    <div className="w-2/3 h-4 pl-2 md:pl-5 md:pb-0 inline-table">
                      <h5 className="font-bold text-gradient inline-block">
                        100.000 VND
                      </h5>
                      <span className="block -mt-[2px] pb-1 md:-mt-1 font-semibold text-gray-500">
                        per day
                      </span>
                    </div>
                    <button className="w-1/3 h-1/2 rounded-md md:text-sm md:mb-0 md:w-1/3 md:rounded-xl rounded-tr-none rounded-bl-none md:rounded-tr-none md:rounded-bl-none font-bold text-white transition-all bg-gradient-to-r from-[#FF6003] to-[#FF7E06] hover:brightness-125">
                      Rent Now
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ),
      };
    }),
  });

  useListenToCustomEvent((event: any) => {
    if (event.eventName === "onSlideStartChange") {
      setCurrentSlide(event?.nextItem?.id);
    }
  });

  return (
    <>
      <div className="py-10 relative">
        <button
          onClick={slideToPrevItem}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-full left-[5%] md:left-[10%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 md:w-10 md:h-10 text-orange-based stroke-orange-based stroke-2 hover:brightness-75"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="mx-auto w-[80%] overflow-x-clip py-[4%] relative">
          {carouselFragment}
        </div>
        <button
          onClick={slideToNextItem}
          className="absolute top-1/2 -translate-y-1/2 translate-x-full right-[5%] md:right-[10%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 md:w-10 md:h-10 text-orange-based stroke-orange-based stroke-2 hover:brightness-75"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
