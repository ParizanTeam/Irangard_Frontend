import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Chip, TextField, Autocomplete } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ImgDragDrop from 'src/components/ImageUploader/index';
import { PlaceTypes, DidaniTags } from '../info';
import { HotelRoomsInput } from '../Inputs';

const HotelFeatures = () => {
  const { watch, setValue } = useFormContext();

  const features = [
    'چای ساز',
    'اتو',
    'اینترنت',
    'مبلمان',
    'تاکسی سرویس',
    'صندوق امانات',
    'امکانات برگزاری جلسات و ضیافت',
    'امکانات ویژه برای معلولان',
    'استخر سرپوشیده',
    'استخر',
    'جکوزی',
    'باربیکیو',
    'میز بیلیارد',
    'سالن بدنسازی',
    'پیست دوچرخه',
    'خدمات تماس بیدار باش',
  ];

  const selectedFeatures = watch('features');
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setValue('features', typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <div className="hotel-features">
      <label htmlFor="hotel-features" className="field__label">
        امکانات اقامتگاه
      </label>
      <div>
        <TextField
          id="hotel-features"
          value={selectedFeatures}
          onChange={handleChange}
          select
          SelectProps={{
            displayEmpty: true,
            multiple: true,
            renderValue: selected => {
              return selected.length > 0 ? selected.join(', ') : 'امکانات اقامتگاه را انتخاب کنید.';
            },
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5,
                  width: 250,
                },
              },
            },
          }}
        >
          {features.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedFeatures.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};
export default function MoreInfoSection(props) {
  const { watch, setValue } = useFormContext();

  const placeLabel = PlaceTypes[watch('placeType')]?.label;
  return (
    <div className="moreinfo-section">
      <h1 className="title">اطلاعات تکمیلی</h1>
      <div className="tags">
        <label htmlFor="tags" className="field__label">
          تگ‌های {placeLabel}
        </label>

        <Autocomplete
          multiple
          id="tags"
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
          renderInput={params => <TextField {...params} placeholder={`تگ های ${placeLabel} را انتخاب کنید.`} />}
        />
      </div>

      {watch('placeType') == 1 && (
        <>
          <HotelRoomsInput />
          <HotelFeatures />
        </>
      )}

      {watch('placeType') >= 2 && (
        <div>
          <h3>هزینه ورودی دارد؟</h3>

          <Checkbox checked={watch('isFree')} onChange={e => setValue('isFree', e.target.checked)} />
          <label>خیر، رایگان است.</label>
        </div>
      )}

      <div className="upload-images">
        <h3 className="title">تصاویری از {placeLabel}</h3>
        <ImgDragDrop />
      </div>
    </div>
  );
}
