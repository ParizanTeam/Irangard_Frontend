import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Rating } from '@mui/material';
import Layout from '../Layout';
import Input from '../Input';
import RichText from '../RichText';
import Button from '../Button';
import TextArea from '../TextArea';
import { convertNumberToPersian } from '../../utils/formatters';
import './style.scss';

function AddExperience() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [rateValue, setRateValue] = useState(3);
  const [place, setPlace] = useState('');
  const [placeError, setPlaceError] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const imageRef = useRef(null);

  const handleTitleChange = e => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setTitleError('عنوان تجربه نمی‌تواند خالی باشد.');
    } else {
      setTitleError('');
    }
  };

  const handlePlaceChange = e => {
    setPlace(e.target.value);
    if (e.target.value === '') {
      setPlaceError('مکان تجربه نمی‌تواند خالی باشد.');
    } else {
      setPlaceError('');
    }
  };

  const submitExperience = e => {
    toast.success('پست با موفقیت ثبت شد.');
  };

  return (
    <Layout title="نوشتن تجربه جدید">
      <div className="add-experience">
        <Toaster />
        <h1 className="add-experience__title">نوشتن تجربه</h1>
        <Input
          label="انتخاب مکان:"
          placeholder="مکان..."
          value={place}
          onChange={handlePlaceChange}
          onBlur={handlePlaceChange}
          error={placeError}
        />
        <Button className="add-experience__choose-img-btn" onClick={() => imageRef.current.click()}>
          <input
            type="file"
            ref={imageRef}
            style={{ display: 'none' }}
            onChange={e => {
              setImage({
                image: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0]),
              });
            }}
            accept="image/*"
          />
          انتخاب عکس شاخص
        </Button>
        {image && <img className="add-experience__img" src={image.preview} />}
        <Input
          label="عنوان:"
          placeholder="عنوان..."
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleChange}
          error={titleError}
        />
        <div className="add-experience__rating">
          <label className="add-experience__rating-label">امتیاز: {convertNumberToPersian(rateValue)}</label>
          <div className="add-experience__rating-choose">
            <Rating
              value={rateValue}
              onChange={(event, newValue) => {
                setRateValue(newValue);
              }}
            />
          </div>
        </div>
        <TextArea
          label="خلاصه تجربه:"
          placeholder="متن خلاصه تجربه..."
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <RichText
          label="متن تجربه:"
          onChange={cnt => {
            setContent(cnt);
            console.log(cnt);
          }}
        />
        <Button variant="green" onClick={submitExperience}>
          ثبت تجربه
        </Button>
      </div>
    </Layout>
  );
}

export default AddExperience;
