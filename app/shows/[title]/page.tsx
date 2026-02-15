import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ShowsGrid from "@/components/shows-grid";
import VODCard from "@/components/vod-card";
import HorizontalScroller from "@/components/horizontal-scroller";
import { fetchVODs, categoriesToShows } from "@/lib/data";

interface ShowDetailPageProps {
  params: Promise<{ title: string }>;
}

export default async function ShowDetailPage({ params }: ShowDetailPageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const categories = await fetchVODs();
  const category = categories.find((c) => c.title === decodedTitle);

  if (!category) {
    notFound();
  }

  const isIgniteNews = category.title.toLowerCase().includes("ignite news");

  return (
    <div className="min-h-screen bg-background">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="px-4 md:px-8 pt-2 pb-2">
          <h1 className="text-lg font-bold text-primary font-serif italic">
            {category.title}
          </h1>
        </div>

        {/* Videos */}
        {category.series.length > 0 ? (
          <section className="px-4 md:px-8 py-6">
            <HorizontalScroller>
              {category.series.map((item) => (
                <VODCard
                  key={item.id}
                  item={item}
                  orientation={isIgniteNews ? "landscape" : "portrait"}
                />
              ))}
            </HorizontalScroller>
          </section>
        ) : (
          <div className="px-4 md:px-8 py-12 text-center">
            <p className="text-muted-foreground">
              No videos available yet for this show.
            </p>
          </div>
        )}

        {/* All Shows */}
        <ShowsGrid categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
