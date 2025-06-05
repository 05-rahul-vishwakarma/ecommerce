import { MetadataRoute } from 'next';
import { productList, getBlogList } from '../api/baseApi';

// Define a type for the product object based on the expected API response
interface Product {
  // *** IMPORTANT: Ensure this matches the actual field name for the product slug/ID in your API response ***
  slug: string;
  // Add other properties if needed for mapping or filtering
}

// Define a type for the blog post object based on the expected API response
interface BlogPost {
  // *** IMPORTANT: Ensure this matches the actual field name for the blog post slug/ID in your API response ***
  slug: string;
  // Add other properties if needed for mapping or filtering
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.theribbonpack.com';

  // Fetch products from the API
  let products: Product[] = []; // Add type annotation
  try {
    const response = await fetch(productList);
    const data = await response.json();
    // Assuming the product list is in data.products and each product has a 'slug' field
    if (data && Array.isArray(data.products)) {
      // *** IMPORTANT: Adjust the mapping if the slug field is named differently or nested differently ***
      products = data.products.map((item: any) => ({ slug: item.slug })); // Map to the Product type and type item
    } else if (data && Array.isArray(data)){
      // If the API returns a direct array
       // *** IMPORTANT: Adjust the mapping if the slug field is named differently or nested differently ***
       products = data.map((item: any) => ({ slug: item.slug })); // Map to the Product type and type item
    }
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error);
  }

   // Fetch blog posts from the API
   let blogPosts: BlogPost[] = []; // Add type annotation
   try {
     const response = await fetch(getBlogList);
     const data = await response.json();
     // Assuming the blog post list is in data.posts and each post has a 'slug' field
     if (data && Array.isArray(data.posts)) {
       // *** IMPORTANT: Adjust the mapping if the slug field is named differently or nested differently ***
       blogPosts = data.posts.map((item: any) => ({ slug: item.slug })); // Map to the BlogPost type and type item
     } else if (data && Array.isArray(data)){
       // If the API returns a direct array
        // *** IMPORTANT: Adjust the mapping if the slug field is named differently or nested differently ***
        blogPosts = data.map((item: any) => ({ slug: item.slug })); // Map to the BlogPost type and type item
     }
   } catch (error) {
     console.error('Failed to fetch blog posts for sitemap:', error);
   }

  const productRoutes = products.map((product: Product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily', // Explicitly type the literal string
    priority: 0.7,
  }));

  console.log(productRoutes,'productRoutes')

   const blogPostRoutes = blogPosts.map((post: BlogPost) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily', // Explicitly type the literal string
    priority: 0.7,
  }));

  const staticRoutes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/categories',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily', // Explicitly type the literal string
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...blogPostRoutes];
} 