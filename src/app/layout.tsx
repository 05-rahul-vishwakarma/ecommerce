// This file is app/layout.tsx (or a similar root layout file in the app directory)

import Script from "next/script"; // Next.js Script component for optimizing script loading
import { Instrument_Sans } from 'next/font/google'; // Next.js Font optimization
import '@/styles/styles.scss'; // Global styles
import GlobalProvider from './GlobalProvider';
import ModalCart from '@/components/Modal/ModalCart';
import ModalWishlist from '@/components/Modal/ModalWishlist';
import ModalSearch from '@/components/Modal/ModalSearch';
import ModalQuickview from '@/components/Modal/ModalQuickview';
import ModalCompare from '@/components/Modal/ModalCompare';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NetworkStatus from '@/components/NetworkStatus';
import axios from 'axios';
import { headers } from 'next/headers';

interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  sku: string;
  price: string;
  stock: number;
}

const instrument = Instrument_Sans({ subsets: ['latin'] });

// This metadata object is processed by Next.js to generate <meta>, <title>, etc. tags in the <head>
export const metadata = {
  metadataBase: new URL('https://www.theribbonpack.com'),
  // title: 'Buy Ribbons Online for Crafts & Decor | Wide Selection - The Ribbon Pack',
  title:'Top Foil Printed Ribbon Manufacturer in India | The Ribbon Pack',
  
  description:'Leading manufacturer of foil printed and custom metallic ribbons in India. Perfect for packing, branding, & events. Enjoy vibrant finishes, low MOQ, and fast delivery.',

  keywords: 'buy ribbons online, satin ribbon, grosgrain ribbon, decorative ribbon, craft ribbon, wholesale ribbons, ribbon shop, fabric ribbon, craft supplies, DIY materials, bookbinding supplies, crafting materials, gift wrapping ribbons, sewing ribbons, floral ribbons, ribbon for hair bows, ribbon pack, buy craft ribbons, decorative ribbons for sale, ribbon online store, the ribbon pack', // <-- Added "ribbon pack" and "the ribbon pack"
  
  openGraph: {
    title: 'Buy Ribbons Online | Premium Craft Ribbons | The Ribbon Pack',
    description:'Top Foil Printed Ribbon Manufacturer in India | Custom metallic ribbons for packing,branding & events.Vibrant foil finishes,low MOQ ,fast delivery,Get a free quote now',
    images: [
      {
        url: '/logo2.png',
        width: 512,
        height: 512,
        alt: 'The Ribbon Pack Logo',
      },
    ],
    siteName: 'The Ribbon Pack',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.theribbonpack.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Ribbons Online | The Ribbon Pack | Craft & Decor',
    description: 'High-quality ribbons for crafts, decorations, and more. Fast shipping and great prices! Explore satin, grosgrain, and unique decorative ribbons.',
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
    google: 'google34bc56db2345c063.html', // ACTION: Replace with your actual code
  },
};

// JSON-LD data is defined as constants
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Ribbon Pack',
  url: 'https://www.theribbonpack.com',
  logo: 'https://www.theribbonpack.com/logo2.png',
  description: 'Premium quality ribbons and craft supplies for all your creative needs. Wide selection of satin, grosgrain, and decorative ribbons.',
  address: {
    '@type': 'PostalAddress',
    // ACTION: Fill these if you have a physical store or want to specify a business address
    streetAddress: 'Dilshad Garden Near In Front Of Punjab National Bank ',
    addressLocality: 'Craft City',
    addressRegion: 'Delhi',
    addressCountry: 'India'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 9821472627', // ACTION: Replace with your actual phone number
    contactType: 'Customer Service',
    email: 'support@theribbonpack.com', // ACTION: Replace with your actual support email
    areaServed: 'US',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://www.facebook.com/theribbonpack',
    'https://www.instagram.com/theribbonpack',
    'https://www.linkedin.com/company/ribbon-plc/',
  ]
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Ribbon Pack',
  url: 'https://www.theribbonpack.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.theribbonpack.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

function generateBreadcrumbs(pathname: string) {
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const breadcrumbs = [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.theribbonpack.com/"
  }];

  pathSegments.forEach((segment, index) => {
    const item = `https://www.theribbonpack.com/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = segment.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    breadcrumbs.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": item
    });
  });
  return breadcrumbs;
}

async function getProductData(): Promise<ProductType[]> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=12`);
    return response?.data?.data?.items || [];
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
}

// This is your RootLayout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products: ProductType[] = await getProductData();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  const breadcrumbItems = generateBreadcrumbs(pathname);

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  const jsonLdProducts = {
    "@context": "https://schema.org",
    "@graph": products.map((product: ProductType) => ({
      "@type": "Product",
      "name": product.name,
      "image": product.image,
      "description": product.description,
      "sku": product.sku,
      "offers": {
        "@type": "Offer",
        "url": `https://www.theribbonpack.com/product/${product._id}`,
        "priceCurrency": "INR",
        "price": product.price,
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    }))
  };

  return (<html lang="en"><head><link rel="icon" href="/favicon.ico" sizes="any" /><link rel="icon" href="/favicon.svg" type="image/svg+xml" /><link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" /><link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" /><link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" /><link rel="manifest" href="/manifest.json" /> {/* ACTION: Create public/manifest.json */}<meta name="theme-color" content="#4a90e2" /><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-status-bar-style" content="default" /><meta name="format-detection" content="telephone=no" /><meta name="mobile-web-app-capable" content="yes" /><meta name="msapplication-TileColor" content="#4a90e2" /><meta name="msapplication-tap-highlight" content="no" /><Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" /><Script id="json-ld-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} /><Script id="json-ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} /><Script id="json-ld-products" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProducts) }} /><Script id="json-ld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} /></head><body className={instrument.className} suppressHydrationWarning={true}>
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
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </GlobalProvider>
      </body></html>);
}