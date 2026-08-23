import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  fetchVODs,
  categoriesToShows,
  visibleCategories,
  slugify,
} from "@/lib/data";

export const metadata = {
  title: "Shows - Ignite Television",
};

export default async function ShowsPage() {
  const shows = visibleCategories(await fetchVODs());

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(shows)} />

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Page heading */}
        <div className="pt-8 pb-6">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">
            All Programs
          </p>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground">
            Every program is a destination.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {shows.length} programs. Each with its own page, player and library.
          </p>
        </div>

        {/* One card per program */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-12">
          {shows.map((cat) => (
            <Link
              key={cat.id}
              href={`/shows/${slugify(cat.title)}`}
              className="group rounded-sm overflow-hidden bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={cat.poster || "/placeholder.svg"}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-3">
                <h2 className="text-sm font-bold text-foreground group-hover:text-primary group-focus-visible:text-primary transition-colors truncate">
                  {cat.title}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {cat.series.length} episode{cat.series.length === 1 ? "" : "s"}
                </p>
                <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mt-2">
                  Show Page →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
