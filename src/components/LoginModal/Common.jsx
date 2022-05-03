import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import HeaderImg from '../../assets/images/loginHead.jpg';
import HeaderImg2 from '../../assets/images/loginHead2.jpg';
import './style.scss';
const commonErrors = {
  required: 'این فیلد باید پر شود.',
};

export const ErrorMessage = ({ error }) => {
  console.log('error', error);

  let errorMsg = 'ارور';
  if (error.type in commonErrors) errorMsg = commonErrors[error.type];
  else errorMsg = error.message;
  return (
    <div className="error-msg">
      <p>{errorMsg}</p>
    </div>
  );
};
export const TabHeader = ({ title }) => {
  return (
    <div className="login-modal__TabHeader">
      <img src={HeaderImg} alt="Hello" className="login-modal__HeaderImg" />
      <div className="tab-header-title"> {title}</div>
      <img src={HeaderImg2} alt="Hello" className="login-modal__HeaderImg" />
    </div>
  );
};

export const getFields = (watch, field_list) => {
  const fields = {
    user_email: {
      label: 'نام‌کاربری یا ایمیل',
      validation: {
        required: true,
      },
    },
    username: {
      label: 'نام کاربری',
      validation: {
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
      },
    },
    email: {
      label: 'ایمیل',
      validation: {
        required: true,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'ایمیل نامعتبر است.',
        },
      },
    },
    password: {
      label: 'رمز عبور',
      validation: {
        required: true,
        minLength: {
          value: 6,
          message: 'رمز عبور باید ییشتر از ۶ کارکتر باشد.',
        },
        maxLength: {
          value: 50,
          message: 'رمز عبور باید کمتر از ۵۰ کارکتر باشد.',
        },
      },
    },
    re_password: {
      label: 'تکرار رمز عبور',
      validation: {
        required: true,
        validate: val => {
          if (watch('password') != val) {
            return 'تکرار رمز با رمز‌عبور یکسان نمی‌باشد.';
          }
        },
      },
    },
  };
  return field_list.map(x => ({ id: x, ...fields[x] }));
};

export const LoginModalForm = ({ fields, onSubmit,isLoading, onDirty, isLogin = false,onForgetPassClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
    },
  });
  useEffect(() => {
    if (onDirty) onDirty(isDirty);
  }, [isDirty]);
  return (
    <form className="login-modal-form" onSubmit={handleSubmit(onSubmit)}>
      {getFields(watch, fields).map(field => {
        return (
          <div key={field.id} className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder={field.id}
              id={field.id}
              {...register(field.id, field.validation)}
            />
            <label htmlFor={field.id} className="form__label">
              {field.label}
            </label>
            {errors[field.id] && <ErrorMessage error={errors[field.id]} />}
          </div>
        );
      })}
      {isLogin && (
        <div className="forget-password-link">
          رمز عبور خود را فراموش کرده اید؟
          <span onClick={onForgetPassClick}>کلیک کنید</span>
        </div>
      )}
      <input className="submit-btn" type="submit" value={isLogin ? 'ورود' : 'ثبت'} disabled={isLoading} />
    </form>
  );
};
