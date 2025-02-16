"use client";
import axios from "axios";
import React, { useState } from "react";

const BlogTable = ({ data }) => {
    const [datas, setData] = useState(data); // Manage data with state

    const handleDelete = async (PK, SK) => {
        try {
            const encodedPK = encodeURIComponent(PK);
            const encodedSK = encodeURIComponent(SK);

            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/meta-content/blog/delete?PK=${encodedPK}&SK=${encodedSK}`,
            );
            setData((prevData) =>
                prevData.filter((item) => item.PK !== PK || item.SK !== SK),
            );
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold">Blog Table</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Author</th>
                            <th className="px-4 py-2">Created At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas?.map((blog, index) => (
                            <tr key={blog.PK} className="transition-colors duration-300 hover:bg-gray-100 dark:bg-[#0000002a] dark:shadow-card dark:hover:bg-gray-600">
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2 capitalize ">{blog.title}</td>
                                <td className="px-4 py-2 capitalize ">{blog.category}</td>
                                <td className="px-4 py-2 capitalize">{blog.author}</td>
                                <td className="px-4 py-2 text-center capitalize">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-center capitalize">
                                    <div className="flex space-x-4">
                                        <button className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">
                                            View
                                        </button>
                                        <button onClick={() => handleDelete(blog?.PK, blog?.SK)} className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogTable;
