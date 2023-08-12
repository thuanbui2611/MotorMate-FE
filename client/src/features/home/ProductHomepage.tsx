import { useState } from "react";
import { Cart } from "../../app/models/cart";
import { Product } from "../../app/models/product";
interface Props {
  product: Product;
}

export default function ProductHomepage({ product }: Props) {
  const [loading, setLoading] = useState(false);

  function handleAddItem(cart: Cart) {
    cart.userId = 3;
    setLoading(true);
  }
  return (
    <>
      <div className="items-center sm:flex max-w-lg">
        <div>
          <a
            className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition"
            href={"/book-detail/" + product.id}
          >
            <div className="relative aspect-w-16 aspect-h-9">
              <img
                className="object-scale-down h-80 rounded-t-xl hover:scale-110 transition-all"
                style={{ width: "100vw" }}
                src={product.image}
                alt="Image Book"
              />
              <button
                className="absolute top-0 left-0 p-3 bg-blue-500 rounded-l-none hover:bg-blue-600 rounded-b-xl"
                // onClick={handleAddItem}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-4 md:p-5 min-h-[128px]" style={{ lineClamp: 2 }}>
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
                  {product.category}
                </p>
              </div>

              <h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-white line-clamp-1 text-justify">
                {product.title}
              </h3>
            </div>

            <div className="flex">
              <div className="w-2/3 px-5 pb-3">
                <p className="text-lg font-bold text-blue-500 dark:text-blue-300">
                  100.000 VND
                </p>
                <span className="block -mt-1 text-xs font-semibold text-gray-400 ">
                  per day
                </span>
              </div>
              <button className="flex-1 text-base font-bold text-white transition-all bg-blue-500 rounded-r-none hover:bg-blue-600 rounded-t-xl">
                Renting
              </button>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
