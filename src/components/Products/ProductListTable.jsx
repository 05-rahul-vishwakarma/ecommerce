import React from 'react'


const ProductTable = ({ data }) => {
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
                        {data?.map((item, index) => (
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
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;