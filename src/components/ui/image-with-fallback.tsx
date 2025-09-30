import React, { useState } from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackBehavior?: 'hide' | 'show-skeleton';
  skeletonClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackBehavior = 'hide',
  skeletonClassName,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src || error) {
    return fallbackBehavior === 'hide' ? null : (
      <Skeleton className={cn("w-full h-full", skeletonClassName)} />
    );
  }

  return (
    <>
      {loading && (
        <Skeleton className={cn("absolute inset-0 rounded-lg", skeletonClassName)} />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          loading ? 'opacity-0' : 'opacity-100',
          'transition-opacity duration-300',
          className
        )}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        {...props}
      />
    </>
  );
};
