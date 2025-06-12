import { MetadataRoute } from 'next';
import { productListData } from '@/api/productApis/getPostApi'; // Import the API function

export default async function sitemap(): Promise<MetadataRoute.Sitemap> { // Make the function async and specify return type
  const baseUrl = 'https://www.theribbonpack.com';

  // Add your dynamic routes here
  const staticRoutes = [
    '',
    '/products',
    '/blog',
    '/checkout',
    '/login',
    '/orders',
    '/pages/about',
    '/pages/contact',
    '/pages/privacy-policy',
    '/product',
    '/my-account',
    '/cart'
  ];

  const staticSitemapEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  let productSitemapEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await productListData();
    console.log(products,'products')
    if (Array.isArray(products)) {
      productSitemapEntries = products.map((product) => ({
        url: `${baseUrl}/products/${product.SK}`, // Assuming product.SK is the unique identifier
        lastModified: new Date(),
        changeFrequency: 'daily' as 'daily',
        priority: 0.9, // Products might be slightly higher priority than other static pages
      }));
    }
  } catch (error) {
    console.error('Error fetching product data for sitemap:', error);
    // Continue with static routes even if product data fetching fails
  }


  return [...staticSitemapEntries, ...productSitemapEntries];
} 