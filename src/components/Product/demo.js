import React from 'react'

export default function demo() {
    return (
        <div> {type === "grid" ? (
            <div className="product-item grid-type">
                <div onClick={() => handleDetailProduct(data.id)} className="product-main cursor-pointer block">
                    <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                        {data.new && (
                            <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                                New
                            </div>
                        )}
                        {data.sale && (
                            <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                                Sale
                            </div>
                        )}
                        <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                            <div
                                className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white text-purple duration-300 relative ${wishlistState.wishlistArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToWishlist()
                                }}
                            >
                                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                                {wishlistState.wishlistArray.some(item => item.id === data.id) ? (
                                    <>
                                        <Icon.Heart size={18} weight='fill' className='text-white' />
                                    </>
                                ) : (
                                    <>
                                        <Icon.Heart size={18} />
                                    </>
                                )}
                            </div>
                            <div
                                className={`compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white text-purple duration-300 relative mt-2 ${compareState.compareArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCompare()
                                }}
                            >
                                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Compare Product</div>
                                <Icon.Repeat size={18} className='compare-icon' />
                                <Icon.CheckCircle size={20} className='checked-icon' />
                            </div>
                        </div>
                        <div className="product-img w-full h-full aspect-[3/4]">
                            {activeColor ? (
                                <>
                                    {
                                        <Image
                                            src={data.variation.find(item => item.color === activeColor)?.image ?? ''}
                                            width={500}
                                            height={500}
                                            alt={data.name}
                                            priority={true}
                                            className='w-full h-full object-cover duration-700'
                                        />
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        data.thumbImage.map((img, index) => (
                                            <Image
                                                key={index}
                                                src={img}
                                                width={500}
                                                height={500}
                                                priority={true}
                                                alt={data.name}
                                                className='w-full h-full object-cover duration-700'
                                            />
                                        ))
                                    }
                                </>
                            )}
                        </div>
                        {data.sale && (
                            <div className='hidden'>
                                <Marquee className='banner-sale-auto bg-black absolute bottom-0 left-0 w-full py-1.5'>
                                    <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                    <Icon.Lightning weight='fill' className='text-red' />
                                    <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                    <Icon.Lightning weight='fill' className='text-red' />
                                    <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                    <Icon.Lightning weight='fill' className='text-red' />
                                    <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                    <Icon.Lightning weight='fill' className='text-red' />
                                    <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                    <Icon.Lightning weight='fill' className='text-red' />
                                </Marquee>
                            </div>
                        )}
                        <div className="list-action grid grid-cols-2 gap-3 px-5 absolute w-full bottom-5 max-lg:hidden">
                            <div
                                className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-[10px] duration-300 bg-white hover:bg-purple hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleQuickviewOpen()
                                }}
                            >
                                Quick View
                            </div>
                            {data.action === 'add to cart' ? (
                                <div
                                    className="add-cart-btn w-full text-button-uppercase py-2 text-center rounded-[10px] duration-500 bg-white hover:bg-purple hover:text-white"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleAddToCart()
                                    }}
                                >
                                    Add To Cart
                                </div>
                            ) : (
                                <>
                                    <div
                                        className="quick-shop-btn text-button-uppercase py-2 text-center rounded-[10px] duration-500 bg-white hover:bg-purple hover:text-white"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setOpenQuickShop(!openQuickShop)
                                        }}
                                    >
                                        Quick Shop
                                    </div>
                                    <div
                                        className={`quick-shop-block absolute left-5 right-5 bg-white p-5 rounded-[20px] ${openQuickShop ? 'open' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                    >
                                        <div className="list-size flex items-center justify-center flex-wrap gap-2">
                                            {data.sizes.map((item, index) => (
                                                <div
                                                    className={`size-item w-10 h-10 rounded-[10px] flex items-center justify-center text-button bg-white border border-line ${activeSize === item ? 'active' : ''}`}
                                                    key={index}
                                                    onClick={() => handleActiveSize(item)}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className="button-main w-full text-center rounded-[10px] py-3 mt-4"
                                            onClick={() => {
                                                handleAddToCart()
                                                setOpenQuickShop(false)
                                            }}
                                        >
                                            Add To cart
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="list-action-icon flex items-center justify-center gap-10 absolute w-full bottom-3 z-[1] lg:hidden">
                            <div
                                className="quick-view-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-purple hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleQuickviewOpen()
                                }}
                            >
                                <Icon.Eye className='text-lg' />
                            </div>
                            <div
                                className="add-cart-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-purple hover:text-white"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleAddToCart()
                                }}
                            >
                                <Icon.ShoppingBagOpen className='text-lg' />
                            </div>
                        </div>
                    </div>
                    <div className="product-infor mt-4 lg:mb-7">
                        <div className="product-sold sm:pb-4 pb-2">
                            <div className="progress bg-line h-1.5 w-full rounded-[10px] overflow-hidden relative">
                                <div
                                    className={`progress-sold bg-red absolute left-0 top-0 h-full`}
                                    style={{ width: `${percentSold}%` }}
                                >
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                                <div className="text-button-uppercase">
                                    <span className='text-secondary2 max-sm:text-xs'>Sold: </span>
                                    <span className='max-sm:text-xs'>{data.sold}</span>
                                </div>
                                <div className="text-button-uppercase">
                                    <span className='text-secondary2 max-sm:text-xs'>Available: </span>
                                    <span className='max-sm:text-xs'>{data.quantity - data.sold}</span>
                                </div>
                            </div>
                        </div>
                        <div className="product-name text-title duration-300">{data.name}</div>
                        {data.variation.length > 0 && data.action === 'add to cart' && (
                            <div className="list-color py-2 max-md:hidden flex items-center gap-3 flex-wrap duration-500">
                                {data.variation.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`color-item w-8 h-8 rounded-[10px] duration-300 relative ${activeColor === item.color ? 'active' : ''}`}
                                        style={{ backgroundColor: `${item.colorCode}` }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleActiveColor(item.color)
                                        }}>
                                        <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item.color}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {data.variation.length > 0 && data.action === 'quick shop' && (
                            <div className="list-color-image max-md:hidden flex items-center gap-3 flex-wrap duration-500">
                                {data.variation.map((item, index) => (
                                    <div
                                        className={`color-item w-12 h-12 rounded-xl duration-300 relative ${activeColor === item.color ? 'active' : ''}`}
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleActiveColor(item.color)
                                        }}
                                    >
                                        <Image
                                            src={item.colorImage}
                                            width={100}
                                            height={100}
                                            alt='color'
                                            priority={true}
                                            className='rounded-xl w-full h-full object-cover'
                                        />
                                        <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item.color}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                            <div className="product-price text-title">${data.price}.00</div>
                            {percentSale > 0 && (
                                <>
                                    <div className="product-origin-price caption1 text-secondary2"><del>${data.originPrice}.00</del></div>
                                    <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-[10px]">
                                        -{percentSale}%
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <>
                {type === "list" ? (
                    <>
                        <div className="product-item list-type">
                            <div className="product-main cursor-pointer flex lg:items-center sm:justify-between gap-7 max-lg:gap-5">
                                <div onClick={() => handleDetailProduct(data.id)} className="product-thumb bg-white relative overflow-hidden rounded-2xl block max-sm:w-1/2">
                                    {data.new && (
                                        <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                                            New
                                        </div>
                                    )}
                                    {data.sale && (
                                        <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                                            Sale
                                        </div>
                                    )}
                                    <div className="product-img w-full aspect-[3/4] rounded-2xl overflow-hidden">
                                        {data.thumbImage.map((img, index) => (
                                            <Image
                                                key={index}
                                                src={img}
                                                width={500}
                                                height={500}
                                                priority={true}
                                                alt={data.name}
                                                className='w-full h-full object-cover duration-700'
                                            />
                                        ))}
                                    </div>
                                    <div className="list-action px-5 absolute w-full bottom-5 max-lg:hidden">
                                        <div
                                            className={`quick-shop-block absolute left-5 right-5 bg-white p-5 rounded-[20px] ${openQuickShop ? 'open' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}
                                        >
                                            <div className="list-size flex items-center justify-center flex-wrap gap-2">
                                                {data.sizes.map((item, index) => (
                                                    <div
                                                        className={`size-item ${item !== 'freesize' ? 'w-10 h-10' : 'h-10 px-4'} flex items-center justify-center text-button bg-white rounded-[10px] border border-line ${activeSize === item ? 'active' : ''}`}
                                                        key={index}
                                                        onClick={() => handleActiveSize(item)}
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                            <div
                                                className="button-main w-full text-center rounded-[10px] py-3 mt-4"
                                                onClick={() => {
                                                    handleAddToCart()
                                                    setOpenQuickShop(false)
                                                }}
                                            >
                                                Add To cart
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex sm:items-center gap-7 max-lg:gap-4 max-lg:flex-wrap max-lg:w-full max-sm:flex-col max-sm:w-1/2'>
                                    <div className="product-infor max-sm:w-full">
                                        <div onClick={() => handleDetailProduct(data.id)} className="product-name heading6 inline-block duration-300">{data.name}</div>
                                        <div className="product-price-block flex items-center gap-2 flex-wrap mt-2 duration-300 relative z-[1]">
                                            <div className="product-price text-title">${data.price}.00</div>
                                            <div className="product-origin-price caption1 text-secondary2"><del>${data.originPrice}.00</del></div>
                                            {data.originPrice && (
                                                <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-[10px]">
                                                    -{percentSale}%
                                                </div>
                                            )}
                                        </div>
                                        {data.variation.length > 0 && data.action === 'add to cart' ? (
                                            <div className="list-color max-md:hidden py-2 mt-5 mb-1 flex items-center gap-3 flex-wrap duration-300">
                                                {data.variation.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`color-item w-8 h-8 rounded-[10px] duration-300 relative`}
                                                        style={{ backgroundColor: `${item.colorCode}` }}
                                                    >
                                                        <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item.color}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                {data.variation.length > 0 && data.action === 'quick shop' ? (
                                                    <>
                                                        <div className="list-color flex items-center gap-2 flex-wrap mt-5">
                                                            {data.variation.map((item, index) => (
                                                                <div
                                                                    className={`color-item w-12 h-12 rounded-xl duration-300 relative ${activeColor === item.color ? 'active' : ''}`}
                                                                    key={index}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleActiveColor(item.color)
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={item.colorImage}
                                                                        width={100}
                                                                        height={100}
                                                                        alt='color'
                                                                        priority={true}
                                                                        className='rounded-xl'
                                                                    />
                                                                    <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                                                                        {item.color}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                        <div className='text-secondary desc mt-5 max-sm:hidden'>{data.description}</div>
                                    </div>
                                    <div className="action w-fit flex flex-col items-center justify-center">
                                        <div
                                            className="quick-shop-btn button-main whitespace-nowrap py-2 px-9 max-lg:px-5 rounded-[10px] bg-white text-black border border-purple hover:bg-purple hover:text-white"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setOpenQuickShop(!openQuickShop)
                                            }}
                                        >
                                            Quick Shop
                                        </div>
                                        <div className="list-action-right flex items-center justify-center gap-3 mt-4">
                                            <div
                                                className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white duration-300 relative ${wishlistState.wishlistArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleAddToWishlist()
                                                }}
                                            >
                                                <div className="tag-action bg-purple text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                                                {wishlistState.wishlistArray.some(item => item.id === data.id) ? (
                                                    <>
                                                        <Icon.Heart size={18} weight='fill' className='text-white' />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icon.Heart size={18} />
                                                    </>
                                                )}
                                            </div>
                                            <div
                                                className={`compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white duration-300 relative ${compareState.compareArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleAddToCompare()
                                                }}
                                            >
                                                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Compare Product</div>
                                                <Icon.ArrowsCounterClockwise size={18} className='compare-icon' />
                                                <Icon.CheckCircle size={20} className='checked-icon' />
                                            </div>
                                            <div
                                                className="quick-view-btn-list w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white duration-300 relative"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleQuickviewOpen()
                                                }}
                                            >
                                                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Quick View</div>
                                                <Icon.Eye size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </>
        )
        }

            {type === 'marketplace' ? (
                <div className="product-item style-marketplace p-4 border border-line rounded-2xl" onClick={() => handleDetailProduct(data.id)}>
                    <div className="bg-img relative w-full">
                        <Image className='w-full aspect-square' width={5000} height={5000} src={data.thumbImage[0]} alt="img" />
                        <div className="list-action flex flex-col gap-1 absolute top-0 right-0">
                            <span
                                className={`add-wishlist-btn w-8 h-8 bg-white flex items-center justify-center rounded-[10px] box-shadow-sm duration-300 ${wishlistState.wishlistArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToWishlist()
                                }}
                            >
                                {wishlistState.wishlistArray.some(item => item.id === data.id) ? (
                                    <>
                                        <Icon.Heart size={18} weight='fill' className='text-white' />
                                    </>
                                ) : (
                                    <>
                                        <Icon.Heart size={18} />
                                    </>
                                )}
                            </span>
                            <span
                                className={`compare-btn w-8 h-8 bg-white flex items-center justify-center rounded-[10px] box-shadow-sm duration-300 ${compareState.compareArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCompare()
                                }}
                            >
                                <Icon.Repeat size={18} className='compare-icon' />
                                <Icon.CheckCircle size={20} className='checked-icon' />
                            </span>
                            <span
                                className="quick-view-btn w-8 h-8 bg-white flex items-center justify-center rounded-[10px] box-shadow-sm duration-300"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleQuickviewOpen()
                                }}
                            >
                                <Icon.Eye />
                            </span>
                            <span
                                className="add-cart-btn w-8 h-8 bg-white flex items-center justify-center rounded-[10px] box-shadow-sm duration-300"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleAddToCart()
                                }}
                            >
                                <Icon.ShoppingBagOpen />
                            </span>
                        </div>
                    </div>
                    <div className="product-infor mt-4">
                        <span className="text-title">{data.name}</span>
                        <div className="flex gap-0.5 mt-1">
                            <Rate currentRate={data.rate} size={16} />
                        </div>
                        <span className="text-title inline-block mt-1">${data.price}.00</span>
                    </div>
                </div>
            ) : (
                <></>
            )} </div>
    )
}

