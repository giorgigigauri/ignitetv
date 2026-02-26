import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchVODs, categoriesToShows } from "@/lib/data";

export default async function FAQPage() {
  const categories = await fetchVODs();

  return (
    <div className="min-h-screen">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-2xl font-bold text-primary font-serif italic mb-6">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <h3 className="font-bold text-foreground pt-4">1. What is Ignite Television?</h3>
          <p>
            Ignite Television is the most sophisticated local TV station based in Georgetown, Guyana, dedicated to &quot;Reinventing Television in Guyana.&quot; It offers programming that showcases local news, sports, entertainment, and talk shows that celebrate the vibrant culture of Guyana.
          </p>

          <h3 className="font-bold text-foreground pt-4">2. What kind of content does Ignite Television broadcast?</h3>
          <p>You can expect a diverse lineup including:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Local news, covering current events in Georgetown and beyond</li>
            <li>Sports broadcasts, featuring both national and regional athletic coverage</li>
            <li>Entertainment and talk shows, spotlighting Guyanese artists, culture, and stories</li>
          </ul>

          <h3 className="font-bold text-foreground pt-4">3. On what channel can I watch Ignite Television?</h3>
          <p>
            Ignite Television operates on ENET CH6 and on VHF Channel 6 in Georgetown, Guyana and here, on ignitetelevision.com
          </p>

          <h3 className="font-bold text-foreground pt-4">4. How can I stream or watch Ignite Television online?</h3>
          <p>
            Head to Home, and our livestream and on-demand content is at your fingertips. Be sure to check the website or follow our social media for updates.
          </p>

          <h3 className="font-bold text-foreground pt-4">5. How can I get involved or submit content?</h3>
          <p>
            Got exciting ideas, cultural stories, or local talent you want to share? Visit our official website (ignitetelevision.com) for contact info, or message us via our Facebook page, &quot;Ignite Television, Georgetown,&quot; where we are active in community engagement.
          </p>

          <h3 className="font-bold text-foreground pt-4">6. How can I stay updated on programming and station news?</h3>
          <p>
            Follow our social media channels, especially Instagram and Facebook, for the latest lineups, announcements, and highlights—stay connected with Ignite Television community updates.
          </p>

          <h3 className="font-bold text-foreground pt-4">7. Is Ignite Television hiring or offering media-related opportunities?</h3>
          <p>
            Yes! We&apos;ve shared postings on social media seeking candidates with experience in advertising, marketing, or media. Follow our channels to learn about opportunities as they become available.
          </p>

          <h3 className="font-bold text-foreground pt-4">8. Why &apos;Ignite Television&apos;? What&apos;s the meaning behind the name?</h3>
          <p>
            The name &quot;Ignite Television&quot; reflects our vision—to ignite connection, passion, and cultural pride through local TV programming. Our goal is to spark conversations, community engagement, and cultural celebration across Guyana and reinvent what Television means in the Caribbean.
          </p>

          <h3 className="font-bold text-foreground pt-4">9. What makes Ignite Television unique?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Locally produced, rooted in Guyanese stories and communities</li>
            <li>Culturally focused, with programming that spotlights national creativity</li>
            <li>A modern, vibrant approach to local TV, tailored for today&apos;s viewers</li>
          </ul>

          <p className="pt-4 font-semibold text-primary">
            CH6 Ignite Television - Reinventing Television in Guyana
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
