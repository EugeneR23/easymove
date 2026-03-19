import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost' |
  'pending' | 'reviewed' | 'sent' | 'accepted' | 'declined' | 'default';

const colors: Record<BadgeVariant, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  sent: 'bg-purple-100 text-purple-800',
  accepted: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-700',
};

export default function Badge({ label, variant = 'default', className }: {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
      colors[variant] ?? colors.default,
      className,
    )}>
      {label}
    </span>
  );
}
