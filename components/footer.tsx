import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const navLinkClass =
  "text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-secondary transition-colors text-sm font-semibold";

export default function Footer() {
  return (
    <footer className="bg-secondary/80 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center gap-2">
                <Image
                    src="/ignitetelevision-logo.png"
                    alt="Ignite Television"
                    width={116}
                    height={52}
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer navigation">
            <Link
              href="/"
              className={`${navLinkClass} border border-primary/40 px-6 py-2 hover:border-primary focus-visible:border-primary`}
            >
              Home
            </Link>
            <Link
              href="/advertise"
              className={`${navLinkClass} border border-primary/40 px-6 py-2 hover:border-primary focus-visible:border-primary`}
            >
              Advertise
            </Link>
            <Link
              href="/faq"
              className={`${navLinkClass} border border-primary/40 px-6 py-2 hover:border-primary focus-visible:border-primary`}
            >
              FAQ
            </Link>
            <Link href="/about" className={`${navLinkClass} border border-primary/40 px-6 py-2 hover:border-primary focus-visible:border-primary`}>
              About
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/ignitetelevision/"
              target={"_blank"}
              className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1 transition-colors"*/}
            {/*  aria-label="X (Twitter)"*/}
            {/*>*/}
            {/*  <XIcon className="w-5 h-5" />*/}
            {/*</a>*/}
            <a
              href="https://www.linkedin.com/company/ignitetv"
              target={"_blank"}
              className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@ignitetv"
              target={"_blank"}
              className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            Copyright &copy; 2026 - Ignite Television | All Rights Reserved
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline transition-colors"
            >
              TERMS OF SERVICE
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline transition-colors"
            >
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
