import React from 'react';
import AddPlacesImg from '../../assets/images/add.png';
import headerImg from '../../assets/images/Header1.jpg';
import './style.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Header from 'src/components/Header';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IranStates, IranCities } from './info.js';

const styles = theme => ({
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: 'white',
  },
});

export default function Places() {
  return (
    <div className="main">
      <Header />
      <div className="header">
        <img src={headerImg} alt="header" className="HeeadImg" />
      </div>
      <form className="add-place-form">
        <h1 className="title">نقشه</h1>

        <div>
          <label htmlFor="state" className="field__label">
            استان
          </label>

          <Autocomplete
            disablePortal
            options={IranStates}
            sx={{ width: 300 }}
            renderInput={params => (
              <div ref={params.InputProps.ref} className="basic-field">
                <input  {...params.inputProps} className="field-input" type="text" id="state" placeholder="استان را انتخاب کنید." />
              </div>
            )}
          />
        </div>

        {/* <div className="form__group1 field">
          <input type="input" className="form__field1" id="about" placeholder="درباره" />
          <label htmlFor="about" className="form__label1">
            درباره
          </label>
        </div> */}

        <div className="basic-field">
          <label htmlFor="street-address" className="field__label">
            آدرس خیابان
          </label>
          <input
            className="field-input"
            type="input"
            id="street-address"
            placeholder="آدرس خیابان و پلاک ساختمان را اینجا وارد کنید."
          />
        </div>

        <h2 className="title">اطلاعات تماس</h2>
        <div className="form__group1 field">
          <input type="input" className="form__field1" id="phoneNumber" placeholder="تلفن" />
          <label htmlFor="phoneNumber" className="form__label1">
            تلفن
          </label>
        </div>

        <div className="form__group1 field">
          <input type="input" className="form__field1" id="email" placeholder="ایمیل" />
          <label htmlFor="email" className="form__label1">
            ایمیل
          </label>
        </div>

        <div className="form__group1 field">
          <input type="input" className="form__field1" id="socialMedia" placeholder="سایت" />
          <label htmlFor="socialMedia" className="form__label1">
            سایت
          </label>
        </div>
        <input className="submit-btn2" type="submit" value="ثبت مکان" />
      </form>
      <div className="map">
        <img src={AddPlacesImg} alt="AddPlaces" style={{ width: '180px', marginRight: '20px' }} />
      </div>
    </div>
  );
}
