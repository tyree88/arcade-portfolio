'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-full transition-colors flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-foreground text-background hover:bg-[rgb(56,56,56)] dark:hover:bg-[rgb(204,204,204)]',
    secondary: 'border border-solid border-black/[.08] dark:border-white/[.145] hover:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)] hover:border-transparent'
  };
  
  const sizeStyles = {
    sm: 'text-xs h-8 px-3',
    md: 'text-sm h-10 px-4',
    lg: 'text-base h-12 px-5'
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses = "relative font-bold text-uppercase letter-spacing-1 transition-all duration-200 transform";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-ps-green to-ps-sage border-2 border-ps-tan text-ps-cream",
    secondary: "bg-ps-cream text-ps-brown border-2 border-ps-brown",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  
  const shadowClasses = variant === 'primary' 
    ? "shadow-ps hover:shadow-none" 
    : "shadow-[0_4px_0_0_#5d4f4d] hover:shadow-none";
  
  const hoverClasses = "hover:translate-y-1 active:translate-y-2";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${shadowClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
