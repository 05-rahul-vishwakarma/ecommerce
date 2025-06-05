import Script from "next/script";
import { Instrument_Sans } from 'next/font/google';
import '@/styles/styles.scss';
import GlobalProvider from './GlobalProvider';
import ModalCart from '@/components/Modal/ModalCart';
import ModalWishlist from '@/components/Modal/ModalWishlist';
import ModalSearch from '@/components/Modal/ModalSearch';
import ModalQuickview from '@/components/Modal/ModalQuickview';
import ModalCompare from '@/components/Modal/ModalCompare';
import CountdownTimeType from '@/type/CountdownType';
import { countdownTime } from '@/store/countdownTime';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NetworkStatus from '@/components/NetworkStatus';

const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Instrument_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Buy Ribbons Online for Crafts & Decor | Wide Selection - The Ribbon Pack',
  description: 'Shop The Ribbon Pack for premium quality ribbons for all your crafting and decoration needs. Find satin, grosgrain, and decorative ribbons with fast shipping and great prices. Perfect for DIY, sewing, gift wrapping, and more.',
  keywords: 'buy ribbons online, satin ribbon, grosgrain ribbon, decorative ribbon, craft ribbon, wholesale ribbons, ribbon shop, fabric ribbon, craft supplies, DIY materials, bookbinding supplies, crafting materials, gift wrapping ribbons, sewing ribbons, floral ribbons, ribbon for hair bows',
  openGraph: {
    title: 'Buy Ribbons Online | The Ribbon Pack',
    description: 'Shop The Ribbon Pack for a huge selection of high-quality ribbons for crafts, decorations, and more. Fast shipping and great prices on satin, grosgrain, and decorative ribbons.',
    images: ['/logo2.png'],
    siteName: 'The Ribbon Pack',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.theribbonpack.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Ribbons Online | The Ribbon Pack',
    description: 'High-quality ribbons for crafts, decorations, and more. Fast shipping and great prices!',
    images: ['/logo2.png'],
  },
  alternates: {
    canonical: 'https://www.theribbonpack.com/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Ribbon Pack',
  url: 'https://www.theribbonpack.com',
  logo: 'https://www.theribbonpack.com/logo2.png',
  description: 'Premium quality ribbons and craft supplies for all your creative needs.',
  address: {
    '@type': 'PostalAddress',
    // Add your address details here
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: 'your-phone',
    contactType: 'customer service',
    email: 'your-email@theribbonpack.com'
  },
  sameAs: [
    'https://facebook.com/theribbonpack',
    'https://instagram.com/theribbonpack',
    // Add other social media links
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#4a90e2" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#4a90e2" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={instrument.className} suppressHydrationWarning={true}>
        <GlobalProvider>
          <NetworkStatus />
          {children}
          <ModalCart />
          <ModalWishlist />
          <ModalSearch />
          <ModalQuickview />
          <ModalCompare />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </GlobalProvider>
      </body>
    </html>
  );
}