'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Marquee from 'react-fast-marquee';

// Define the types for the product object
interface ProductType {
    SK: string;
    name: string;
    featured: boolean;
    discount: number;
    price: number;
    quantity: number;
    imageURLs: {
        img: string;
        color: {
            clrCode: string;
            name: string;
        };
    }[];
}

interface ProductProps {
    products: ProductType[];
}

const Product: React.FC<ProductProps> = ({ products }) => {
    return (
        <div className="list-product hide-product-sold grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-[30px] gap-[20px] mt-7 ">
            {products?.map((product) => (
                <div key={product.SK} className="product-main cursor-pointer block my-2 product-item grid-type  ">
                    <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                        {product?.featured && (
                            <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                                New
                            </div>
                        )}
                        {product?.discount && (
                            <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-[10px] absolute top-3 left-3 z-[1]">
                                Sale
                            </div>
                        )}
                        <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                            <div className="add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white text-purple duration-300 relative active">
                                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                                <Icon.Heart size={18} weight="fill" className="text-white" />
                            </div>
                            <div className="compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-[10px] bg-white text-purple duration-300 relative mt-2 active">
                                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Compare Product</div>
                                <Icon.Repeat size={18} className="compare-icon" />
                                <Icon.CheckCircle size={20} className="checked-icon" />
                            </div>
                        </div>
                        <div className="product-img w-full h-full aspect-[3/4]">
                            <Image
                                src={product?.imageURLs[0]?.img} // Use the first image as the default
                                width={500}
                                height={500}
                                alt={product?.name}
                                priority={true}
                                className="w-full h-full object-cover duration-700"
                            />
                        </div>
                        <div className="hidden">
                            <Marquee className="banner-sale-auto bg-black absolute bottom-0 left-0 w-full py-1.5">
                                <div className="caption2 font-semibold uppercase text-white px-2.5">Hot Sale 20% OFF</div>
                                <Icon.Lightning weight="fill" className="text-red" />
                                <div className="caption2 font-semibold uppercase text-white px-2.5">Hot Sale 20% OFF</div>
                                <Icon.Lightning weight="fill" className="text-red" />
                            </Marquee>
                        </div>
                        <div className="list-action grid grid-cols-2 gap-3 px-5 absolute w-full bottom-5 max-lg:hidden">
                            <div className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-[10px] duration-300 bg-white hover:bg-purple hover:text-white">
                                Quick View
                            </div>
                            <div className="add-cart-btn w-full text-button-uppercase py-2 text-center rounded-[10px] duration-500 bg-white hover:bg-purple hover:text-white">
                                Add To Cart
                            </div>
                        </div>
                        <div className="list-action-icon flex items-center justify-center gap-10 absolute w-full bottom-3 z-[1] lg:hidden">
                            <div className="quick-view-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-purple hover:text-white">
                                <Icon.Eye className="text-lg" />
                            </div>
                            <div className="add-cart-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-purple hover:text-white">
                                <Icon.ShoppingBagOpen className="text-lg" />
                            </div>
                        </div>
                    </div>
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
                                    <span className="max-sm:text-xs">{product?.quantity}</span>
                                </div>
                            </div>
                        </div>
                        <div className="product-name text-title duration-300">{product?.name}</div>
                        <div className="list-color py-2 max-md:hidden flex items-center gap-3 flex-wrap duration-500">
                            {product?.imageURLs.map((image, index) => (
                                <div key={index} className="color-item w-8 h-8 rounded-[10px] duration-300 relative" style={{ backgroundColor: image?.color?.clrCode }}>
                                    <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{image?.color?.name}</div>
                                </div>
                            ))}
                        </div>
                        <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                            <div className="product-price text-title">₹{product?.price - (product?.price * (product?.discount / 100))}</div>
                            {product?.discount > 0 && (
                                <div className="product-origin-price caption1 text-secondary2">
                                    <del>₹{product?.price}</del>
                                </div>
                            )}
                            {product?.discount > 0 && (
                                <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 rounded-[5px] text-white">
                                    {product?.discount}% OFF
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;
