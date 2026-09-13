import type { Metadata } from "next";
import { Fraunces, Mrs_Saint_Delafield, Newsreader } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { jsonLdGraph, SITE, titles } from "@/lib/seo";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Newsreader({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const script = Mrs_Saint_Delafield({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com"),
  title: {
    default: titles.home,
    template: "%s — The Lifestyle Fresh",
  },
  description: SITE.description,
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
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: titles.home,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph()) }}
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
