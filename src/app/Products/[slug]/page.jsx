'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProductForm from '@/components/Products/ProductForm';
import BasicProductsDetails from '@/components/Products/BasicProductsDetails';
import ProductImages from '@/components/Products/ProductImages';
import Pricing from '@/components/Products/Pricing';
import BrandAndCategory from '@/components/Products/BrandAndCategory';
import Submit from '@/components/Products/Submit';
import { useProductStore } from '@/components/Products/store/useProductStore';

export default function Page() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id'); // Extracting 'id' from URL query params

  // Access Zustand store functions and state
  const { productName, setProductName, setProductDetails } = useProductStore();
  console.log("Product Name is :",productName);

  useEffect(() => {
    if (productId) {
      fetch(`/api/product/get?NEXT_PUBLIC_BUSINESS_TYPE/${productId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch product data');
          }
          return res.json();
        })
        .then((data) => {
          setProductDetails(data);  // Store entire product details in Zustand
          setProductName(data.productName);  // Update the product name in Zustand
        })
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [productId, setProductName, setProductDetails]);

  return (
    <section className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
      <BasicProductsDetails productName={productName} />
      <ProductImages />
      <Pricing />
      <BrandAndCategory />
      <ProductForm />
      <Submit />
    </section>
  );
}
