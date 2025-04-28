import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'outline';
  }[];
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  actions = [],
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('mb-12', className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && (
            <p className="text-gray-400 mt-1">{description}</p>
          )}
        </div>
        {actions.length > 0 && (
          <div className="flex gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'default'}
                onClick={action.onClick}
                className="flex items-center gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}; 