import React from 'react';
import { formatPrice } from '../../../utils/formatters';
import './style.scss';

const RoomsList = () => {
  return (
    <div className="rooms-list">
      <h3 className="rooms-list__title">انواع اتاق‌ها</h3>
      <div className="rooms-list__body">
        <table>
          <thead>
            <tr>
              <td>نوع اتاق</td>
              <td>ظرفیت(نفر)</td>
              <td>قیمت</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>یک تخته لوکس</td>
              <td>۱</td>
              <td>{formatPrice('۲۰۰۰۰۰')}</td>
            </tr>
            <tr>
              <td>دو تخته</td>
              <td>۲</td>
              <td>{formatPrice('۳۰۰۰۰۰')}</td>
            </tr>
            <tr>
              <td>سوئیت دو خوابه</td>
              <td>۴</td>
              <td>{formatPrice('۴۵۰۰۰۰')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsList;
