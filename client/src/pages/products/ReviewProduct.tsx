import AdsReviewProduct from "../../app/components/AdsReviewProduct";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Vehicle } from "../../app/models/Vehicle";
import { useEffect, useState } from "react";
import { Review } from "../../app/models/Review";
import agent from "../../app/api/agent";

interface Props {
  vehicle: Vehicle;
}

export default function ReviewProduct({ vehicle }: Props) {
  const [review, setReview] = useState<Review[]>([]);
  //after have id entity by vehicleId, will check if in state exist or not -> get review by vehicleId

  useEffect(() => {}, []);
  const images = [
    {
      src: "https://source.unsplash.com/sQZ_A17cufs/549x711",
    },
    {
      src: "https://source.unsplash.com/rsAeSMzOX9Y/768x512",
    },
    {
      src: "https://source.unsplash.com/Z6SXt1v5tP8/768x512",
    },
    {
      src: "https://source.unsplash.com/sQZ_A17cufs/549x711",
    },
  ];

  return (
    <>
      {/* Ads */}
      {/* <AdsReviewProduct /> */}

      {/* End Ads */}
      <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-3/4 space-y-8">
          <div className="flex justify-start items-start">
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 ">
              Reviews ({vehicle.totalRating})
            </p>
          </div>
          {/* Review Start */}

          <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-3 rounded-2xl">
            <div className="mx-2">
              <div className="md:block">
                <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                  <div>
                    <img
                      src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                      alt="user-avatar"
                      className="mb-5"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-2">
                    <p className="text-base font-medium leading-none text-gray-800 ">
                      Anna Kendrick
                    </p>
                    <p className="text-sm leading-none text-gray-600 ">
                      14 July 2021
                    </p>
                    <div className="cursor-pointer mt-2 md:mt-0">
                      <ul className="flex pb-1">
                        <li>
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
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
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
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
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
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
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
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
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#ffc73a"
                          >
                            <path
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                              pathLength="360"
                            ></path>
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-start items-start flex-col bg-gray-50 md:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between w-full">
                  <div className="flex flex-row justify-between items-start">
                    <p className="text-lg md:text-2xl font-bold leading-normal text-gray-800 dark:text-white">
                      Comfortable and minimal, just how I like it!
                    </p>
                  </div>
                </div>
                <div className="md:block">
                  <p className="mt-3 text-sm md:text-base font-medium leading-normal text-gray-700 w-full">
                    This style relies more on neutral colors with little to no
                    embellishment on furniture. Lighter fabrics, such as silk
                    and cotton, are popular, as are lighter colors in wood and
                    metal.
                  </p>
                  <div className="mt-6 flex justify-start items-start space-x-4 max-w-full overflow-auto">
                    <SlideshowLightbox
                      className="flex gap-4 h-20 w-full"
                      showThumbnails={true}
                    >
                      {images.map((image, index) => (
                        <img
                          className="rounded h-full w-full border border-gray-300 shadow-md"
                          src={image.src || undefined}
                          key={index}
                        />
                      ))}
                    </SlideshowLightbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Review End */}
        </div>
      </div>
    </>
  );
}
