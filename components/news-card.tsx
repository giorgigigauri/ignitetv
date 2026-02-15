import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/data";

interface NewsCardProps {
  item: NewsItem;
  orientation?: "landscape" | "portrait";
}

export default function NewsCard({
  item,
  orientation = "landscape",
}: NewsCardProps) {
  const isLandscape = orientation === "landscape";

  return (
    <Link
      href="/news"
      className="flex-shrink-0 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ width: "160px" }}
    >
      <div
        className={`relative overflow-hidden rounded-sm bg-muted ${
          isLandscape ? "aspect-video" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
          sizes="160px"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 group-focus-visible:bg-primary/10 transition-colors duration-300" />
      </div>
      <p className="mt-1.5 text-xs text-center text-foreground truncate group-hover:text-primary group-focus-visible:text-primary transition-colors">
        {item.title}
      </p>
      <p className="text-[10px] text-center text-muted-foreground">
        {item.date}
      </p>
    </Link>
  );
}
