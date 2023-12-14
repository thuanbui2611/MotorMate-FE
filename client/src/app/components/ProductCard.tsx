import { Link } from "react-router-dom";
import { Vehicle } from "../models/Vehicle";
import { UserDetail } from "../models/User";
import AddToCart from "./AddToCart";

interface Props {
  product: Vehicle;
  userLogin: UserDetail | null;
}

export default function ProductCard({ product, userLogin }: Props) {
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
            className="w-[2vw] min-w-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
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
              className="w-[2vw] min-w-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
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

  return product.isLocked ? (
    <></>
  ) : (
    <>
      <Link
        to={"/product-detail/" + product.id}
        className="hover:brightness-90 border border-gray-300 bg-white rounded-md max-w-[19rem] w-full shadow-lg"
      >
        <div className="relative bg-white rounded-md rounded-b-none">
          {userLogin &&
            userLogin.username.toLowerCase() ===
              product.owner.username.toLowerCase() && (
              <span className="absolute top-0 right-0 font-semibold px-1 z-1 h-fit w-fit text-[12px] shadow-md rounded-sm bg-orange-based text-white flex items-center justify-center">
                Owner
              </span>
            )}
          <div>
            <img
              src={product.images[0].image!}
              alt=""
              className="object-cover w-full h-56 mx-auto rounded-md rounded-b-none"
            />
          </div>
        </div>
        <div className="p-3 ">
          <div style={{ display: "inline-flex" }}>
            <svg
              viewBox="0 0 1024 1024"
              className="iconLocation mr-1"
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
            <p className="text-xs uppercase text-gray-600 dark:text-gray-400">
              {product.city.replace(/Thành Phố |Tỉnh /g, "")}
            </p>
          </div>
          <div className="flex-col items-center justify-between">
            <h3 className="text-xl font-bold line-clamp-1 text-black">
              {product.specifications.modelName}
            </h3>
            <h2 className=" text-gray-700 font-semibold">
              {product.specifications.brandName}
            </h2>
          </div>
          <ul className="flex pb-1 items-center">
            <li className="text-sm font-semibold -mb-[2px] mr-1 text-[#ffc73a]">
              {product.rating}{" "}
            </li>
            {renderRatingSVG(product.rating)}
          </ul>
          <p className="text-lg">
            <span className="text-green-600">
              ${product.price.toLocaleString()}{" "}
            </span>
          </p>
        </div>

        <div className="flex justify-end items-center p-4 border-t border-gray-300">
          <AddToCart
            userLogin={userLogin}
            vehicle={product}
            className="flex items-center justify-center text-gray-500 h-5 w-5 hover:text-blue-600"
          />
        </div>
      </Link>
    </>
  );
}
