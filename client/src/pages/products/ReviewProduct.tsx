import { useState } from "react";
import AdsReviewProduct from "../../app/components/AdsReviewProduct";
import ImageReview from "../../app/components/ImageReview";

export default function ReviewProduct() {
  const [openImage, setOpenImage] = useState(false);
  const handleOpenImage = () => setOpenImage((cur: any) => !cur);

  const imgURL =
    "https://i.ibb.co/xfg5T5T/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1.png";
  const imgURL2 =
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80";
  return (
    <>
      {/* Ads */}
      <AdsReviewProduct />

      {/* End Ads */}
      <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-3/4 space-y-8">
          <div className="flex justify-start items-start">
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 ">
              Reviews (69)
            </p>
          </div>
          {/* Review Start */}
          <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-3">
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
                  <div className="mt-6 flex flex-row justify-start items-start space-x-4">
                    <button
                      className="h-20 w-20 md:h-40 md:w-44 py-1 px-1 bg-gray-100 flex items-center justify-center"
                      onClick={handleOpenImage}
                    >
                      <img src={imgURL} className="mx-auto" />
                    </button>
                    <button
                      className="py-1 px-2 bg-gray-100 h-40 w-44 flex items-center justify-center"
                      onClick={handleOpenImage}
                    >
                      <img src={imgURL2} className="mx-auto" />
                    </button>
                  </div>
                  {openImage && (
                    <ImageReview
                      src={imgURL2 as string}
                      onClose={handleOpenImage}
                    />
                  )}
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
