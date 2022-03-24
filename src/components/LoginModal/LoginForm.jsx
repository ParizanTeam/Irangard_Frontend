import React, { useState, useEffect } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../../utils/constants';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation(loginData =>
    axios.post(`${baseUrl}/accounts/auth/jwt/create`, loginData)
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
  const password = register('password', { required: true });

  return (
    <div className="MyTab" title="..ورود..">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__group field">
          <input type="input" className="form__field" {...username} id="username" placeholder=" نام‌کاربری یا ایمیل" />
          <label htmlFor="username" className="form__label">
            نام‌کاربری یا ایمیل
          </label>
          {errors?.username?.type === 'required' && <p>این فیلد باید پر شود.</p>}
        </div>

        <div className="form__group field">
          <input type="input" className="form__field" {...password} id="password" placeholder="رمز عبور" />
          <label htmlFor="password" className="form__label">
            رمز عبور
          </label>
          {errors?.password?.type === 'required' && <p>این فیلد باید پر شود.</p>}
        </div>

        <input className="submit-btn" type="submit" value="ورود " disabled={isLoading} />
      </form>
    </div>
  );
}
