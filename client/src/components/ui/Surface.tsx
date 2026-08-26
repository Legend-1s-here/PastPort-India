import React from 'react';

export type SurfaceVariant = 'museum' | 'cinematic' | 'subtle' | 'parchment';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<SurfaceVariant, string> = {
  museum: 'surface-museum',
  cinematic: 'surface-cinematic',
  subtle: 'surface-subtle',
  parchment: 'surface-parchment',
};

export const Surface: React.FC<SurfaceProps> = ({
  variant = 'museum',
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${variantStyles[variant]} ${
        interactive ? 'surface-museum-hover cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Surface;
