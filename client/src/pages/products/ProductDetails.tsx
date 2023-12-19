import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import ReviewProduct from "./ReviewProduct";
import ProductSuggested from "./ProductSuggested";
import Loading from "../../app/components/Loading";
import NotFound from "../../app/errors/NotFound";
import { Vehicle } from "../../app/models/Vehicle";
import "lightbox.js-react/dist/index.css";
import { SlideshowLightbox } from "lightbox.js-react";
import ImagesCarousel from "../../app/components/ImagesCarousel";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { setIsOpenChat, setStartChatToUser } from "../chat/ChatSlice";
import AddToCart from "../../app/components/AddToCart";
import { ConvertToDateStr } from "../../app/utils/ConvertDatetimeToStr";
import { setSelectedVehicle } from "../cart/CartSlice";
import { Shop } from "../../app/models/Cart";
import FadeInSection from "../../app/components/FadeInSection";
import { toast } from "react-toastify";
import ChooseDateRentDialog from "../../app/components/ChooseDateRentDialog";
import { scrollToTop } from "../../app/utils/ScrollToTop";
import { productSelectors } from "./ProductSlice";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState<number>();
  const [openSlideShow, setOpenSlideShow] = useState(false);
  const [isOpenRentNow, setIsOpenRentNow] = useState(false);

  const productDetails = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const userLogin = useAppSelector((state) => state.account.userDetail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.scrollY > 0) {
      scrollToTop();
    }
  }, []);

  useEffect(() => {
    if (productDetails) {
      setProduct(productDetails);
      setLoading(false);
      scrollToTop();
    }
  }, [productDetails]);

  useEffect(() => {
    if (!id) return;
    if (productDetails && productDetails.id !== id) {
      setLoading(true);
      agent.Vehicle.details(id!)
        .then((product) => {
          setProduct(product);
          setLoading(false);
        })
        .catch((error) => console.log(error));
      scrollToTop();
    } else if (!productDetails) {
      setLoading(true);
      agent.Vehicle.details(id!)
        .then((product) => {
          setProduct(product);
          setLoading(false);
        })
        .catch((error) => console.log(error));
      scrollToTop();
    }
  }, [id]);

  const handleOpenImage = (index: number) => {
    setOpenImage(index);
  };
  useEffect(() => {
    if (openImage || openImage === 0) {
      setOpenSlideShow(true);
    }
  }, [openImage]);

  const handleClickChat = (username: any) => {
    dispatch(setIsOpenChat(true));
    dispatch(setStartChatToUser(username));
  };

  const handleClickRentNow = () => {
    setIsOpenRentNow(true);
  };

  const handleCloseRentNow = () => {
    setIsOpenRentNow(false);
  };

  const handleCheckOut = (dateFrom: Date, dateTo: Date) => {
    if (!product) return;
    if (!userLogin) {
      toast.error("Please login to rent!");
      navigate("/login");
      return;
    }
    if (!dateFrom || !dateTo) {
      toast.error("Please choose date to rent");
      return;
    }

    const vehicleRent: Shop[] = [
      {
        lessorId: product.owner.ownerId,
        lessorName: product.owner.name,
        lessorImage: product.owner.picture,
        vehicles: [
          {
            vehicleId: product.id,
            vehicleName: product.specifications.modelName,
            brand: product.specifications.brandName,
            color: product.specifications.color,
            price: product.price.toString(),
            address: product.address,
            licensePlate: product.licensePlate,
            image: product.images[0].image!,
            pickUpDateTime: dateFrom,
            dropOffDateTime: dateTo,
            unavailableDates: product.unavailableDates,
          },
        ],
      },
    ];

    dispatch(setSelectedVehicle(vehicleRent));
    navigate("/check-out", { state: { vehicleCheckout: vehicleRent } });
  };
  const renderRatingSVG = () => {
    if (!product?.rating) return;
    if (product.rating === 0) return <></>;
    const ratingInt = Math.floor(product.rating);
    const ratingDecimal = product.rating - ratingInt;

    const ratingSVG = [];
    let percentageColor = "";
    for (let i = 0; i < 5; i++) {
      if (i < ratingInt) {
        percentageColor = "100%";
      } else {
        percentageColor = ratingDecimal * 100 + "%";
      }
      ratingSVG.push(
        <li key={i}>
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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

    return ratingSVG;
  };

  return loading ? (
    <Loading />
  ) : !product ||
    product?.isLocked ||
    product?.status.toLowerCase() !== "approved" ? (
    <NotFound />
  ) : (
    <>
      <div className="mx-auto w-full bg-white">
        <FadeInSection options="fade-in-scale">
          <div className="relative max-w-[1420px] p-6 md:p-16 shadow-lg rounded-xl mx-5 lg:mx-auto mt-12">
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
                    <h2 className="text-sm text-gray-500 font-normal tracking-widest">
                      {product.specifications.brandName}
                    </h2>
                    <h1 className="text-black text-3xl md:text-4xl font-bold mb-1">
                      {product.specifications.modelName}
                    </h1>

                    <div className="flex mb-4 items-center justify-start">
                      <span className="flex items-center">
                        <ul className="flex pb-1">
                          <li className="text-[#ffc73a] text-2xl font-semibold mr-2">
                            {product.rating}
                          </li>
                          {renderRatingSVG()}
                        </ul>

                        <span className="text-gray-600 ml-3">
                          {product.totalRating} Reviews
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-start gap-7 font-semibold">
                      <div className="flex items-center justify-start">
                        <span className="font-semibold">Condition:</span>
                        <span className="ml-2 text-orange-based">
                          {product.conditionPercentage}%
                        </span>
                      </div>
                      <div className="flex items-center justify-start font-semibold">
                        <span className="font-semibold">Year:</span>
                        <span className="ml-2 text-orange-based">
                          {product.specifications.year}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start justify-start mt-2 font-semibold">
                      <span className="font-semibold">Address:</span>
                      <span className="ml-2 text-orange-based">
                        {product.address}
                      </span>
                    </div>
                    <div className="flex mt-6 items-center pb-2 border-b-2 border-gray-100 mb-5">
                      <div className="flex">
                        <span className="mr-2 font-semibold">Color</span>
                        <div
                          className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
                          style={{
                            backgroundColor: product.specifications.hexCode,
                          }}
                        ></div>
                      </div>
                    </div>
                    <hr></hr>

                    {product.owner.ownerId === userLogin?.id ? (
                      <p className="text-right font-semibold text-red-600 text-xs md:text-sm pt-2">
                        You can not rent your own product!
                      </p>
                    ) : (
                      <div className="flex pt-5">
                        <span className="font-bold text-lg sm:text-2xl text-green-500">
                          {product.price.toLocaleString()} VND
                        </span>
                        <div
                          onClick={handleClickRentNow}
                          className={`flex py-2 px-2 md:px-6 cursor-pointer ml-auto text-white text-sm sm:text-xl bg-orange-based border-0 shadow-md focus:outline-none hover:bg-orange-600 font-semibold rounded ${
                            product.owner.ownerId === userLogin?.id &&
                            " pointer-events-none bg-gray-400"
                          }`}
                        >
                          Rent now
                        </div>

                        <button className="rounded-full w-7 h-7 sm:w-10 sm:h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                          <AddToCart
                            className="h-5 w-5 sm:h-7 sm:w-7"
                            userLogin={userLogin}
                            vehicle={product}
                          />
                        </button>
                      </div>
                    )}
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
                        imagesList={product.images.map((image) => image.image!)}
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
                        {product.images.map((image, index) => (
                          <img
                            className="w-full rounded hidden"
                            src={image.image || undefined}
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
                  zIndex: 1,
                }}
                className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-white/[.075]"
              ></div>
            </div>
            {/* End Background Color */}
          </div>
        </FadeInSection>

        <FadeInSection options="fade-in-scale">
          {/* Shop information */}
          <div className="flex bg-white border border-gray-200 mt-10 w-fit rounded-2xl shadow-lg mx-auto">
            <div className="flex text-center justify-center items-center text-gray-500 md:pr-2 ">
              <Link
                to={"/profile/" + product.owner.username}
                className="flex justify-center items-center w-20 h-20 pl-2 md:w-32 md:h-32"
              >
                <img
                  className="mx-auto my-auto rounded-full shadow-lg cursor-pointer"
                  src={
                    product.owner.picture
                      ? product.owner.picture
                      : require("../../app/assets/images/icon/user.png")
                  }
                  alt="Shop Avatar"
                />
              </Link>

              <div className="w-fit inline-flex flex-col text-left pl-3">
                <h3 className="mr-2 mb-1 text-base font-medium md:text-2xl md:font-bold tracking-tight text-gray-900 hover:text-blue-600 line-clamp-2">
                  <Link to={"/profile/" + product.owner.username}>
                    {product.owner.name}
                  </Link>
                </h3>

                <div className="flex">
                  <button
                    className="flex md:mt-4 bg-orange-200 hover:bg-orange-400 text-black py-1 px-1 rounded-full"
                    onClick={() => handleClickChat(product.owner.username)}
                  >
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
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2 md:p-4 gap-2 md:gap-3 justify-center items-start border-l-2">
              <div className="flex-col md:flex md:gap-2">
                <div className="font-medium text-xs md:text-base">
                  Product:
                  <span className="ml-1 text-orange-based">2</span>
                </div>
                <div className="mt-2 md:mt-0 font-medium text-xs md:text-base">
                  Member since:
                  <span className="ml-1 text-orange-based">
                    {ConvertToDateStr(product.owner.createdDate)}
                  </span>
                </div>
              </div>

              <div className="font-medium text-xs md:text-base">
                Address:
                <span className="ml-1 text-orange-based">
                  {product.owner.address}
                </span>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection options="fade-in-scale">
          <ProductSuggested vehicle={product} />
        </FadeInSection>
        <FadeInSection options="fade-in-scale">
          <ReviewProduct vehicle={product} />
        </FadeInSection>
      </div>
      {isOpenRentNow && (
        <ChooseDateRentDialog
          datesDisableRent={product.unavailableDates}
          action={(dateFrom: Date, dateTo: Date) =>
            handleCheckOut(dateFrom, dateTo)
          }
          onClose={handleCloseRentNow}
        />
      )}
    </>
  );
}
