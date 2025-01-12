import React from 'react'
import BasicProductsDetails from '@/components/Products/BasicProductsDetails';
import ProductImages from '@/components/Products/ProductImages';
import Pricing from '@/components/Products/Pricing';
import BrandAndCategory from '@/components/Products/BrandAndCategory';
import ProductForm from '@/components/Products/ProductForm';
import Submit from '@/components/Products/Submit';

export default function page() {
  return (
    <section className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
      <BasicProductsDetails />
      <ProductImages />
      <Pricing />
      <BrandAndCategory />
      <ProductForm />
      <Submit />
    </section>
  )
}
