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
    
    apiInstance.post(`${baseUrl}/accounts/admin/add-user/`,{
      username:userData.username,
      email:userData.email,
      password:userData.password,
      re_password:userData.password
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
