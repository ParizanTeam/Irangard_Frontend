import React from 'react';
import AddPlaces from '../../assets/images/add.png';
import header from '../../assets/images/Header1.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../../utils/constants';
import toast from 'react-hot-toast';

export default function Places() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation(loginData =>
    axios.post(`${baseUrl}/accounts/auth/jwt/create`, loginData)
  );

  const onSubmit = userData => {
    toast.promise(mutateAsync(userData), {
      loading: 'در حال بررسی...',
      success: res => {
        return 'مکان با موفقیت اضافه شد.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };

  return (
    <div className="main">
      <div className="sub">
        <div className="header">
          <img src={header} alt="header" className="HeeadImg" />
        </div>
      </div>
      <div className="Tab1">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <div className="loginForm">
            <div className="r1 add-place-form">
              <h1 style={{ fontSize: '28px', color: '#080340', marginBottom: '10px', marginTop: '10px' }}>نقشه</h1>
              <div className="form__group1 field">
                <input type="input" className="form__field1" id="place" placeholder="مکان" />
                <label htmlFor="place" className="form__label1">
                  مکان
                </label>
              </div>

              <div className="form__group1 field">
                <input type="input" className="form__field1" id="about" placeholder="درباره" />
                <label htmlFor="about" className="form__label1">
                  درباره
                </label>
              </div>

              <div className="basic-field">
                <label htmlFor="street-address" className="field__label">
                  آدرس خیابان
                </label>
                <input
                  className="field-input"
                  type="input"
                  id="street-address"
                  placeholder="آدرس خیابان و پلاک ساختمان را اینجا وارد کنید."
                />
              </div>
            </div>

            <div className="r1 add-place-form">
              <h2 style={{ fontSize: '28px', color: '#080340', marginBottom: '10px', marginTop: '10px' }}>
                اطلاعات تماس
              </h2>
              <div className="form__group1 field">
                <input type="input" className="form__field1" id="phoneNumber" placeholder="تلفن" />
                <label htmlFor="phoneNumber" className="form__label1">
                  تلفن
                </label>
              </div>

              <div className="form__group1 field">
                <input type="input" className="form__field1" id="email" placeholder="ایمیل" />
                <label htmlFor="email" className="form__label1">
                  ایمیل
                </label>
              </div>

              <div className="form__group1 field">
                <input type="input" className="form__field1" id="socialMedia" placeholder="سایت" />
                <label htmlFor="socialMedia" className="form__label1">
                  سایت
                </label>
              </div>
            </div>
          </div>
          <input className="submit-btn2" type="submit" value="ثبت مکان" disabled={isLoading} />
        </form>
        <div className="map">
          <img src={AddPlaces} alt="AddPlaces" style={{ width: '180px', marginRight: '20px' }} />
        </div>
      </div>
    </div>
  );
}
