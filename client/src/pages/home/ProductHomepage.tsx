import { Product } from "../../app/models/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useSpringCarousel } from 'react-spring-carousel'
import { useState } from "react";
interface Props {
  products: Product[];
}
export default function ProductHomepage({ products }: Props) {
  const mockItems = [
    {
        id: 'item-1',
        title: 'slide 1'
    },
    {
        id: 'item-2',
        title: 'slide 2'
    },
    {
        id: 'item-3',
        title: 'slide 3'
    }
]
const [currentSlide, setCurrentSlide] = useState(mockItems[0].id)

const {
    carouselFragment,
    slideToPrevItem, // go back to previous slide
    slideToNextItem, // move to next slide
    useListenToCustomEvent //custom hook to listen event when the slide changes
} = useSpringCarousel({
    itemsPerSlide: 3, // number of slides per view
    withLoop: true, // will loop
    initialStartingPosition: 'center', // the active slide will be at the center
    gutter: 24, // to add the space between slides
    items: mockItems.map((item) => {
        return {
            ...item,
            renderItem: (
                <div
                    className={`grid aspect-[2] w-full place-items-center text-2xl text-white transition-all duration-700 ${currentSlide === item.id
                        ? 'z-10 scale-150 bg-yellow-600'
                        : 'bg-violet-500'
                        }`}>
                    {item.title}
                </div>
            )
        }
    })
})

useListenToCustomEvent((event:any) => {
    if (event.eventName === 'onSlideStartChange') {
        setCurrentSlide(event?.nextItem?.id)
    }
})
  return (
    <>
<div className="py-20 relative">
            <button onClick={slideToPrevItem} className="absolute top-1/2 -translate-y-1/2 -translate-x-full left-[10%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="mx-auto w-[80%] overflow-x-clip py-[4%] relative">
                {carouselFragment}
            </div>
            <button onClick={slideToNextItem} className="absolute top-1/2 -translate-y-1/2 translate-x-full right-[10%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>

     
    </>
  );
}
