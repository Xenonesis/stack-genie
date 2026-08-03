import { useState, useEffect, useRef } from "react";

// Fallback icon component
export const FallbackIcon = ({ name, size = 32 }: { name: string; size?: number }) => (
  <div
    className="bg-gray-600 rounded-md border border-border shadow-xs flex items-center justify-center text-foreground font-bold"
    style={{ width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.4}px` }}
  >
    {name.charAt(0).toUpperCase()}
  </div>
);

// Custom Image component with error handling
export const TechIcon = ({ src, alt, width, height, className }: {
  src?: string;
  alt: string;
  width: number;
  height?: number;
  className?: string;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const iconHeight = height || width;

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth === 0 && imgRef.current.naturalHeight === 0) {
        setHasError(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [src]);

  if (!src || hasError) {
    return <FallbackIcon name={alt} size={width} />;
  }

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: `${width}px`, height: `${iconHeight}px` }}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        style={{ width: `${width}px`, height: `${iconHeight}px`, objectFit: "contain" }}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
