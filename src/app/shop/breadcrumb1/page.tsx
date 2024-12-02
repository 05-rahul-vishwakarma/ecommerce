'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1';
import productData from '@/data/Product.json';
import Footer from '@/components/Footer/Footer';
import MenuFour from '@/components/Header/MenuFour';

export default function BreadCrumb1() {
  const [type, setType] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  // Use useSearchParams within useEffect to avoid issues with SSR
  // const searchParams = useSearchParams();

  // useEffect(() => {
    // const datatype = searchParams.get('type');
    // const genderParam = searchParams.get('gender');
    // const categoryParam = searchParams.get('category');
    // setType(datatype);
    // setGender(genderParam);
    // setCategory(categoryParam);
  // }, [searchParams]);

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuFour props="bg-transparent" />
      </div>
      <ShopBreadCrumb1 data={productData} productPerPage={9} dataType={type} gender={gender} category={category} />
      <Footer />
    </>
  );
}
