"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Rate from "@/components/Other/Rate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Scrollbar } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from "swiper/core";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import OthersData from "./OthersData";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Install js-cookie: npm install js-cookie
import { toast } from "react-toastify";
import { handleAddToCart } from "@/services/carts";

SwiperCore.use([Navigation, Thumbs]);

export default function DyanamicProduct({ productMain }) {
  const swiperRef = useRef(null); // Initialize swiperRef with null
  const [productImage, setProductImage] = useState();
  const [openPopupImg, setOpenPopupImg] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeColor, setActiveColor] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track selected image index
  const { openModalCart } = useModalCartContext();
  const { openModalWishlist } = useModalWishlistContext();
  const [products, setProducts] = useState(productMain);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState({});

  const router = useRouter();

  const handleSwiper = (swiper) => {
    console.log(swiper, "swiper");
    setThumbsSwiper(swiper);
  };

  const handleActiveColor = (colorName, isHover = false) => {
    setActiveColor(colorName);
    const selectedImage = productMain.imageURLs.find(
      (img) => img.color.name === colorName
    );

    if (selectedImage) {
      const index = productMain.imageURLs.findIndex(
        (img) => img.color.name === colorName
      );
      if (index !== -1) {
        if (isHover) {
          swiperRef.current?.slideTo(index); // Only slide to the index on hover
        } else {
          swiperRef.current?.slideTo(index); // Slide to the index on click
        }
      }
    }
  };

  const handleAddToWishlist = () => {
    openModalWishlist();
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleCart = () => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
        console.log('token is not avilable');
        toast.error("Please log in to add items to the cart.");
        router.push("/login");
        return;
    } else {
        handleAddToCart(products, openModalCart);
    }
}


  useEffect(() => {
    setProducts(productMain);
    setProductImage(productMain?.imageURLs);
    if (productMain?.imageURLs?.length > 0) {
      setActiveColor(productMain.imageURLs[0].color.name);
    }
  }, [productMain]);

  const images = productImage?.map((img) => img.img) || [];

  const handleCheckout = () => {
    console.log('yes working');

    const checkoutProduct = [{
      ...products,
      itemQty: quantity,
      selectedColor: activeColor,
      selectedSizes: selectedSizes,
    }];

    localStorage.setItem('checkoutProduct',
      encodeURIComponent(JSON.stringify(checkoutProduct))
    );
    router.push("/checkout");
  };

  const formattedData = products?.additionalInformation?.map(info => ({
    key: info.key,
    values: info.value
      .replace(/\s/g, '') // Removing spaces
      .split(',')
      .map(value => value + (info.key === "width" ? "" : ""))
      .join(', ')
  }));

  useEffect(() => {
    if (productMain?.additionalInformation) {
      const initialSizes = {};
      productMain.additionalInformation.forEach(info => {
        const values = info.value.replace(/\s/g, '').split(',');
        if (values.length > 0) {
          const formattedValues = values.map(value =>
            info.key === "width" ? value + "" : value + ""
          );
          initialSizes[info.key] = formattedValues[0];
        }
      });
      setSelectedSizes(initialSizes);
    }
  }, [productMain]);

  const handleSizeSelect = (key, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [key]: size
    }));
  };

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
                handleSwiper(swiper);
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

            <div className={`popup-img ${openPopupImg ? "open" : ""}`}>
              <span
                className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                onClick={() => {
                  setOpenPopupImg(false);
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
                  swiperRef.current = swiper;
                }}
              >
                {images.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => {
                      setOpenPopupImg(false);
                    }}
                  >
                    <Image
                      src={item}
                      width={1000}
                      height={1000}
                      alt="prd-img"
                      className="w-full aspect-[3/4] object-cover rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent
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
                <div className="caption2 text-secondary font-semibold uppercase">
                  {products?.businessType}
                </div>
                <div className="heading4 mt-1">{products?.name}</div>
              </div>
              <div
                className={`add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-purple hover:text-white`}
                onClick={handleAddToWishlist}
              >
                <Icon.Heart size={24} />
              </div>
            </div>
            {/* <div className="flex items-center mt-3">
              <Rate currentRate={5} size={14} />
              <span className="caption1 text-secondary">(1.234 reviews)</span>
            </div> */}

            <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
              <div className="product-price heading5">${products?.price.toFixed(2)}</div>
              <div className="w-px h-4 bg-line"></div>
              <div className="product-origin-price font-normal text-purple2">
                <del>
                  ${(products?.price / (1 - products?.discount / 100)).toFixed(2)}
                </del>
              </div>
              <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                -{products?.discount}%
              </div>
            </div>

            <div className="desc text-secondary mt-3">
              {products?.description}
            </div>
            <div className="list-action mt-6">
              <div className="choose-color">
                <div className="text-title">
                  Colors:{" "}
                  <span className="text-title color">{activeColor}</span>
                </div>
                <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                  {products.imageURLs.map((img, index) => (
                    <div
                      key={index}
                      className={`color-option w-8 h-8 rounded-full cursor-pointer border-2 ${activeColor === img.color.name
                        ? "border-purple"
                        : "border-transparent"
                        }`}
                      style={{ backgroundColor: img.color.clrCode }}
                      onClick={() => handleActiveColor(img.color.name)}
                      onMouseEnter={() =>
                        handleActiveColor(img.color.name, true)
                      } // Handle hover
                      onMouseLeave={() => handleActiveColor(activeColor, true)} // Revert to the active color on mouse leave
                    ></div>
                  ))}
                </div>
              </div>
              <div className="choose-size mt-5">
                <div className="heading flex items-center justify-between">
                  <div className="text-title">
                    Size:{" "}
                    <div className="choose-size mt-5">
                      {formattedData?.map((item, index) => (
                        <div key={index} className="size-option mb-4">
                          <div className="text-title">
                            {item.key.charAt(0).toUpperCase() + item.key.slice(1)} Sizes:
                          </div>
                          <div className="list-size flex items-center gap-2 flex-wrap mt-2">
                            {item.values.split(', ').map((size, sizeIndex) => (
                              <div
                                key={sizeIndex}
                                className={`size-btn px-3 py-1 rounded-full border cursor-pointer ${selectedSizes[item.key] === size
                                    ? 'border-purple bg-purple text-white'
                                    : 'border-line hover:border-purple'
                                  }`}
                                onClick={() => handleSizeSelect(item.key, size)}
                              >
                                {size}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-title mt-5">Quantity:</div>
              <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
                <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                  <Icon.Minus
                    size={20}
                    className="cursor-pointer"
                    onClick={handleDecrement}
                  />
                  <div className="body1 font-semibold">
                    {quantity}
                  </div>
                  <Icon.Plus
                    size={20}
                    className="cursor-pointer"
                    onClick={handleIncrement}
                  />
                </div>
                <div
                  onClick={handleCart}
                  className="button-main w-full text-center bg-custom-purple-color text-secondary border border-purple"
                >
                  Add To Cart
                </div>
              </div>
              <div onClick={() => handleCheckout()} className="button-block mt-5  ">
                <div className="button-main w-full text-center  ">Buy It Now</div>
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
                <div className="flex items-center flex-wrap gap-1 mt-3">
                  <Icon.Timer className="body1" />
                  <span className="text-title">Estimated Delivery:</span>
                  <span className="text-secondary">
                    {(() => {
                      const today = new Date();
                      const startDate = new Date(today);
                      startDate.setDate(today.getDate() + 2);
                      const endDate = new Date(today);
                      endDate.setDate(today.getDate() + 3);

                      const options = {
                        day: 'numeric',
                        month: 'long'
                      };

                      return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
                    })()}
                  </span>
                </div>
                {/* <div className="flex items-center gap-1 mt-3">
                  <Icon.Eye className="body1" />
                  <div className="text-title">38</div>
                  <div className="text-secondary">
                    people viewing this product right now!
                  </div>
                </div> */}
                <div className="flex items-center gap-1 mt-3">
                  <div className="text-title">SKU:</div>
                  <div className="text-secondary">{products?.sku}</div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <div className="text-title">Categories:</div>
                  <div className="text-secondary">
                    {products?.category?.name}, {products?.gender}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <div className="text-title">Tag:</div>
                  <div className="text-secondary">
                    {products?.tags?.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <OthersData PK={productMain?.PK} SK={productMain?.SK} productMain={products} />
      </div>
    </div>
  );
}
