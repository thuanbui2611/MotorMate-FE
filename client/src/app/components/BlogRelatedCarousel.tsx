import { useSpringCarousel } from "react-spring-carousel";
import { useEffect, useState } from "react";
import BlogRelatedCard from "./BlogRelatedCard";

export default function BlogRelatedCarousel() {
  const blogsRelated = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 1100) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
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
        blogsRelated.length < itemsPerSlide
          ? blogsRelated.length
          : itemsPerSlide,
      withLoop: true,
      gutter: 24,
      items: blogsRelated.map((blog) => {
        return {
          ...blogsRelated,
          renderItem: <BlogRelatedCard />,
        };
      }),
    });

  return (
    <div className="relative">
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
