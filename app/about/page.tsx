import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchVODs, categoriesToShows } from "@/lib/data";

export default async function AboutPage() {
  const categories = await fetchVODs();

  return (
    <div className="min-h-screen bg-background">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-2xl font-bold text-primary font-serif italic mb-6">
          About Us
        </h1>

        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <p>
            Ignite Television is a dynamic broadcasting platform dedicated to delivering quality content to viewers around the world. From breaking news and in-depth analysis to compelling documentaries and entertainment, we strive to inform, educate, and inspire our audience.
          </p>
          <p>
            Our mission is to be a trusted source of news and programming that reflects the diverse voices and stories of our communities. We are committed to journalistic integrity, creative excellence, and fostering meaningful conversations.
          </p>
          <p>
            With a growing library of on-demand content and live streaming capabilities, Ignite Television brings you closer to the stories that matter — anytime, anywhere.
          </p>
          <p>
            Thank you for watching Ignite Television.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
