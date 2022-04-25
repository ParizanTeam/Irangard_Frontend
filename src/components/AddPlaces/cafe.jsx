import React from 'react';
import headerImg from '../../assets/images/Header1.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Autocomplete from '@mui/material/Autocomplete';
import { IranStates, IranCities, CafeTags } from './info.js';
import { Chip, Rating, TextField } from '@mui/material';
import Map from 'src/components/Map';
import { useAddPlace } from '../../apis/places';
import { ErrorMessage } from 'src/components/LoginModal/Common';
import ImgDragDrop from 'src/components/ImageUploader/index';

export default function CafeForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: true });

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

  const name = register('name', { required: true, maxLength: 50 });
  const description = register('description', { required: true, maxLength: 100 });
  const rate = register('rate', { required: true });
  const [rate_val, setRate] = React.useState(null);


  return (
    <div>
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <form className="add-place-form" onSubmit={handleSubmit(onSubmit)} novalidate="">
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
              value={rate_val}
              onChange={(event, newValue) => {
                setRate(newValue);
                setValue('rate', newValue);
              }}
            />
          </div>
          <div style={{ marginTop: '30px' }}>
            <label htmlFor="website" className="field__label" >
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
                sx={{width:'700px',bgcolor:'white'}}
                
                {...params} placeholder="تگ های مکان را انتخاب کنید." />
              )}
            />
          </div>
          <div className="upload-images">
            <ImgDragDrop />
          </div>
        </div>
        <input className="submit-btn2" type="submit" value="ثبت مکان" />
      </form>
    </div>
  );
}
