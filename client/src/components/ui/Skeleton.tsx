import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-shimmer rounded-xl border border-charcoal-800/60 ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
