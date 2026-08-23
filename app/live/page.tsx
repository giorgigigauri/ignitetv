import Header from "@/components/header";
import Footer from "@/components/footer";
import PlayerWithCatchUp from "@/components/player-with-catchup";
import { fetchVODs, fetchDVR, categoriesToShows, visibleCategories } from "@/lib/data";

export const metadata = {
  title: "Watch Live - Ignite Television",
};

export default async function LivePage() {
  const [categories, dvr] = await Promise.all([fetchVODs(), fetchDVR()]);

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(visibleCategories(categories))} />

      <main className="max-w-7xl mx-auto pt-4">
        <PlayerWithCatchUp
          liveStream={dvr.stream}
          dvrItems={dvr.dvr}
          liveTitle={dvr.title || "Ignite Television · Channel 6"}
        />
      </main>

      <Footer />
    </div>
  );
}
