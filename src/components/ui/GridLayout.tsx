import React from 'react';
import { cn } from '../../lib/utils';

interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className,
  ...props
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gridGap = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        gridCols[columns],
        gridGap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 