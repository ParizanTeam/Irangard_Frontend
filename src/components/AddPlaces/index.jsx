import React from 'react';
import AddPlacesImg from '../../assets/images/add.png';
import headerImg from '../../assets/images/Header1.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Header from 'src/components/Header';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IranStates, IranCities } from './info.js';
import { Chip } from '@mui/material';
import { RiRestaurantLine, RiHome3Line, RiChatQuoteLine, RiShipLine } from 'react-icons/ri';

const CafeForm = () => {
  return (
    <div>
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <form className="add-place-form">
        <h1 className="title">نقشه</h1>

        <div>
          <label htmlFor="state" className="field__label">
            استان
          </label>

          <Autocomplete
            disablePortal
            options={IranStates}
            sx={{ width: 300 }}
            renderInput={params => (
              <div ref={params.InputProps.ref} className="basic-field">
                <input
                  {...params.inputProps}
                  className="field-input"
                  type="text"
                  id="state"
                  placeholder="استان را انتخاب کنید."
                />
              </div>
            )}
          />
        </div>

        <div className="form__group1 field">
          <input type="input" className="form__field1" id="about" placeholder="درباره" />
          <label htmlFor="about" className="form__label1">
            درباره
          </label>
        </div>

        <div className="basic-field">
          <label htmlFor="street-address" className="field__label">
            آدرس خیابان
          </label>
          <input
            className="field-input"
            type="input"
            id="street-address"
            placeholder="آدرس خیابان و پلاک ساختمان را اینجا وارد کنید."
          />
        </div>

        <h2 className="title">اطلاعات تماس</h2>
        <div className="form__group1 field">
          <input type="input" className="form__field1" id="phoneNumber" placeholder="تلفن" />
          <label htmlFor="phoneNumber" className="form__label1">
            تلفن
          </label>
        </div>

        <div className="form__group1 field">
          <input type="input" className="form__field1" id="email" placeholder="ایمیل" />
          <label htmlFor="email" className="form__label1">
            ایمیل
          </label>
        </div>

        <div className="form__group1 field">
          <input type="input" className="form__field1" id="socialMedia" placeholder="سایت" />
          <label htmlFor="socialMedia" className="form__label1">
            سایت
          </label>
        </div>
        <input className="submit-btn2" type="submit" value="ثبت مکان" />
      </form>
    </div>
  );
};
export default function Places() {
  const [place, setPlace] = React.useState(null);
  const Forms = {
    0: <CafeForm />,
  };

  return (
    <div className="main add-place">
      <Header />
      {!place ? (
        <div className="starter-section">       
          <div className="title">
            <h1>اضافه‌کردن مکان جدید به ایرانگرد</h1>
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
                  onClick={() => setPlace(1)}
                  icon={<RiHome3Line size={24} />}
                  label="اقامتگاه"
                  variant="outlined"
                />
              </span>
              <span>
                <Chip
                  onClick={() => setPlace(1)}
                  icon={<RiShipLine size={24} />}
                  label="مرکز تفریحی"
                  variant="outlined"
                />
              </span>
              <span>
                <Chip
                  onClick={() => setPlace(1)}
                  icon={<RiChatQuoteLine size={24} />}
                  label="جاذبه‌دیدنی"
                  variant="outlined"
                />
              </span>
            </div>
          </div>

        </div>
      ) : (
        <CafeForm />
      )}
    </div>
  );
}
