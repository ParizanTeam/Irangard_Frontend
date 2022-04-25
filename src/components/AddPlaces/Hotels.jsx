import React from 'react';
import AddPlaces from '../../assets/images/dish.png';
import headerIMG from '../../assets/images/Hotel.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';
import { baseUrl } from '../../utils/constants';
import toast from 'react-hot-toast';
import Header from 'src/components/Header';
import ImgDragDrop from 'src/components/ImageUploader/index';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'استخر',
  'چای ساز',
  'اتو',
  'اینترنت',
  'خدمات تماس بیدار باش',
  'تاکسی سرویس',
  'اینترنت در قسمت لابی',
  'مبلمان',
  'تخت خواب',
  'پیست دوچرخه',
];


export default function HotelForm(){
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

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className='main'>
      <div className='sub'>
        <div className='header'>
          <img src={headerIMG} alt="header" className='HeeadImg'/>
        </div>
      </div>
      <div className="Tab1">
        <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
          <div className="loginForm">
          <div className='r1'>
            <h1 style={{fontSize:'28px',color:'#000329',marginBottom:'40px',marginTop:'10px'}}>اطلاعات تکمیلی</h1>
            
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

              <div className="form__group1" dir='rtl'>
              <p style={{fontSize:'20px'}}>امکانات اقامتگاه</p>
              <FormControl sx={{ m: 1, width: '100%' ,marginTop:'20px'}}>
                <InputLabel id="demo-multiple-checkbox-label">لیست امکانات</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="لیست امکانات" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div> 

            <div className="form__group1">
            <p style={{fontSize:'20px',marginBottom:'20px'}}>عکسهای اقامتگاه</p>
              <ImgDragDrop/>
            </div>     

          </div>
          </div>
          <input className="submit-btn2" type="submit" value="ثبت این اقامتگاه" disabled={isLoading} />

        </form>

      </div>
    </div>
  );
}