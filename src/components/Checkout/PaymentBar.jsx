'use client';
import useCartStore from '@/globalStore/useCartStore';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { purchaseProduct } from '@/api/purchaseApis/purchasePost';
import { toast } from 'react-toastify';

export default function PaymentBar() {
    const [decodedData, setDecodedData] = useState([]);
    const [activeColors, setActiveColors] = useState({});

    console.log(decodedData);


    useEffect(() => {
        const storedCart = localStorage.getItem("checkoutProduct");

        if (storedCart) {
            try {
                const decodedCart = JSON.parse(decodeURIComponent(storedCart));
                const initializedData = decodedCart.map(item => ({
                    ...item,
                    selectedColor: item.selectedColor || item.imageURLs[0]?.color.name
                }));
                setDecodedData(initializedData);
            } catch (error) {
                console.error("Error parsing cart data:", error);
            }
        }
    }, []);

    const { removeProductFromCart } = useCartStore();

    const totalAmount = decodedData.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.itemQty) || 0;
        return total + price * quantity;
    }, 0);


    const updateCartItem = (pk, sk, newQty, newColor, sizeKey, newSize) => {
        setDecodedData(prevData =>
            prevData.map(item =>
                item.PK === pk && item.SK === sk
                    ? {
                        ...item,
                        itemQty: newQty,
                        selectedColor: newColor,
                        selectedSizes: {
                            ...item.selectedSizes,
                            ...(sizeKey && newSize ? { [sizeKey]: newSize } : {})
                        },
                        img: item.imageURLs.find(img => img.color.name === newColor)?.img || item.img
                    }
                    : item
            )
        );
    };

    const handlePlaceOrder = async () => {
        const orderPayload = {
            businessType: 'SUBHI_E_LTD',
            productIds: decodedData.map(item => ({
                PK: item.PK,
                SK: item.SK,
                quantity: item.itemQty,
            })),
            amount: totalAmount * 100, // Convert to cents if needed
            size: decodedData[0]?.selectedSizes
                ? Object.entries(decodedData[0].selectedSizes).map(([key, value]) => `${key}: ${value}`).join(', ')
                : 'size',
            color: decodedData[0]?.selectedColor || 'colorname'
        };

        try {
            const response = await purchaseProduct(orderPayload);

            if (response?.response?.data?.statusCode === 200) {
                toast.success('Purchase successful');
                router.push('/orders');
            } else {
                const errorMessage = response?.response?.data?.message || 'Purchase failed. Please try again.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            // Handle network errors and server errors
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'An unexpected error occurred';
            toast.error(errorMessage);
        }
    };


    return (
        <div className="right md:w-5/12 w-full ml-5">
            <div className="checkout-block bg-white p-6 rounded-lg shadow-lg">
                <div className="heading5 pb-3 text-2xl font-bold text-gray-800">Your Order</div>
                <div className="list-product-checkout">
                    {decodedData.map((item, index) => (
                        <div key={index} className='border-b border-gray-200 pb-6 mb-6'>
                            <div className="name text-lg font-semibold text-gray-700">{item.name || 'No Name'}</div>

                            <div className="item flex flex-col md:flex-row items-center justify-between w-full gap-6">
                                <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={item.img || '/public/image3.png'}
                                        width={500}
                                        height={500}
                                        alt="img"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <div className="text-sm text-gray-500 mt-2">
                                            <span className="size capitalize">{item.unit || "No Unit"}</span>
                                            <span>/</span>
                                            <span className="color capitalize">{item.status || "No Status"}</span>
                                        </div>
                                    </div>
                                    <div className="quantity-block md:p-3 p-2 flex items-center justify-between rounded-lg border border-line w-[140px] flex-shrink-0">
                                        <input
                                            type="number"
                                            value={item.itemQty}
                                            min="1"
                                            onChange={(e) => updateCartItem(item.PK, item.SK, e.target.value, activeColors[item.PK + item.SK] || item.imageURLs[0]?.color.name)}
                                            className="w-12 text-center border border-gray-300 rounded"
                                        />
                                        <span className="px-1">x</span>
                                        <span>${item.price || 0}.00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="choose-color mt-4">
                                <p className="text-lg font-semibold text-gray-700">
                                    Color: <span className="text-purple-600">{item.selectedColor}</span>
                                </p>
                                <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                    {item.imageURLs.map((image, idx) => (
                                        <button
                                            key={idx}
                                            className={`color-item w-12 h-12 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${activeColors[item.PK + item.SK] === image.color.name ? "border-2 border-purple-600" : "border-2 border-transparent"
                                                }`}
                                            onClick={() => updateCartItem(item.PK, item.SK, item.itemQty, image.color.name)}
                                        >
                                            <Image
                                                src={image.img}
                                                alt={image.color.name}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="choose-size mt-5">
                                {item.additionalInformation?.map((info, infoIndex) => {
                                    const values = info.value.replace(/\s/g, '').split(',');
                                    const formattedValues = values.map(value =>
                                        info.key === "width" ? value + "mm" : value + "cm"
                                    );

                                    return (
                                        <div key={infoIndex} className="size-option mb-4">
                                            <div className="text-title">
                                                {info.key.charAt(0).toUpperCase() + info.key.slice(1)} Sizes:
                                            </div>
                                            <div className="list-size flex items-center gap-2 flex-wrap mt-2">
                                                {formattedValues.map((size, sizeIndex) => (
                                                    <div
                                                        key={sizeIndex}
                                                        className={`size-btn px-3 py-1 rounded-full border cursor-pointer ${item.selectedSizes?.[info.key] === size
                                                            ? 'border-purple bg-purple text-white'
                                                            : 'border-line hover:border-purple'
                                                            }`}
                                                        onClick={() => updateCartItem(item.PK, item.SK, item.itemQty, item.selectedColor, info.key, size)}
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between w-full space-x-4">
                                <div
                                    className="remove-cart-btn text-sm font-semibold text-red-500 underline cursor-pointer hover:text-red-700"
                                    onClick={() => removeProductFromCart(item.PK, item.SK)}
                                >
                                    Remove
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="total-cart-block pt-6 flex justify-between border-t border-gray-200">
                    <div className="heading5 text-xl font-bold text-gray-800">Total</div>
                    <div className="heading5 total-cart text-xl font-bold text-purple-600">${totalAmount.toFixed(2)}</div>
                </div>
            </div>

            <button
                className="w-full bg-[black] font-semibold text-white py-3 rounded-lg mt-4 hover:bg-[#000000e0] transition duration-300"
                onClick={handlePlaceOrder}
            >
                Place Order
            </button>
        </div>
    );
}
