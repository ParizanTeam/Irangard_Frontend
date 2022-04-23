import React from 'react';
import AddPlaces from '../../assets/images/coffee1.png';
import header from '../../assets/images/Header2.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../../utils/constants';
import toast from 'react-hot-toast';

export default function Places(){
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
    <div className='mainC'>
      <div className='sub'>
        <div className='header'>
          <img src={header} alt="header" className='HeeadImg'/>
        </div>
      </div>
      <div className="Tab1">
        <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
          <div className="loginForm">
          <div className='r1'>
            <h1 style={{fontSize:'28px',color:'#291000',marginBottom:'10px',marginTop:'10px'}}>اطلاعات تکمیلی</h1>
            <div className="form__group1 field">
            <input
                type="input"
                className="form__field1"
                
                id="place"
                placeholder="مکان"
              />
              <label htmlFor="place" className="form__label1">
                مکان
              </label>
            </div>

            <div className="form__group1 field">
              <input type="input" className="form__fieldC"  id="about" placeholder="درباره" />
              <label htmlFor="about" className="form__labelC">
                درباره
              </label>
            </div>

            <div className="form__group1 field">
              <input
                type="input"
                className="form__fieldC"
                
                id="score"
                placeholder="امتیاز"
              />
              <label htmlFor="score" className="form__labelC">
              امتیاز
              </label>
            </div>

            
          </div>
          
          <div className='r1'>
            <h2 style={{fontSize:'28px',color:'#291000',marginBottom:'10px',marginTop:'10px'}}>درباره مکان</h2>
            <div className="form__group1 field">
            <input
                type="input"
                className="form__field1"
                
                id="place"
                placeholder="مکان"
              />
              <label htmlFor="place" className="form__label1">
                مکان
              </label>
            </div>

            <div className="form__group1 field">
              <input type="input" className="form__fieldC"  id="about" placeholder="درباره" />
              <label htmlFor="about" className="form__labelC">
                درباره
              </label>
            </div>

            <div className="form__group1 field">
              <input
                type="input"
                className="form__fieldC"
                
                id="score"
                placeholder="امتیاز"
              />
              <label htmlFor="score" className="form__labelC">
              امتیاز
              </label>
            </div>
          </div>
          </div>
          <input className="submit-btnC" type="submit" value="ثبت مکان" disabled={isLoading} />

        </form>
        <div className='map'>
          <img src={AddPlaces} alt="AddPlaces" style={{width:'180px',marginRight:'20px'}}/>
        </div>
      </div>
    </div>
  );
}