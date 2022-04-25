import React from 'react';
import { convertNumberToPersian, formatPrice } from '../../../utils/formatters';
import './style.scss';

const RoomsList = ({ rooms }) => {
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
            {rooms.map(room => (
              <tr>
                <td>{convertNumberToPersian(room.room_type)}</td>
                <td>{convertNumberToPersian(room.capacity)}</td>
                <td>{formatPrice(convertNumberToPersian(room.price))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsList;
