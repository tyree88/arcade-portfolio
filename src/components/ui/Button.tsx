'use client';

import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles shared by all buttons
  const baseStyles = "rounded-full transition-all duration-200 font-bold flex items-center justify-center transform";
  
  // PlayStation-themed styling for different variants
  const variantStyles = {
    primary: "bg-gradient-to-r from-ps-green to-ps-sage border-2 border-ps-tan text-ps-cream",
    secondary: "border border-solid border-black/[.08] dark:border-white/[.145] bg-ps-cream text-ps-brown hover:bg-[rgb(242,242,242)] dark:hover:bg-[rgb(26,26,26)]"
  };
  
  // Size variations
  const sizeStyles = {
    sm: "text-xs h-8 px-3 py-1",
    md: "text-sm h-10 px-4 py-2",
    lg: "text-base h-12 px-5 py-3"
  };
  
  // Shadow effects based on variant
  const shadowStyles = variant === 'primary' 
    ? "shadow-ps hover:shadow-none" 
    : "shadow-[0_4px_0_0_rgb(93,79,77)] hover:shadow-none";
  
  // Hover and active states
  const interactionStyles = "hover:translate-y-1 active:translate-y-2";
  
  // Combine all styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${shadowStyles} ${interactionStyles} ${className}`;
  
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
