import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Favorite } from '@mui/icons-material';
import { convertNumberToPersian } from 'src/utils/formatters';
import './style.scss';

const ExperienceCard = ({ imgSrc, title, description, view, userImgSrc, userName }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="experience-card">
      <img src={imgSrc} alt={title} className="experience-card__img" />
      <div className="experience-card__rating-wrapper">
        <p>{convertNumberToPersian(view)} بازدید</p>
        <IconButton
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(state => !state);
          }}
        >
          {isFavorite ? <Favorite className="filled-fav-icon" /> : <FavoriteBorderIcon className="fav-icon" />}
        </IconButton>
      </div>
      <h3 className="experience-card__title">{title.length > 20 ? title.slice(0, 20) + '...' : title}</h3>
      <p className="experience-card__description">
        {description.length > 40 ? description.slice(0, 40) + '...' : description}
      </p>
      <div className="experience-card__footer">
        <img src={userImgSrc} alt={userName} className="experience-card__user-img" />
        <p className="experience-card__user-name">{userName.slice(0, 20)}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
