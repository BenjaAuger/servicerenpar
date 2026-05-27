import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ImageWithFallback({ src, alt, className, onError, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={props.loading ?? 'lazy'}
      decoding={props.decoding ?? 'async'}
      referrerPolicy={props.referrerPolicy ?? 'strict-origin-when-cross-origin'}
      onError={(event) => {
        setError(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
