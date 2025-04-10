'use client';
import useCartStore from '@/globalStore/useCartStore';
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { purchaseProduct } from '@/api/purchaseApis/purchasePost';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import PaymentComponent from '../Payment/Payment';

export default function PaymentBar() {
    const [decodedData, setDecodedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
                toast.error("Error loading cart data. Please refresh the page.");
            }
        }
    }, []);

    const totalAmount = decodedData.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.itemQty) || 0;
        return total + price * quantity;
    }, 0);

    const updateCartItem = useCallback((pk, sk, newQty, newColor, newWidth, newLength) => {
        setDecodedData(prevData =>
            prevData.map(item =>
                item.PK === pk && item.SK === sk
                    ? {
                        ...item,
                        itemQty: newQty,
                        selectedColor: newColor,
                        selectedWidth: newWidth,
                        selectedLength: newLength,
                        img: item.imageURLs.find(img => img.color.name === newColor)?.img || item.img
                    }
                    : item
            )
        );
    }, []);

    const handlePlaceOrder = async () => {
        if (loading) return;
        
        // Check if any product is out of stock
        const outOfStockItems = decodedData.filter(item => item.quantity === 0);
        if (outOfStockItems.length > 0) {
            toast.error('Some items in your cart are out of stock. Please remove them before proceeding.');
            return;
        }

        setLoading(true);

        const orderPayload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            productIds: decodedData.map(item => ({
                PK: item.PK,
                SK: item.SK,
                quantity: item.itemQty,
            })),
            amount: totalAmount,
        };

        try {
            // First handle the payment
            const paymentResult = await new Promise((resolve, reject) => {
                setShowPayment(true);
                setPaymentCallback({
                    onSuccess: () => resolve(true),
                    onError: (error) => reject(error)
                });
            });

            if (!paymentResult) {
                throw new Error('Payment failed or was cancelled');
            }


            // If payment is successful, proceed with order placement
            const response = await purchaseProduct(orderPayload);
            if (response?.statusCode === 200) {
                toast.success(response?.message || 'Order placed successfully');
                localStorage.removeItem('checkoutProduct');
                router.push('/orders');
            } else {
                throw new Error(response.data?.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
            setShowPayment(false);
        } finally {
            setLoading(false);
        }
    };

    // Add state for payment handling
    const [showPayment, setShowPayment] = useState(false);
    const [paymentCallback, setPaymentCallback] = useState({
        onSuccess: () => { },
        onError: () => { }
    });

    const widths = useMemo(() => {
        const widthInfo = decodedData?.[0]?.additionalInformation?.find((info) => info.key === "width");
        return widthInfo ? widthInfo.value.split(",") : [];
    }, [decodedData?.[0]?.additionalInformation]);

    const lengths = useMemo(() => {
        const lengthInfo = decodedData?.[0]?.additionalInformation?.find((info) => info.key === "length");
        return lengthInfo ? lengthInfo.value.split(",") : [];
    }, [decodedData?.[0]?.additionalInformation]);

    const handleRemoveFromCart = (pk, sk) => {
        removeProductFromCart(pk, sk); //remove from zustand store
        setDecodedData(prevData => prevData.filter(item => !(item.PK === pk && item.SK === sk))); // Remove from local state
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
                                            <span className={`${item?.quantity === 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                {item?.quantity === 0 ? 'Out of Stock' : 'In Stock'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="quantity-block md:p-3 p-2 flex items-center justify-between rounded-lg border border-line w-[140px] flex-shrink-0">
                                        <input
                                            type="number"
                                            value={item.itemQty}
                                            min="1"
                                            onChange={(e) => updateCartItem(item.PK, item.SK, e.target.value, item.selectedColor || item.imageURLs[0]?.color.name, item.selectedWidth, item.selectedLength)}
                                            className="w-12 text-center border border-gray-300 rounded"
                                        />
                                        <span className="px-1">x</span>
                                        <span>₹{item.price || 0}.00</span>
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
                                            onClick={() => updateCartItem(item.PK, item.SK, item.itemQty, image.color.name, item.selectedWidth, item.selectedLength)}
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

                            <div className="flex space-x-2 place-items-center ">
                                <div className="">
                                    <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                        {widths.map((width) => (
                                            <button
                                                key={width}
                                                className={`size-button ${item.selectedWidth === width ? "active" : ""}`}
                                                onClick={() => updateCartItem(item.PK, item.SK, item.itemQty, item.selectedColor, width, item.selectedLength)}
                                            >
                                                {width}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mx-2 mt-1.5 text-secondary2"> X </div>
                                <div className="">
                                    <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                        {lengths?.map((length) => (
                                            <button
                                                key={length}
                                                className={`size-button ${item.selectedLength === length ? "active" : ""}`}
                                                onClick={() => updateCartItem(item.PK, item.SK, item.itemQty, item.selectedColor, item.selectedWidth, length)}
                                            >
                                                {length}
                                            </button>
                                        ))}
                                    </div>
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
                    <div className="heading5 total-cart text-xl font-bold text-purple-600">₹{totalAmount.toFixed(2)}</div>
                </div>
            </div>

            {showPayment ? (
                <PaymentComponent
                    amount={totalAmount}
                    onSuccess={() => {
                        paymentCallback.onSuccess();
                        setShowPayment(false);
                    }}
                    onError={(error) => {
                        paymentCallback.onError(error);
                        setShowPayment(false);
                    }}
                    isMultipleProducts={false}
                />
            ) : (
                <button
                    className="w-full bg-[black] font-semibold text-white py-3 rounded-lg mt-4 hover:bg-[#000000e0] transition duration-300"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            )}
        </div>
    );
}