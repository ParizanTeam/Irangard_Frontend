import React, { useState } from 'react';
import { IconButton, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Favorite } from '@mui/icons-material';
import './style.scss';

const ExperienceCard = ({ id, imgSrc, title, UserImgSrc, UserName, rate}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="experience-card">
      <img src={imgSrc} alt={title} className="experience-card__img" />
      <div dir='rtl' className="experience-card__rating-wrapper">
      <p>1502 بازدید</p>
          <IconButton
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(state => !state);}}
              >
            {isFavorite ? <Favorite className="filled-fav-icon" /> : <FavoriteBorderIcon className="fav-icon" />}
          </IconButton>
      </div>
      <h3 className="experience-card__title">{title}</h3>
      <p style={{margin:'15px',marginRight:'21px'}}>!خیلی قشنگ بود</p>
      <div className="experience-card__footer">
        <img src={UserImgSrc} alt={UserName} className="experience-card__user-img" />
        <p className="experience-card__user-name">{UserName}</p>
      </div>
    </div>
              );
};

export default ExperienceCard;
