import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={4}
          className={cn(
            'block w-full px-4 py-3.5 border border-gray-300 bg-white text-charcoal placeholder-gray-300 resize-none',
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
Textarea.displayName = 'Textarea';
export default Textarea;
