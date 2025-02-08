// 'use client';
// import useCartStore from '@/globalStore/useCartStore';
// import { useCart } from '@/context/CartContext';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { purchaseProduct } from '@/api/purchaseApis/purchasePost';
// import { dltCartProduct } from '@/api/productApis/deleteApi';

// export default function PaymentBar() {
//     const storedData = localStorage.getItem("checkoutProduct");

//     if (storedData) {
//         const decodedData = JSON.parse(atob(storedData));
//         console.log("Decoded Retrieved Data:", decodedData);
//     }

    // const { mergedCart, updateCartItemQuantity, updateCartItemColor, removeProductFromCart } = useCartStore();
    // const [editingQuantity, setEditingQuantity] = useState(null);

    // const handleQuantityChange = (SK, newQuantity) => {
    //     updateCartItemQuantity(SK, newQuantity);
    // };

    // const handleColorChange = (SK, newColor) => {
    //     updateCartItemColor(SK, newColor);
    // };

    // const totalCart = mergedCart.reduce((total, item) => total + item.totalAmount * item.qty, 0);

//     const handleBuy = async () => {
//         if (mergedCart.length === 0) {
//             toast.error('Your cart is empty!');
//             return;
//         }

//         const payload = {
//             businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
//             productIds: mergedCart.map(item => ({
//                 PK: item?.productDetails[0]?.PK,
//                 SK: item?.productDetails[0]?.SK,
//                 quantity: item.qty
//             })),
//             amount: totalCart
//         };

//         const removecartPayload = {
//             productIds: mergedCart.map(item => ({
//                 PK: item?.PK,
//                 SK: item?.SK,
//             })),
//         }

//         try {
//             const response = await purchaseProduct(payload);
//             console.log(response);
//             if (response?.data?.statusCode === 200) {
//                 for (const item of mergedCart) {
//                     await dltCartProduct(item.PK, item.SK);
//                 }
//                 toast.success(response?.data?.message);
//             }
//         } catch (error) {
//             toast.error('Something went wrong. Please try again.');
//             console.error("Purchase Error:", error);
//         }
//     };


//     return (
//         <div className="right md:w-5/12 w-full ml-5">
//             <div className="checkout-block">
//                 <div className="heading5 pb-3">Your Order</div>
//                 <div className="list-product-checkout">
//                     {mergedCart?.map((product, i) => (
//                         <div key={i} className="item flex flex-col md:flex-row items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
//                             <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
//                                 <Image
//                                     src={product?.productDetails?.[0]?.img || '/public/image3.png'}
//                                     width={500}
//                                     height={500}
//                                     alt="img"
//                                     className="w-full h-full"
//                                 />
//                             </div>
//                             <div className="flex items-center justify-between w-full">
//                                 <div>
//                                     <div className="flex items-center justify-between w-full space-x-4 ">
//                                         <div className="name text-button">{product?.productDetails?.[0]?.name || 'none'}</div>
//                                         <div
//                                             className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
//                                             onClick={() => removeProductFromCart(product?.PK, product?.SK)}
//                                         >
//                                             Remove
//                                         </div>
//                                     </div>
//                                     <div className="caption1 text-secondary mt-2">
//                                         <span className='size capitalize'>{product.selectedSize || "product size"}</span>
//                                         <span>/</span>
//                                         <span className='color capitalize'>{product.selectedColor || "product color"}</span>
//                                     </div>
//                                     <div className="color-options mt-2">
//                                         {product.imageUrl?.map((image, index) => (
//                                             <button
//                                                 key={index}
//                                                 className={`w-6 h-6 rounded-sm  mr-2 ${product.selectedColor === image.color.name
//                                                     ? 'border-blue-500'
//                                                     : 'border-gray-300'
//                                                     }`}
//                                                 style={{ backgroundColor: image.color.clrCode }}
//                                                 onClick={() => handleColorChange(product.SK, image.color.name)}
//                                                 title={image.color.name}
//                                             />

