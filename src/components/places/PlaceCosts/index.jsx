import React from 'react';
import { convertNumberToPersian, formatPrice } from '../../../utils/formatters';
import './style.scss';

const PlaceCosts = ({ isFree = false, costs }) => {
  return (
    <div className="place-costs">
      <h3 className="place-costs__title">هزینه‌ها</h3>
      {isFree && <p>* بازدید از این مکان رایگان است.</p>}
      {!isFree && <p>* بازدید از این مکان رایگان نیست و هزینه دارد.</p>}
      {!isFree && costs && costs.length > 0 && (
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
              {costs.map(cost => (
                <tr>
                  <td>{convertNumberToPersian(cost.title)}</td>
                  <td>{convertNumberToPersian(cost.description)}</td>
                  <td>{formatPrice(convertNumberToPersian(cost.price))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlaceCosts;
