// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation';
// import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1'
// import productData from '@/data/Product.json'
// import Footer from '@/components/Footer/Footer'
// import MenuFour from '@/components/Header/MenuFour';

// export default function BreadCrumb1() {
//     const searchParams = useSearchParams()
//     let [type,setType] = useState<string | null | undefined>()
//     let datatype = searchParams.get('type')
//     let gender = searchParams.get('gender')
//     let category = searchParams.get('category')

//     useEffect(() => {
//         setType(datatype);
//     }, [datatype]);
    

//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuFour props="bg-transparent" />
//             </div>
//             <ShopBreadCrumb1 data={productData} productPerPage={9} dataType={type} gender={gender} category={category} />
//             <Footer />      
//         </>
//     )
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
