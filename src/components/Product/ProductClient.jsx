'use client';
import React from "react";
import DyanamicProduct from "@/components/Product/DyanamicProduct";
import MenuFour from "@/components/Header/MenuFour";
import Footer from "@/components/Footer/Footer";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

export default function ProductClient({ slug }) {
  const fetchProduct = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&slug=${slug}&limit=2`,
      {}
    );
    return response?.data?.data?.items[0] || null;
  };

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product-detail", slug],
    queryFn: fetchProduct,
    staleTime: 10 * 60 * 1000,
    enabled: !!slug,
  });

  if (isLoading) {
    return <LoadingSpinner size="md" fullScreen />;
  }

  if (isError || !product) {
    return <div className="text-center mt-10 text-red-500 text-xl">Product not found</div>;
  }

  // Breadcrumb and JSON-LD logic (same as before)
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.theribbonpack.com/",
    },
  ];

  if (product.category && product.category.name) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: product.category.name,
      item: `https://www.theribbonpack.com/category/${product.category.name.toLowerCase().replace(/ /g, '-')}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: product.name,
    item: `https://www.theribbonpack.com/product/${product.slug}`,
  });

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.img || product.imageURLs?.[0]?.img,
    description: product.description,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      url: `https://www.theribbonpack.com/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price.toFixed(2),
      availability:
        product.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
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
} 