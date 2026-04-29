'use client';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    const base =
      'relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide uppercase text-xs';

    const variants = {
      primary:
        'bg-gold text-white hover:bg-gold-dark focus:ring-gold shadow-luxury hover:shadow-[0_6px_24px_rgba(201,168,76,0.35)] hover:-translate-y-px active:translate-y-0 active:shadow-luxury btn-shimmer',
      secondary:
        'bg-charcoal text-white hover:bg-charcoal-light focus:ring-charcoal',
      ghost:
        'bg-transparent text-charcoal border border-charcoal/20 hover:bg-charcoal/5 focus:ring-charcoal/30',
      outline:
        'bg-transparent text-gold border border-gold hover:bg-gold hover:text-white focus:ring-gold',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 min-h-[44px]',
      lg: 'px-8 py-4 text-sm min-h-[44px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
