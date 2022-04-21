import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import './style.scss';

const PlaceCosts = ({ isFree = false }) => {
  return (
    <div className="place-costs">
      <h3 className="place-costs__title">هزینه‌ها</h3>
      {isFree && <p>* بازدید از این مکان رایگان است.</p>}
      {!isFree && <p>* بازدید از این مکان رایگان نیست و هزینه دارد.</p>}
      {!isFree && (
        <div className="place-costs__body">
          <table>
            <thead>
              <tr>
                <td>عنوان</td>
                <td>توضیحات</td>
                <td>قیمت</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>استخر</td>
                <td>توضیح اول</td>
                <td>{formatPrice('۴۵۰۰۰')}</td>
              </tr>
              <tr>
                <td>ورودی کودکان</td>
                <td>توضیح دوم</td>
                <td>{formatPrice('۱۵۰۰۰۰')}</td>
              </tr>
              <tr>
                <td>ورودی بزرگسالان</td>
                <td>توضیح سوم</td>
                <td>{formatPrice('۲۰۰۰۰۰')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlaceCosts;
