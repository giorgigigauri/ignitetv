import Header from "@/components/header";
import Footer from "@/components/footer";
import ShowsGrid from "@/components/shows-grid";
import VODCard from "@/components/vod-card";
import HorizontalScroller from "@/components/horizontal-scroller";
import { fetchVODs } from "@/lib/data";

export default async function ShowsPage() {
  const categories = await fetchVODs();

  // Ignite News uses landscape orientation, all others use portrait
  const igniteNews = categories.find((c) =>
    c.title.toLowerCase().includes("ignite news"),
  );
  const otherShows = categories.filter(
    (c) => !c.title.toLowerCase().includes("ignite news"),
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="px-4 md:px-8 pt-2 pb-2">
          <h1 className="text-lg font-bold text-primary font-serif italic">
            Ignite News
          </h1>
        </div>

        {/* Shows Grid */}
        <ShowsGrid categories={categories} />

        {/* Ignite News - Landscape Cards */}
        {igniteNews && igniteNews.series.length > 0 && (
          <section className="px-4 md:px-8 py-6">
            <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-4 font-serif italic">
              {igniteNews.title}
            </h2>
            <HorizontalScroller>
              {igniteNews.series.map((item) => (
                <VODCard key={item.id} item={item} orientation="landscape" />
              ))}
            </HorizontalScroller>
          </section>
        )}

        {/* Portrait Sections for other shows */}
        {otherShows.map(
          (cat) =>
            cat.series.length > 0 && (
              <section key={cat.id} className="px-4 md:px-8 py-6">
                <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-4 font-serif italic">
                  {cat.title}
                </h2>
                <HorizontalScroller>
                  {cat.series.map((item) => (
                    <VODCard
                      key={item.id}
                      item={item}
                      orientation="portrait"
                    />
                  ))}
                </HorizontalScroller>
              </section>
            ),
        )}
      </main>

      <Footer />
    </div>
  );
}
