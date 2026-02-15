import Header from "@/components/header";
import Footer from "@/components/footer";
import VODCard from "@/components/vod-card";
import HorizontalScroller from "@/components/horizontal-scroller";
import { fetchVODs, categoriesToShows } from "@/lib/data";

export default async function ShowsPage() {
  const categories = await fetchVODs();

  return (
    <div className="min-h-screen bg-background">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="px-4 md:px-8 pt-2 pb-2">
          <h1 className="text-lg font-bold text-primary font-serif italic">
            Shows
          </h1>
        </div>

        {/* Each show as a carousel */}
        {categories.map(
          (cat) =>
            cat.series.length > 0 && (
              <section key={cat.id} className="px-4 md:px-8 py-6">
                <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-4 font-serif italic">
                  {cat.title}
                </h2>
                <HorizontalScroller>
                  {cat.series.map((item) => (
                    <VODCard key={item.id} item={item} orientation="landscape" />
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
