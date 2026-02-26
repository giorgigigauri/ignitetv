import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ShowsGrid from "@/components/shows-grid";
import VideoPlayer from "@/components/video-player";
import VODCard from "@/components/vod-card";
import HorizontalScroller from "@/components/horizontal-scroller";
import { fetchVODs, formatDuration, categoriesToShows } from "@/lib/data";

export default async function NewsPage() {
  const categories = await fetchVODs();
  const igniteNews = categories.find((c) =>
    c.title.toLowerCase().includes("ignite news"),
  );

  // Get the featured (first) video from Ignite News
  const featured = igniteNews?.series[0];
  const relatedItems = igniteNews?.series.slice(1) ?? [];

  const cleanTitle = featured
    ? featured.title
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    : "";

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="px-4 md:px-8 pt-2 pb-2">
          <h1 className="text-lg font-bold text-primary font-serif italic">
            Ignite News
          </h1>
        </div>

        {/* Video Player */}
        <div className="px-4 md:px-8">
          <VideoPlayer />
        </div>

        {featured && (
          <>
            {/* Article Title */}
            <div className="px-4 md:px-8 pt-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight text-balance">
                {cleanTitle}
              </h2>
            </div>

            {/* Article Content */}
            <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row gap-6">
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-full md:w-48">
                <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={featured.imageUrl || "/placeholder.svg"}
                    alt={cleanTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground flex-wrap">
                  <span>{formatDuration(featured.duration)}</span>
                  {featured.rdate && <span>{featured.rdate}</span>}
                  <Link
                    href="/news"
                    className="text-primary hover:underline focus-visible:underline focus-visible:outline-none font-medium"
                  >
                    Ignite News
                  </Link>
                </div>
                {featured.description ? (
                  <p className="text-sm text-foreground leading-relaxed">
                    {featured.description}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed italic">


                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Related News */}
        {relatedItems.length > 0 && (
          <section className="px-4 md:px-8 py-6">
            <h3 className="text-lg font-bold text-primary font-serif italic mb-4">
              Related News
            </h3>
            <HorizontalScroller>
              {relatedItems.map((item) => (
                <VODCard key={item.id} item={item} orientation="landscape" />
              ))}
            </HorizontalScroller>
          </section>
        )}

        {/* Shows Section */}
        <ShowsGrid categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
