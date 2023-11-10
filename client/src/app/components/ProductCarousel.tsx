import { useSpringCarousel } from "react-spring-carousel";
import { Vehicle } from "../models/Vehicle";
import { UserDetail } from "../models/User";
import ProductCard from "../../pages/products/ProductCard";
import { useEffect, useState } from "react";

interface Props {
  products: Vehicle[];
  userLogin: UserDetail | null;
}
export default function ProductCarousel({ products, userLogin }: Props) {
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
      autoplay: true,
      slideToNextItem: true,
      slideToPrevItem: true,
      itemsPerSlide:
        products.length < itemsPerSlide ? products.length : itemsPerSlide,
      withLoop: true,
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
  );
}
