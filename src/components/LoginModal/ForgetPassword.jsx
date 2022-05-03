import React from 'react';
import './style.scss';
import toast from 'react-hot-toast';
import { LoginModalForm } from './Common';
import { useResetPass } from '../../apis/auth';
import { useLocation } from 'react-router-dom';
import ForgetPassImg from '../../assets/images/forgetPass.jpg';
import Navbar from '../Navbar';
import Footer from 'src/components/Footer';

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
        return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
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
          <LoginModalForm fields={['password', 're_password']} submit={submit}  isLoading={false}/>
        </div>
        <img src={ForgetPassImg} className="reset-password__image" />
      </div>

      <Footer />
    </>
  );
}
