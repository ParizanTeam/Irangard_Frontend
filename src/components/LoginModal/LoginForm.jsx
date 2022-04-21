import React, { useState, useEffect } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ErrorMessage, TabHeader } from './Common';
import { useLogin, useForgetPass } from '../../apis/auth';

const ForgetPassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const email = register('email', { required: true });
  const { mutateAsync, isLoading } = useForgetPass();
  const onSubmit = userData => {
    toast.promise(mutateAsync(userData), {
      loading: 'در حال بررسی...',
      success: res => {
        return 'ایمیل با موفقیت برای شما ارسال شد.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        if (err.response.status === 404) return 'حساب کاربری با این ایمیل یافت نشد.';
        else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>لطفا ایمیل خود را وارد کنید.</div>
        <div className="form__group field">
          <input type="input" className="form__field" {...email} id="email" placeholder=" ایمیل" />
          <label htmlFor="email" className="form__label">
            ایمیل
          </label>
          {errors['email'] && <ErrorMessage error={errors['email']} />}
        </div>
        <input className="submit-btn" type="submit" value="ورود " disabled={isLoading} />
      </form>
    </>
  );
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fp, setFP] = React.useState(false);
  const [formTitle, setFT] = React.useState('ورود به حساب کاربری');
  const { mutateAsync, isLoading } = useLogin();
  const onSubmit = userData => {
    toast.promise(mutateAsync(userData), {
      loading: 'در حال بررسی...',
      success: res => {
        localStorage.setItem('access-token', res.data['access']);
        localStorage.setItem('refresh-token', res.data['refresh']);
        window.location.reload(false);
        return 'با موفقیت لاگین شدید.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        if (err.response.status === 401) return 'رمز یا نام‌کاربری اشتباه است.';
        else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };
  const handleFP = () => {
    setFP(true);
    setFT('فراموشی رمزعبور');
  };

  const username = register('username', { required: true });
  const password = register('password', { required: true });

  return (
    <>
      <TabHeader title={formTitle} />
      <div className="MyTab" title="..ورود..">
        {fp ? (
          <ForgetPassForm />
        ) : (
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                {...username}
                id="username"
                placeholder=" نام‌کاربری یا ایمیل"
              />
              <label htmlFor="username" className="form__label">
                نام‌کاربری یا ایمیل
              </label>
              {errors['username'] && <ErrorMessage error={errors['username']} />}
            </div>

            <div className="form__group field">
              <input type="input" className="form__field" {...password} id="password" placeholder="رمز عبور" />
              <label htmlFor="password" className="form__label">
                رمز عبور
              </label>
              {errors['password'] && <ErrorMessage error={errors['password']} />}
            </div>
            <div className="forget-password-link">
              رمز عبور خود را فراموش کرده اید؟
              <span onClick={handleFP}>کلیک کنید</span>
            </div>

            <input className="submit-btn" type="submit" value="ورود " disabled={isLoading} />
          </form>
        )}
      </div>
    </>
  );
}
