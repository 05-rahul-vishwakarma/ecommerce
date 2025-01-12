'use client';

import React, { useEffect } from 'react';
import { useProductStore } from './store/useProductStore';

const BrandAndCategory = () => {
    const { 
        productBrand, setProductBrand, 
        productCategory, setProductCategory, 
        status, setStatus 
    } = useProductStore();

    const handleBrandChange = (e) => {
        setProductBrand(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setProductCategory(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className='flex space-x-3 m-4'>
            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {'product Brand'}
                    <span className="text-red">*</span>
                </label>
                <input
                    type='text'
                    value={productBrand}
                    onChange={handleBrandChange}
                    placeholder={'Enter the product Brand'}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {'product Category'}
                    <span className="text-red">*</span>
                </label>
                <input
                    type='text'
                    value={productCategory}
                    onChange={handleCategoryChange}
                    placeholder={'Enter the product Category'}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>

            <div className='w-[25%]'>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">Status</h3>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
            </div>
        </div>
    );
};

export default BrandAndCategory;
