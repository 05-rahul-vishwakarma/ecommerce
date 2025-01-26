'use client';

import React, { useEffect, useOptimistic, useState } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react";
import Marquee from "react-fast-marquee";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'
import { addCart, addWishListProduct } from '@/api/productApis/postApi';
import { getWishListData } from '@/api/productApis/getPostApi';

const Product = ({ product }) => {
    const { openModalCart } = useModalCartContext()
    const { openModalWishlist } = useModalWishlistContext()
    const { openQuickview } = useModalQuickviewContext()

    const router = useRouter();

    const handleQuickviewOpen = () => {
        openQuickview(product)
    }

    function cart() {
        const payload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            productId: {
                PK: product?.PK,
                SK: product?.SK
            },
            qty: 1,
            totalAmount: product?.price
        }
        try {
            addCart(payload)
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const handleAddToCart = () => {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            toast.error("Please log in to add items to the cart.");
            router.push("/login"); // Redirect to login page
            return;
        }
        cart();
        openModalCart()
    };

    const addWishList = async (product) => {
        const payload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            productId: {
                PK: product?.PK,
                SK: product?.SK
            }
        }
        try {
            addWishListProduct(payload);
            toast.success('successfully listed')
        } catch (error) {
            console.log(error);

        }
    };

    const handleAddToWishlist = (e) => {
        e.stopPropagation();
        addWishList(product)
        openModalWishlist(product);

    };

    return (
        <div onClick={() =>
            router.push(
                `/product/${product?.slug}`
            )
        }
            key={product?.SK} className="product-main cursor-pointer block product-item grid-type">
            <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                {product?.featured && (
                    <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                        New
                    </div>
                )}
                {product?.discount > 0 && (
                    <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                        Sale
                    </div>
                )}

                <div onClick={handleAddToWishlist} className="list-action-right absolute top-3 right-3 max-lg:hidden">
                    <div className="add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white text-purple duration-300 relative active">
                        <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                        <Icon.Heart size={18} weight="fill" className="text-white" />
                    </div>
                </div>

                {/* Product Image */}
                <div className="product-img w-full h-full aspect-[3/4]">
                    <Image
                        src={product?.img || "/ribbon.png"}
                        width={500}
                        height={500}
                        alt={product?.name}
                        priority={true}
                        className="w-full h-full object-cover duration-700"
                    />
                </div>

                {/* Marquee */}
                {product?.discount > 0 && (
                    <div className="hidden">
                        <Marquee className="banner-sale-auto bg-black absolute bottom-0 left-0 w-full py-1.5">
                            <div className="caption2 font-semibold uppercase text-white px-2.5">Hot Sale 20% OFF</div>
                            <Icon.Lightning weight="fill" className="text-red" />
                            <div className="caption2 font-semibold uppercase text-white px-2.5">Hot Sale 20% OFF</div>
                            <Icon.Lightning weight="fill" className="text-red" />
                        </Marquee>
                    </div>
                )}

                {/* Actions */}
                <div className="list-action grid grid-cols-2 gap-3 px-5 absolute w-full bottom-5 max-lg:hidden">
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            handleQuickviewOpen()
                        }}
                        className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-[10px] duration-300 bg-white hover:bg-purple hover:text-white">
                        Quick View
                    </div>
                    <div
                        onClick={e => {
                            e.stopPropagation();
                            handleAddToCart()
                        }}
                        className="add-cart-btn w-full text-button-uppercase py-2 text-center rounded-[10px] duration-500 bg-white hover:bg-purple hover:text-white">
                        Add To Cart
                    </div>
                </div>
                <div className="list-action-icon flex items-center justify-center gap-10 absolute w-full bottom-3 z-[1] lg:hidden">
                    <div onClick={(e) => {
                        e.stopPropagation()
                        handleQuickviewOpen()
                    }} className="quick-view-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-purple hover:text-white">
                        <Icon.Eye className="text-lg" />
                    </div>
                    <div onClick={e => {
                        e.stopPropagation();
                        handleAddToCart()
                    }} className="add-cart-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-purple hover:text-white">
                        <Icon.ShoppingBagOpen className="text-lg" />
                    </div>
                </div>
            </div>

            {/* Product Information */}
            <div className="product-infor mt-4 lg:mb-7">
                <div className="product-sold sm:pb-4 pb-2">
                    <div className="progress bg-line h-1.5 w-full rounded-[10px] overflow-hidden relative">
                        <div className="progress-sold bg-red absolute left-0 top-0 h-full" style={{ width: "50%" }}></div>
                    </div>
                    <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                        <div className="text-button-uppercase">
                            <span className="text-secondary2 max-sm:text-xs">Sold: </span>
                            <span className="max-sm:text-xs">{product?.quantity - 50}</span>
                        </div>
                        <div className="text-button-uppercase">
                            <span className="text-secondary2 max-sm:text-xs">Available: </span>
                            <span className="max-sm:text-xs">{50}</span>
                        </div>
                    </div>
                </div>
                <div className="product-name text-title duration-300">{product?.name}</div>
                <div className="list-color py-2 max-md:hidden flex items-center gap-3 flex-wrap duration-500">
                    {product?.imageURLs?.map((image, index) => (
                        <div
                            key={index}
                            className="color-item w-8 h-8 rounded-[10px] duration-300 relative"
                            style={{ backgroundColor: image?.color?.clrCode }}
                        >
                            <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                                {image.color.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                    <div className="product-price text-title">${product?.price}</div>
                    {product?.discount > 0 && (
                        <>
                            <div className="product-origin-price caption1 text-secondary2">
                                <del>${product?.price + 10}</del>
                            </div>
                            <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 rounded-[5px] text-white">
                                {product?.discount}% OFF
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
