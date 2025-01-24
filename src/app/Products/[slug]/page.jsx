'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import BasicProductsDetails from '@/components/vewProduct/BasicProductsDetails';
import ProductImages from '@/components/vewProduct/ProductImages';
import Pricing from '@/components/vewProduct/Pricing';
import BrandAndCategory from '@/components/vewProduct/BrandAndCategory';
import ProductForm from '@/components/vewProduct/ProductForm';
import Submit from '@/components/vewProduct/Submit';
import { useProductStore } from '@/components/Products/store/useProductStore';
import axios from 'axios';

export default function Page() {
  const params = useParams();

  const slug = decodeURIComponent(params?.slug) 
  console.log(slug);

  // Extract PK and SK from the slug
  const id = slug.split('&');
  console.log(id);
  console.log(id[0]);
  console.log(id[1]);

  const { productName, setProductName, setProductDetails } = useProductStore();
 

  useEffect(() => {
    console.log("Fetching product details using Axios...");
  
    if (params?.slug) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/get`, {
          businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE,
          PK: id[0],
          SK: id[1]
      })
      .then((response) => {
        console.log("API response:", response.data);
  
        if (response.data?.data?.items?.length > 0) {
          console.log(response.data);
          const product = response.data.data.items[0];
          console.log("Product data:", product);
  
          setProductDetails(product);
          setProductName(product.productType || "N/A");
  
          console.log("Updated Zustand state:", product.productType);
        } else {
          console.warn("No product found for given PK and SK.");
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
    } else {
      console.warn("PK or SK is missing.");
    }
  }, [id[0], id[1], setProductName, setProductDetails]);
  

  return (
    <section className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
      <BasicProductsDetails productName={productName?.toString() || 'N/A'} />
      <ProductImages />
      <Pricing />
      <BrandAndCategory />
      <ProductForm />
      <Submit />
    </section>
  );
}
