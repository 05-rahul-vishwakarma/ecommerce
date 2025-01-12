'use client';

import React from 'react'
import { useProductStore } from './store/useProductStore'
import axios from 'axios';

export default function Submit() {

    function generateSKU(productName, category, timestamp) {
        // Take the first three characters of the product name and category, make them uppercase
        const namePart = productName.slice(0, 3).toUpperCase();
        const categoryPart = category.slice(0, 3).toUpperCase();
    
        // Generate a unique identifier using the current timestamp or a random number
        const uniquePart = timestamp ? Date.now() : Math.floor(Math.random() * 10000);
    
        return `${namePart}-${categoryPart}-${uniquePart}`;
    }

    const sendProductData = async () => {
        console.log('yes working');
        
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
            screenSize,
            colors,
            screenResolution,
            maxResolution,
            processor,
            graphics,
            wirelessType,
            tags,
            sellCount,
            isFeatured,
            productImage,
            imageURLs
        } = useProductStore.getState();

        // Construct the payload
        const payload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE,
            sku:generateSKU(productName, productCategory, true),
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
            parent: 'Ribbons',
            children: 'Ribbons',
            price: productPrice,
            discount: productDiscount,
            quantity: quantity,
            brand: {
                name: productBrand,
                id: '6412eae89c2275a25d09541d', // Ensure you have the correct brand ID
            },
            category: {
                name: productCategory,
                id: '6419723bd7dc5155c04350d3', // Ensure you have the correct category ID
            },
            status: status,
            reviews: ['6461c46a9154b65448da799f'], // Example review ID
            productType: productType,
            description: description,
            // additionalInformation: [
            //     { key: 'Standing screen display size', value: screenSize },
            //     { key: 'Colors', value: colors.name },
            //     { key: 'Screen Resolution', value: screenResolution },
            //     { key: 'Max Screen Resolution', value: maxResolution },
            //     { key: 'Processor', value: processor },
            //     { key: 'Graphics Coprocessor', value: graphics },
            //     { key: 'Wireless Type', value: wirelessType }
            // ],
            featured: isFeatured,
            sellCount: sellCount,
            tags: tags.split(','), // Assuming tags are comma-separated
        };
        try {
            const response = await axios.post(`${NEXT_PUBLIC_API_URL}/product}`)
        } catch (error) {
        }
    };

    return (
        <button onClick={sendProductData} className="w-[40%] justify-self-end flex justify-center mr-4 text-center mb-4 rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Add Product
        </button>
    )
}
