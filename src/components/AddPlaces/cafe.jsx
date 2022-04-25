import React from 'react';
import AddPlaces from '../../assets/images/coffee1.png';
import header from '../../assets/images/Header2.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../../utils/constants';
import toast from 'react-hot-toast';
import ImgDragDrop from 'src/components/ImageUploader/index';

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
    <div className='main'>
      <div className='sub'>
        <div className='header'>
          <img src={header} alt="header" className='HeeadImg'/>
        </div>
      </div>
      <div className="Tab1">
        <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
          <div className="loginForm">
          <div className='r1'>
            <h1 style={{fontSize:'28px',color:'#000329',marginBottom:'10px',marginTop:'10px'}}>اطلاعات تکمیلی</h1>
            <div className="form__group1 field">
            <input
                type="input"
                className="form__field1"
                
                id="place-name"
                placeholder="نام مکان مورد نظر را اینجا وارد کنید."
              />
              <label htmlFor="place-name" className="form__label1">
                نام مکان
              </label>
            </div>

            <div className="form__group1 field">
            <input
                type="input"
                className="form__field1"
                
                id="about-this-place"
                placeholder="درباره مکان مورد نظر به طور مختصر بنویسید."
              />
              <label htmlFor="about-this-place" className="form__label1">
              درباره مکان
              </label>
            </div>

            <div className="form__group1 field">
            <input
                type="input"
                className="form__field1"
                
                id="place-stars"
                placeholder="امتیاز مکان مورد نظر را وارد کنید."
              />
              <label htmlFor="place-stars" className="form__label1">
              امتیاز مکان
              </label>
            </div>  

            <div className="form__group1">
            <p style={{fontSize:'20px',marginBottom:'20px'}}>عکسهای کافه/رستوران</p>
              <ImgDragDrop/>
            </div>     
            
          </div>
          
          </div>
          <input className="submit-btn2" type="submit" value="ثبت این کافه/رستوران" disabled={isLoading} />

        </form>
        <div className='map'>
          <img src={AddPlaces} alt="AddPlaces" style={{width:'180px',marginRight:'20px'}}/>
        </div>
      </div>
    </div>
  );
}