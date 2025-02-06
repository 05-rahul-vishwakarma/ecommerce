'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Rate from '@/components/Other/Rate'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, Scrollbar } from 'swiper/modules'
import 'swiper/css/bundle'
import * as Icon from '@phosphor-icons/react/dist/ssr'
import SwiperCore from 'swiper/core'
import { useModalCartContext } from '@/context/ModalCartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useModalWishlistContext } from '@/context/ModalWishlistContext'
import OthersData from './OthersData';

SwiperCore.use([Navigation, Thumbs])

export default function DyanamicProduct({ productMain }) {
    const swiperRef = useRef(null) // Initialize swiperRef with null
    const [productImage, setProductImage] = useState();
    const [openPopupImg, setOpenPopupImg] = useState(false)
    const [openSizeGuide, setOpenSizeGuide] = useState(false)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [activeColor, setActiveColor] = useState('')
    const [activeSize, setActiveSize] = useState('')
    const [activeTab, setActiveTab] = useState('description')
    const [selectedImageIndex, setSelectedImageIndex] = useState(0) // Track selected image index
    const { openModalCart } = useModalCartContext()
    const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist()
    const { openModalWishlist } = useModalWishlistContext()

    const handleOpenSizeGuide = () => {
        setOpenSizeGuide(true)
    }

    const handleCloseSizeGuide = () => {
        setOpenSizeGuide(false)
    }

    const handleSwiper = (swiper) => {
        console.log(swiper, 'swiper');
        setThumbsSwiper(swiper)
    }


    const handleActiveColor = (colorName, isHover = false) => {
        setActiveColor(colorName);
        const selectedImage = productMain.imageURLs.find((img) => img.color.name === colorName);

        if (selectedImage) {
            const index = productMain.imageURLs.findIndex((img) => img.color.name === colorName);
            if (index !== -1) {
                if (isHover) {
                    swiperRef.current?.slideTo(index); // Only slide to the index on hover
                } else {
                    swiperRef.current?.slideTo(index); // Slide to the index on click
                }
            }
        }
    };

    const handleActiveSize = (item) => {
        setActiveSize(item)
    }

    const handleAddToCart = () => {
        openModalCart()
    }

    const handleAddToWishlist = () => {
        openModalWishlist()
    }

    const handleActiveTab = (tab) => {
        setActiveTab(tab)
    }

    useEffect(() => {
        setProductImage(productMain?.imageURLs)
    }, [])


    const images = productImage?.map((img) => img.img) || []


    return (
        <div className="product-detail default">
            <div className="featured-product underwear md:py-20 py-10">
                <div className="container flex justify-between gap-y-6 flex-wrap">
                    <div className="list-img md:w-1/2 md:pr-[45px] w-full">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={0}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Thumbs]}
                            className="mySwiper2 rounded-2xl overflow-hidden"
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper; // Set swiperRef when Swiper is initialized
                            }}
                            initialSlide={selectedImageIndex} // Set initial slide to the selected image
                        >
                            {images.map((item, index) => (
                                <SwiperSlide
                                    key={index}
                                    onClick={() => {
                                        setOpenPopupImg(true);
                                    }}
                                >
                                    <Image
                                        src={item}
                                        width={1000}
                                        height={1000}
                                        alt="prd-img"
                                        className="w-full aspect-[3/4] object-cover"
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <Swiper
                            onSwiper={(swiper) => {
                                handleSwiper(swiper)
                            }}
                            spaceBetween={0}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            {images.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Image
                                        src={item}
                                        width={1000}
                                        height={1000}
                                        alt="prd-img"
                                        className="w-full aspect-[3/4] object-cover rounded-xl"
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className={`popup-img ${openPopupImg ? 'open' : ''}`}>
                            <span
                                className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                                onClick={() => {
                                    setOpenPopupImg(false)
                                }}
                            >
                                <Icon.X className="text-3xl text-white" />
                            </span>
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                modules={[Navigation, Thumbs]}
                                navigation={true}
                                loop={true}
                                className="popupSwiper"
                                initialSlide={selectedImageIndex} // Set initial slide to the selected image
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper
                                }}
                            >
                                {images.map((item, index) => (
                                    <SwiperSlide
                                        key={index}
                                        onClick={() => {
                                            setOpenPopupImg(false)
                                        }}
                                    >
                                        <Image
                                            src={item}
                                            width={1000}
                                            height={1000}
                                            alt="prd-img"
                                            className="w-full aspect-[3/4] object-cover rounded-xl"
                                            onClick={(e) => {
                                                e.stopPropagation() // prevent
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
                        <div className="flex justify-between">
                            <div>
                                <div className="caption2 text-secondary font-semibold uppercase">{productMain?.businessType}</div>
                                <div className="heading4 mt-1">{productMain?.name}</div>
                            </div>
                            <div
                                className={`add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-purple hover:text-white`}
                                onClick={handleAddToWishlist}
                            >
                                <Icon.Heart size={24} />
                            </div>
                        </div>
                        <div className="flex items-center mt-3">
                            <Rate currentRate={5} size={14} />
                            <span className="caption1 text-secondary">(1.234 reviews)</span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                            <div className="product-price heading5">${productMain?.price}.00</div>
                            <div className="w-px h-4 bg-line"></div>
                            <div className="product-origin-price font-normal text-secondary2">
                                <del>${productMain?.originPrice}.00</del>
                            </div>
                            {productMain?.originPrice && (
                                <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                                    -{Math.round(((productMain.originPrice - productMain.price) / productMain.originPrice) * 100)}%
                                </div>
                            )}
                            <div className="desc text-secondary mt-3">{productMain?.description}</div>
                        </div>
                        <div className="list-action mt-6">
                            <div className="choose-color">
                                <div className="text-title">
                                    Colors: <span className="text-title color">{activeColor}</span>
                                </div>
                                <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                    {productMain.imageURLs.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`color-option w-8 h-8 rounded-full cursor-pointer border-2 ${activeColor === img.color.name ? 'border-purple' : 'border-transparent'
                                                }`}
                                            style={{ backgroundColor: img.color.clrCode }}
                                            onClick={() => handleActiveColor(img.color.name)}
                                            onMouseEnter={() => handleActiveColor(img.color.name, true)} // Handle hover
                                            onMouseLeave={() => handleActiveColor(activeColor, true)} // Revert to the active color on mouse leave
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className="choose-size mt-5">
                                <div className="heading flex items-center justify-between">
                                    <div className="text-title">
                                        Size: <span className="text-title size">{activeSize}</span>
                                    </div>
                                </div>
                                <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                    {/* Render size options here */}
                                </div>
                            </div>
                            <div className="text-title mt-5">Quantity:</div>
                            <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
                                <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                                    <Icon.Minus size={20} className="cursor-pointer" />
                                    <div className="body1 font-semibold">{productMain?.quantity}</div>
                                    <Icon.Plus size={20} className="cursor-pointer" />
                                </div>
                                <div onClick={handleAddToCart} className="button-main w-full text-center bg-white text-purple border border-purple">
                                    Add To Cart
                                </div>
                            </div>
                            <div className="button-block mt-5">
                                <div className="button-main w-full text-center">Buy It Now</div>
                            </div>

                            <div className="more-infor mt-6">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-1">
                                        <Icon.ArrowClockwise className="body1" />
                                        <div className="text-title">Delivery & Return</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Icon.Question className="body1" />
                                        <div className="text-title">Ask A Question</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-3">
                                    <Icon.Timer className="body1" />
                                    <div className="text-title">Estimated Delivery:</div>
                                    <div className="text-secondary">14 January - 18 January</div>
                                </div>
                                <div className="flex items-center gap-1 mt-3">
                                    <Icon.Eye className="body1" />
                                    <div className="text-title">38</div>
                                    <div className="text-secondary">people viewing this product right now!</div>
                                </div>
                                <div className="flex items-center gap-1 mt-3">
                                    <div className="text-title">SKU:</div>
                                    <div className="text-secondary">{productMain?.sku}</div>
                                </div>
                                <div className="flex items-center gap-1 mt-3">
                                    <div className="text-title">Categories:</div>
                                    <div className="text-secondary">
                                        {productMain?.category?.name}, {productMain?.gender}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-3">
                                    <div className="text-title">Tag:</div>
                                    <div className="text-secondary">{productMain?.tags?.join(', ')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <OthersData pk={productMain?.PK} sk={productMain?.SK} />
            </div>
        </div>
    )
}