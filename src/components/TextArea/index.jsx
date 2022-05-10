import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.scss';

function TextArea(
  {
    autoGrowHeight = true,
    label,
    error,
    className,
    onChange = () => {},
    placeholder,
    onInput,
    readOnly,
    disabled,
    required,
    value,
    ...props
  },
  ref
) {
  const isEditable = !readOnly && !disabled;

  function autoGrow(e) {
    e.target.style.height = '128px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleInput(e) {
    if (onInput) {
      onInput(e);
    }
    if (autoGrowHeight) {
      autoGrow(e);
    }
  }

  const TextAreaInput = (
    <textarea
      ref={ref}
      readOnly={readOnly}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onInput={handleInput}
      className={classNames('textarea', { 'textarea--disabled': !isEditable }, { 'textarea--error': error }, className)}
      placeholder={placeholder}
      {...props}
    />
  );

  return (
    <div className="textarea__container">
      {label && (
        <label>
          <span className="textarea__label">{label}</span>
          {TextAreaInput}
        </label>
      )}
      {!label && TextAreaInput}
      {error && <div className="textarea__text--error">{error}</div>}
    </div>
  );
}

export default forwardRef(TextArea);
