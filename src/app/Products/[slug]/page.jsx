'use client';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Submit from '@/components/vewProduct/Submit';
import { useProductStore } from '@/components/Products/store/useProductStore';
import axios from 'axios';
import BasicProductsDetails from '@/components/Products/BasicProductsDetails';
import ProductImages from '@/components/Products/ProductImages';
import Pricing from '@/components/Products/Pricing';
import BrandAndCategory from '@/components/Products/BrandAndCategory';
import ProductForm from '@/components/Products/ProductForm';

export default function Page() {
  const params = useParams();

  // Decode the slug and extract PK and SK
  const slug = decodeURIComponent(params?.slug);
  const id = slug.split('&');
  const PK = id[0];
  const SK = id[1];

  console.log(PK,SK ,'pk and sk');
  

  // Destructure the store setters
  const {
    setProductName,
    setProductTitle,
    setUnit,
    setSubType,
    setProductPrice,
    setProductDiscount,
    setQuantity,
    setProductBrand,
    setProductCategory,
    setStatus,
    setDesign,
    setDescription,
    setScreenSize,
    setColors,
    setScreenResolution,
    setMaxResolution,
    setProcessor,
    setGraphics,
    setWirelessType,
    setTags,
    setSellCount,
    setIsFeatured,
    setProductImage,
    setImageURLs,
    setProductType,
    setProductWidth,
    setProductMeter,
  } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}&PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`
        );
        const productData = response?.data?.data[0]; // Assuming the API response has a `data` field
        setProductName(productData?.name || ''); // Updated to match the object field
        setProductTitle(productData.title || ''); // Updated to match the object field
        setUnit(productData.unit || ''); // Updated to match the object field
        setSubType(productData.businessType || ''); // Updated to match the object field
        setProductPrice(productData.price || ''); // Updated to match the object field
        setProductDiscount(productData.discount || ''); // Updated to match the object field
        setQuantity(productData.quantity || ''); // Updated to match the object field
        setProductBrand(productData.brand?.name || ''); // Updated to match the object field
        setProductCategory(productData.category?.name || ''); // Updated to match the object field
        setStatus(productData.status || 'in-stock'); // Updated to match the object field
        setDesign(productData.parent || 'plain'); // Updated to match the object field
        setDescription(productData.description || ''); // Updated to match the object field
        setScreenSize(productData.screenSize || ''); // Assuming this field exists in the object
        setColors(productData.imageURLs?.[0]?.color || { name: '', code: '' }); // Updated to match the object field
        setScreenResolution(productData.screenResolution || ''); // Assuming this field exists in the object
        setMaxResolution(productData.maxResolution || ''); // Assuming this field exists in the object
        setProcessor(productData.processor || ''); // Assuming this field exists in the object
        setGraphics(productData.graphics || ''); // Assuming this field exists in the object
        setWirelessType(productData.wirelessType || ''); // Assuming this field exists in the object
        setTags(productData.tags || []); // Updated to match the object field
        setSellCount(productData.sellCount || ''); // Assuming this field exists in the object
        setIsFeatured(productData.featured || false); // Updated to match the object field
        setProductImage(productData.img || null); // Updated to match the object field
        setImageURLs(productData.imageURLs || []); // Updated to match the object field
        setProductType(productData.productType || ''); // Updated to match the object field
        setProductWidth(productData.productWidth || ''); // Assuming this field exists in the object
        setProductMeter(productData.productMeter || ''); // Assuming this field exists in the object
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [
    PK,
    SK,
    setProductName,
    setProductTitle,
    setUnit,
    setSubType,
    setProductPrice,
    setProductDiscount,
    setQuantity,
    setProductBrand,
    setProductCategory,
    setStatus,
    setDesign,
    setDescription,
    setScreenSize,
    setColors,
    setScreenResolution,
    setMaxResolution,
    setProcessor,
    setGraphics,
    setWirelessType,
    setTags,
    setSellCount,
    setIsFeatured,
    setProductImage,
    setImageURLs,
    setProductType,
    setProductWidth,
    setProductMeter,
  ]);
  return (
    <section className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
      <BasicProductsDetails />
      <ProductImages />
      <Pricing />
      <BrandAndCategory />
      <ProductForm />
      <Submit PK={id[0]} SK={id[1]} />
    </section>
  );
}