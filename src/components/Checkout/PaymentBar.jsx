'use client';
import useCartStore from '@/globalStore/useCartStore';
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react'; // useCallback added
import { purchaseProduct } from '@/api/purchaseApis/purchasePost';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function PaymentBar() {
    const [decodedData, setDecodedData] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter(); // Initialize useRouter

    const { removeProductFromCart } = useCartStore();

    useEffect(() => {
        const storedCart = localStorage.getItem("checkoutProduct");

        if (storedCart) {
            try {
                const decodedCart = JSON.parse(decodeURIComponent(storedCart));
                setDecodedData(decodedCart.map(item => ({
                    ...item,
                    selectedColor: item.selectedColor || item.imageURLs[0]?.color.name
                })));
            } catch (error) {
                console.error("Error parsing cart data:", error);
                toast.error("Error loading cart data. Please refresh the page."); // User-friendly error
            }
        }
    }, []);

    const totalAmount = decodedData.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.itemQty) || 0;
        return total + price * quantity;
    }, 0);

    // Use useCallback to memoize the updateCartItem function. This prevents unnecessary re-renders.
    const updateCartItem = useCallback((pk, sk, newQty, newColor, sizeKey, newSize) => {
        setDecodedData(prevData =>
            prevData.map(item =>
                item.PK === pk && item.SK === sk
                    ? {
                        ...item,
                        itemQty: newQty,
                        selectedColor: newColor,
                        selectedSizes: newSize,
                        img: item.imageURLs.find(img => img.color.name === newColor)?.img || item.img
                    }
                    : item
            )
        );
    }, []);

    const handlePlaceOrder = async () => {
        if (loading) return; // Prevent multiple requests
        setLoading(true); // Set loading state

        const orderPayload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            productIds: decodedData.map(item => ({
                PK: item.PK,
                SK: item.SK,
                quantity: item.itemQty,
            })),
            amount: totalAmount * 100,
            size: decodedData[0]?.selectedSizes
                ? Object.entries(decodedData[0].selectedSizes).map(([key, value]) => `${key}: ${value}`).join(', ')
                : 'size',
            color: decodedData[0]?.selectedColor || 'colorname'
        };

        try {
            const response = await purchaseProduct(orderPayload);
            if (response?.response?.data?.statusCode === 200) {
                toast.success('Purchase successful');
                // Clear localStorage
                localStorage.removeItem('checkoutProduct');
                // Update the cart store after a successful purchase to remove all the item from the cart
                decodedData.forEach(item => {
                    removeProductFromCart(item.PK, item.SK);
                });

                router.push('/orders');
            } else {
                const errorMessage = response?.response?.data?.message || 'Purchase failed. Please try again.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'An unexpected error occurred';
            toast.error(errorMessage);
        } finally {
            setLoading(false); // Reset loading state whether success or failure
        }
    };

    return (
        <div className="right md:w-5/12 w-full ">
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
                                            onChange={(e) => updateCartItem(item.PK, item.SK, e.target.value, item.selectedColor || item.imageURLs[0]?.color.name)}
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
                                    {item?.imageURLs?.map((image, idx) => (
                                        <button
                                            key={idx}
                                            className={`color-item w-12 h-12 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${item.selectedColor === image.color.name ? "border-2 border-purple-600" : "border-2 border-transparent"
                                                }`}
                                            onClick={() => updateCartItem(item.PK, item.SK, item.itemQty, image.color.name)}
                                        >
                                            <Image
                                                src={image?.img}
                                                alt={image?.color?.name}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="choose-size mt-5">
                                <p className="text-lg font-semibold text-gray-700">
                                    Size: <span className="text-purple-600">{item?.selectedSizes || "No Size Selected"}</span>
                                </p>
                                <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                    {Array.isArray(item.size) ? (
                                        item?.size?.map((sz, idx) => (
                                            <button
                                                key={idx}
                                                className={`size-item px-3 py-2 rounded-md border ${item.selectedSizes === sz ? "border-purple-600 bg-purple-500" : "border-gray-300"}`}
                                                onClick={() => updateCartItem(item.PK, item.SK, item.itemQty, item.selectedColor, "selectedSizes", sz)}
                                            >
                                                {sz} {item?.unit}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No sizes available</p>
                                    )}
                                </div>
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
                disabled={loading} // Disable the button while loading
            >
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>
        </div>
    );
}