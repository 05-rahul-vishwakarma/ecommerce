'use client';

import { useState } from 'react';
import { useProductStore } from './store/useProductStore';

const Pricing = () => {
    const {
        productPrice,
        productDiscount,
        quantity,
        setProductPrice,
        setProductDiscount,
        setQuantity,
    } = useProductStore();

    const handlePriceChange = (e) => {
        setProductPrice(Number(e.target.value)); // Set the price in the store
    };

    const handleDiscountChange = (e) => {
        setProductDiscount(Number(e.target.value)); // Set the discount in the store
    };

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value)); // Set the quantity in the store
    };

    return (
        <div className="flex space-x-2 m-4">
            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {'Product Price'}
                    <span className="text-red">*</span>
                </label>
                <input
                    type="number"
                    value={productPrice}
                    onChange={handlePriceChange}
                    placeholder="Enter the product price"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {'Product Discount'}
                    <span className="text-red">*</span>
                </label>
                <input
                    type="number"
                    value={productDiscount}
                    onChange={handleDiscountChange}
                    placeholder="Enter the product discount"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {'Product Quantity'}
                    <span className="text-red">*</span>
                </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Enter the product quantity"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>
        </div>
    );
};

export default Pricing;
