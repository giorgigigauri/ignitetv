import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchVODs, categoriesToShows } from "@/lib/data";

export default async function AdvertisePage() {
  const categories = await fetchVODs();

  return (
    <div className="min-h-screen bg-background">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-2xl font-bold text-primary font-serif italic mb-6">
          Advertise With Us
        </h1>

        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <p>
            Reach a growing and engaged audience by advertising with Ignite Television. Whether you are a local business or an international brand, we offer flexible advertising solutions tailored to your needs.
          </p>
          <p>
            Our platform provides opportunities across live streaming, on-demand content, and digital placements — giving your brand maximum visibility and impact.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Why Advertise With Us?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>Access to a diverse and loyal viewer base</li>
            <li>Multiple ad formats including pre-roll, mid-roll, and banner placements</li>
            <li>Targeted reach across news, entertainment, and documentary content</li>
            <li>Competitive pricing with flexible packages</li>
          </ul>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Get In Touch
          </h2>
          <p>
            For advertising inquiries, please contact us at{" "}
            <a
              href="mailto:advertise@ignitetv.com"
              className="text-primary hover:underline focus-visible:underline focus-visible:outline-none"
            >
              advertise@ignitetv.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
