
import axios from 'axios';
import React, { Suspense } from 'react';
import ProductTable from '@/components/Products/ProductListTable';

// Function to fetch products list
const fetchProductsLists = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}`);
    return response?.data?.data?.items;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// This is your async component that will be lazy-loaded
const ProductList = async () => {
  const data = await fetchProductsLists();
  return (
    <ProductTable data={data} />
  );
};

export async function generateStaticParams() {
  const data = await fetchProductsLists();

  return data.map(item => ({
    id: item.id.toString(),
  }));
}

// Page Component wrapped with Suspense
export default function Page() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <section className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        {/* Lazy load ProductList component */}
        <ProductList />
      </section>
    </Suspense>
  );
}