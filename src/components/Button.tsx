import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 select-none whitespace-nowrap cursor-pointer rounded-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D97745] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315] disabled:opacity-50 disabled:pointer-events-none tracking-wider text-xs sm:text-sm uppercase';

  const sizeStyles = {
    sm: 'px-4 py-2 min-h-[36px]',
    md: 'px-5 py-2.5 min-h-[42px]',
    lg: 'px-6 sm:px-7 py-3 sm:py-3.5 min-h-[46px] sm:min-h-[50px]',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#D97745] text-[#111315] hover:bg-[#E5A06F] active:bg-[#c66838] border border-transparent',
    secondary:
      'bg-transparent text-[#F1EEE7] border border-[rgba(241,238,231,0.2)] hover:border-[#F1EEE7] hover:bg-[#171A1D]/60 active:bg-[#171A1D]',
    ghost:
      'bg-transparent text-[#A9AAA5] hover:text-[#F1EEE7] hover:bg-[#171A1D]/40 border border-transparent',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

