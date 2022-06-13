import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from 'src/components/LoginModal/Common';

export function BasicInput(props) {
  const { id, label, validation, placeholder, inputProps, isTextArea = false } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const basicInputProps = {
    ...register(id, validation),
    ...inputProps,
    className: `field-input ${errors[id] ? 'invalid' : ''} `,
    autoComplete: 'off',
    id: { id },
    placeholder: placeholder,
  };
  return (
    <div className="basic-field">
      {label && (
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      )}
      {isTextArea ? <textarea {...basicInputProps}></textarea> : <input {...basicInputProps} />}
      {errors[id] && <ErrorMessage error={errors[id]} />}
    </div>
  );
}
