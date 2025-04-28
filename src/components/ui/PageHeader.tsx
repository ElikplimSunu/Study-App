import React from 'react';
import { Button } from './button';
import { PlusCircle, Upload } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'outline';
  }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions = [],
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
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
  );
}; 