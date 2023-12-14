import { useSpringCarousel } from "react-spring-carousel";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/ConfigureStore";
import { Vehicle } from "../../app/models/Vehicle";
import AddToCart from "../../app/components/AddToCart";
interface Props {
  products: Vehicle[];
}
export default function ProductHomepage({ products }: Props) {
  if (products.length === 0) return <></>;
  const [currentSlide, setCurrentSlide] = useState(products[0].id);
  const userLogin = useAppSelector((state) => state.account.userDetail);

  const renderRatingSVG = (rating: number) => {
    const ratingInt = Math.floor(rating);
    const ratingDecimal = rating - ratingInt;
    const ratingSVG = [];
    let percentageColor = "";
    if (rating === 0) {
      for (let i = 0; i < 5; i++) {
        ratingSVG.push(
          <svg
            key={i}
            className="w-[2vw] min-w-[6px] md:w-4 md:h-4 lg:w-5 lg:h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="transparent"
            stroke="#a8a7a7"
          >
            <path
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
              pathLength="360"
            ></path>
          </svg>
        );
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if (i < ratingInt) {
          percentageColor = "100%";
        } else {
          percentageColor = ratingDecimal * 100 + "%";
        }
        ratingSVG.push(
          <li key={i}>
            <svg
              className="w-[2vw] min-w-[6px] md:w-4 md:h-4 lg:w-5 lg:h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#a8a7a7"
              strokeWidth="0.5px"
            >
              <defs>
                <linearGradient
                  id={`colorGradient${i}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  {/* set value for color, $.1 -> 10%, $.2 -> 20%... */}
                  <stop offset={percentageColor} stopColor="#ffc73a" />
                  <stop offset="20%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <path
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                pathLength="360"
                fill={`url(#colorGradient${i})`}
              ></path>
            </svg>
          </li>
        );
      }
    }
    return ratingSVG;
  };

  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
    useListenToCustomEvent, //custom hook to listen event when the slide changes
  } = useSpringCarousel({
    autoplay: true,
    itemsPerSlide: 3,
    withLoop: true,
    slideToNextItem: true,
    slideToPrevItem: true,
    initialStartingPosition: "center", // the active slide will be at the center
    gutter: 24, // to add the space between slides
    items: products.map((product) => {
      return {
        ...product,
        renderItem: (
          <div
            className={`card-container items-center sm:flex w-60 mb-8 mx-auto ${
              currentSlide === product.id ? "z-10 scale-150" : ""
            }`}
          >
            <div>
              <Link
                className="group flex flex-col bg-[#1D1D1D]/50 border md:border-2 border-[#FF7E06] shadow-xl rounded-lg md:rounded-2xl hover:shadow-2xl transition"
                key={product.id}
                to={"/product-detail/" + product.id}
              >
                <div className=" flex flex-col">
                  <div className="relative rounded-lg md:rounded-2xl aspect-w-16 aspect-h-9 ">
                    <div className="h-[14vw] max-h-[200px] max-w-[230px]">
                      <img
                        className="object-cover h-full w-full rounded-t-lg md:rounded-t-2xl hover:scale-110 transition-all"
                        src={
                          product.images[0].image
                            ? product.images[0].image
                            : undefined
                        }
                        alt="Image Book"
                      />
                    </div>

                    {userLogin &&
                    userLogin.username.toLowerCase() ===
                      product.owner.username.toLowerCase() ? (
                      <span className="absolute top-2 right-2 font-semibold px-1 z-1 h-fit w-fit text-[12px] shadow-md rounded-sm bg-orange-based text-white flex items-center justify-center">
                        Owner
                      </span>
                    ) : (
                      <AddToCart
                        userLogin={userLogin}
                        vehicle={product}
                        className="absolute cursor top-1 left-[5px] md:top-2 md:left-2 flex items-center justify-center text-white h-[1vw] w-[1vw] md:h-3 md:w-3 lg:h-4 lg:w-4"
                      />
                    )}
                  </div>
                  <div
                    className="flex flex-col items-start justify-start p-1 px-2 md:px-5 md:py-1 h-fit"
                    style={{ lineClamp: 2 }}
                  >
                    <div className="w-full inline-flex items-center justify-between mb-[1vw] sm:mb-[3px]">
                      <div className="flex items-center">
                        <svg
                          className="icon"
                          version="1.0"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 64 64"
                          enableBackground="new 0 0 64 64"
                          xmlSpace="preserve"
                          fill="#000000"
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
                                <path
                                  fill="#171717"
                                  d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M48.087,39h-0.01L32,61L15.923,39 h-0.01C13.469,35.469,10,29.799,10,24c0-12.15,9.85-22,22-22s22,9.85,22,22C54,29.799,50.281,35.781,48.087,39z"
                                ></path>
                                <path
                                  fill="#171717"
                                  d="M32,14c-5.523,0-10,4.478-10,10s4.477,10,10,10s10-4.478,10-10S37.523,14,32,14z M32,32 c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                                ></path>
                                <path
                                  fill="#171717"
                                  d="M32,10c-7.732,0-14,6.268-14,14s6.268,14,14,14s14-6.268,14-14S39.732,10,32,10z M32,36 c-6.627,0-12-5.373-12-12s5.373-12,12-12s12,5.373,12,12S38.627,36,32,36z"
                                ></path>
                              </g>
                              <g>
                                <path
                                  fill="#FF7E06"
                                  d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.522,0-10-4.477-10-10s4.478-10,10-10s10,4.477,10,10S37.522,34,32,34z"
                                ></path>
                                <path
                                  fill="#FF7E06"
                                  d="M32,2c-12.15,0-22,9.85-22,22c0,5.799,3.469,11.469,5.913,15h0.01L32,61l16.077-22h0.01 C50.281,35.781,54,29.799,54,24C54,11.85,44.15,2,32,2z M32,38c-7.732,0-14-6.268-14-14s6.268-14,14-14s14,6.268,14,14 S39.732,38,32,38z"
                                ></path>
                              </g>
                              <path
                                opacity="0.2"
                                fill="#171717"
                                d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.522,0-10-4.477-10-10s4.478-10,10-10s10,4.477,10,10S37.522,34,32,34z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        <p className="card-location uppercase text-white">
                          {product.city.replace(/Thành Phố |Tỉnh /g, "")}
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="card-brand px-[2px] text-center flex items-center justify-center md:px-1 flex-row uppercase text-white rounded-sm bg-orange-based">
                          {product.specifications.brandName}
                        </p>
                      </div>
                    </div>

                    <h3 className="font-medium text-white group-hover:text-orange-based line-clamp-1 text-justify">
                      {product.specifications.modelName}
                    </h3>
                    <div className=" text-[8px] md:text-[10px] font-medium text-gray-300 group-hover:text-orange-based line-clamp-1 text-justify">
                      {product.specifications.color}
                    </div>

                    <ul
                      className={`flex ${product.rating === 0 && "gap-[2px]"}`}
                    >
                      {renderRatingSVG(product.rating)}
                    </ul>
                  </div>

                  <div className="flex items-end md:flex-row">
                    <div className="w-2/3 h-4 pl-2 md:pl-5 md:pb-0 inline-table">
                      <h5 className="font-bold text-gradient inline-block">
                        {product.price.toLocaleString()} VND
                      </h5>
                      <span className="block -mt-[2px] pb-1 md:-mt-1 font-semibold text-gray-500">
                        per day
                      </span>
                    </div>
                    <button className="flex items-center justify-center w-1/3 min-h-[50%] rounded-md md:mb-0 md:w-1/3 md:rounded-xl rounded-tr-none rounded-bl-none md:rounded-tr-none md:rounded-bl-none font-bold text-white transition-all bg-gradient-to-r from-[#FF6003] to-[#FF7E06] hover:brightness-125">
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
      <div className=" py-6 md:py-8 lg:py-10 relative">
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
