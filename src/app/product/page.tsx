'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import Default from '@/components/Product/Detail/Default';
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import productData from '@/data/Product.json'
import MenuFour from '@/components/Header/MenuFour';
import Product from '@/components/Product/Product';
import Default from '@/components/Product/Detail/Default';
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct'

const ProductDefault = () => {
    // const searchParams = useSearchParams()
    // let productId = searchParams.get('id')

    // if (productId === null) {
        // productId = '1'
    // }
    const getProduct = async () => {
        try {
            
        } catch (error) {
            console.error("Error on Fetching Data ", error)
        }
    }

    return (
        <>
            <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full text-purple'>
                <MenuFour props="bg-white" />
                <BreadcrumbProduct data={productData} productPage='default' productId={1}  />
            </div>
            <Default data={productData} productId={1} />
            <Footer />
        </>
    )
}

export default ProductDefault

