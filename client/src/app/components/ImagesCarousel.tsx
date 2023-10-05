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
    if (dots.length > 0) {
      dots[slideIndex - 1 >= dots.length ? 0 : slideIndex - 1].className +=
        " active";
    }
  };

  const remainingImages = imagesList
    .slice(slideIndex)
    .concat(imagesList.slice(0, slideIndex - 1));

  const handleOnClickImage = (index: number) => {
    openImage(index);
  };
  return (
    <>
      <div className="modal rounded-xl">
        <div className="modal-content">
          <div className="relative">
            {imagesList.map((imageUrl, index) => (
              <div
                className="mySlides cursor-pointer"
                key={index}
                onClick={() => handleOnClickImage(index)}
              >
                {imagesList.length > 1 && (
                  <div className="numbertext">
                    {index + 1} / {imagesList.length}
                  </div>
                )}

                <img
                  src={imageUrl}
                  className="object-scale-down shadow-xl h-96 w-full rounded-xl"
                  style={{ width: "100%" }}
                />
              </div>
            ))}
            {imagesList.length > 1 && (
              <>
                <a className="prev" onClick={() => plusSlides(-1)}>
                  <svg
                    className="h-5 w-5"
                    fill="#000000"
                    version="1.1"
                    baseProfile="tiny"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 42 42"
                    xmlSpace="preserve"
                    stroke="#000000"
                    transform="rotate(180)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#fcfcfc"
                      strokeWidth="2.52"
                    >
                      {" "}
                      <polygon
                        fillRule="evenodd"
                        points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "
                      ></polygon>{" "}
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <polygon
                        fillRule="evenodd"
                        points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "
                      ></polygon>{" "}
                    </g>
                  </svg>
                </a>
                <a className="next" onClick={() => plusSlides(1)}>
                  <svg
                    className="h-5 w-5"
                    fill="#000000"
                    version="1.1"
                    baseProfile="tiny"
                    xmlns="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    viewBox="0 0 42 42"
                    xmlSpace="preserve"
                    stroke="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#fcfcfc"
                      strokeWidth="2.52"
                    >
                      {" "}
                      <polygon
                        fillRule="evenodd"
                        points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "
                      ></polygon>{" "}
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <polygon
                        fillRule="evenodd"
                        points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "
                      ></polygon>{" "}
                    </g>
                  </svg>
                </a>
              </>
            )}
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
