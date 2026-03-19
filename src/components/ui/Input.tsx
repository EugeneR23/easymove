import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'block w-full px-4 py-3.5 border border-gray-300 bg-white text-charcoal placeholder-gray-300',
            'focus:outline-none focus:ring-0 focus:border-gold',
            'transition-colors duration-150 text-sm',
            error && 'border-red-400 focus:border-red-400',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
