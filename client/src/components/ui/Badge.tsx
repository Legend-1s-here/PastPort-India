import React from 'react';

export type BadgeVariant = 'brass' | 'sandstone' | 'terracotta' | 'burgundy' | 'charcoal';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  brass: 'bg-brass-500/15 text-brass-300 border-brass-500/35',
  sandstone: 'bg-sandstone-400/15 text-sandstone-300 border-sandstone-400/30',
  terracotta: 'bg-terracotta-500/15 text-terracotta-300 border-terracotta-500/35',
  burgundy: 'bg-burgundy-500/20 text-burgundy-400 border-burgundy-400/30',
  charcoal: 'bg-charcoal-800 text-sandstone-300 border-charcoal-700',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'brass',
  className = '',
  children,
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase border ${badgeVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
