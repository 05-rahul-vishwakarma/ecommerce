"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useCartStore from '@/globalStore/useCartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import PaymentComponent from '../Payment/Payment'; // Make sure path is correct

// Utility function to prevent errors
const safeParseInt = (value) => {
    try {
        return parseInt(value, 10);
    } catch (error) {
        console.error("Error parsing integer:", error);
        return 1; // Default value
    }
};

export default function PaymentBar({ cartData }) {
    const [decodedData, setDecodedData] = useState([]);
    const [activeColors, setActiveColors] = useState({});
    const [activeImages, setActiveImages] = useState({});
    const { removeProductFromCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeWidth, setActiveWidth] = useState(null);
    const [activeLength, setActiveLength] = useState(null);

    // Initialize decodedData from props
    useEffect(() => {
        if (cartData) {
            setDecodedData(cartData);
        }
    }, [cartData]);

    // Calculate total amount
    const totalAmount = useMemo(() => {
        return decodedData.reduce((total, item) => {
            const price = item.productDetails.price || 0;
            const discount = item.productDetails.discount || 0;
            const qty = item.qty || 1;
            const discountedPrice = price * (1 - discount / 100);
            return total + discountedPrice * qty;
        }, 0);
    }, [decodedData]);

    // Update cart item quantity
    const updateCartItemQty = useCallback((PK, SK, newQty) => {
        setDecodedData(prevData => {
            return prevData.map(item => {
                if (item.PK === PK && item.SK === SK) {
                    const parsedQty = safeParseInt(newQty); // Use safeParseInt
                    return { ...item, qty: isNaN(parsedQty) ? 1 : Math.max(1, parsedQty) };
                }
                return item;
            });
        });
    }, []);

    // Handle remove item from cart
    const handleRemoveFromCart = useCallback((PK, SK) => {
        setDecodedData(prevData => prevData.filter(item => !(item.PK === PK && item.SK === SK)));
        removeProductFromCart(PK, SK);
    }, [removeProductFromCart]);

    // Handle color selection
    const handleColorSelection = useCallback((PK, SK, colorName, imageUrl) => {
        setActiveColors(prevState => ({ ...prevState, [PK + SK]: colorName }));
        setActiveImages(prevState => ({ ...prevState, [PK + SK]: imageUrl }));
        setDecodedData(prevData => {
            return prevData.map(item => {
                if (item.PK === PK && item.SK === SK) {
                    return { ...item, selectedColor: colorName, img: imageUrl };
                }
                return item;
            });
        });
    }, []);

    // Update cart item (size, color)
    const updateCartItem = useCallback((PK, SK, keyToUpdate, newValue) => {
        setDecodedData(prevData => {
            return prevData.map(item => {
                if (item.PK === PK && item.SK === SK) {
                    return { ...item, [keyToUpdate]: newValue };
                }
                return item;
            });
        });
    }, []);

    // Generate order payload
    const generateOrderPayloads = useCallback(() => {
        return decodedData.map(item => {
            let defaultSize = 'size';
            if (Array.isArray(item?.productDetails?.size) && item.productDetails.size.length > 0) {
                defaultSize = item.productDetails.size[0]; // Choose the first size as default
            }

            // Calculate the discounted price for the item
            const price = item.productDetails.price || 0;
            const discount = item.productDetails.discount || 0;
            const discountedPrice = price * (1 - discount / 100);

            return {
                businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
                productIds: [{
                    PK: item.PK,
                    SK: item.SK,
                    quantity: item.qty,
                }],
                amount: discountedPrice * item.qty * 100,  // Use discounted price and convert to paise
                size: item?.selectedSizes || defaultSize, // Use the selected size or default size
                color: item?.selectedColor || activeColors[item.PK + item.SK],
                productName: item?.productDetails?.name // Add product name for better logging/tracking
            };
        });
    }, [decodedData, activeColors]);

    // Place order handler
    const handlePlaceOrder = async () => {
        if (loading) return;
        setLoading(true);

        const orderPayload = generateOrderPayloads();

        try {
            // Simulate API Call
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Order Payload:", orderPayload);

            // ** IMPORTANT: Integrate with your actual payment/order API here! **
            //  This is where you'd send the orderPayload to your backend to process
            //  the order and payment.  The example below is just a placeholder.

            // Replace this with your actual API call to create the order
            // const response = await fetch('/api/create-order', {  // Example API endpoint
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(orderPayload),
            // });
            //
            // if (!response.ok) {
            //     throw new Error('Failed to create order');
            // }
            //
            // const orderData = await response.json();
            // console.log("Order created:", orderData);
            // toast.success('Order Placed Successfully!');
            // router.push('/orders');

            // Placeholder success:
            toast.success('Order details logged to console (no actual order placed).');

        } catch (error) {
            console.error("Order Placement Error:", error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Precompute widths and lengths for each item
    const itemDetails = useMemo(() => {
        return decodedData.map(item => {
            const widthInfo = item?.productDetails?.additionalInformation?.find((info) => info.key === "width");
            const lengthInfo = item?.productDetails?.additionalInformation?.find((info) => info.key === "length");

            return {
                widths: widthInfo ? widthInfo.value.split(",") : [],
                lengths: lengthInfo ? lengthInfo.value.split(",") : [],
            };
        });
    }, [decodedData]);

    return (
        <div className="right md:w-5/12 w-full">
            <div className="checkout-block bg-white p-6 rounded-lg shadow-lg">
                <div className="heading5 pb-3 text-2xl font-bold text-gray-800">Your Order</div>
                <div className="list-product-checkout">
                    {decodedData?.map((item, index) => {
                        const { widths, lengths } = itemDetails[index];

                        // Calculate discounted price for this specific item
                        const price = item?.productDetails?.price || 0;
                        const discount = item?.productDetails?.discount || 0;
                        const discountedPrice = price * (1 - discount / 100);


                        return (
                            <div key={index} className="border-b border-gray-200 pb-6 mb-6">
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
                                            <div className="text-sm text-gray-500 mt-2 flex">
                                                <span className="size capitalize">{item?.productDetails?.unit || "No Unit"}</span>
                                                <span>/</span>
                                                <span className="color capitalize">{item?.productDetails?.quantity == 0 ? <p className='text-[red]'> Out Of Stock </p> : item?.productDetails?.status}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <span className="font-semibold">Price:</span> ₹{item?.productDetails?.price || 0}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <span className="font-semibold">Discount:</span> {item?.productDetails?.discount}%
                                            </div>
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
                                            <span>₹{discountedPrice.toFixed(2)}</span> {/* Display discounted price */}
                                        </div>
                                    </div>
                                </div>
                                <div className="choose-color mt-4">
                                    <p className="text-lg font-semibold text-gray-700">
                                        Color: <span className="text-purple-600">{item.selectedColor || "No Color Selected"}</span>
                                    </p>
                                    <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                        {item?.productDetails?.imageURLs?.map((image, idx) => (
                                            <button
                                                key={idx}
                                                className={`color-item w-12 h-12 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${activeColors[item.PK + item.SK] === image.color.name ? "border-2 border-purple-600" : "border-2 border-transparent"}`}
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

                                {/* Width and Length selection - consider making these dynamic as well! */}
                                {widths.length > 0 && (
                                    <div className="choose-size mt-5">
                                        <div className="heading flex items-center justify-between">
                                            <div className="text-title">Width:</div>
                                        </div>
                                        <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                            {widths.map((width) => (
                                                <button
                                                    key={width}
                                                    className={`size-button ${activeWidth === width ? "active" : ""}`}
                                                    onClick={() => setActiveWidth(width)}
                                                >
                                                    {width}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {lengths.length > 0 && (
                                    <div className="choose-size my-5">
                                        <div className="heading flex items-center justify-between">
                                            <div className="text-title">Length:</div>
                                        </div>
                                        <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                            {lengths.map((length) => (
                                                <button
                                                    key={length}
                                                    className={`size-button ${activeLength === length ? "active" : ""}`}
                                                    onClick={() => setActiveLength(length)}
                                                >
                                                    {length}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end w-full text-[red]">
                                    <div
                                        className="remove-cart-btn text-sm font-semibold text-red-500 underline cursor-pointer hover:text-red-700"
                                        onClick={() => handleRemoveFromCart(item.PK, item.SK)}
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
            {/*  Passing the totalAmount to the PaymentComponent as a prop  */}
            <PaymentComponent amount={totalAmount} onSuccess={() => {
                toast.success('Payment successful!');
                router.push('/orders'); // or another appropriate page
            }}/>

            {/* <button
                className="w-full bg-[black] font-semibold text-white py-3 rounded-lg mt-4 hover:bg-[#000000e0] transition duration-300"
                onClick={handlePlaceOrder}
                disabled={loading}
            >
                {loading ? 'Placing Order...' : 'Place Order'}
            </button> */}
        </div>
    );
}