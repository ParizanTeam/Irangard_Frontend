import React, { useState, useEffect } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ErrorMessage } from './Common';
import { useResetPass } from '../../apis/auth';
import { useLocation } from 'react-router-dom';
import ForgetPassImg from '../../assets/images/forgetPass.jpg';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

export default function ForgetPassword() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token').slice(0, -1);
  const uid = query.get('uid');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const setPass = useResetPass();

  const password = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: 'رمز عبور باید ییشتر از ۶ کارکتر باشد.',
    },
    maxLength: {
      value: 50,
      message: 'رمز عبور باید کمتر از ۵۰ کارکتر باشد.',
    },
  });
  const confirmPassword = register('confirmPassword', {
    required: true,
    validate: val => {
      if (watch('password') != val) {
        return 'تکرار رمز با رمز‌عبور یکسان نمی‌باشد.';
      }
    },
  });
  const fields = {
    password: { ...password },
    confirmPassword: { ...confirmPassword },
  };
  const labels = {
    password: 'رمز‌عبور',
    confirmPassword: 'تکرار رمز‌عبور',
  };

  const submit = userData => {
    const data = {
      token,
      uid,
      password: userData.password,
    };
    toast.promise(setPass.mutateAsync(data), {
      loading: 'در حال بررسی...',
      success: 'رمز شما با موفقیت تغییر یافت.',
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };
  return (
    <>
      <Header />

      <div className="reset-password">
        <h1>فراموشی رمز</h1>
        <p className="reset-password__description">رمز جدید برای خود انتخاب کنید.</p>

          <form onSubmit={handleSubmit(submit)}>
            {Object.entries(fields).map(([inputName, inputRegister]) => (
              <div key={inputName} className="form__group field">
                <input type="input" className="form__field" placeholder={inputName} id={inputName} {...inputRegister} />
                <label htmlFor={inputName} className="form__label">
                  {labels[inputName]}
                </label>
                {errors[inputName] && <ErrorMessage error={errors[inputName]} />}
              </div>
            ))}

            <input className="submit-btn" type="submit" value="ثبت" />
          </form>
        <img src={ForgetPassImg} className="reset-password__image" />
      </div>
      <Footer />
    </>
  );
}
