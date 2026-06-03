import { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
  /**
   * Base name of the image (without extension or size suffix)
   * e.g., "hero-banner" for hero-banner-sm.webp, hero-banner-md.webp, etc.
   */
  baseName: string;
  
  /**
   * Available sizes with their suffixes
   * e.g., ["-sm", "-md", "-lg"]
   */
  imageSizes?: string[];
  
  /**
   * Media queries for each size (must match sizes array length)
   * e.g., ["(max-width: 640px)", "(max-width: 1024px)", "(min-width: 1025px)"]
   */
  mediaQueries?: string[];
  
  /**
   * Alt text for the image (required for accessibility)
   */
  alt: string;
  
  /**
   * Whether to use AVIF format with WebP fallback
   * @default true
   */
  useAvif?: boolean;
}

/**
 * ResponsiveImage component that automatically generates picture element
 * with AVIF and WebP sources for optimal performance.
 * 
 * Supports multiple sizes with media queries for responsive loading.
 */
export function ResponsiveImage({
  baseName,
  imageSizes = ["-sm", "-md", "-lg"],
  mediaQueries,
  alt,
  useAvif = true,
  className,
  loading = "lazy",
  ...props
}: ResponsiveImageProps) {
  // If no media queries provided, use default breakpoints
  const defaultMediaQueries = [
    "(max-width: 640px)",
    "(max-width: 1024px)",
    "(min-width: 1025px)",
  ];
  
  const queries = mediaQueries || defaultMediaQueries.slice(0, imageSizes.length);
  
  return (
    <picture>
      {/* Generate sources for each size */}
      {imageSizes.map((size, index) => {
        const media = queries[index];
        
        return (
          <div key={size}>
            {/* AVIF source (best compression) */}
            {useAvif && (
              <source
                media={media}
                srcSet={`/${baseName}${size}.avif`}
                type="image/avif"
              />
            )}
            
            {/* WebP source (fallback) */}
            <source
              media={media}
              srcSet={`/${baseName}${size}.webp`}
              type="image/webp"
            />
          </div>
        );
      })}
      
      {/* Fallback img tag (uses largest size) */}
      <img
        src={`/${baseName}${imageSizes[imageSizes.length - 1]}.webp`}
        alt={alt}
        loading={loading}
        className={className}
        {...props}
      />
    </picture>
  );
}
