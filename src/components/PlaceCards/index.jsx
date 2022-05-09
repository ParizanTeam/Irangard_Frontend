import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import Experiences from './Data.js';
import Card from './card';
import 'keen-slider/keen-slider.min.css';
import './style.scss';

const PlaceCards = () => {
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
        <div ref={sliderRef} className="flex-column">
          {Experiences.map(item => (
            <div key={item.id} className="">
              <Card placeData={item} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PlaceCards;
  