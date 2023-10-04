import { Link } from "react-router-dom";
import { Product } from "../../app/models/Product";
import { Vehicle } from "../../app/models/Vehicle";
import { store } from "../../app/store/ConfigureStore";
import { User } from "../../app/models/User";

interface Props {
  product: Vehicle;
  userLogin: User | null;
}

export default function ProductCard({ product, userLogin }: Props) {
  return (
    <>
      <Link
        to={"/product-detail/" + product.id}
        className="hover:brightness-90 border border-gray-300 bg-white rounded-md w-full shadow-lg"
      >
        <div className="relative bg-white">
          {userLogin &&
            userLogin.username.toLowerCase() ===
              product.owner.username.toLowerCase() && (
              <span className="absolute top-0 right-0 font-semibold px-1 z-1 h-fit w-fit text-[12px] shadow-md rounded-sm bg-orange-based text-white flex items-center justify-center">
                Owner
              </span>
            )}
          <a href={"/product-detail/" + product.id}>
            <img
              src={product.images[0].image!}
              alt=""
              className="object-cover w-full h-56 mx-auto rounded-md rounded-b-none"
            />
          </a>
        </div>
        <div className="p-3 ">
          <div style={{ display: "inline-flex" }}>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 1024 1024"
              className="icon mr-1 mt-1"
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
            <p className="mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
              {product.specifications.brandName}
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium  line-clamp-1">
              {product.specifications.modelName}
            </h3>
          </div>
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
          <p className="text-lg">
            <span className="text-green-600">
              ${product.price.toLocaleString()}{" "}
            </span>
          </p>
        </div>
        <div className="flex justify-between p-4 border-t border-gray-300 ">
          <a
            href={"/product-detail" + product.id}
            className="text-gray-500  hover:text-orange-500 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-500  hover:text-orange-500 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-4 h-4 bi bi-cart3 "
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
            </svg>
          </a>
        </div>
      </Link>
    </>
  );
}
