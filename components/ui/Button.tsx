import { type ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-periwinkle text-white hover:bg-periwinkle-dark',
  secondary: 'bg-periwinkle text-white hover:bg-periwinkle-dark',
  outline: 'border-2 border-periwinkle text-periwinkle hover:bg-periwinkle hover:text-white',
  ghost: 'text-text-primary hover:bg-cream-dark',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium font-ui transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
  children,
}: LinkButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium font-ui transition-colors duration-150 ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
