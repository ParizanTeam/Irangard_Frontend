import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { RiMapPinLine, RiHeartFill, RiTimeLine } from 'react-icons/ri';
import Layout from '../Layout';
import Comments from '../Comments';
import RichText from '../RichText';
import { convertNumberToPersian } from '../../utils/formatters';
import './style.scss';

function ExperienceDetail() {
  const { id } = useParams();
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
    content: `<p>شسیشس شسی شی شسی شس یش</p>
    <h1><span style="font-size: 24px;">شسیشسیشسی</span></h1>
    <h2><span style="font-size: 24px;">شسیشش</span></h2>
    <h3></h3>
    <img src="https://last-cdn.com/2021/10/01/prrGtagukoR1q7NZWLkwRmnqkBB6hb1RCzLolq0V.jpeg" alt="undefined" style="height: auto;width: auto"/>
    <p></p>
    <h3><span style="font-size: 24px;">شسیشسی</span></h3>
    <h4><span style="font-size: 24px;">شسیشس</span></h4>
    <h5><span style="font-size: 24px;">شسیشس</span></h5>
    <h6><span style="font-size: 24px;">شسیشسش</span></h6>
    <blockquote><span style="font-size: 24px;">شسیشسی</span></blockquote>
    <pre><span style="font-size: 24px;">شسیشسیشسی</span></pre>
    <p></p>`,
  };
  useEffect(() => {
    // TODO: fetch experience data
  }, []);
  return (
    <Layout>
      <div className="experience-detail">
        <h1 className="experience-detail__title">{xp.title}</h1>
        <div className="experience-detail__place-rate">
          <p className="experience-detail__place">
            <RiMapPinLine size={20} />
            {xp.place}
          </p>
          <div className="experience-detail__rating">
            <Rating dir="ltr" readOnly precision={0.1} defaultValue={xp.rate} max={5} />
            <div className="experience-detail__rating-value">{convertNumberToPersian(xp.rate)}</div>
          </div>
        </div>
        <div className="experience-detail__likes-date">
          <div className="experience-detail__date">
            <RiTimeLine size={20} />
            {convertNumberToPersian(xp.date)}
          </div>
          <div className="experience-detail__likes">
            <RiHeartFill size={20} />
            {convertNumberToPersian(xp.likes)}
          </div>
        </div>
        <img className="experience-detail__img" src={xp.image} alt={xp.title} />
        <h2 className="experience-detail__title-2">خلاصه</h2>
        <p className="experience-detail__summary-body">{xp.summary}</p>
        <h2 className="experience-detail__title-2">متن تجربه</h2>
        <RichText readOnly editorClassName="experience-detail__body-editor" hideToolbar defaultContent={xp.content} />
        <Comments />
      </div>
    </Layout>
  );
}

export default ExperienceDetail;
