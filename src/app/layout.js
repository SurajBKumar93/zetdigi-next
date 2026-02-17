import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "ZetDigi - Grow Your Amazon & Marketplace Sales",
  description: "Smart tools for product research, listing optimization, PPC automation & multi-channel selling.",
  keywords: "Amazon automation, marketplace sales, PPC automation, product research, e-commerce tools, done-for-you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Aggressive preloading for Calendly - instant load */}
        {/* favicon */}
        <link rel="icon" href="/icon.png" />
        <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        {/* Preload Calendly iframe */}
        <link
          rel="preload"
          as="document"
          href="https://calendly.com/zetdigi-amazon-services/30min?embed_type=Inline&hide_gdpr_banner=1&background_color=333333&text_color=ffffff&primary_color=ffffff"
        />
      </head>
      <body className={`${hankenGrotesk.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
