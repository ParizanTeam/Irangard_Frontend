import React, { useState, useEffect } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { baseUrl } from '../../utils/constants';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutation, mutateAsync, isLoading, isError, response } = useMutation(loginData =>
    axios.post(`${baseUrl}/accounts/jwt/create/`, loginData)
  );

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

  const username = register('username', { required: true });
  const email = register('email', { required: true });

  return (
    <div className="MyTab" title="..ثبت نام..">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group field">
          <input type="input" className="form__field" placeholder="username" id="username" {...username} />
          <label htmlFor="username" className="form__label">
            نام‌کاربری
          </label>
        </div>

        <div className="form__group field">
          <input type="input" className="form__field" placeholder="email" id="email" {...email} />
          <label htmlFor="email" className="form__label">
            ایمیل
          </label>
        </div>

        <input className="submit-btn" type="submit" value="ثبت" />
      </form>
    </div>
  );
}
