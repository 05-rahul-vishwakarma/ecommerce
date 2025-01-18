'use client';

import React, { useEffect, useState } from 'react';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1';
import productData from '@/data/Product.json';
import Footer from '@/components/Footer/Footer';
import MenuFour from '@/components/Header/MenuFour';
import axios from 'axios';
import ShopBreadCrumb from '@/components/Shop/ShopBreadCrumb';

export default function BreadCrumb1() {
  const [products, setProducts] = useState([])
  const [type, setType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const getProduct = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`)
      setProducts(response?.data?.data?.items)

    } catch (error) {
      console.error("Error on Fetching Products ", error)
    }
  }
  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuFour props="bg-transparent" />
      </div>
      {/* <ShopBreadCrumb1 data={products} productPerPage={9} dataType={type} gender={gender} category={category} /> */}
      <ShopBreadCrumb />
      <Footer />
    </>
  );
}
