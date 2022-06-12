import React from 'react';
import headerImg from '../../assets/images/Hotel.jpg';
import './style.scss';
import Autocomplete from '@mui/material/Autocomplete';
import { DidaniTags } from './info.js';
import { Chip, Rating, TextField } from '@mui/material';
import { ErrorMessage } from 'src/components/LoginModal/Common';
import ImgDragDrop from 'src/components/ImageUploader/index';
import { useFormContext } from 'react-hook-form';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = [
  'استخر',
  'چای ساز',
  'اتو',
  'اینترنت',
  'خدمات تماس بیدار باش',
  'تاکسی سرویس',
  'اینترنت در قسمت لابی',
  'مبلمان',
  'تخت خواب',
  'پیست دوچرخه',
];

export default function HotelForm() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const name = register('name', { required: true, maxLength: 50 });
  const description = register('description', { required: true, maxLength: 100 });
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <div className="add-place-form">
        <div className="add-place-form__section">
          <h2 className="title">درباره‌ی اقامتگاه</h2>
          <div className="basic-field">
            <label htmlFor="name" className="field__label">
              نام اقامتگاه
            </label>
            <input
              {...name}
              className="field-input"
              type="input"
              id="name"
              placeholder="نام اقامتگاه مورد نظر را وارد کنید"
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
              placeholder="درباره ی اقامتگاه"
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
              تگ‌های اقامتگاه
            </label>

            <Autocomplete
              multiple
              id="tags-filled"
              options={DidaniTags}
              freeSolo
              onChange={(event, newValue) => {
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
                  placeholder="تگ های اقامتگاه را انتخاب کنید."
                />
              )}
            />
          </div>

          <div style={{ marginTop: '30px' }}>
            <label className="field__label">امکانات اقامتگاه</label>

            <Select
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="لیست امکانات" />}
              renderValue={selected => selected.join(', ')}
              renderInput={params => (
                <TextField
                  sx={{ width: '700px', bgcolor: 'white' }}
                  {...params}
                  placeholder="امکانات اقامتگاه را انتخاب کنید."
                />
              )}
              MenuProps={MenuProps}
            >
              {names.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
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
