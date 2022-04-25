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
import Map from 'src/components/Map';
import HotelForm from './Hotels';
import DidaniForm from './Didani';

const CafeForm = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [state, setState] = React.useState(null);
  const [city, setCity] = React.useState(null);
  // const [latitude, setLatitude] = React.useState(null);
  // const [longitude, setLongitude] = React.useState(null);

  const [location, setLocation] = React.useState();
  const latitude = register('latitude', { required: true });
  const longitude = register('longitude', { required: true });
  return (
    <div>
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <form className="add-place-form">
        <div className="add-place-form__section">
          <h1 className="title">نقشه</h1>
          <div className="location-info">
            <div className="state-city-address">
              <div className="state-city">
                <div className="state-city__field">
                  <label htmlFor="state" className="field__label">
                    استان
                  </label>

                  <Autocomplete
                    disablePortal
                    options={IranStates}
                    value={state}
                    onChange={(event, newValue) => {
                      setCity(null);
                      setState(newValue);
                    }}
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
                <div className="state-city__field">
                  <label htmlFor="state" className="field__label">
                    شهر
                  </label>

                  <Autocomplete
                    disabled={!state}
                    value={city}
                    onChange={(event, newValue) => {
                      setCity(newValue);
                    }}
                    options={state ? IranCities[state.value] : []}
                    renderInput={params => (
                      <div ref={params.InputProps.ref} className="basic-field">
                        <input
                          {...params.inputProps}
                          className="field-input"
                          type="text"
                          id="state"
                          placeholder="شهر را انتخاب کنید."
                        />
                      </div>
                    )}
                  />
                </div>
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

              <h3 className="coordinates__title">مختصات مکان</h3>
              <div className="coordinates">
                <div className="coordinates__field">
                  <label htmlFor="state" className="field__label">
                    عرض
                  </label>

                  <div className="basic-field">
                    <input 
                    // value={latitude}
                    className="field-input" id="state" placeholder="عرض مکان" />
                  </div>
                </div>
                <div className="coordinates__field">
                  <label htmlFor="state" className="field__label">
                    طول
                  </label>

                  <div className="basic-field">
                    <input 
                    
                    className="field-input"  id="state" placeholder="طول مکان" />
                  </div>
                </div>
              </div>
            </div>
            <div className="location-info__map">
              <Map onChoose={setLocation} />
            </div>
          </div>
        </div>

        <div className="add-place-form__section">
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
        </div>
        <input className="submit-btn2" type="submit" value="ثبت مکان" />
      </form>
    </div>
  );
};
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
        hey
          // <PlaceForm/>
      )}
    </div>
  );
}
