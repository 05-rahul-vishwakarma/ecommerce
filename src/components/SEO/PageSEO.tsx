'use client';

import React from 'react';
import Script from 'next/script';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'product' | 'article' | 'organization';
  product?: {
    name: string;
    price: number;
    currency: string;
    sku: string;
    image: string;
    description: string;
    availability: string;
  };
  article?: {
    author: string;
    publishDate: string;
    modifiedDate: string;
    category: string;
    tags: string[];
  };
}

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  keywords,
  type = 'website',
  product,
  article,
}) => {
  const baseUrl = 'https://www.theribbonpack.com';

  // Generate JSON-LD based on type
  const getJsonLd = () => {
    const baseJsonLd = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'product':
        if (!product) return null;
        return {
          ...baseJsonLd,
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image,
          sku: product.sku,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: product.currency,
            availability: product.availability,
            url: `${baseUrl}/product/${product.sku}`,
          },
          brand: {
            '@type': 'Brand',
            name: 'The Ribbon Pack',
          },
        };

      case 'article':
        if (!article) return null;
        return {
          ...baseJsonLd,
          '@type': 'Article',
          headline: title,
          description: description,
          author: {
            '@type': 'Person',
            name: article.author,
          },
          datePublished: article.publishDate,
          dateModified: article.modifiedDate,
          publisher: {
            '@type': 'Organization',
            name: 'The Ribbon Pack',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo2.png`,
            },
          },
          keywords: article.tags.join(', '),
          articleSection: article.category,
        };

      default:
        return {
          ...baseJsonLd,
          '@type': 'WebPage',
          name: title,
          description: description,
          url: baseUrl,
          publisher: {
            '@type': 'Organization',
            name: 'The Ribbon Pack',
          },
        };
    }
  };

  const jsonLd = getJsonLd();

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/logo2.png`} />
      <meta property="og:url" content={baseUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/logo2.png`} />
      
      {/* Additional product meta tags */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price.toString()} />
          <meta property="product:price:currency" content={product.currency} />
          <meta property="product:availability" content={product.availability} />
        </>
      )}
    </>
  );
};

export default PageSEO; 