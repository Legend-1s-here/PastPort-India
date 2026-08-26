import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  title: string;
  description: string;
  actionText?: string;
  actionTo?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  badgeText,
  badgeVariant = 'brass',
  title,
  description,
  actionText,
  actionTo,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`text-center py-16 px-4 sm:px-6 max-w-md mx-auto space-y-5 surface-subtle rounded-3xl p-8 border border-brass-500/20 shadow-2xl ${className}`}
    >
      {/* Icon Area */}
      <div className="w-16 h-16 rounded-2xl bg-brass-500/10 flex items-center justify-center mx-auto border border-brass-500/25 shadow-lg shadow-brass-500/10">
        {icon || <AlertCircle className="w-8 h-8 text-brass-400" />}
      </div>

      {badgeText && (
        <div>
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      )}

      {/* Title & Description */}
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-parchment-100 tracking-wide">
          {title}
        </h2>
        <p className="font-editorial text-sm sm:text-base text-sandstone-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Button */}
      {(actionText && (actionTo || onAction)) && (
        <div className="pt-2">
          {actionTo ? (
            <Link to={actionTo} className="inline-block focus-visible:outline-none">
              <Button
                variant="primary"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={onAction}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
