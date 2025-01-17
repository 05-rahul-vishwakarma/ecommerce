// app/products/page.js

import React, { useEffect, useState } from 'react';
import ProductTable from '@/components/Products/ProductListTable';
import axios from 'axios';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on the client side
  useEffect(() => {
    const fetchProductsLists = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}`
        );
        setProducts(response?.data?.data?.items || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsLists();
  }, []);

  return (
    <section className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <ProductTable data={products} />
      )}
    </section>
  );
}
