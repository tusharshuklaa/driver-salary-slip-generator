import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'driver-salary-slip-generator',
  title: "Generate driver salary slip",
  description: "Generate driver salary slip using this simple and FREE tool.",
  authors: [{ name: "Tushar Shukla", url: "https://github.com/tusharshuklaa" }],
  keywords: ["driver", "salary", "slip", "generator", "receipt", "template", "pdf", "free", "tool"],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  appleWebApp: {
    title: "Generate driver salary slip",
    statusBarStyle: "default",
    capable: true
  },
  creator: "Tushar Shukla",
  publisher: "Tushar Shukla",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Driver Salary Slip Generator',
    title: "Generate driver salary slip",
    description: "Generate driver salary slip using this simple and FREE tool.",
    url: 'https://driver-salary-slip-generator.vercel.app/',
    images: [
      {
        url: 'https://driver-salary-slip-generator.vercel.app/driver-salary-generator.png',
        alt: 'Generate driver salary slip',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "Generate driver salary slip",
    description: "Generate driver salary slip using this simple and FREE tool.",
    card: 'summary_large_image',
    site: '@theTSguy',
    creator: '@theTSguy',
    images: [
      {
        url: 'https://driver-salary-slip-generator.vercel.app/driver-salary-generator.png',
        alt: 'Generate driver salary slip',
        width: 1200,
        height: 630,
      },
    ],
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
