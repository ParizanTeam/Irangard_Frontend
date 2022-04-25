import React from 'react';
import headerImg from '../../assets/images/Header1.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Autocomplete from '@mui/material/Autocomplete';
import { IranStates, IranCities, CafeTags } from './info.js';
import { Chip, Rating, TextField } from '@mui/material';
import Map from 'src/components/Map';
import { ErrorMessage } from 'src/components/LoginModal/Common';

export default function AddPlaceCommonForm({ setMoreInfo }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: true });

  const onSubmit = userData => {
    console.log('hey')
    setMoreInfo(true);
    
  };

  const [state_val, setState] = React.useState(null);
  const [city_val, setCity] = React.useState(null);

  const state = register('state', { required: true });
  const city = register('city', { required: true });
  const street = register('street', { maxLength: 50 });

  const latitude = register('latitude', { required: true });
  const longitude = register('longitude', { required: true });

  const phone = register('phone', { maxLength: 12 });
  const email = register('email', {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'ایمیل نامعتبر است.',
    },
  });

  const website = register('website', {
    pattern: {
      value:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      message: 'آدرس سایت نامعتبر است.',
    },
  });

  const handleChangeLocation = e => {
    setValue('latitude', e.lat);
    setValue('longitude', e.lng);
    console.log("errors",errors)
  };
  return (
    <div>
      <form className="add-place-form" onSubmit={handleSubmit(onSubmit)} novalidate="" >
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
                          {...state}
                          {...params.inputProps}
                          className="field-input"
                          type="text"
                          id="state"
                          placeholder="استان را انتخاب کنید."
                        />
                      </div>
                    )}
                  />
                  {errors['state'] && <ErrorMessage error={errors['state']} />}
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
                          {...city}
                          {...params.inputProps}
                          className="field-input"
                          type="text"
                          id="city"
                          placeholder="شهر را انتخاب کنید."
                        />
                      </div>
                    )}
                  />
                  {errors['city'] && <ErrorMessage error={errors['city']} />}
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
                    {errors['latitude'] && <ErrorMessage error={errors['latitude']} />}
                  </div>
                </div>
                <div className="coordinates__field">
                  <div className="basic-field">
                    <label htmlFor="longitude" className="field__label">
                      طول
                    </label>
                    <input {...longitude} className="field-input" id="longitude" placeholder="طول مکان" />
                    {errors['longitude'] && <ErrorMessage error={errors['longitude']} />}
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
        <input className="submit-btn2" type="submit" value="ثبت اطلاعات" />
      </form>
    </div>
  );
}
