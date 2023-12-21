import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Vehicle } from "../../app/models/Vehicle";
import { useEffect, useState } from "react";
import { Review } from "../../app/models/Review";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import {
  getReviewsProductAsync,
  reviewProductsSelectors,
  setReviewProductParams,
} from "./ReviewProductSlice";
import Loading from "../../app/components/Loading";
import LoaderButton from "../../app/components/LoaderButton";

interface Props {
  vehicle: Vehicle;
}

export default function ReviewProduct({ vehicle }: Props) {
  const [reviews, setReviews] = useState<Review[]>();

  const dispatch = useAppDispatch();

  const { reviewProductLoaded, reviewProductParams, metaData } = useAppSelector(
    (state) => state.reviewProduct
  );
  const reviewsFromState = useAppSelector((state) =>
    reviewProductsSelectors.selectById(state, vehicle.id)
  );

  useEffect(() => {
    if (reviewsFromState) {
      setReviews(reviewsFromState.reviewProduct);
    }
  }, [reviewsFromState]);

  useEffect(() => {
    if (!vehicle || reviewProductLoaded) return;
    if (
      reviewsFromState &&
      reviewsFromState.reviewProduct[0].vehicleId !== vehicle.id
    ) {
      dispatch(getReviewsProductAsync(vehicle.id));
    } else if (!reviewsFromState) {
      dispatch(getReviewsProductAsync(vehicle.id));
    }
  }, [reviewProductParams, dispatch, vehicle]);

  const renderRatingSVG = (rating: number) => {
    const ratingSVG = [];
    let colorSVG = "";
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        colorSVG = "#ffc73a";
      } else {
        colorSVG = "#d1d1cd";
      }
      ratingSVG.push(
        <li>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill={colorSVG}
          >
            <path
              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
              pathLength="360"
            ></path>
          </svg>
        </li>
      );
    }
    return ratingSVG;
  };

  return !metaData ? (
    <Loading />
  ) : (
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
          {reviews?.map((review) => (
            <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-3 rounded-2xl">
              <div className="mx-2">
                <div className="md:block">
                  <div className="mt-6 flex justify-start items-start flex-row space-x-2.5">
                    <div>
                      <img
                        src={review.avatar}
                        alt="user-avatar"
                        className="mb-5 rounded-full h-12 w-12 min-w-[48px]"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-2 mt-1">
                      <p className="text-base font-semibold leading-none text-gray-800 ">
                        {review.username}
                      </p>
                      <p className="text-sm leading-none font-medium text-gray-600 ">
                        {review.createdAt &&
                          new Date(review.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                      </p>
                      <div className="flex flex-col sm:flex-row cursor-pointer mt-2 md:mt-0">
                        <ul className="flex pb-1">
                          {renderRatingSVG(review.rating)}
                        </ul>
                        <div className="text-gradient ml-0 mt-0 sm:ml-2 font-bold sm:-mt-1 text-base md:text-lg">
                          {review.rating === 1
                            ? "Very Bad"
                            : review.rating === 2
                            ? "Bad"
                            : review.rating === 3
                            ? "Normal"
                            : review.rating === 4
                            ? "Good"
                            : "Excellent"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-start items-start flex-col bg-gray-50 md:px-8 py-8 pt-2">
                  <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-row justify-between items-start">
                      <p className="text-lg md:text-2xl font-bold leading-normal text-gray-800 dark:text-white">
                        {review.title}
                      </p>
                    </div>
                  </div>
                  <div className="md:block">
                    <p className="mt-3 text-sm md:text-base font-medium leading-normal text-gray-700 w-full">
                      {review.content}
                    </p>
                    <div className="mt-6 flex justify-start items-start space-x-4 max-w-full h-20 overflow-x-auto">
                      <SlideshowLightbox
                        className="flex gap-4 h-20 w-full"
                        showThumbnails={true}
                      >
                        {review.images.map((image, index) => (
                          <img
                            className="rounded h-20 w-full border border-gray-300 shadow-md"
                            src={image || undefined}
                            key={index}
                          />
                        ))}
                      </SlideshowLightbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <>
            {reviews &&
            reviews.length > 0 &&
            metaData.totalItemCount > reviews.length ? (
              <div
                className="flex items-center justify-center mx-auto w-24 h-7 text-blue-500 hover:text-blue-700 cursor-pointer text-sm lg:text-base border border-blue-500 rounded-xl px-2 hover:bg-blue-400"
                onClick={() =>
                  dispatch(
                    setReviewProductParams({
                      pageSize: reviewProductParams.pageSize + 5,
                    })
                  )
                }
              >
                {reviewProductLoaded ? <LoaderButton /> : <span>See more</span>}
              </div>
            ) : (
              <></>
            )}
          </>
          {/* Review End */}
        </div>
      </div>
    </>
  );
}
