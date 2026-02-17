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
            Ignite Television is a full-service broadcast and digital media network based in Guyana, delivering 24-hour programming that informs, entertains, and inspires. We are built on the vision of redefining local television by merging traditional broadcasting with the innovation of modern streaming platforms. We aim to Reinvent Television in Guyana.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Who We Are
          </h2>
          <p>
            Ignite Television is more than a channel—it&apos;s a dynamic hub for news, entertainment, culture, and conversation. Our sets include Ignite News, Ignite Insights, Ignite Health, and multiple podcast and talk-show spaces. Each production is designed to reflect the voices and experiences of Guyanese people, while connecting audiences to the wider Caribbean and the world.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            What We Do
          </h2>
          <p>
            We combine cutting-edge broadcast technology with creative storytelling to reach audiences wherever they are—on television, online, or on-the-go. From live news coverage and talk shows to entertainment specials and event broadcasting, Ignite Television brings fresh, reliable, and engaging content to homes across the nation.
          </p>
          <p>
            Our programming is supported by state-of-the-art studios, high-quality production teams, and a commitment to journalistic integrity and creating a platform for Guyanese to showcase the local talent.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Why We Stand Out
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">24/7 Broadcast</span> with structured ad inventory to support local and international brands.</li>
            <li><span className="font-semibold">OTT Streaming</span> that allows viewers to watch from any device, anywhere.</li>
            <li><span className="font-semibold">Diverse Programming</span> spanning news, lifestyle, culture, sports, and business.</li>
            <li><span className="font-semibold">Community-Driven</span> with content shaped by the issues, events, and stories that define Guyana today.</li>
          </ul>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Our Promise
          </h2>
          <p>
            At Ignite Television, we are committed to being the media platform where truth meets creativity, community meets innovation, and broadcast meets the future.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
