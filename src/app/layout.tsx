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
  title: 'Buy Ribbons Online | The Ribbon Pack - Wide Selection & Fast Shipping', // More specific title
  description: 'Shop The Ribbon Pack for a huge selection of high-quality ribbons for crafts, decorations, and more. Fast shipping and great prices on satin, grosgrain, and decorative ribbons.', // Improved description
  keywords: 'ribbons, ribbon, satin ribbon, grosgrain ribbon, decorative ribbon, craft ribbon, wholesale ribbons, buy ribbons online, ribbon shop, ribbon store, fabric ribbon', // Added keywords
  openGraph: {
    title: 'Buy Ribbons Online | The Ribbon Pack',
    description: 'Shop The Ribbon Pack for a huge selection of high-quality ribbons for crafts, decorations, and more. Fast shipping and great prices on satin, grosgrain, and decorative ribbons.',
    images: ['/logo2.png'], // Replace with your actual OG image URL
    siteName: 'The Ribbon Pack',
    type: 'website',
  },
  canonical: 'https://www.theribbonpack.com/',
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
          {/* Add ToastContainer for notifications */}
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
