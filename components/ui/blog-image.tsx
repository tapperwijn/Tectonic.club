'use client';

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export default function BlogImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  sizes,
  quality,
  placeholder,
  blurDataURL,
}: BlogImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn("transition-all duration-300", className)}
      priority={priority}
      fill={fill}
      sizes={sizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/placeholder-blog.jpg';
        target.style.objectFit = 'cover';
      }}
    />
  );
}
