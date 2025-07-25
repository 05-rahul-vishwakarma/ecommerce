"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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
  const swiperRef = useRef(null);
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
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeWidth, setActiveWidth] = useState(null);
  const [activeLength, setActiveLength] = useState(null);

  const router = useRouter();

  const handleSwiper = (swiper) => {
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

    const checkoutProduct = [{
      ...products,
      itemQty: quantity,
      selectedColor: activeColor,
      selectedSizes: selectedSize,
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

  const widths = useMemo(() => {
    const widthInfo = products?.additionalInformation?.find((info) => info.key === "width");
    return widthInfo ? widthInfo.value.split(",") : [];
  }, [products?.additionalInformation]);

  const lengths = useMemo(() => {
    const lengthInfo = products?.additionalInformation?.find((info) => info.key === "length");
    return lengthInfo ? lengthInfo.value.split(",") : [];
  }, [products?.additionalInformation]);


  return (
    <div className="product-detail default">
      <div className="featured-product underwear md:py-20 py-10">
        <div className="container flex justify-between gap-y-6 flex-wrap">
          <div className="list-img md:w-1/2 md:pr-[45px] w-full">
            {/* Main product image slider */}
            <div className="aspect-[3/4] w-full bg-gray-100 rounded-2xl overflow-hidden">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Thumbs]}
                className="h-full"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                initialSlide={selectedImageIndex}
              >
                {images.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => {
                      setOpenPopupImg(true);
                    }}
                    className="h-full"
                  >
                    <Image
                      src={item}
                      width={800}
                      height={1067}
                      alt="Product image"
                      className="w-full h-full object-cover"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail slider */}
            <div className="mt-4">
              <Swiper
                onSwiper={handleSwiper}
                spaceBetween={8}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="h-24"
              >
                {images.map((item, index) => (
                  <SwiperSlide key={index} className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src={item}
                      width={400}
                      height={533}
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      // loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Popup image viewer */}
            <div className={`popup-img fixed inset-0 z-50 bg-black/90 ${openPopupImg ? "flex" : "hidden"} items-center justify-center`}>
              <span
                className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer text-white p-2 hover:bg-white/10 rounded-full"
                onClick={() => {
                  setOpenPopupImg(false);
                }}
              >
                <Icon.X className="text-3xl" />
              </span>
              <div className="container max-w-4xl mx-auto px-4">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  modules={[Navigation, Thumbs]}
                  navigation={true}
                  loop={true}
                  className="h-full"
                  initialSlide={selectedImageIndex}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {images.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center"
                    >
                      <div className="relative aspect-[3/4] w-full max-w-2xl mx-auto">
                        <Image
                          src={item}
                          width={1200}
                          height={1600}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
            <div className="flex justify-between">
              <div>
                {/* <div className="caption2 text-secondary font-semibold uppercase">
                  {products?.businessType}
                </div> */}
                <div className="heading4 mt-1">{products?.name}</div>
              </div>
              <div
                className={`hidden add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-purple hover:text-white`}
                onClick={handleAddToWishlist}
              >
                <Icon.Heart size={24} />
              </div>
            </div>
            {/* <div className="flex items-center mt-3">
              <Rate currentRate={5} size={14} />
              <span className="caption1 text-secondary">(1.234 reviews)</span>
            </div> */}

            <div className="text-sm text-gray-500  flex">
              <span className="size capitalize">{products?.unit || "No Unit"}</span>
              <span>/</span>
              <span className="color capitalize">{products?.quantity == 0 ? <p className='text-[red]'> Out Of Stock </p> : products?.status}</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
              <div className="product-price heading5">₹{products?.price.toFixed(2)}</div>
              <div className="w-px h-4 bg-line"></div>
              <div className="product-origin-price font-normal text-purple2">
                <del>
                  ₹{(products?.price / (1 - products?.discount / 100)).toFixed(2)}
                </del>
              </div>
              <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                -{products?.discount}%
              </div>
            </div>



            <div className="desc text-secondary mt-3 space-y-2">
              {products?.description?.split('\n').map((line, index) => (
                <p key={index} className="text-base leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="list-action mt-6">

              {/* <div className="choose-size mt-5">
                <div className="choose-size mt-5">
                  Size:{" "}
                  <div className="heading flex items-center space-x-2 ">
                    {products?.size &&
                      products?.size?.map((size) => (
                        <button
                          key={size}
                          className={`size-button px-4 py-2 rounded-md border border-line ${selectedSize === size
                            ? "bg-purple text-white border-purple"
                            : "bg-white text-secondary2"
                            }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size} {products.unit}
                        </button>
                      ))}
                  </div>
                </div>
              </div> */}



              {/* Product Highlights Section */}
              <div className="product-highlights mt-6 border-b border-line pb-6">
                <div className="heading flex items-center justify-between mt-4">
                  <div className="text-sm text-secondary flex items-center gap-2">
                    <Icon.Ruler size={18} />
                    Size
                  </div>
                </div>

                <div className="flex space-x-2 place-items-center mt-2">
                  <div className="">
                    <div className="list-size flex items-center gap-2 flex-wrap">
                      {widths.map((width) => (
                        <button
                          key={width}
                          className={`size-button text-sm px-3 py-1.5 rounded-md border transition-all duration-200 ${activeWidth === width
                              ? "bg-purple text-white border-purple"
                              : "border-line hover:border-purple"
                            }`}
                          onClick={() => setActiveWidth(width)}
                        >
                          {width}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mx-2 text-secondary2 text-sm"></div>
                  <div className="">
                    <div className="list-size flex items-center gap-2 flex-wrap">
                      {lengths?.map((length) => (
                        <button
                          key={length}
                          className={`size-button text-sm px-3 py-1.5 rounded-md border transition-all duration-200 ${activeLength === length
                              ? "bg-purple text-white border-purple"
                              : "border-line hover:border-purple"
                            }`}
                          onClick={() => setActiveLength(length)}
                        >
                          {length}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="choose-color mt-4">
                  <div className="text-sm text-secondary flex items-center gap-2">
                    <Icon.Palette size={18} />
                    Colors:{" "}
                    <span className="text-purple">{activeColor}</span>
                  </div>
                  <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                    {products?.imageURLs.map((img, index) => (
                      <div
                        key={index}
                        className={`color-option w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-200 ${activeColor === img.color.name
                            ? "border-purple scale-110"
                            : "border-transparent hover:scale-105"
                          }`}
                        style={{ backgroundColor: img.color.clrCode }}
                        onClick={() => handleActiveColor(img.color.name)}
                        onMouseEnter={() => handleActiveColor(img.color.name, true)}
                        onMouseLeave={() => handleActiveColor(activeColor, true)}
                      ></div>
                    ))}
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
        {/* <OthersData PK={productMain?.PK} SK={productMain?.SK} productMain={products} /> */}
      </div>
    </div>
  );
}
