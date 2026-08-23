import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import HomeHero from "@/components/home-hero";
import LiveStrip from "@/components/live-strip";
import EpisodeCard from "@/components/episode-card";
import HorizontalScroller from "@/components/horizontal-scroller";
import {
  fetchVODs,
  fetchDVR,
  fetchBanners,
  categoriesToShows,
  visibleCategories,
  getFeaturedCategory,
  getLatestEpisodes,
  cleanTitle,
  slugify,
} from "@/lib/data";

export default async function HomePage() {
  const [categories, dvr, banners] = await Promise.all([
    fetchVODs(),
    fetchDVR(),
    fetchBanners(),
  ]);
  const shows = visibleCategories(categories);
  const featured = getFeaturedCategory(shows);
  const latest = getLatestEpisodes(shows, 12);

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(shows)} />

      <main className="max-w-7xl mx-auto">
        {/* Top banner - above hero */}
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

        {/* Featured original */}
        {featured && <HomeHero category={featured} />}

        {/* Live strip - pinned under the hero */}
        <LiveStrip title={dvr.title} />

        {/* Ignite Originals rail */}
        <section className="pt-10 pb-2">
          <div className="flex items-baseline justify-between px-4 md:px-8 mb-4">
            <h2 className="text-base font-bold text-primary uppercase tracking-wider">
              Ignite Originals
            </h2>
            <Link
              href="/shows"
              className="text-xs font-semibold text-primary uppercase tracking-wider hover:underline focus-visible:underline focus-visible:outline-none"
            >
              All Shows →
            </Link>
          </div>
          <HorizontalScroller>
            {shows.map((cat) => (
              <Link
                key={cat.id}
                href={`/shows/${slugify(cat.title)}`}
                className="flex-shrink-0 group rounded-sm w-[150px] md:w-[170px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={cat.poster || "/placeholder.svg"}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
                    sizes="170px"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 group-focus-visible:bg-primary/10 transition-colors duration-300" />
                </div>
                <p className="mt-2 text-xs text-foreground group-hover:text-primary group-focus-visible:text-primary transition-colors">
                  {cat.title}
                </p>
              </Link>
            ))}
          </HorizontalScroller>
        </section>

        {/* Latest Episodes rail */}
        {latest.length > 0 && (
          <section className="pt-8 pb-4">
            <div className="flex items-baseline justify-between px-4 md:px-8 mb-4">
              <h2 className="text-base font-bold text-primary uppercase tracking-wider">
                Latest Episodes
              </h2>
              <Link
                href="/shows"
                className="text-xs font-semibold text-primary uppercase tracking-wider hover:underline focus-visible:underline focus-visible:outline-none"
              >
                See All →
              </Link>
            </div>
            <HorizontalScroller>
              {latest.map(({ episode, category }) => (
                <EpisodeCard
                  key={episode.id}
                  title={cleanTitle(episode.title)}
                  image={episode.imageUrl}
                  duration={episode.duration}
                  subtitle={`${category.title}${episode.rdate ? ` · ${episode.rdate}` : ""}`}
                  href={`/shows/${slugify(category.title)}?ep=${encodeURIComponent(episode.id)}`}
                />
              ))}
            </HorizontalScroller>
          </section>
        )}
      </main>

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
