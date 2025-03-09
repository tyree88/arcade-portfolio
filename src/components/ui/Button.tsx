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