import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'black', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const buttonClasses = `button ${variant} ${fullWidth ? 'full-width' : ''} ${className}`;

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;