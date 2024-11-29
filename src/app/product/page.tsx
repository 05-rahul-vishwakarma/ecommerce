// 'use client'
// import React, { useState } from 'react'
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link'
// import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct'
// // import Default from '@/components/Product/Detail/Default';
// import Footer from '@/components/Footer/Footer'
// import { ProductType } from '@/type/ProductType'
// import productData from '@/data/Product.json'
// import MenuFour from '@/components/Header/MenuFour';
// import Product from '@/components/Product/Product';
// import Default from '@/components/Product/Detail/Default';

// const ProductDefault = () => {
//     const searchParams = useSearchParams()
//     let productId = searchParams.get('id')

//     if (productId === null) {
//         productId = '1'
//     }

//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuFour props="bg-white" />
//                 {/* <BreadcrumbProduct data={productData} productPage='default'  /> */}
//             </div>
//             <Default data={productData} productId={productId} />
//             <Footer />
//         </>
//     )
// }

// export default ProductDefault

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
