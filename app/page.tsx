import Header from "@/components/header";
import Footer from "@/components/footer";
import LivePlayer from "@/components/live-player";
import CatchUp from "@/components/catch-up";
import ShowsGrid from "@/components/shows-grid";
import NewsSection from "@/components/news-section";
import { fetchVODs } from "@/lib/data";

export default async function HomePage() {
  const categories = await fetchVODs();
  const igniteNews = categories.find((c) =>
    c.title.toLowerCase().includes("ignite news"),
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="px-4 md:px-8 pt-2 pb-2">
          <h1 className="text-lg font-bold text-primary font-serif italic">
            Live Streaming
          </h1>
        </div>

        {/* Live Video Player */}
        <div className="px-4 md:px-8">
          <LivePlayer />
        </div>

        {/* Catch-Up Section */}
        <CatchUp categories={categories} />

        {/* Shows Section */}
        <ShowsGrid categories={categories} />

        {/* Ignite News Section */}
        {igniteNews && <NewsSection category={igniteNews} />}
      </main>

      <Footer />
    </div>
  );
}
