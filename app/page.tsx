import Header from "@/components/header";
import Footer from "@/components/footer";
import PlayerWithCatchUp from "@/components/player-with-catchup";
import ShowsGrid from "@/components/shows-grid";
import NewsSection from "@/components/news-section";
import { fetchVODs, fetchDVR, categoriesToShows } from "@/lib/data";

export default async function HomePage() {
  const [categories, dvr] = await Promise.all([fetchVODs(), fetchDVR()]);
  const igniteNews = categories.find((c) =>
    c.title.toLowerCase().includes("ignite news"),
  );

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-7xl mx-auto">
        <PlayerWithCatchUp
          liveStream={dvr.stream}
          liveTitle={dvr.title}
          dvrItems={dvr.dvr}
        />

        {/* Shows Section */}
        <ShowsGrid categories={categories} />

        {/* Ignite News Section */}
        {igniteNews && <NewsSection category={igniteNews} />}
      </main>

      <Footer />
    </div>
  );
}
