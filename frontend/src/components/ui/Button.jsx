import React from 'react';

export default function Button({ children, onClick, className = "", variant = "default", disabled = false }) {
  const baseStyles = "font-medium rounded-xl px-6 py-3 transition-all duration-200 ease-in-out flex items-center justify-center gap-2 select-none";
  
  const variants = {
    default: `bg-neu-bg text-neu-text 
              ${disabled ? 'opacity-60 cursor-not-allowed shadow-none' : 'shadow-neu-flat hover:brightness-105 active:shadow-neu-pressed'}`,
    
    primary: `bg-neu-btn text-neu-text font-bold text-lg w-full
              ${disabled ? 'opacity-60 cursor-not-allowed shadow-none' : 'shadow-neu-btn-flat hover:brightness-105 active:shadow-neu-btn-pressed'}`,
              
    icon: `p-3 rounded-full bg-neu-bg text-neu-text
           ${disabled ? 'opacity-60 cursor-not-allowed' : 'shadow-neu-flat hover:brightness-105 active:shadow-neu-pressed'}`
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </button>
  );
}
