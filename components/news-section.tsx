import type { VODCategory } from "@/lib/data";
import VODCard from "./vod-card";
import HorizontalScroller from "./horizontal-scroller";

interface NewsSectionProps {
  category: VODCategory;
}

export default function NewsSection({ category }: NewsSectionProps) {
  if (!category || category.series.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-6">
      <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-4 font-serif italic">
        {category.title}
      </h2>
      <HorizontalScroller>
        {category.series.map((item) => (
          <VODCard key={item.id} item={item} orientation="landscape" />
        ))}
      </HorizontalScroller>
    </section>
  );
}
