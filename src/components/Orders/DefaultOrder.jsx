import React from 'react';
import Image from 'next/image';

export default function DefaultOrder({ order }) {


    return (
        <div key={order.SK} className="item flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg mb-6">

            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h2 className="text-lg font-semibold">Order ID: {order.SK}</h2>
                    <p className="text-sm text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold">₹{(order.amount).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                </div>
            </div>

          
            {
                order?.data && order?.data.length > 0 && order?.data?.map((product, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 pt-4">
                        {/* Product Image */}
                        <div className="w-full md:w-1/4">
                            <Image
                                src={product.img}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="rounded-lg object-cover"
                            />
                        </div>

                        {/* Product Information */}
                        <div className="w-full md:w-3/4">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <div className="mt-2">
                                <p className="text-sm">
                                    <span className="font-semibold">Brand:</span> {product.brand.name}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Category:</span> {product.category.name}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Price:</span> ₹{product.price}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Discount:</span> {product.discount}%
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Status:</span> {product.status}
                                </p>
                            </div>

                            {/* Color Variants */}
                            <div className="mt-4">
                                <h4 className="text-md font-semibold">Color Variants:</h4>
                                <div className="flex gap-2 mt-2">
                                    {product.imageURLs.map((image, idx) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            <div
                                                className="w-8 h-8 rounded-full border-2 border-gray-200"
                                                style={{ backgroundColor: image.color.clrCode }}
                                            ></div>
                                            <p className="text-xs mt-1">{image.color.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* Order Footer */}
            <div className="flex justify-between items-center border-t pt-4">
                <p className="text-sm text-gray-500">
                    Last Updated: {new Date(order.updatedAt).toLocaleDateString()}
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    View Details
                </button>
            </div>
        </div>
    );
}