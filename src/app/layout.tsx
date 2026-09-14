import type { Metadata } from "next";
import { Fraunces, Inter, Petit_Formal_Script } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { getMembershipSnapshot } from "@/lib/membership";
import { jsonLdGraph, SITE, siteDescription, titles } from "@/lib/seo";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
});

const script = Petit_Formal_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const seats = await getMembershipSnapshot();
  const description = siteDescription(seats.cap);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com"),
    title: {
      default: titles.home,
      template: "%s — The Lifestyle Fresh",
    },
    description,
    applicationName: SITE.name,
    alternates: { canonical: "/" },
    icons: {
      icon: "/monogram-ivory.png",
      apple: "/monogram-ivory.png",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE.name,
      title: titles.home,
      description,
      url: SITE.url,
    },
    twitter: {
      card: "summary_large_image",
      title: titles.home,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const seats = await getMembershipSnapshot();
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph(seats.cap)) }}
        />
        <SkipLink />
        <div id="app-root" className="flex min-h-full flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
