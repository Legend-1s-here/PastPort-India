import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'burgundy' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brass-500 to-brass-600 hover:from-brass-400 hover:to-brass-500 text-charcoal-950 font-bold border border-brass-400/40 shadow-lg shadow-brass-500/20 active:translate-y-0.5',
  secondary:
    'bg-charcoal-850 hover:bg-charcoal-800 text-sandstone-200 hover:text-parchment-100 border border-brass-500/30 hover:border-brass-500/60 shadow-md active:translate-y-0.5',
  ghost:
    'bg-transparent hover:bg-charcoal-850 text-sandstone-300 hover:text-parchment-100 border border-transparent hover:border-charcoal-700',
  burgundy:
    'bg-burgundy-600 hover:bg-burgundy-500 text-parchment-100 border border-burgundy-400/30 shadow-md shadow-burgundy-900/30 active:translate-y-0.5',
  outline:
    'bg-transparent hover:bg-charcoal-850/60 text-brass-400 border border-brass-500/40 hover:border-brass-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 min-h-[36px]',
  md: 'px-4 py-2 text-xs sm:text-sm rounded-xl gap-2 min-h-[42px]',
  lg: 'px-6 py-3 text-sm sm:text-base rounded-xl gap-2.5 min-h-[48px]',
  icon: 'p-2 rounded-xl min-w-[40px] min-h-[40px] flex items-center justify-center',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
