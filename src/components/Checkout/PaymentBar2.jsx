'use client';
import useCartStore from '@/globalStore/useCartStore'; // Ensure this import is correct
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import { getAuthHeaders } from '@/api/baseApi';
import axios from 'axios';
import PaymentComponent from '@/components/Payment/Payment';
import Script from 'next/script';


export default function PaymentBarTwo() {
    const [decodedData, setDecodedData] = useState([]);
    const [activeColors, setActiveColors] = useState({});
    const [activeImages, setActiveImages] = useState({}); // State to track active image for each product

    const { removeProductFromCart } = useCartStore();

    // Use useCallback for referential equality and prevent unnecessary re-renders
    const loadCartData = useCallback(() => {
        const storedCart = localStorage.getItem("cartData");
        if (storedCart) {
            try {
                const decodedCart = JSON.parse(decodeURIComponent(storedCart));
                setDecodedData(decodedCart);
            } catch (error) {
                console.error("Error parsing cart data:", error);
            }
        }
    }, []);

    useEffect(() => {
        loadCartData();
    }, [loadCartData]); // Only re-run if loadCartData changes (which it won't)

    // Use useCallback for referential equality and prevent unnecessary re-renders
    const calculateTotalAmount = useCallback((cartItems) => {
        return cartItems.reduce((total, item) => {
            const price = item.productDetails.price || 0;
            const discountPercentage = item.productDetails.discount || 0;
            const qty = item.qty || 1;
            const discountAmount = (price * discountPercentage) / 100;
            const finalPrice = price - discountAmount;
            return total + finalPrice * qty;
        }, 0);
    }, []);

    const totalAmount = calculateTotalAmount(decodedData);

    // Optimized updateCartItemQty function
    const updateCartItemQty = useCallback((PK, SK, newQty) => {
        setDecodedData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.PK === PK && item.SK === SK) {
                    const parsedQty = parseInt(newQty, 10); // Parse to integer with radix 10
                    return { ...item, qty: isNaN(parsedQty) ? 1 : Math.max(1, parsedQty) }; // Ensure quantity is not NaN and is at least 1
                }
                return item;
            });

            localStorage.setItem("cartData", encodeURIComponent(JSON.stringify(updatedData)));
            return updatedData;
        });
    }, []);

    // Optimized removeItem function
    const removeItem = useCallback((PK, SK) => {
        setDecodedData(prevData => {
            const filteredData = prevData.filter(item => !(item.PK === PK && item.SK === SK));
            localStorage.setItem("cartData", encodeURIComponent(JSON.stringify(filteredData)));
            return filteredData;
        });
        removeProductFromCart(PK, SK);
    }, [removeProductFromCart]);  // Include removeProductFromCart in the dependency array

    // Optimized handleColorSelection function
    const handleColorSelection = useCallback((PK, SK, colorName, imageUrl) => {
        setActiveColors(prevState => ({ ...prevState, [PK + SK]: colorName }));
        setActiveImages(prevState => ({ ...prevState, [PK + SK]: imageUrl }));
    }, []);

    //New Function For Cart Item Update
    const updateCartItem = useCallback((PK, SK, qty, selectedColor, keyToUpdate, newValue) => {
        setDecodedData(prevData => {
            const updatedData = prevData.map(item => {
                if (item.PK === PK && item.SK === SK) {
                    return { ...item, [keyToUpdate]: newValue };
                }
                return item;
            });

            localStorage.setItem("cartData", encodeURIComponent(JSON.stringify(updatedData)));
            return updatedData;
        });
    }, []);

    const generateOrderPayload = useCallback(() => {
        return {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            productIds: decodedData.map(item => ({
                PK: item.PK,
                SK: item.SK,
                quantity: item.qty,
            })),
            amount: totalAmount * 100,
            size: decodedData.length > 0 && decodedData[0]?.selectedSizes
                ? Object.entries(decodedData[0].selectedSizes)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ')
                : 'size',
            color: decodedData.length > 0 ? decodedData[0]?.selectedColor || 'colorname' : 'colorname'
        };
    }, [decodedData, totalAmount]);

    const generateOrderPayloads = useCallback(() => {
        return decodedData.map(item => {
            let defaultSize = 'size';
            if (Array.isArray(item?.productDetails?.size) && item.productDetails.size.length > 0) {
                defaultSize = item.productDetails.size[0]; // Choose the first size as default
            }

            return {
                businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
                productIds: [{
                    PK: item.PK,
                    SK: item.SK,
                    quantity: item.qty,
                }],
                amount: item.productDetails.price * item.qty * 100,
                size: item?.selectedSizes || defaultSize, // Use the selected size or default size
                color: item?.selectedColor || activeColors[item.PK + item.SK]
            };
        });
    }, [decodedData]);

    const checkoutHandler = async () => {
        const orderPayload = generateOrderPayloads();
        console.log(orderPayload);
    }



    return (
        <>
            <div className="right md:w-5/12 w-full lg:ml-5">
                <div className="checkout-block bg-white p-6 rounded-lg shadow-lg">
                    <div className="heading5 pb-3 text-2xl font-bold text-gray-800">Your Order</div>
                    <div className="list-product-checkout">
                        {decodedData?.map((item, index) => {
                            console.log();

                            return (
                                <div key={index} className='border-b border-gray-200 pb-6 mb-6'>
                                    <div className="name text-lg font-semibold text-gray-700">{item?.productDetails?.name || 'No Name'}</div>

                                    <div className="item flex flex-col md:flex-row items-center justify-between w-full gap-6">
                                        <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                                            <Image
                                                src={activeImages[item.PK + item.SK] || item?.productDetails?.img || '/image3.png'}
                                                width={500}
                                                height={500}
                                                alt="Product Image"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between w-full">
                                            <div>
                                                <div className="text-sm text-gray-500 mt-2 flex  ">
                                                    <span className="size capitalize">{item?.productDetails?.quantity || 0}</span>
                                                    <span>/</span>
                                                    <span className="color capitalize ">{item?.productDetails?.quantity == 0 ? <p className='text-[red]' > Out Of Stock </p> : item?.productDetails?.status}</span>
                                                </div>
                                                {activeColors[item.PK + item.SK] && (
                                                    <div className="selected-color mt-2">
                                                        <span className="font-semibold text-purple-600">
                                                            {activeColors[item.PK + item.SK]}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="quantity-block md:p-3 p-2 flex items-center justify-between rounded-lg border border-gray-300 w-[140px] flex-shrink-0">
                                                <input
                                                    type="number"
                                                    value={item?.qty || ''}
                                                    min="1"
                                                    onChange={(e) => updateCartItemQty(item.PK, item.SK, e.target.value)}
                                                    className="w-12 text-center border border-gray-300 rounded"
                                                />
                                                <span className="px-1">x</span>
                                                <span>${item?.productDetails?.price || 0}.00</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="choose-size mt-5">
                                        <p className="text-lg font-semibold text-gray-700">
                                            Size: <span className="text-purple-600">{item.selectedSizes || "No Size Selected"}</span>
                                        </p>
                                        <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                            {Array.isArray(item?.productDetails?.size) ? (
                                                item?.productDetails?.size?.map((sz, idx) => (
                                                    <button
                                                        key={idx}
                                                        className={`size-item px-3 py-2 rounded-md border ${item.selectedSizes === sz ? "border-purple-600 bg-purple-500" : "border-gray-300"}`}
                                                        onClick={() => updateCartItem(item.PK, item.SK, item.qty, item.selectedColor, "selectedSizes", sz)}
                                                    >
                                                        {sz} {item?.productDetails?.unit}
                                                    </button>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">No sizes available</p>
                                            )}
                                        </div>
                                    </div>

                                    <p className='text-[red] text-sm my-[1rem]'>
                                        Discount: {item?.productDetails?.discount}%
                                    </p>

                                    <div className="choose-color mt-4">
                                        <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                            {item?.productDetails?.imageURLs.map((image, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`color-item w-14 h-12 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow  ${activeColors[item.PK + item.SK] === image.color.name ? "border-2 border-purple-600" : "border-2 border-transparent"
                                                        }`}
                                                    onClick={() => handleColorSelection(item.PK, item.SK, image.color.name, image.img)}
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

                                    <div className="flex justify-end w-full text-[red] ">
                                        <div
                                            className="remove-cart-btn text-sm font-semibold text-red-500 underline cursor-pointer hover:text-red-700"
                                            onClick={() => removeItem(item.PK, item.SK)}
                                        >
                                            Remove
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="total-cart-block pt-6 flex justify-between border-t border-gray-200">
                        <div className="heading5 text-xl font-bold text-gray-800">Total</div>
                        <div className="heading5 total-cart text-xl font-bold text-purple-600">₹ {totalAmount.toFixed(2)}</div>
                    </div>
                </div>
                <button
                    className="w-full bg-[black] font-semibold text-white py-3 rounded-lg mt-4 hover:bg-[#000000e0] transition duration-300"
                    onClick={() => checkoutHandler()}
                >
                    Place Order
                </button>

                <PaymentComponent />
            </div>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="beforeInteractive" // Make sure it loads before user interaction
            />
        </>
    );
}