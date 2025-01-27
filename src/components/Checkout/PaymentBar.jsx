'use client';
import useCartStore from '@/globalStore/useCartStore';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import React, { useState } from 'react';

export default function PaymentBar() {
    const { mergedCart, updateCartItemQuantity, updateCartItemColor } = useCartStore();
    const [editingQuantity, setEditingQuantity] = useState(null);
    const discount = 10;
    const ship = 5;

    const handleQuantityChange = (SK, newQuantity) => {
        updateCartItemQuantity(SK, newQuantity);
    };

    const handleColorChange = (SK, newColor) => {
        updateCartItemColor(SK, newColor);
    };

    const totalCart = mergedCart.reduce((total, item) => total + item.totalAmount * item.qty, 0);

    return (
        <div className="right md:w-5/12 w-full ml-5">
            <div className="checkout-block">
                <div className="heading5 pb-3">Your Order</div>
                <div className="list-product-checkout">
                    {mergedCart?.map((product, i) => (
                        <div key={i} className="item flex flex-col md:flex-row items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                            <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                    src={product?.image}
                                    width={500}
                                    height={500}
                                    alt='img'
                                    className='w-full h-full'
                                />
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="name text-title">{product.name}</div>
                                    <div className="caption1 text-secondary mt-2">
                                        <span className='size capitalize'>{product.selectedSize || "product size"}</span>
                                        <span>/</span>
                                        <span className='color capitalize'>{product.selectedColor || "product color"}</span>
                                    </div>
                                    <div className="color-options mt-2">
                                        {product.imageUrl?.map((image, index) => (
                                            <button
                                                key={index}
                                                className={`w-6 h-6 rounded-sm  mr-2 ${
                                                    product.selectedColor === image.color.name
                                                        ? 'border-blue-500'
                                                        : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: image.color.clrCode }}
                                                onClick={() => handleColorChange(product.SK, image.color.name)}
                                                title={image.color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="text-title">
                                    {editingQuantity === product.SK ? (
                                        <input
                                            type="number"
                                            value={product.qty}
                                            onChange={(e) => handleQuantityChange(product.SK, parseInt(e.target.value))}
                                            onBlur={() => setEditingQuantity(null)}
                                            min="1"
                                            className="w-16 border border-line rounded px-2 py-1"
                                        />
                                    ) : (
                                        <span
                                            className='quantity cursor-pointer'
                                            onClick={() => setEditingQuantity(product.SK)}
                                        >
                                            {product.qty}
                                        </span>
                                    )}
                                    <span className='px-1'>x</span>
                                    <span>${product.totalAmount}.00</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="discount-block py-5 flex justify-between border-b border-line hidden">
                    <div className="text-title">Discounts</div>
                    <div className="text-title">-${discount}.00</div>
                </div>
                <div className="ship-block py-5 flex justify-between border-b border-line hidden">
                    <div className="text-title">Shipping</div>
                    <div className="text-title">${ship}.00</div>
                </div>
                <div className="total-cart-block pt-5 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5 total-cart">${totalCart - discount + ship}.00</div>
                </div>
            </div>
        </div>
    );
}