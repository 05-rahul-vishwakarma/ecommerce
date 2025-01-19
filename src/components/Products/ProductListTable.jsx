'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';

const ProductTable = ({ data: initialData }) => {
    const router = useRouter();
    const [datas, setData] = useState(initialData); // Manage data with state

    const handleViewProduct = async (Pk, SK) => {
        console.log("clicked");
        const encodedPK = encodeURIComponent(Pk);
        const encodedSK = encodeURIComponent(SK);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/get?PK=${encodedPK}&SK=${encodedSK}`)
            const productData = response.data;
           console.log(productData);
           router.push(`/Products/add-product/:id`,{
            query: {data: JSON.stringify(productData)},
           })
            
        } catch (error) {
            console.error('Error retriving product ', error);
            
        }
    }
    const handleDelete = async (PK, SK) => {
        try {
            const encodedPK = encodeURIComponent(PK);
            const encodedSK = encodeURIComponent(SK);

            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/product/delete?PK=${encodedPK}&SK=${encodedSK}`
            );
            setData((prevData) => prevData.filter(item => item.PK !== PK || item.SK !== SK));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr className="bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Discount</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas?.map((item, index) => (
                            <tr
                                key={item.sku}
                                className="dark:bg-[#0000002a] dark:shadow-card hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                            >
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2">{item.category.name}</td>
                                <td className="px-4 py-2">${item.price}</td>
                                <td className="px-4 py-2 text-center">{item.quantity}</td>
                                <td className="px-4 py-2 text-center">{item.discount}%</td>
                                <td className="px-4 py-2 text-center">{item.status}</td>
                                <td className="px-4 py-2 text-center">
                                    <div className='flex space-x-4'>
                                        <button
                                        onClick={() => handleViewProduct(item?.PK, item?.SK)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item?.PK, item?.SK)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {datas?.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
