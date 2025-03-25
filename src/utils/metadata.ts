import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  type?: 'website' | 'product' | 'article' | 'organization';
  image?: string;
  url?: string;
}

export function generateMetadata({
  title,
  description,
  keywords,
  type = 'website',
  image = '/logo2.png',
  url = 'https://www.theribbonpack.com',
}: GenerateMetadataProps): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: (type === 'website' || type === 'article') ? type : 'website',
      images: [image],
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };

  return metadata;
}

export const productMetadata = (product: any): Metadata => {
  return generateMetadata({
    title: `${product.name} | The Ribbon Pack`,
    description: `Buy ${product.name} - ${product.description}. High-quality ribbons and craft supplies at The Ribbon Pack.`,
    keywords: `${product.name}, ribbon, craft supplies, ${product.category}, buy ribbons online`,
    type: 'product',
    image: product.imageURLs[0]?.img || '/logo2.png',
    url: `https://www.theribbonpack.com/product/${product.slug}`,
  });
};

export const categoryMetadata = (category: any): Metadata => {
  return generateMetadata({
    title: `${category.name} Ribbons & Supplies | The Ribbon Pack`,
    description: `Shop our collection of ${category.name} ribbons and craft supplies. Find the perfect materials for your creative projects.`,
    keywords: `${category.name} ribbons, craft supplies, DIY materials, ribbon collection, craft materials`,
    type: 'website',
    url: `https://www.theribbonpack.com/category/${category.slug}`,
  });
};

export const blogMetadata = (post: any): Metadata => {
  return generateMetadata({
    title: `${post.title} | The Ribbon Pack Blog`,
    description: post.excerpt || post.description,
    keywords: `${post.tags.join(', ')}, ribbon crafts, DIY tutorials, craft ideas`,
    type: 'article',
    image: post.featuredImage || '/logo2.png',
    url: `https://www.theribbonpack.com/blog/${post.slug}`,
  });
}; 