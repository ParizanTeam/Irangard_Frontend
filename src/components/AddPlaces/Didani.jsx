import React from 'react';
import headerImg from '../../assets/images/Jamshid.jpg';
import './style.scss';
import Autocomplete from '@mui/material/Autocomplete';
import { DidaniTags } from './info.js';
import { Chip, Rating, TextField } from '@mui/material';
import { ErrorMessage } from 'src/components/LoginModal/Common';
import ImgDragDrop from 'src/components/ImageUploader/index';
import { useFormContext } from 'react-hook-form';

export default function DidaniForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const name = register('name', { required: true, maxLength: 50 });
  const description = register('description', { required: true, maxLength: 100 });
  
  return (
    <div>
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <div className="add-place-form">
        <div className="add-place-form__section">
          <h2 className="title">درباره‌ی جاذبه‌دیدنی</h2>
          <div className="basic-field">
            <label htmlFor="name" className="field__label">
              نام جاذبه‌دیدنی
            </label>
            <input
              {...name}
              className="field-input"
              type="input"
              id="name"
              placeholder="نام جاذبه‌دیدنی مورد نظر را وارد کنید"
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
              placeholder="درباره ی جاذبه‌دیدنی"
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
              تگ‌های جاذبه‌دیدنی
            </label>

            <Autocomplete
              multiple
              id="tags-filled"
              options={DidaniTags}
              freeSolo
              onChange= {(event, newValue) => {
                setValue('tags', newValue);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip dir="ltr" variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={params => (
                <TextField
                  sx={{ width: '700px', bgcolor: 'white' }}
                  {...params}
                  placeholder="تگ های جاذبه‌دیدنی را انتخاب کنید."
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
