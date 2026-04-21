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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z70N9BEFTX"></script>
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KGRF2HXN');`}
        </script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Z70N9BEFTX');
          `}
        </script>
        {/* End Google Analytics */}

        {/* Meta Pixel Code */}
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1202139875450660');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display: none; visibility: hidden;" src="https://www.facebook.com/tr?id=1202139875450660&ev=PageView&noscript=1" />`,
          }}
        />
        {/* End Meta Pixel Code */}

        {/* favicon */}
        <link rel="icon" href="/icon.png" />

        {/* Aggressive preloading for Calendly - instant load */}
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
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KGRF2HXN" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
