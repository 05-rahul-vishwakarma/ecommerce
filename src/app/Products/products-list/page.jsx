import axios from 'axios';
import Image from 'next/image'
import React from 'react'
import ProductTable from '@/components/Products/ProductListTable'

const fetchProductsLists = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}`);
    return response?.data?.data?.items;

  } catch (error) {
    console.log(error);
  }
}


export default async function page() {
  const data = await fetchProductsLists();
  return (
    <section className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <ProductTable data={data} />
    </section>
  )
}