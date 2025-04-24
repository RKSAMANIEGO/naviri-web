//npm install keen-slider

import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../style/Gallery.css";
import foto1 from "../../../assets/image/carru1.jpg";
import foto2 from "../../../assets/image/carru2.jpg";
import foto3 from "../../../assets/image/carru3.jpg";
import foto4 from "../../../assets/image/carru4.jpg";
import foto5 from "../../../assets/image/carru5.jpg";
import foto6 from "../../../assets/image/carru6.jpg";
import foto7 from "../../../assets/image/carru7.jpg";
import foto8 from "../../../assets/image/carru8.jpg";
import foto9 from "../../../assets/image/carru9.jpg";

const CircularGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    renderMode: "performance",
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
        },
      },
    },
  });

  //AUTOPLAY CONFIG
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 2500); // Cambia cada 2.5 segundos

    return () => clearInterval(interval); // Limpia al desmontar
  }, [instanceRef]);

  return (
    <div className="carousel-container">
  <div ref={sliderRef} className="keen-slider">
    <div className="keen-slider__slide number-slide">
      <img src={foto1} alt="Foto 1" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto2} alt="Foto 2" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto3} alt="Foto 3" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto4} alt="Foto 4" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto5} alt="Foto 5" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto6} alt="Foto 6" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto7} alt="Foto 7" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto8} alt="Foto 8" />
    </div>
    <div className="keen-slider__slide number-slide">
      <img src={foto9} alt="Foto 9" />
    </div>
  </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[...Array(Math.ceil(instanceRef.current.track.details.slides.length / 3)).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx * 3)}
              className={`dot ${currentSlide >= idx * 3 && currentSlide < (idx + 1) * 3 ? "active" : ""}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CircularGallery;

