import React from 'react';
import './style.scss';
import Header from 'src/components/Header';
import { Chip } from '@mui/material';
import { RiRestaurantLine, RiHome3Line, RiChatQuoteLine, RiShipLine } from 'react-icons/ri';
import HotelForm from './Hotels';
import DidaniForm from './Didani';
import CafeForm from './Cafe';

export default function Places() {
  const [place, setPlace] = React.useState(null);
  const placeForms = {
    1: CafeForm,
    2: HotelForm,
    3: DidaniForm,
  };
  const PlaceForm = placeForms[place];
  return (
    <div className="main add-place">
      <Header />
      {!place ? (
        <div className="starter-section">
          <div className="title">
            <h2>اضافه‌کردن مکان جدید به ایرانگرد</h2>
          </div>

          <div className="description">
            <h5>
              مرسی که تصمیم گرفتی بهمون کمک کنی مکان جدید به ‌ایرانگرد اضافه بشه. برای شروع بهون یکمی درمورد مکان بگو
            </h5>
          </div>

          <div className="question" dir="ltr">
            <h3>مکان ات چه جور جایی است؟</h3>
            <div className="options">
              <span>
                <Chip
                  onClick={() => setPlace(1)}
                  icon={<RiRestaurantLine size={24} />}
                  label="رستوران‌‌ یا کافه"
                  variant="outlined"
                />
              </span>
              <span>
                <Chip
                  onClick={() => setPlace(2)}
                  icon={<RiHome3Line size={24} />}
                  label="اقامتگاه"
                  variant="outlined"
                />
              </span>
              <span>
                <Chip
                  onClick={() => setPlace(3)}
                  icon={<RiShipLine size={24} />}
                  label="مرکز تفریحی"
                  variant="outlined"
                />
              </span>
              <span>
                <Chip
                  onClick={() => setPlace(3)}
                  icon={<RiChatQuoteLine size={24} />}
                  label="جاذبه‌دیدنی"
                  variant="outlined"
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <PlaceForm />
      )}
    </div>
  );
}
