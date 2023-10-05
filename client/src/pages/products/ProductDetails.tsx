import { useState, useEffect } from "react";
import { Product } from "../../app/models/Product";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import ReviewProduct from "./ReviewProduct";
import ProductSuggested from "./ProductSuggested";
import Loading from "../../app/components/Loading";
import NotFound from "../../app/errors/NotFound";
import { Vehicle } from "../../app/models/Vehicle";
import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox, initLightboxJS } from "lightbox.js-react";
import ImagesCarousel from "../../app/components/ImagesCarousel";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState<number>();
  const [openSlideShow, setOpenSlideShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  useEffect(() => {
    agent.Vehicle.details(id!)
      .then((product) => setProduct(product))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  //Test carousel images
  const imagesList = [
    "https://vetfarm.vn/wp-content/uploads/2022/11/Anh-meo-dep-998x800.jpg",
    "https://qpet.vn/wp-content/uploads/2023/03/Avatar-cute-meo.jpg",
    "https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2022/7/9/photo1657324993775-1657324993859181735127.jpg",
  ];

  //End of test carousel images

  const handleOpenImage = (index: number) => {
    setOpenImage(index);
  };
  useEffect(() => {
    if (openImage || openImage === 0) {
      setOpenSlideShow(true);
    }
  }, [openImage]);

  if (loading) return <Loading />;
  if (!product) return <NotFound />;
  return (
    <>
      {/* <!-- Features --> */}
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="relative p-6 md:p-16">
          {/* <!-- Grid --> */}
          <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-7 lg:order-2 lg:mr-10">
              {/* <!-- Tab Navs --> */}
              <nav
                className="grid gap-4 mt-5 md:mt-10"
                aria-label="Tabs"
                role="tablist"
              >
                <div className="w-full lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {product.specifications.brandName}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {product.specifications.modelName}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <div className="rating">
                        <input
                          hidden
                          value="star-1"
                          name="star-radio"
                          id="star-1"
                          type="radio"
                        />
                        <label htmlFor="star-1">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                              pathLength="360"
                            ></path>
                          </svg>
                        </label>
                        <input
                          hidden
                          value="star-2"
                          name="star-radio"
                          id="star-2"
                          type="radio"
                        />
                        <label htmlFor="star-2">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                              pathLength="360"
                            ></path>
                          </svg>
                        </label>
                        <input
                          hidden
                          value="star-3"
                          name="star-radio"
                          id="star-3"
                          type="radio"
                        />
                        <label htmlFor="star-3">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                              pathLength="360"
                            ></path>
                          </svg>
                        </label>
                        <input
                          hidden
                          value="star-4"
                          name="star-radio"
                          id="star-4"
                          type="radio"
                        />
                        <label htmlFor="star-4">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                              pathLength="360"
                            ></path>
                          </svg>
                        </label>
                        <input
                          hidden
                          value="star-5"
                          name="star-radio"
                          id="star-5"
                          type="radio"
                        />
                        <label htmlFor="star-5">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                              pathLength="360"
                            ></path>
                          </svg>
                        </label>
                      </div>

                      <span className="text-gray-600 ml-3">4 Reviews</span>
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                  <p className="leading-relaxed">Decription bla bla bla</p>
                  <div className="flex mt-6 items-center pb-2 border-b-2 border-gray-100 mb-5">
                    <div className="flex">
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Size</span>
                      <div className="relative">
                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                          <option>SM</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="flex pt-5">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${product.price}
                    </span>
                    <a
                      href={"/check-out/" + product.id}
                      className="flex ml-auto text-white bg-orange-based border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
                    >
                      Rent now
                    </a>
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </nav>
              {/* <!-- End Tab Navs --> */}
            </div>
            {/* <!-- End Col --> */}

            <div className="lg:col-span-6 lg:col-start-1">
              <div className="relative">
                {/* <!-- Tab Content --> */}
                <div>
                  {/*  lg:pl-48 */}
                  <div className="" aria-labelledby="Images of vehicle">
                    {/* <img
                      className="object-scale-down shadow-xl h-96 w-full  shadow-gray-200 rounded-xl"
                      src={product.images[0].image!}
                      alt="Image Description"
                    /> */}
                    {/* Carousel image */}
                    <ImagesCarousel
                      imagesList={imagesList}
                      openImage={handleOpenImage}
                    />

                    <SlideshowLightbox
                      startingSlideIndex={openImage}
                      className="container grid grid-cols-3 gap-2 mx-auto"
                      showThumbnails={true}
                      open={openSlideShow}
                      onClose={() => {
                        setOpenImage(undefined);
                        setOpenSlideShow(false);
                      }}
                    >
                      {imagesList.map((image, index) => (
                        <img
                          className="w-full rounded hidden"
                          src={image}
                          key={index}
                        />
                      ))}
                    </SlideshowLightbox>
                    {/* End of Carousel image */}
                  </div>
                </div>
                {/* <!-- End Tab Content --> */}

                {/* <!-- SVG Element --> */}

                {/* <!-- End SVG Element --> */}
              </div>
            </div>
            {/* <!-- End Col --> */}
          </div>
          {/* <!-- End Grid --> */}

          {/* <!-- Background Color --> */}
          <div className="absolute inset-0 grid grid-cols-12 w-full h-full">
            <div
              style={{
                zIndex: -1,
              }}
              className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-white/[.075]"
            ></div>
          </div>
          {/* End Background Color */}
        </div>
        <div className="flex bg-gray-100 mt-10 w-fit ">
          <div className="flex text-center items-center text-gray-500 md:pr-2 ">
            <div className="flex justify-center items-center w-20 h-20 pl-2 md:w-32 md:h-32">
              <img
                className="mx-auto my-auto rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="Jese Avatar"
              />
            </div>

            <div className=" w-3/4 flex flex-col text-left">
              <div>
                <h3 className="ml-3 mb-1 text-base font-medium md:text-2xl md:font-bold tracking-tight text-gray-900">
                  <a href="#">Jese Leos</a>
                </h3>
              </div>

              <div className="flex">
                <button className="flex ml-3 md:mt-4 bg-orange-200 hover:bg-orange-400 text-black py-1 px-1 rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white w-4 h-4 md:w-6 md:h-6"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3C7.85113 3 4 5.73396 4 10C4 11.5704 4.38842 12.7289 5.08252 13.6554C5.79003 14.5998 6.87746 15.3863 8.41627 16.0908L9.2326 16.4645L8.94868 17.3162C8.54129 18.5384 7.84997 19.6611 7.15156 20.5844C9.56467 19.8263 12.7167 18.6537 14.9453 17.1679C17.1551 15.6948 18.3969 14.5353 19.0991 13.455C19.7758 12.4139 20 11.371 20 10C20 5.73396 16.1489 3 12 3ZM2 10C2 4.26604 7.14887 1 12 1C16.8511 1 22 4.26604 22 10C22 11.629 21.7242 13.0861 20.7759 14.545C19.8531 15.9647 18.3449 17.3052 16.0547 18.8321C13.0781 20.8164 8.76589 22.2232 6.29772 22.9281C5.48665 23.1597 4.84055 22.6838 4.56243 22.1881C4.28848 21.6998 4.22087 20.9454 4.74413 20.3614C5.44439 19.5798 6.21203 18.5732 6.72616 17.4871C5.40034 16.7841 4.29326 15.9376 3.48189 14.8545C2.48785 13.5277 2 11.9296 2 10Z"
                        fill="#0F0F0F"
                      ></path>
                      <path
                        d="M9 10C9 10.8284 8.32843 11.5 7.5 11.5C6.67157 11.5 6 10.8284 6 10C6 9.17157 6.67157 8.5 7.5 8.5C8.32843 8.5 9 9.17157 9 10Z"
                        fill="#0F0F0F"
                      ></path>
                      <path
                        d="M13.4976 10C13.4976 10.8284 12.826 11.5 11.9976 11.5C11.1692 11.5 10.4976 10.8284 10.4976 10C10.4976 9.17157 11.1692 8.5 11.9976 8.5C12.826 8.5 13.4976 9.17157 13.4976 10Z"
                        fill="#0F0F0F"
                      ></path>
                      <path
                        d="M16.5 11.5C17.3284 11.5 18 10.8284 18 10C18 9.17157 17.3284 8.5 16.5 8.5C15.6716 8.5 15 9.17157 15 10C15 10.8284 15.6716 11.5 16.5 11.5Z"
                        fill="#0F0F0F"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button className="flex ml-1 md:ml-2 md:mt-4 bg-orange-200 hover:bg-orange-400 text-black py-1 px-1 rounded-full">
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M21 22H9M3 22H5.5"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M19 22V15"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M5 22V15"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M11.9999 2H7.47214C6.26932 2 5.66791 2 5.18461 2.2987C4.7013 2.5974 4.43234 3.13531 3.89443 4.21114L2.49081 7.75929C2.16652 8.57905 1.88279 9.54525 2.42867 10.2375C2.79489 10.7019 3.36257 11 3.99991 11C5.10448 11 5.99991 10.1046 5.99991 9C5.99991 10.1046 6.89534 11 7.99991 11C9.10448 11 9.99991 10.1046 9.99991 9C9.99991 10.1046 10.8953 11 11.9999 11C13.1045 11 13.9999 10.1046 13.9999 9C13.9999 10.1046 14.8953 11 15.9999 11C17.1045 11 17.9999 10.1046 17.9999 9C17.9999 10.1046 18.8953 11 19.9999 11C20.6373 11 21.205 10.7019 21.5712 10.2375C22.1171 9.54525 21.8334 8.57905 21.5091 7.75929L20.1055 4.21114C19.5676 3.13531 19.2986 2.5974 18.8153 2.2987C18.332 2 17.7306 2 16.5278 2H16"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 gap-1 items-center pr-2 border-l-2">
            <div className="font-medium text-xs md:text-base ml-2 md:ml-3">
              Product:
              <span className="ml-1 text-orange-based ">2</span>
            </div>
            <div className="font-medium text-xs md:text-base ml-2 md:ml-3">
              Member since:
              <span className="ml-1 text-orange-based ">24-08-2023</span>
            </div>
          </div>
        </div>

        <ProductSuggested />
        <ReviewProduct />
      </div>
      {/* End Features */}
    </>
  );
}
