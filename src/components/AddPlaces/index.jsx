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
import { Chip, Rating } from '@mui/material';
import { RiRestaurantLine, RiHome3Line, RiChatQuoteLine, RiShipLine } from 'react-icons/ri';
import Map from 'src/components/Map';
import HotelForm from './Hotels';
import DidaniForm from './Didani';
import { useAddPlace } from '../../apis/places';
const CafeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();


  const { mutateAsync, isLoading } = useAddPlace();
  const onSubmit = userData => {
    toast.promise(mutateAsync(userData), {
      loading: 'در حال بررسی...',
      success: res => {
        localStorage.setItem('access-token', res.data['access']);
        localStorage.setItem('refresh-token', res.data['refresh']);
        return 'با موفقیت لاگین شدید.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        if (err.response.status === 401) return 'رمز یا نام‌کاربری اشتباه است.';
        else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };

  const name = register('name', { required: true,maxLength:50 });
  const description = register('description', { required: true,maxLength:100});
  const rate = register('rate', { required: true });


  const [state_val, setState] = React.useState(null);
  const [city_val, setCity] = React.useState(null);
  const [rate_val, setRate] = React.useState(null);

  const state = register('state', { required: true });
  const city = register('city', { required: true });
  const street = register('street', { maxLength: 50 });

  const latitude = register('latitude', { required: true });
  const longitude = register('longitude', { required: true });

  const phone = register('phone', { maxLength: 12 });
  const email = register('email', {
    required: true,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'ایمیل نامعتبر است.',
    },
  });

  const website = register('website', {
    required: true,
    pattern: {
      value:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      message: 'آدرس سایت نامعتبر است.',
    },
  });

  const handleChangeLocation = e => {
    console.log(e);
    setValue('latitude', e.lat);
    setValue('longitude', e.lng);
  };
  return (
    <div>
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <form className="add-place-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="add-place-form__section">
          <h2 className="title">درباره‌ی مکان</h2>
          <div className="basic-field">
            <label htmlFor="name" className="field__label">
              نام مکان
            </label>
            <input
              {...name}
              className="field-input"
              type="input"
              id="name"
              placeholder="نام مکان مورد نظر را وارد کنید"
            />
          </div>
          <div className="basic-field">
            <label htmlFor="description" className="field__label">
              توضیحات
            </label>
            <input
              {...description}
              className="field-input"
              type="input"
              id="description"
              placeholder="توضیح درباره"
            />
          </div>
          <div className="rating-wrapper" dir="ltr">
            <label htmlFor="website" className="field__label">
              امتیاز
            </label>
              <Rating
                name="simple-controlled"
                size={'large'}
                precision={0.5}
                value={rate_val}
                onChange={(event, newValue) => {
                  setRate(newValue);
                  setValue("rate",newValue)
                }}
              />
          </div>
        </div>
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
                    value={state_val}
                    onChange={(event, newValue) => {
                      setCity(null);
                      setState(newValue);
                      setValue('city', null);
                      setValue('state', newValue);
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
                  <label htmlFor="city" className="field__label">
                    شهر
                  </label>

                  <Autocomplete
                    disabled={!state_val}
                    value={city_val}
                    onChange={(event, newValue) => {
                      setCity(newValue);
                      setValue('city', newValue);
                    }}
                    options={state_val ? IranCities[state_val.value] : []}
                    renderInput={params => (
                      <div ref={params.InputProps.ref} className="basic-field">
                        <input
                          {...params.inputProps}
                          className="field-input"
                          type="text"
                          id="city"
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
                  {...street}
                  className="field-input"
                  type="input"
                  id="street-address"
                  placeholder="آدرس خیابان و پلاک ساختمان را اینجا وارد کنید."
                />
              </div>

              <h3 className="coordinates__title">مختصات مکان</h3>
              <div className="coordinates">
                <div className="coordinates__field">
                  <div className="basic-field">
                    <label htmlFor="latitude" className="field__label">
                      عرض
                    </label>
                    <input {...latitude} className="field-input" id="latitude" placeholder="عرض مکان" />
                  </div>
                </div>
                <div className="coordinates__field">
                  <div className="basic-field">
                    <label htmlFor="longitude" className="field__label">
                      طول
                    </label>
                    <input {...longitude} className="field-input" id="longitude" placeholder="طول مکان" />
                  </div>
                </div>
              </div>
            </div>
            <div className="location-info__map">
              <Map onChoose={handleChangeLocation} />
            </div>
          </div>
        </div>

        <div className="add-place-form__section">
          <h2 className="title">اطلاعات تماس</h2>
          <div className="basic-field">
            <label htmlFor="phone" className="field__label">
              تلفن
            </label>
            <input
              {...phone}
              className="field-input"
              type="input"
              id="phone"
              placeholder="شماره‌همراه یا تلفن مکان را وارد کنید"
            />
          </div>
          <div className="basic-field">
            <label htmlFor="email" className="field__label">
              ایمیل
            </label>
            <input
              {...email}
              className="field-input"
              type="input"
              id="email"
              placeholder="ایمیل ارتباطی را وارد کنید"
            />
          </div>
          <div className="basic-field">
            <label htmlFor="website" className="field__label">
              سایت
            </label>
            <input
              {...website}
              className="field-input"
              type="input"
              id="website"
              placeholder="سایت مکان را وارد کنید"
            />
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
