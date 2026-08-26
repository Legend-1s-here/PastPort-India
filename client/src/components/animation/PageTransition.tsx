import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Route-level page transition wrapper.
 * Provides a subtle fade and vertical translate on route change.
 * Fully honors prefers-reduced-motion.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className={`animate-page-enter ${className}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
