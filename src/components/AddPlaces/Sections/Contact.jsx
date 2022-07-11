import React from 'react';
import { BasicInput, WorkTimeInput } from '../Inputs';

export default function ContactSection(props) {

  const phone_validation = {
    pattern: {
      value: /[0-9]{2,14}$/i,
      message: 'شماره تلفن نامعتبر است.',
    },
  };
  const email_validation = {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'ایمیل نامعتبر است.',
    },
  };

  const website_validation = {
    pattern: {
      value:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      message: 'آدرس سایت نامعتبر است.',
    },
  };

  const insta_validation = {
    pattern: {
      value:
        /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
      message: 'آیدی اینستاگرام نامعتبر است.',
    },
  };
  return (
    <div className="contact-section">
      <h1 className="title">اطلاعات تماس</h1>

      <BasicInput
        id="phone"
        type="tel"
        label="تلفن"
        placeholder="شماره‌همراه یا تلفن مکان را وارد کنید"
        validation={phone_validation}
      />

      <BasicInput
        id="email"
        type="email"
        label="ایمیل"
        placeholder="ایمیل ارتباطی را وارد کنید"
        validation={email_validation}
      />
      <BasicInput id="website" label="سایت" placeholder="سایت مکان را وارد کنید" validation={website_validation} />
      <BasicInput id="instagram" label="اینستاگرام" placeholder="آیدی صفحه اینستاگرام مکان را وارد کنید" validation={insta_validation} />

      <div className="basic-field worktime">
        <label htmlFor="worktime" className="field__label">
          ساعت کار
        </label>
        <WorkTimeInput />
      </div>
    </div>
  );
}
