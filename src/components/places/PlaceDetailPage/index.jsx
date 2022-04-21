import React from 'react';
import Layout from '../../Layout';
import PlaceGallery from '../PlaceGallery';
import PlaceContactInfo from '../PlaceContactInfo';
import { Rating } from '@mui/material';
import PlaceTags from '../PlaceTags';
import RoomsList from '../RoomsList';
import PlaceCosts from '../PlaceCosts';
import './style.scss';

const props = {
  name: 'سیب ۳۶۰',
};
const PlaceDetailPage = () => {
  const { name } = props;
  return (
    <Layout>
      <div className="place-detail">
        <header className="place-detail__header">
          <h2>{name}</h2>
          <div className="place-detail__rating">
            <Rating dir="ltr" readOnly defaultValue={5} max={5} />
            <div className="place-detail__rating-value">۵</div>
          </div>
        </header>
        <div className="place-detail__gallery-info-wrapper">
          <PlaceGallery className="place-detail__gallery" />
          <PlaceContactInfo className="place-detail__info" />
        </div>
        <div className="place-detail__body">
          <h3 className="place-detail__about-title">درباره {name}</h3>
          <p className="place-detail__about-description">
            هتل لوکس پانوراما جدیدترین هتل پنج‌ستاره جزیره کیش است که در فروردین 1398 افتتاح شده‌است. هتل در بلوار رودکی
            قرار گرفته و دسترسی بسیار راحتی به مراکز تجاری و اماکن گردشگری جزیره دارد. بازارهای زیتون، مرکز تجاری،
            پانیذ، پردیس‌های ۱و۲، رویا مال و از سوی دیگر، اسکله قدیم، پارک ساحلی ماهیگیر، مرکز غواصی و کیبل اسکی، پارک
            شهر زیبای کیش، تالار بزرگ شهر(محل برگزاری جشن‌ها و کنسرت‌های کیش) و کلوپ‌های تفریحی همگی در نزدیکی هتل
            پانوراما قرار گرفته اند تا محل اقامتی ایده‌آل را برای میهمانان فراهم کنند.با اقامت در این هتل علاوه بر
            دسترسی‌های مناسبی که خواهید داشت می‌توانید از امکانات متنوع و خدمات با کیفیت هتل بهره مند شوید.
          </p>
          <PlaceTags />
          <RoomsList />
          <PlaceCosts />
        </div>
      </div>
    </Layout>
  );
};

export default PlaceDetailPage;
