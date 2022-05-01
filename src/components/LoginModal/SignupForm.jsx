import React, { useState, useEffect } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ErrorMessage, TabHeader } from './Common';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useSetPassword, useActivateAccount, useCheckCode } from '../../apis/auth';
const SignupS3 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const setPass = useSetPassword();

  const password = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: 'نام‌کاربری باید ییشتر از ۶ کارکتر باشد.',
    },
    maxLength: {
      value: 50,
      message: 'نام‌کاربری باید کمتر از ۵۰ کارکتر باشد.',
    },
  });
  const confirmPassword = register('confirmPassword', {
    required: true,
    validate: val => {
      if (watch('password') != val) {
        return 'تکرار رمز با رمز‌عبور یکسان نمی‌باشد.';
      }
    },
  });
  const fields = {
    password: { ...password },
    confirmPassword: { ...confirmPassword },
  };
  const labels = {
    password: 'رمز‌عبور',
    confirmPassword: 'تکرار رمز‌عبور',
  };

  const s3_submit = userData => {
    const formData = new FormData();
    formData.append('username', localStorage.getItem('username'));
    formData.append('email', localStorage.getItem('email'));
    formData.append('token', localStorage.getItem('user-code'));
    formData.append('password', userData.password);
    formData.append('re_password', userData.confirmPassword);
    toast.promise(setPass.mutateAsync(formData), {
      loading: 'در حال بررسی...',
      success: 'حساب شما با موفقیت ساخته شد.',
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };
  return (
    <form className="login-form" onSubmit={handleSubmit(s3_submit)}>
      {Object.entries(fields).map(([inputName, inputRegister]) => (
        <div key={inputName} className="form__group field">
          <input type="input" className="form__field" placeholder={inputName} id={inputName} {...inputRegister} />
          <label htmlFor={inputName} className="form__label">
            {labels[inputName]}
          </label>
          {errors[inputName] && <ErrorMessage error={errors[inputName]} />}
        </div>
      ))}

      <input className="submit-btn" type="submit" value="ثبت" />
    </form>
  );
};





export default function SignupForm({ handleFormIsDirty }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [vertiCode, setVertiCode] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
    },
  });
  useEffect(() => {
    handleFormIsDirty(isDirty);
  }, [isDirty]);


  const authActivate = useActivateAccount();
  const checkCode = useCheckCode();

  const s1_submit = userData => {
    toast
      .promise(authActivate.mutateAsync(userData), {
        loading: 'در حال بررسی...',
        success: res => {
          localStorage.setItem('email', userData.email);
          localStorage.setItem('username', userData.username);

          return 'کد تایید به ایمیلتون فرستاده شد.';
        },
        error: err => {
          if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
          let resp = err.response;
          let problem = resp.data.split(' ')[0];
          if (resp.status === 400) {
            if (problem === 'username') return 'نام کاربری تکراری است.';
            else if (problem === 'email') return 'این ایمیل قبلا در سیستم ثبت شده است.';
          } else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
        },
      })
      .then(x => setCurrentStep(1));
  };

  const s2_submit = code => {
    if (code.length !== 6) return;
    console.log('code', code);
    localStorage.setItem('user-code', code);
    toast
      .promise(checkCode.mutateAsync({ email: localStorage.getItem('email'), token: code }), {
        loading: 'در حال بررسی...',
        success: 'لطفا برای حساب خود رمز انتخاب کنید',
        error: err => {
          if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
          let resp = err.response;
          if (resp.status === 400) {
            return 'کد صحیح نمیباشد.';
          } else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
        },
      })
      .then(x => setCurrentStep(2));
  };

  const username = register('username', {
    required: true,
    minLength: {
      value: 4,
      message: 'نام‌کاربری باید ییشتر از ۴ کارکتر باشد.',
    },
    maxLength: {
      value: 10,
      message: 'نام‌کاربری باید کمتر از ۱۰ کارکتر باشد.',
    },
    pattern: {
      value: /^[a-z0-9]*$/i,
      message: 'نام‌کاربری تنها باید از حروف و اعداد انگلیسی تشکیل شده باشد.',
    },
  });
  const email = register('email', {
    required: true,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'ایمیل نامعتبر است.',
    },
  });

  const fields = {
    username: { ...username },
    email: { ...email },
  };
  const labels = {
    username: 'نام‌کاربری',
    email: 'ایمیل',
  };

  return (
    <>
      <TabHeader title="بیا یه ایرانگرد شو" />

      <div className="MyTab" title="..ثبت نام..">
        {currentStep === 0 && (
          <form className="login-form" onSubmit={handleSubmit(s1_submit)}>
            {Object.entries(fields).map(([inputName, inputRegister]) => (
              <div key={inputName} className="form__group field">
                <input type="input" className="form__field" placeholder={inputName} id={inputName} {...inputRegister} />
                <label htmlFor={inputName} className="form__label">
                  {labels[inputName]}
                </label>
                {errors[inputName] && <ErrorMessage error={errors[inputName]} />}
              </div>
            ))}

            <input className="submit-btn" type="submit" value="ثبت" />
          </form>
        )}
        {currentStep === 1 && (
          <div className="login-form">
            لطفا کد تایید ایمیل رو وارد کن
            <div className="custom-styles">
              <ReactInputVerificationCode
                length={6}
                autoFocus={true}
                onChange={setVertiCode}
                value={vertiCode}
                placeholder=""
                onCompleted={code => s2_submit(code)}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && <SignupS3 />}
      </div>
    </>
  );
}
