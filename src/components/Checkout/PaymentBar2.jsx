'use client';
import useCartStore from '@/globalStore/useCartStore'; // Ensure this import is correct
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import PaymentComponent from '@/components/Payment/Payment'

export default function PaymentBarTwo() {
    const [decodedData, setDecodedData] = useState([]);
    const [activeColors, setActiveColors] = useState({});
    const [activeImages, setActiveImages] = useState({}); // State to track active image for each product

    const { removeProductFromCart } = useCartStore();

    useEffect(() => {
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

    console.log(decodedData, 'decodedData');

    function calculateTotalAmount(cartItems) {
        return cartItems.reduce((total, item) => {
            const price = item.productDetails.price || 0;
            const discountPercentage = item.productDetails.discount || 0; // Ensure it’s a number
            const qty = item.qty || 1;

            // Calculate the discounted price
            const discountAmount = (price * discountPercentage) / 100;
            const finalPrice = price - discountAmount;

            return total + finalPrice * qty;
        }, 0);
    }

    const totalAmount = calculateTotalAmount(decodedData);

    function updateCartItemQty(PK, SK, newQty) {
        setDecodedData(prevData => {
            const updatedData = prevData.map(item =>
                item.PK === PK && item.SK === SK ? { ...item, qty: parseInt(newQty) } : item
            );

            // Save updated cart back to localStorage
            localStorage.setItem("cartData", encodeURIComponent(JSON.stringify(updatedData)));
            return updatedData;
        });
    }

    function removeItem(PK, SK) {
        setDecodedData(prevData => {
            const filteredData = prevData.filter(item => !(item.PK === PK && item.SK === SK));
            localStorage.setItem("cartData", encodeURIComponent(JSON.stringify(filteredData)));
            return filteredData;
        });
        removeProductFromCart(PK, SK);
    }

    // Function to handle color selection and change the image
    function handleColorSelection(PK, SK, colorName, imageUrl) {
        setActiveColors(prevState => ({
            ...prevState,
            [PK + SK]: colorName
        }));
        setActiveImages(prevState => ({
            ...prevState,
            [PK + SK]: imageUrl
        }));
    }

    return (
        <div className="right md:w-5/12 w-full ml-5">
            <div className="checkout-block bg-white p-6 rounded-lg shadow-lg">
                <div className="heading5 pb-3 text-2xl font-bold text-gray-800">Your Order</div>
                <div className="list-product-checkout">
                    {
                        decodedData?.map((item, index) => (
                            <div key={index} className='border-b border-gray-200 pb-6 mb-6'>
                                <div className="name text-lg font-semibold text-gray-700">{item?.productDetails?.name || 'No Name'}</div>

                                <div className="item flex flex-col md:flex-row items-center justify-between w-full gap-6">
                                    <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                                        <Image
                                            src={activeImages[item.PK + item.SK] || item?.productDetails?.img || '/image3.png'} // Display active image or default image
                                            width={500}
                                            height={500}
                                            alt="Product Image"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <span className="size capitalize">{item?.productDetails?.unit || "No Unit"}</span>
                                                <span>/</span>
                                                <span className="color capitalize">{item?.productDetails?.status || "No Status"}</span>
                                            </div>

                                            {
                                                activeColors &&
                                                <div className="selected-color mt-2">
                                                    {/* <span className="text-gray-700 font-medium">Selected Color: </span> */}
                                                    <span className="font-semibold text-purple-600">
                                                        {activeColors[item.PK + item.SK] || ''}
                                                    </span>
                                                </div>
                                            }

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
                                                onClick={() => handleColorSelection(item.PK, item.SK, image.color.name, image.img)} // Handle color change
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
                        ))
                    }
                </div>
                <div className="total-cart-block pt-6 flex justify-between border-t border-gray-200">
                    <div className="heading5 text-xl font-bold text-gray-800">Total</div>
                    <div className="heading5 total-cart text-xl font-bold text-purple-600">₹ {totalAmount.toFixed(2)}</div>
                </div>
            </div>
            <button
                className="w-full bg-[black] font-semibold text-white py-3 rounded-lg mt-4 hover:bg-[#000000e0] transition duration-300"
                onClick={() => console.log('Order placed!', decodedData)}
            >
                Place Order
            </button> 
            <PaymentComponent />
        </div>
    );
}
