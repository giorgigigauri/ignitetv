import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
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
        {/* Top banner - above player */}
        <Banner
          src="/top-banner.jpg"
          alt="International Building Expo 2026"
          width={1200}
          height={131}
          className="py-4"
        />

        <PlayerWithCatchUp
            liveStream={dvr.stream}
            dvrItems={dvr.dvr} liveTitle={""}        />

        {/* Shows Section */}
        <ShowsGrid categories={categories} />
      </main>

      {/* Ignite News Section - full width */}
      {igniteNews && <NewsSection category={igniteNews} />}

      {/* Bottom banner - above footer */}
      <Banner
        src="/bottom-banner.jpg"
        alt="International Building Expo 2026"
        width={900}
        height={350}
        className="max-w-[932px] mx-auto py-6"
      />

      <Footer />
    </div>
  );
}
