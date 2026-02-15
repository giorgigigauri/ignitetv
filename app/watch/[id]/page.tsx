import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ShowsGrid from "@/components/shows-grid";
import VODCard from "@/components/vod-card";
import VideoPlayer from "@/components/video-player";
import HorizontalScroller from "@/components/horizontal-scroller";
import { fetchVODs, formatDuration } from "@/lib/data";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const categories = await fetchVODs();

  // Find the video across all categories
  let foundVideo = null;
  let parentCategory = null;
  for (const cat of categories) {
    const video = cat.series.find((s) => s.id === decodedId);
    if (video) {
      foundVideo = video;
      parentCategory = cat;
      break;
    }
  }

  if (!foundVideo || !parentCategory) {
    notFound();
  }

  const cleanTitle = foundVideo.title
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

  const relatedItems = parentCategory.series.filter(
    (s) => s.id !== foundVideo.id,
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="px-4 md:px-8 pt-2 pb-2">
          <h1 className="text-lg font-bold text-primary font-serif italic">
            {parentCategory.title}
          </h1>
        </div>

        {/* Video Player */}
        <div className="px-4 md:px-8">
          <VideoPlayer src={foundVideo.video} poster={foundVideo.imageUrl} />
        </div>

        {/* Article Title */}
        <div className="px-4 md:px-8 pt-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight text-balance">
            {cleanTitle}
          </h2>
        </div>

        {/* Article Content */}
        <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-full md:w-48">
            <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-sm bg-muted">
              <Image
                src={foundVideo.imageUrl || "/placeholder.svg"}
                alt={cleanTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground flex-wrap">
              {foundVideo.rdate && <span>{foundVideo.rdate}</span>}
              <Link
                href={`/shows/${encodeURIComponent(parentCategory.title)}`}
                className="text-primary hover:underline focus-visible:underline focus-visible:outline-none font-medium"
              >
                {parentCategory.title}
              </Link>
            </div>
            {foundVideo.description ? (
              <p className="text-sm text-foreground leading-relaxed">
                {foundVideo.description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed italic">

              </p>
            )}
            {foundVideo.starring && (
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-foreground font-medium">Starring:</span>{" "}
                {foundVideo.starring}
              </p>
            )}
            {foundVideo.directors && (
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-foreground font-medium">Directed by:</span>{" "}
                {foundVideo.directors}
              </p>
            )}
          </div>
        </div>

        {/* Related Videos */}
        {relatedItems.length > 0 && (
          <section className="px-4 md:px-8 py-6">
            <h3 className="text-lg font-bold text-primary font-serif italic mb-4">
              More from {parentCategory.title}
            </h3>
            <HorizontalScroller>
              {relatedItems.map((item) => (
                <VODCard key={item.id} item={item} orientation="landscape" />
              ))}
            </HorizontalScroller>
          </section>
        )}

        {/* Shows Section */}
        <ShowsGrid categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
