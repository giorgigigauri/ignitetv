import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ShowWatch from "@/components/show-watch";
import HorizontalScroller from "@/components/horizontal-scroller";
import {
  fetchVODs,
  categoriesToShows,
  visibleCategories,
  findCategoryBySlug,
  slugify,
} from "@/lib/data";

interface ShowDetailPageProps {
  params: Promise<{ title: string }>;
  searchParams: Promise<{ ep?: string; play?: string }>;
}

export async function generateMetadata({ params }: ShowDetailPageProps) {
  const { title } = await params;
  const categories = await fetchVODs();
  const category = findCategoryBySlug(categories, title);
  return {
    title: `${category?.title ?? "Shows"} - Ignite Television`,
  };
}

export default async function ShowDetailPage({
  params,
  searchParams,
}: ShowDetailPageProps) {
  const { title } = await params;
  const { ep, play } = await searchParams;
  const categories = await fetchVODs();

  let category = findCategoryBySlug(categories, title);

  // Legacy URLs used the encoded show title; redirect them to the clean slug.
  if (!category) {
    const decodedTitle = decodeURIComponent(title);
    const legacy = categories.find((c) => c.title === decodedTitle);
    if (legacy) {
      redirect(`/shows/${slugify(legacy.title)}`);
    }
    notFound();
  }

  const otherShows = visibleCategories(categories).filter(
    (c) => c.id !== category.id,
  );

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(visibleCategories(categories))} />

      <main className="max-w-7xl mx-auto pt-4">
        <ShowWatch
          category={category}
          initialEpisodeId={ep}
          autoPlay={play === "1" || Boolean(ep)}
        />

        {/* More programs */}
        {otherShows.length > 0 && (
          <section className="py-8">
            <h3 className="px-4 md:px-8 text-base font-bold text-primary uppercase tracking-wider mb-4">
              More Programs
            </h3>
            <HorizontalScroller>
              {otherShows.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shows/${slugify(cat.title)}`}
                  className="flex-shrink-0 group rounded-sm w-[130px] md:w-[150px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={cat.poster || "/placeholder.svg"}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
                      sizes="150px"
                    />
                  </div>
                  <p className="mt-2 text-xs text-foreground group-hover:text-primary group-focus-visible:text-primary transition-colors truncate">
                    {cat.title}
                  </p>
                </Link>
              ))}
            </HorizontalScroller>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
