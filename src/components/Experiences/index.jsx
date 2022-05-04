import React from 'react';
import { RiChat3Line, RiHeartFill, RiMapPinLine, RiTimeLine } from 'react-icons/ri';
import { Rating } from '@mui/material';
import { convertNumberToPersian } from '../../utils/formatters';
import Button from '../Button';
import Layout from '../Layout';
import './style.scss';

function Experiences() {
  const xp = {
    title: 'سفر به اقیانوس ابر، سفری به قلب آدم‌ها',
    place: 'گرمسار',
    image: 'https://last-cdn.com/2021/10/04/HgmGD4C7XrwUp84iaOmrGWxZNoK9tGKx9Vli7fjC--350x228.png',
    summary: `در یک کتابِ نانوشته خوندم که : "پدربزرگ رو به پدرم کرد و گفت : پسرم توی هر شهر برای خودت یه خونه بخر!  پدر با عصبانیت رو به پدر بزرگ : آخه مگه من اینقدر وضع مالی خوبی دارم`,
    authorImage: 'https://last-cdn.com/v1/avatars/2020/09/06/RJc2gHwxIBU6MOjVGyBTn7UlkQPXd8rO4zhWPZYV.jpeg',
    authorName: 'amirkamranfar',
    date: '24 اسفند 1400',
    comments: 12,
    likes: 145,
    rate: 3.5,
  };
  return (
    <Layout title="تجربه‌ها">
      <div className="experiences">
        <h1 className="experiences__title">تجربه‌ها</h1>
        <div className="experiences__list">
          {new Array(20).fill(null).map((_, index) => (
            <div key={index} className="experience-list-card">
              <img className="experience-list-card__img" src={xp.image} alt={xp.title} />
              <div className="experience-list-card__info">
                <h2 className="experience-list-card__title">{xp.title}</h2>
                <div className="experience-list-card__place-rate">
                  <p className="experience-list-card__place">
                    <RiMapPinLine size={20} />
                    {xp.place}
                  </p>
                  <div className="experience-list-card__rating">
                    <Rating dir="ltr" readOnly precision={0.1} defaultValue={xp.rate} max={5} />
                    <div className="experience-list-card__rating-value">{convertNumberToPersian(xp.rate)}</div>
                  </div>
                </div>
                <p className="experience-list-card__summary">
                  {xp.summary.slice(0, xp.summary.length > 120 ? 120 : xp.summary.length)}...
                </p>
                <div className="experience-list-card__stats">
                  <div className="experience-list-card__comments">
                    <RiChat3Line size={20} /> {convertNumberToPersian(xp.comments)}
                  </div>
                  <div className="experience-list-card__likes">
                    <RiHeartFill size={20} />
                    {convertNumberToPersian(xp.likes)}
                  </div>
                  <div className="experience-list-card__date">
                    <RiTimeLine size={20} />
                    {convertNumberToPersian(xp.date)}
                  </div>
                </div>
              </div>
              <div className="experience-list-card__author">
                <div className="experience-list-card__author-info">
                  <img className="experience-list-card__author-img" src={xp.authorImage} alt={xp.authorName} />
                  <p className="experience-list-card__author-name">{xp.authorName}</p>
                </div>
                <Button className="experience-list-card__continue">ادامه مطلب</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Experiences;
