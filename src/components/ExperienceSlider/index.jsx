import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import Experiences from './ExperienceData';
import ExperienceCard from './ExperienceCard';
import 'keen-slider/keen-slider.min.css';
import './style.scss';

const ExperienceSlider = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(max-width: 768px)');
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: { perView: isMobile ? 1.5 : isTablet ? 2.5 : 4.4, spacing: isMobile ? 10 : 15 },
    rtl: true,
  });

  return (
    <div className="home-experiences">
      <h2 className="home-experiences__title">تجربه‌ها و سفرنامه‌های دیگران</h2>
      <div ref={sliderRef} className="keen-slider">
        {Experiences.map(item => (
          <div key={item.id} className="keen-slider__slide">
            <ExperienceCard
              id={item.id}
              title={item.title}
              description={item.description}
              userName={item.userName}
              userImgSrc={item.userImgSrc}
              imgSrc={item.imgSrc}
              view={item.view}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSlider;
