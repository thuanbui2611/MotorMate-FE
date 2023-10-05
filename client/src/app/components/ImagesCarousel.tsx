import React, { useEffect, useState } from "react";
import "./../assets/css/imagesCarousel.css";

interface Props {
  imagesList: string[];
  openImage: (index: number) => void;
}
export default function ImagesCarousel({ imagesList, openImage }: Props) {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const plusSlides = (n: number) => {
    let newIndex = slideIndex + n;
    if (newIndex > imagesList.length) {
      newIndex = 1;
    } else if (newIndex < 1) {
      newIndex = imagesList.length;
    }
    setSlideIndex(newIndex);
  };

  const currentSlide = (n: number) => {
    showSlides(n);
  };

  const showSlides = (n: number) => {
    const slides = document.getElementsByClassName(
      "mySlides"
    ) as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName(
      "demo"
    ) as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slides.length);
    } else {
      setSlideIndex(n);
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1 >= dots.length ? 0 : slideIndex - 1].className +=
      " active";
  };

  const remainingImages = imagesList
    .slice(slideIndex)
    .concat(imagesList.slice(0, slideIndex - 1));

  const handleOnClickImage = (index: number) => {
    openImage(index);
  };
  return (
    <>
      <div className="modal rounded-xl  ">
        <div className="modal-content">
          <div className="relative">
            {imagesList.map((imageUrl, index) => (
              <div
                className="mySlides cursor-pointer"
                key={index}
                onClick={() => handleOnClickImage(index)}
              >
                <div className="numbertext">
                  {index + 1} / {imagesList.length}
                </div>
                <img
                  src={imageUrl}
                  className="object-scale-down shadow-xl h-96 w-full rounded-xl"
                  style={{ width: "100%" }}
                />
              </div>
            ))}
            <a className="prev" onClick={() => plusSlides(-1)}>
              &#10094;
            </a>
            <a className="next" onClick={() => plusSlides(1)}>
              &#10095;
            </a>
          </div>

          {remainingImages.length > 0 && (
            <div className="row justify-start flex item-center mt-5 h-24">
              {remainingImages.map((imageUrl, index) => (
                <div key={index} className="column">
                  <img
                    className="demo cursor h-full object-cover"
                    src={imageUrl}
                    style={{ width: "100%" }}
                    onClick={() =>
                      currentSlide(
                        ((slideIndex + index) % imagesList.length) + 1
                      )
                    }
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
