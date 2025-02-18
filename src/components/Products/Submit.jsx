'use client';

import React from 'react'
import { useProductStore } from './store/useProductStore'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Submit() {

    function generateSKU(productName, category, timestamp) {
        const namePart = productName.slice(0, 3).toUpperCase();
        const categoryPart = category.slice(0, 3).toUpperCase();

        const uniquePart = timestamp ? Date.now() : Math.floor(Math.random() * 10000);

        return `${namePart}-${categoryPart}-${uniquePart}`;
    }

    const sendProductData = async () => {
        const {
            productType,
            productName,
            productTitle,
            unit,
            productPrice,
            productDiscount,
            quantity,
            productBrand,
            productCategory,
            status,
            description,
            tags, design,
            productImage, subType, productCategoryId,
            productWidth,
            productLength,  // Changed from productMeter
            imageURLs, isFeatured,sizes
        } = useProductStore.getState();

        const payload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE,
            sku: generateSKU(productName, productCategory, true),
            img: productImage || imageURLs[0].img, // Assuming productImage or fallback to default image
            title: productTitle,
            name: productName,
            slug: `${productName.toLowerCase().replace(/\s+/g, '-')}`,
            unit: unit,
            imageURLs: imageURLs.map(({ color, img }) => ({
                color: {
                    name: color.name,
                    clrCode: color.clrCode
                },
                img
            })),
            parent: design,
            children: subType,
            price: productPrice,
            discount: productDiscount,
            quantity: quantity,
            brand: {
                name: productBrand,
                id: '9999999'
            },
            category: {
                name: productCategory,
                id: productCategoryId
            },
            additionalInformation: [
                {
                    key: "width",
                    value: productWidth,
                },
                {
                    key: "length",
                    value: productLength,
                },
            ],
            status: status,
            productType: productType,
            featured: isFeatured,
            description: description,
            tags: tags.split(','), // Assuming tags are comma-separated
            size: sizes
        };




        const token = localStorage.getItem('accessToken');

        if (!token) {
            toast.error('Unauthorized: No token found');
            return;
        }

        console.log(payload);


        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/product`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Sending token in the headers
                    }
                }
            );
            if (response) {
                toast.success('Successfully uploaded');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };


    return (
        <button onClick={sendProductData} className="w-[40%] justify-self-end flex justify-center mr-4 text-center mb-4 rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90  m-4 ">
            Add Product
        </button>
    )
}
