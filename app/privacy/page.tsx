import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchVODs, categoriesToShows } from "@/lib/data";

export default async function PrivacyPage() {
  const categories = await fetchVODs();

  return (
    <div className="min-h-screen bg-background">
      <Header shows={categoriesToShows(categories)} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-2xl font-bold text-primary font-serif italic mb-6">
          Privacy Policy
        </h1>

        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <p>
            Our privacy policy covers Ignite Television and its web site (the &quot;Site&quot;).
          </p>
          <p>
            Your personal information may be stored by us. We don&apos;t distribute it to third parties.
          </p>
          <p>
            Browsing and ordering via ignitetelevision.com will not result in your computer getting infected by spyware, adware or viruses.
          </p>
          <p>
            We do not phish, harm or participate in any illicit or identity theft activities.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Security
          </h2>
          <p>
            We always use industry-standard encryption technologies when transferring and receiving consumer data exchanged with our site. We have appropriate security measures in place in our physical facilities to protect against the loss, misuse or alteration of information that we have collected from you at our site.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            What We Track and Don&apos;t Track
          </h2>
          <p>
            We collect aggregate information on what pages are accessed and visited by consumers.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            How We Use Contact Information
          </h2>
          <p>
            You can access our web site home page and browse our site without disclosing your personal data. The information we collect is used to notify consumers about issues with his or her order or if they have opted in to our newsletter, updates to our Web site. When we offer contests, promotions or feedback surveys, you may be required to provide certain personal information in order to participate. In these cases, we will give you the choice not to receive email messages or other communications from us regarding our products, services, contests, and promotions. We may use your contact information to reach you about the sweepstakes or contest.
          </p>
          <p>
            If you do not want to receive e-mail from us in the future, please let us know by sending us an e-mail at the above address. We use cookies to record session information, such as items that consumers add to their shopping cart. Persons who supply us with their telephone numbers on-line will only receive telephone calls from us with information regarding orders or questions they have submitted on-line.
          </p>

          <h2 className="text-lg font-bold text-primary font-serif italic pt-4">
            Updates to Privacy Policy
          </h2>
          <p>
            From time to time, we may use the customer information for new, unanticipated uses not previously disclosed in our privacy notice. If our information practices change at some time in the future we will post the policy changes to our Web site to notify you of these changes and provide you with the ability to opt out of these new uses. If you are concerned about how your information is used, you should check back at our Web site periodically (we will maintain a last-updated date at the bottom of this web page).
          </p>
          <p>
            You can request by{" "}
            <a
              href="https://ignitenews.com/contact/"
              className="text-primary hover:underline focus-visible:underline focus-visible:outline-none"
            >
              contacting us
            </a>
            {" "}whether we are keeping personal data about you. We do, however, allow you to challenge our decision to refuse to provide you with a copy of your personal data.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
