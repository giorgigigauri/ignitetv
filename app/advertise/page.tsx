import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchVODs, categoriesToShows } from "@/lib/data";

export default async function AdvertisePage() {
  const categories = await fetchVODs();

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-2xl font-bold text-primary font-serif italic mb-6">
          Advertise With Us
        </h1>

        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Our Solution
          </h2>
          <p className="font-semibold">
            Here is how we can help you grow your brand...
          </p>
          <p>
            Boost your brand with our tailored marketing packages! At Ignite Television, we offer solutions designed to amplify your reach and connect with your audience. Explore our packages and let us help your business grow.
          </p>
          <p>
            We leverage cutting-edge strategies and tools to create content that not only grabs attention but also builds trust and loyalty. From social media campaigns to blog posts and beyond, we tailor our approach to meet your specific goals, ensuring that every piece of content reflects your brand&apos;s identity and values.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Contact Us
          </h2>
          <p>
            For advertising inquiries, please{" "}
            <a
              href="https://ignitenews.com/contact/"
              className="text-primary hover:underline focus-visible:underline focus-visible:outline-none"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
