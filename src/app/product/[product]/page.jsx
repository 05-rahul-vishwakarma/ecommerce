import axios from "axios";
import { cookies, headers } from "next/headers";
import React from "react";
import DyanamicProduct from "@/components/Product/DyanamicProduct";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import MenuFour from "@/components/Header/MenuFour";
import Footer from "@/components/Footer/Footer";

/**
 * @typedef {object} ColorType
 * @property {string} name
 * @property {string} clrCode
 *
 * @typedef {object} ImageURLType
 * @property {ColorType} color
 * @property {string} img
 *
 * @typedef {object} CategoryType
 * @property {string} name
 * @property {string} id
 *
 * @typedef {object} ProductType
 * @property {string} SK
 * @property {string} name
 * @property {string} [img]
 * @property {Array<ImageURLType>} [imageURLs]
 * @property {string} description
 * @property {string} sku
 * @property {number} price
 * @property {string} status
 * @property {number} quantity
 * @property {CategoryType} [category]
 * @property {string} slug
 */

/**
 * @param {string} slug
 * @returns {Promise<ProductType | null>}
 */
async function getProduct(slug) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&slug=${slug}`,
      {},
    );
    return response?.data?.data?.items[0] || null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

/**
 * @param {object} props
 * @param {Promise<{ product: string }>} props.params
 * @returns {Promise<object>}
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.product;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageURLs?.[0]?.img || product.img ? [
        {
          url: product.imageURLs?.[0]?.img || product.img,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ] : [],
      type: 'website',
      url: `https://www.theribbonpack.com/product/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.imageURLs?.[0]?.img || product.img ? [product.imageURLs?.[0]?.img || product.img] : [],
    },
  };
}

/**
 * @param {object} props
 * @param {Promise<{ product: string }>} props.params
 * @returns {Promise<JSX.Element | null>}
 */
export default async function page({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.product;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
  
    // if (!accessToken) {
    //   redirect("/login");
    // }

    const product = await getProduct(slug);

    if (!product) {
        redirect("/404"); // Redirect to a 404 page if product is not found
        return null;
    }


    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '/';

    const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.theribbonpack.com/"
        },
    ];

    if (product.category && product.category.name) {
        breadcrumbItems.push({
            "@type": "ListItem",
            "position": 2,
            "name": product.category.name,
            "item": `https://www.theribbonpack.com/category/${product.category.name.toLowerCase().replace(/ /g, '-')}`
        });
    }

    breadcrumbItems.push({
        "@type": "ListItem",
        "position": breadcrumbItems.length + 1,
        "name": product.name,
        "item": `https://www.theribbonpack.com/product/${product.slug}`
    });

    const jsonLdBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
    };

    const jsonLdProduct = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.img || product.imageURLs?.[0]?.img,
        "description": product.description,
        "sku": product.sku,
        "offers": {
            "@type": "Offer",
            "url": `https://www.theribbonpack.com/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": product.price.toFixed(2),
            "availability": product.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
    };

    return (
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
        />
        <div id="header" className="relative w-full text-secondary">
          <MenuFour props="bg-white" />
        </div>
        <DyanamicProduct productMain={product} />
        <Footer />
      </section>
    );
  } catch (error) {
    redirect("/");
    return null;
  }
}
