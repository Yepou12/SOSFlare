import type { Metadata } from "next";
import { Lilita_One, Nunito } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APP_STORE_ID, SITE_URL } from "@/config/site";
import "./globals.css";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const nunito = Nunito({
  weight: ["600", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const description = "Line up S-O-S. Clear the board. Beat the stage.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SOS Flare",
    template: "%s · SOS Flare",
  },
  description,
  applicationName: "SOS Flare",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "SOS Flare",
    description,
    url: SITE_URL,
    siteName: "SOS Flare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Flare",
    description,
  },
  ...(APP_STORE_ID
    ? {
        itunes: {
          appId: APP_STORE_ID,
        },
      }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lilita.variable} ${nunito.variable} h-full`}>
      <body className="flex min-h-full flex-col font-body text-base font-semibold antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-orange focus:px-4 focus:py-2 focus:font-extrabold focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
