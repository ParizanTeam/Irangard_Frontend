import React, { useState, useEffect } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import toast from 'react-hot-toast';
import { TabHeader, LoginModalForm } from './commonForm';
import { useAddUser} from '../../api/auth';
import { baseUrl } from '../../utils/constants';
import apiInstance from '../../config/axios';
import './style.scss';

export const SignupForm = ({ handleFormIsDirty }) => {

  const AddUser = useAddUser();


  const submit = userData => {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    
    toast.promise(apiInstance.post(`${baseUrl}/accounts/admin/add-user/`, formData), {
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
