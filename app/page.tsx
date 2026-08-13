import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import PlayerWithCatchUp from "@/components/player-with-catchup";
import ShowsGrid from "@/components/shows-grid";
import NewsSection from "@/components/news-section";
import { fetchVODs, fetchDVR, fetchBanners, categoriesToShows } from "@/lib/data";

export default async function HomePage() {
  const [categories, dvr, banners] = await Promise.all([
    fetchVODs(),
    fetchDVR(),
    fetchBanners(),
  ]);
  const igniteNews = categories.find((c) =>
    c.title.toLowerCase().includes("ignite news"),
  );

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-7xl mx-auto">
        {/* Top banner - above player */}
        {banners?.top?.image && (
          <Banner
            src={banners.top.image}
            alt="Advertisement"
            href={banners.top.link || undefined}
            width={1200}
            height={131}
            className="py-4"
          />
        )}

        <PlayerWithCatchUp
            liveStream={dvr.stream}
            dvrItems={dvr.dvr} liveTitle={""}        />

        {/* Shows Section */}
        <ShowsGrid categories={categories} />
      </main>

      {/* Ignite News Section - full width */}
      {igniteNews && <NewsSection category={igniteNews} />}

      {/* Bottom banner - above footer */}
      {banners?.bottom?.image && (
        <Banner
          src={banners.bottom.image}
          alt="Advertisement"
          href={banners.bottom.link || undefined}
          width={900}
          height={350}
          className="max-w-[932px] mx-auto py-6"
        />
      )}

      <Footer />
    </div>
  );
}