//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="text-title">
//                                     {editingQuantity === product.SK ? (
//                                         <input
//                                             type="number"
//                                             value={product.qty}
//                                             onChange={(e) => handleQuantityChange(product.SK, parseInt(e.target.value))}
//                                             onBlur={() => setEditingQuantity(null)}
//                                             min="1"
//                                             className="w-16 border border-line rounded px-2 py-1"
//                                         />
//                                     ) : (
//                                         <span
//                                             className='quantity cursor-pointer'
//                                             onClick={() => setEditingQuantity(product.SK)}
//                                         >
//                                             {product.qty}
//                                         </span>
//                                     )}
//                                     <span className='px-1'>x</span>
//                                     <span>${product.totalAmount}.00</span>

//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="total-cart-block pt-5 flex justify-between">
//                     <div className="heading5">Total</div>
//                     <div className="heading5 total-cart">${totalCart}.00</div>
//                 </div>


//                 <div onClick={handleBuy} className="button-block mt-5">
//                     <p className="button-main w-full text-center text-white">
//                         Buy
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function PaymentBar() {
    const [decodedData, setDecodedData] = useState(null);
    const [selectedQty, setSelectedQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    
    useEffect(() => {
        const storedData = localStorage.getItem("checkoutProduct");
        if (storedData) {
            try {
                const parsedData = JSON.parse(atob(storedData));
                setDecodedData(parsedData);
                setSelectedQty(parsedData.qty || 1);
                setSelectedColor(parsedData.imageURLs ? parsedData.imageURLs[0] : null);
            } catch (error) {
                console.error("Error decoding stored data:", error);
            }
        }
    }, []);

    const handleQtyChange = (type) => {
        if (type === 'increase') {
            setSelectedQty((prev) => Math.min(prev + 1, decodedData.quantity));
        } else {
            setSelectedQty((prev) => Math.max(prev - 1, 1));
        }
    };

    const totalAmount = decodedData ? decodedData.price * selectedQty : 0;

    return (
        <div className="right md:w-5/12 w-full ml-5">
            <div className="checkout-block">
                <div className="heading5 pb-3">Your Order</div>
                <div className="list-product-checkout">
                    {decodedData && (
                        <div className="item flex flex-col md:flex-row items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                            <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                    src={selectedColor?.img || '/public/image3.png'}
                                    width={500}
                                    height={500}
                                    alt="img"
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="flex items-center justify-between w-full space-x-4">
                                        <div className="name text-button">{decodedData.name || 'No Name'}</div>
                                    </div>
                                    <div className="caption1 text-secondary mt-2">
                                        <span className="size capitalize">{decodedData.unit || "No Unit"}</span>
                                        <span>/</span>
                                        <span className="color capitalize">{decodedData.status || "No Status"}</span>
                                    </div>
                                </div>
                                <div className="text-title flex items-center">
                                    <button onClick={() => handleQtyChange('decrease')} className="px-2 py-1 bg-gray-200 rounded">-</button>
                                    <span className="px-3">{selectedQty}</span>
                                    <button onClick={() => handleQtyChange('increase')} className="px-2 py-1 bg-gray-200 rounded">+</button>
                                    <span className="px-1">x</span>
                                    <span>${decodedData.price || 0}.00</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {decodedData?.imageURLs && (
                    <div className="color-selection flex gap-2 mt-3">
                        {decodedData.imageURLs.map((colorOption, index) => (
                            <button
                                key={index}
                                className={`w-8 h-8 rounded-full border-2 ${selectedColor?.color.clrCode === colorOption.color.clrCode ? 'border-black' : 'border-gray-300'}`}
                                style={{ backgroundColor: colorOption.color.clrCode }}
                                onClick={() => setSelectedColor(colorOption)}
                            />
                        ))}
                    </div>
                )}
                <div className="total-cart-block pt-5 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5 total-cart">${totalAmount}.00</div>
                </div>
            </div>
        </div>
    );
}
