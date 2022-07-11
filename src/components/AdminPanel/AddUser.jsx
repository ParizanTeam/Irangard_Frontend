import React, { useState, useEffect } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import toast from 'react-hot-toast';
import { TabHeader, LoginModalForm } from './commonForm';
import { useAddUser, useForgetPass, useSetPassword, useActivateAccount, useCheckCode } from '../../api/auth';
import BlueMailImg from '../../assets/images/blueMail.png';
import './style.scss';

export const SignupForm = ({ handleFormIsDirty }) => {

  const authActivate = useActivateAccount();
  const AddUser = useAddUser();


  const submit = userData => {
    const formData = new FormData();
    formData.append('username', localStorage.getItem('username'));
    formData.append('email', localStorage.getItem('email'));
    formData.append('token', localStorage.getItem('user-code'));
    formData.append('password', userData.password);

    toast.promise(AddUser.mutateAsync(formData), {
      loading: 'در حال بررسی...',
      success: 'حساب کاربری با موفقیت ساخته شد.',
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        return `مشکلی پیش آمد، دوباره امتحان کنید.`;
      },
    });
  };

  return (
    <>

      <div className="login-modal__TabContent">
          <LoginModalForm
            fields={['username', 'email', 'password']}
            onSubmit={submit}
            onDirty={handleFormIsDirty}
          />
      </div>
    </>
  );
};
