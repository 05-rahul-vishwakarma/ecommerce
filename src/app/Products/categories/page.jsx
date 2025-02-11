'use client';
import axios from 'axios';
import React, { useState } from 'react';

export default function Page() {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation: Ensure the category name is not empty.
    if (categoryName.trim() === '') {
      setError('Category name is required.');
      return;
    }

    // Clear any previous error or success message.
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Call your API endpoint to create a new category.
      // const response = await fetch('/catalog/category', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: categoryName }),
      // });

      const payload = {
        businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE,
        name: categoryName
      }
      const token = localStorage.getItem('accessToken');



      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/catalog/category`, payload,
        {
          headers: {
            Authorization: `Bearer ${token}` // Sending token in the headers
          }
        }
      )
        setSuccess('Category created successfully!');
        setCategoryName('');
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Error adding category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[500px] px-[2rem] py-[1rem] rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <form onSubmit={handleSubmit}>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Create Categories
        </label>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />

        {/* Display error or success messages */}
        {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        {success && <div className="mt-2 text-green-500 text-sm">{success}</div>}

        <button
          type="submit"
          className="w-[70%] flex justify-center mr-4 text-center mb-4 rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 m-4"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product Category'}
        </button>
      </form>
    </div>
  );
}
