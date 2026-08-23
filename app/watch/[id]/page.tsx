import { notFound, redirect } from "next/navigation";
import { fetchVODs, slugify } from "@/lib/data";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

// Episodes now play inside their show page; keep old /watch links working.
export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const categories = await fetchVODs();

  const parent = categories.find((cat) =>
    cat.series.some((s) => s.id === decodedId),
  );

  if (!parent) {
    notFound();
  }

  redirect(`/shows/${slugify(parent.title)}?ep=${encodeURIComponent(decodedId)}`);
}
