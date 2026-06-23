import Image from "next/image";
import Link from "next/link";

interface BannerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional click-through URL. Later wired up from playout admin / API. */
  href?: string;
  className?: string;
}

export default function Banner({
  src,
  alt,
  width,
  height,
  href,
  className,
}: BannerProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full h-auto rounded-sm"
      sizes="(max-width: 1280px) 100vw, 1280px"
      priority
    />
  );

  return (
    <div className={`px-4 ${className ?? ""}`}>
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
