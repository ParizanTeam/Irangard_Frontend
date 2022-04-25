import React from 'react';
import headerImg from '../../assets/images/Header1.jpg';
import './style.scss';
import Autocomplete from '@mui/material/Autocomplete';
import { CafeTags } from './info.js';
import { Chip, Rating, TextField } from '@mui/material';
import { ErrorMessage } from 'src/components/LoginModal/Common';
import ImgDragDrop from 'src/components/ImageUploader/index';
import { useFormContext } from 'react-hook-form';

export default function CafeForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const name = register('name', { required: true, maxLength: 50 });
  const description = register('description', { required: true, maxLength: 100 });
  const rate = register('rate');

  const name = register('name', { required: true, maxLength: 50 });
  const description = register('description', { required: true, maxLength: 100 });
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
    console.log(e);
    setValue('latitude', e.lat);
    setValue('longitude', e.lng);
  };
  return (
    <div>
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <div className="add-place-form">
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
            {errors['name'] && <ErrorMessage error={errors['name']} />}
          </div>
          <div className="basic-field">
            <label htmlFor="description" className="field__label">
              توضیحات
            </label>
            <textarea
              className="field-input"
              {...description}
              type="input"
              id="description"
              placeholder="درباره ی مکان"
            ></textarea>
            {errors['description'] && <ErrorMessage error={errors['description']} />}
          </div>
          <div className="rating-wrapper" dir="ltr">
            <label htmlFor="website" className="field__label">
              امتیاز
            </label>
            <Rating
              name="simple-controlled"
              size={'large'}
              precision={0.5}
              value={watch('rate')}
              onChange={(event, newValue) => {
                setValue('rate', newValue);
              }}
            />
          </div>
          <div style={{ marginTop: '30px' }}>
            <label htmlFor="website" className="field__label">
              تگ‌های مکان
            </label>

            <Autocomplete
              multiple
              id="tags-filled"
              options={CafeTags}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip dir="ltr" variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={params => (
                <TextField
                  sx={{ width: '700px', bgcolor: 'white' }}
                  {...params}
                  placeholder="تگ های مکان را انتخاب کنید."
                />
              )}
            />
          </div>
          <div className="upload-images">
            <ImgDragDrop />
          </div>
        </div>
      </div>
      <input type="submit" className="submit-btn2" value="ثبت اطلاعات" />
    </div>
  );
}
