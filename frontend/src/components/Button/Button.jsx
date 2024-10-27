import React from 'react';
import { cn } from "../../lib/utils";

const Button = ({ 
  children, 
  variant = 'black', 
  fullWidth = false, 
  className, 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 ease-in-out";
  
  const variantStyles = {
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
    black: "bg-gray-900 hover:bg-gray-800 focus:ring-gray-500"
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], widthStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;