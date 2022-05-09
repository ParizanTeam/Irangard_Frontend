import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import { Rating } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Experiences from 'src/components/FilterCards/Data.js';
import Card from './card';
import 'keen-slider/keen-slider.min.css';
import './style.scss';

const Filter = () => {
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
        <h2 className="home-experiences__title">نتیجه جست و جوی شما</h2>
        <div ref={sliderRef} className="coloumn">
          {Experiences.map(item => (
            <div key={item.id} className="">
              <Card classData={item} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Filter;
  