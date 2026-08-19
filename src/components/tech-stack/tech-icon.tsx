import { useState, useEffect, useRef } from "react";

// Deterministic palette for fallback badges
const FALLBACK_GRADIENTS = [
  "from-violet-600 to-indigo-700",
  "from-cyan-600 to-blue-700",
  "from-emerald-600 to-teal-700",
  "from-amber-600 to-orange-700",
  "from-rose-600 to-pink-700",
  "from-fuchsia-600 to-purple-700",
  "from-blue-600 to-sky-700",
  "from-teal-600 to-cyan-700",
];

function getGradientForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % FALLBACK_GRADIENTS.length;
  return FALLBACK_GRADIENTS[index];
}

// Fallback icon component
export const FallbackIcon = ({ name, size = 32 }: { name: string; size?: number }) => {
  const gradient = getGradientForName(name || "Tech");
  const initial = (name || "T").charAt(0).toUpperCase();
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-md border border-white/10 shadow-xs flex items-center justify-center text-white font-bold select-none shrink-0`}
      style={{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.max(10, Math.floor(size * 0.45))}px` }}
      title={name}
    >
      {initial}
    </div>
  );
};

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
