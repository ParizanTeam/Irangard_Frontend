import React from 'react';
import classNames from 'classnames';
import './style.scss';

function Button({ type = 'button', variant = 'black', className, children, ...props }) {
  return (
    <button
      className={classNames(
        'button',
        {
          orange: variant === 'orange',
          black: variant === 'black',
          blue: variant === 'blue',
          green: variant === 'green',
          red: variant === 'red',
          purple: variant === 'purple',
          white: variant === 'white',
        },
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
