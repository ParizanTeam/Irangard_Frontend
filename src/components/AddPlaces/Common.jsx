import React, { useState } from 'react';
import './style.scss';
import toast from 'react-hot-toast';
import Autocomplete from '@mui/material/Autocomplete';
import Map from 'src/components/Map';
import { ErrorMessage } from 'src/components/LoginModal/Common';
import IranStates from 'src/assets/data/IranStates.json';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Checkbox from '@mui/material/Checkbox';

import { useFormContext } from 'react-hook-form';

export function WorkTime() {
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  const [day, setDay] = React.useState('Saturday');

  const handleDayChange = (event, newValue) => {
    setDay(newValue);
  };

  const days_label = {
    Saturday: 'شنبه',
    Sunday: 'یکشنبه',
    Monday: 'دوشنبه',
    Tuesday: 'سه شنبه',
    Wednesday: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Friday: 'جمعه',
  };

  const default_time_format = { all_day: false, start: 0, end: 0 };
  const default_days_time = {
    Saturday: default_time_format,
    Sunday: default_time_format,
    Monday: default_time_format,
    Tuesday: default_time_format,
    Wednesday: default_time_format,
    Thursday: default_time_format,
    Friday: default_time_format,
  };

  const [daysTime, setDaysTime] = useState(default_days_time);

  const handleChange = (day, key, value) => {
    setDaysTime({ ...daysTime, [day]: { ...daysTime[day], [key]: value } });
  };

  return (
    <div>
      <TabContext value={day}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleDayChange} variant="scrollable">
            {Object.entries(days_label).map(([day, label]) => (
              <Tab label={label} value={day} />
            ))}
          </TabList>
        </Box>

        {Object.entries(daysTime).map(([day, time]) => (
          <TabPanel value={day}>
            <div>
              <Checkbox
                label="شبانه روزی"
                checked={time.all_day}
                onChange={e => handleChange(day, 'all_day', e.target.checked)}
              />
              شبانه روزی
            </div>

            <div className="work-time">
              <div className="work-time__field">
                <div className="basic-field">
                  <label htmlFor="start" className="field__label">
                    ساعت شروع
                  </label>
                  <input
                    disabled={time.all_day}
                    value={time.start}
                    onChange={e => handleChange(day, 'start', e.target.value)}
                    type="time"
                    className="field-input"
                    id="start"
                    placeholder="ساعت شروع"
                  />
                </div>
              </div>
              <div className="work-time__field">
                <div className="basic-field">
                  <label htmlFor="end" className="field__label">
                    ساعت پایان
                  </label>
                  <input
                    disabled={time.all_day}
                    value={time.end}
                    onChange={e => handleChange(day, 'end', e.target.value)}
                    type="time"
                    className="field-input"
                    id="end"
                    placeholder="ساعت پایان"
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}

export default function AddPlaceCommonForm({ setMoreInfo }) {
  const {
    register,
    resetField,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [cities, setCities] = React.useState([]);

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
    console.log('errors', errors);
  };
  return (
    <div className="add-place-form">
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
                  value={watch('state')}
                  onChange={(event, newValue) => {
                    setValue('state', newValue);
                    fetch(`assets/data/cities/${watch('state').value}.json`).then(res =>
                      res.json().then(x => setCities(x))
                    );
                    resetField('city');
                  }}
                  renderInput={params => (
                    <div ref={params.InputProps.ref} className="basic-field">
                      <input
                        {...state}
                        {...params.inputProps}
                        autoComplete="off"
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
                  disabled={!watch('state')}
                  value={watch('city')}
                  onChange={(event, newValue) => {
                    setValue('city', newValue);
                  }}
                  options={cities}
                  renderInput={params => (
                    <div ref={params.InputProps.ref} className="basic-field">
                      <input
                        {...city}
                        {...params.inputProps}
                        className="field-input"
                        type="text"
                        id="city"
                        autoComplete="off"
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
            {watch('city') && (
              <Map onChoose={handleChangeLocation} defaultLat={watch('city')?.lat} defaultLong={watch('city')?.long} />
            )}
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
          <input {...email} className="field-input" type="input" id="email" placeholder="ایمیل ارتباطی را وارد کنید" />
        </div>
        <div className="basic-field">
          <label htmlFor="website" className="field__label">
            سایت
          </label>
          <input {...website} className="field-input" type="input" id="website" placeholder="سایت مکان را وارد کنید" />
        </div>

        <div className="basic-field">
          <label htmlFor="website" className="field__label">
            ساعت کار
          </label>
          <WorkTime />
        </div>
      </div>
      <button className="submit-btn2" onClick={() => setMoreInfo(true)}>
        ادامه
      </button>
    </div>
  );
}
