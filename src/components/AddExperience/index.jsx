import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Rating } from '@mui/material';
import Layout from '../Layout';
import Input from '../Input';
import RichText from '../RichText';
import Button from '../Button';
import TextArea from '../TextArea';
import { convertNumberToPersian } from '../../utils/formatters';
import { baseUrl } from '../../utils/constants';
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
  const token = localStorage.getItem('access-token');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  if (!token) {
    return (
      <Layout title="نوشتن تجربه جدید">
        <div className="add-experience">
          <p>برای نوشتن تجربه ابتدا باید وارد شوید.</p>
        </div>
      </Layout>
    );
  }

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

  const submitExperience = async e => {
    let error = false;
    if (place === '') {
      setPlaceError('مکان تجربه نمی‌تواند خالی باشد.');
      error = true;
    }
    if (title === '') {
      setTitleError('عنوان تجربه نمی‌تواند خالی باشد.');
      error = true;
    }
    if (error) {
      toast.error('لطفا فیلدهای مشخص‌شده را اصلاح کنید.');
      return;
    }
    const date = new Date().toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    const body = new FormData();
    body.append('date_created', date);
    body.append('title', title);
    body.append('place', place);
    body.append('summary', summary);
    body.append('rate', rateValue);
    body.append('body', content);
    if (image.image) {
      body.append('image', image.image);
    }
    setLoading(true);
    await axios
      .post(`${baseUrl}/experiences/`, body, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then(res => res.data)
      .then(data => {
        console.log(data);
        toast.success('پست با موفقیت ثبت شد.');
        setTimeout(() => {
          navigate(`/experiences/${data.id}`);
        }, 500);
      })
      .catch(err => {
        toast.error('مشکلی در سامانه رخ داده‌است.');
      });
    setLoading(false);
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
        <Button variant="green" onClick={submitExperience} disabled={loading}>
          ثبت تجربه
        </Button>
      </div>
    </Layout>
  );
}

export default AddExperience;
