import React from "react";
import Experiences from './ExperienceData';
import ExperienceCard from "./ExperienceCard";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.scss";

export default () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: { origin: "center", perView: 4, spacing: 10 },
    range: {
      min: -5,
      max: 5,
    },
  })

  return (
        <div ref={sliderRef} className="keen-slider">
          {Experiences.map((item) => (
              <div key={item.id} className="keen-slider__slide">
                <ExperienceCard
                  id={item.id}
                  title={item.title}
                  UserName={item.userName}
                  UserImgSrc={item.userImgSrc}
                  imgSrc={item.imgSrc}
                  rate={item.rate}
                />
              </div>
          ))}
        </div>

  )
}
