import { useSpringCarousel } from "react-spring-carousel";
import { Vehicle } from "../models/Vehicle";
import { UserDetail } from "../models/User";
import ProductCard from "../../pages/products/ProductCard";
import { useEffect, useState } from "react";
import "../assets/css/ProductCarousel.css";

interface Props {
  products: Vehicle[];
  userLogin: UserDetail | null;
}
export default function ProductCarousel({ products, userLogin }: Props) {
  if (products.length === 0)
    return (
      <p className="flex items-center justify-center h-40 text-red-500 w-full bg-gray-100 rounded-lg my-10">
        No related vehicle found.
      </p>
    );

  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 850) {
        setItemsPerSlide(2);
      } else if (window.innerWidth <= 1100) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      autoplay: products.length < itemsPerSlide ? false : true,
      slideToNextItem: products.length < itemsPerSlide ? false : true,
      slideToPrevItem: products.length < itemsPerSlide ? false : true,
      itemsPerSlide:
        products.length < itemsPerSlide ? products.length : itemsPerSlide,
      withLoop: products.length < itemsPerSlide ? false : true,
      gutter: 24,
      items: products.map((product) => {
        return {
          ...products,
          renderItem: (
            <ProductCard
              key={product.id}
              product={product}
              userLogin={userLogin}
            />
          ),
        };
      }),
    });
  return (
    <div className="relative">
      {products.length > itemsPerSlide && (
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
      )}

      <div className="mx-auto w-[80%] overflow-x-clip py-[4%] relative">
        {carouselFragment}
      </div>
      {products.length > itemsPerSlide && (
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
      )}
    </div>
  );
}
