import React from 'react';

export type ContainerWidth = 'narrow' | 'editorial' | 'wide' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  className?: string;
  children: React.ReactNode;
}

const widthStyles: Record<ContainerWidth, string> = {
  narrow: 'max-w-3xl',
  editorial: 'max-w-5xl',
  wide: 'max-w-6xl',
  full: 'w-full',
};

export const Container: React.FC<ContainerProps> = ({
  width = 'editorial',
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${widthStyles[width]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
