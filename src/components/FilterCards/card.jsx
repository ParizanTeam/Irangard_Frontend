import React from 'react';
import 'keen-slider/keen-slider.min.css';
import './style.scss';

const ClassCard = ({ classData }) => {
  const { imgSrc, view, title, description, teacherImg, teacherName, experiencesNumber, date, price } = classData;
  return (
    <>
      <div className="class-card">
        <div className="class-card-wrapper">
          <div className="class-card__img-wrapper">
            <img className="class-card__img" src={imgSrc} alt={title} />
          </div>
          <div className="class-card__content">
            <h3 className="class-card__title">{title}</h3>
            <p className="class-card__description">
              {description.length > 300 ? description.slice(0, 240) + '...' : description}
            </p>
            <div className="class-card__date-price-wrapper">
              <div className="class-card__date">
                <p>{experiencesNumber} تجربه برای این مکان ثبت شده است.</p>
              </div>
              <div className="class-card__price">تجربه های مربوط به این مکان</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
