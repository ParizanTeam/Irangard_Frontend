import React from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { LoginModalForm } from './Common';
import { useResetPass } from '../../api/auth';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ForgetPassImg from '../../assets/images/forgetPass.jpg';
import './style.scss';

export default function ForgetPassword() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token').slice(0, -1);
  const uid = query.get('uid');

  const setPass = useResetPass();

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
        return `مشکلی پیش آمد، دوباره امتحان کنید.`;
      },
    });
  };
  return (
    <>
      <Navbar />

      <div className="reset-password">
        <h1 className="reset-password__title">فراموشی رمز</h1>
        <p className="reset-password__description">رمز جدید برای خود انتخاب کنید.</p>
        <div className="reset-password__form">
          <LoginModalForm fields={['password', 're_password']} onSubmit={submit}  isLoading={false}/>
        </div>
        <img src={ForgetPassImg} className="reset-password__image" />
      </div>

      <Footer />
    </>
  );
}
