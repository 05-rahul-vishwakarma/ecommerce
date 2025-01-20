'use client';

import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import axios from "axios";
import { useEffect, useState } from "react";
import ShopBreadCrumb from '@/components/Shop/ShopBreadCrumb';
import { useProductStore } from "@/components/Product/store/useProduct";

interface Category {
  name: string;
}

interface Brand {
  name: string;
}

interface Product {
  category: Category;
  productType: string;
  price: number;
  brand: Brand;
  imageURLs: { color: { name: string; clrCode: string }; img: string }[];
}

interface ProductDetail {
  category: string;
  productType: string;
  price: number;
  brand: string;
}

export default function BreadCrumb1() {
  const { products, productDetails, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

 


  return (
    <>
      <div id="header" className="relative w-full">
        <MenuFour props="bg-transparent" />
      </div>
      <ShopBreadCrumb products={products} productDetails={productDetails} />
      <Footer />
    </>
  );
}