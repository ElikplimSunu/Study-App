import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className,
  ...props
}) => {
  const [error, setError] = React.useState(!src);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const getFallbackInitials = () => {
    if (fallback) return fallback.charAt(0).toUpperCase();
    if (alt) return alt.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-gray-700',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-medium text-gray-100 bg-primary-700">
          {getFallbackInitials()}
        </div>
      )}
    </div>
  );
};

export default Avatar;