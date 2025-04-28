import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('card', hoverable && 'card-hover', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('p-4 border-b border-gray-800', className)}
      {...props}
    />
  );
};

CardHeader.displayName = 'CardHeader';

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-100', className)}
      {...props}
    />
  );
};

CardTitle.displayName = 'CardTitle';

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn('text-sm text-gray-400', className)}
      {...props}
    />
  );
};

CardDescription.displayName = 'CardDescription';

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('p-4', className)} {...props} />;
};

CardContent.displayName = 'CardContent';

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('p-4 border-t border-gray-800', className)}
      {...props}
    />
  );
};

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };