'use client';

import React, { useEffect, useState } from 'react';
import { useProductStore } from './store/useProductStore';

const BrandAndCategory = () => {
  const {
    productBrand,
    setProductBrand,
    productCategory,
    setProductCategory,
    productCategoryId, // (for reference)
    setProductCategoryId,
    status,
    setStatus,
  } = useProductStore();

  // State variables for auto-complete functionality
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleBrandChange = (e) => {
    setProductBrand(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setProductCategory(value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // useEffect to fetch and filter categories based on the productCategory input.
  useEffect(() => {
    // Trigger auto-complete logic only when 3 or more characters are entered.
    if (productCategory.length >= 3) {
      // If categories haven't been fetched yet, fetch them using POST.
      if (allCategories.length === 0) {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/catalog/category/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // Send the current input as part of the request body if needed.
            body: JSON.stringify({ query: productCategory }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Assume that the response structure contains data.data.items.
            const items = data?.data?.items || [];
            setAllCategories(items);
            const filtered = items.filter((category) =>
              category?.name?.toLowerCase()?.includes(productCategory?.toLowerCase())
            );
            setFilteredCategories(filtered);
            setShowDropdown(true);
          })
          .catch((error) => console.error('Error fetching categories:', error));
      } else {
        // If data is already available, simply filter it.
        const filtered = allCategories.filter((category) =>
          category?.name?.toLowerCase()?.includes(productCategory?.toLowerCase())
        );
        setFilteredCategories(filtered);
        setShowDropdown(true);
      }
    } else {
      // Hide the dropdown when fewer than 3 characters are entered.
      setFilteredCategories([]);
      setShowDropdown(false);
    }
  }, [productCategory, allCategories]);

  return (
    <div className="flex space-x-3 m-4 relative">
      {/* Product Brand Input */}
      <div>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Product Brand <span className="text-red">*</span>
        </label>
        <input
          type="text"
          value={productBrand}
          onChange={handleBrandChange}
          placeholder="Enter the product Brand"
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
      </div>

      {/* Product Category with Auto-complete */}
      <div className="relative">
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Product Category <span className="text-red">*</span>
        </label>
        <input
          type="text"
          value={productCategory}
          onChange={handleCategoryChange}
          placeholder="Enter the product Category"
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        {showDropdown && filteredCategories.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-stroke dark:bg-dark-2 z-10 max-h-60 overflow-y-auto">
            {filteredCategories.map((category, i) => (
              <li
                key={i}
                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-3"
                onClick={() => {
                  // Store both the category name and the category id.
                  setProductCategory(category?.name);
                  setProductCategoryId(category?.PK); // Use 'PK' or 'SK' as the unique identifier.
                  setShowDropdown(false);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-[25%]">
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
