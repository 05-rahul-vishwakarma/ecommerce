"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css/bundle";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useRouter } from "next/navigation";
import { handleAddToCart } from "@/services/carts";

interface ImageURL {
  img: string;
  color: {
    name: string;
  };
}

interface Product {
  id: string;
  name: string;
  productType: string;
  price: number;
  discount: number;
  description: string;
  quantity: number;
  imageURLs: ImageURL[];
}

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>(""); 
  const [activeSize, setActiveSize] = useState<string>("");
  const [itemQty, setItemQty] = useState<number>(0);
  const { openModalCart } = useModalCartContext()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`
        );
        setProducts(response?.data?.data?.items || []);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setActiveImage(products[1]?.imageURLs[0]?.img);
      setActiveColor(products[1]?.imageURLs[0]?.color?.name);
    }
  }, [products]);

  const handleActiveColor = (color: string) => {
    setActiveColor(color);
    const selectedImage = products[1]?.imageURLs.find(
      (item) => item.color.name === color
    )?.img;
    setActiveImage(selectedImage || ""); // Update the main image based on color selection
  };

  // const handleAddToCart = (product: Product) => {
  //   const accessToken = Cookies.get("accessToken");
  //   if (!accessToken) {
  //     toast.error("Please log in to add items to the cart.");
  //     router.push("/login");
  //     return;
  //   }
  //   const existingProduct = cartState.cartArray.find((item) => item.id === product.id);
  //   if (!existingProduct) {
  //     // addToCart(product);
  //   }
  //   updateCart(product.id, product.quantity, activeSize, activeColor);
  //   openModalCart();
  // };

  if (!products.length) return null;

  const product = products[1]; 

  return (
    <div className="featured-product underwear md:py-20 py-14">
      <div className="container flex lg:items-center justify-between gap-y-6 flex-wrap">
        <div className="list-img md:w-1/2 w-full p-4 ">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs]}
            className="mySwiper2 rounded-2xl overflow-hidden"
          >
            {/* Change the main image when a color is clicked */}
            <SwiperSlide>
              <Image
                src={activeImage || product.imageURLs[0]?.img}
                width={1000}
                height={1000}
                alt={`Product Image`}
                className="w-full aspect-[3/4] object-cover "
              />
            </SwiperSlide>
          </Swiper>

          <div className="z-[1] " >
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={0}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs, FreeMode]}
              className="mySwiper"
            >
              {product.imageURLs.map((image, idx) => (
                <SwiperSlide key={`thumb-${idx}`}>
                  <Image
                    src={image.img}
                    width={1000}
                    height={1000}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full aspect-[3/4] object-cover rounded-xl"
                    onClick={() => setActiveImage(image.img)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Section: Product Info */}
        <div className="product-info md:w-1/2 w-full lg:pl-16 md:pl-6">
          <div className="caption2 text-secondary2 font-semibold uppercase">
            {product.productType}
          </div>
          <h2 className="heading4 mt-1">{product.name}</h2>
          <div className="flex items-center mt-3">
            <span className="caption1 text-secondary2">(45 reviews)</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
            <div className="product-price heading5">${product.price.toFixed(2)}</div>
            <div className="w-px h-4 bg-line"></div>
            <div className="product-origin-price font-normal text-secondary2">
              <del>
                ${((product.price / (1 - product.discount / 100)).toFixed(2))}
              </del>
            </div>
            <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
              -{product.discount}%
            </div>
          </div>

          <p className="desc text-secondary2 mt-3">{product.description}</p>

          <div className="list-action mt-6">
            <div className="choose-color">
              <p className="text-title">
                Colors: <span className="text-title color">{activeColor || product.imageURLs[0]?.color?.name}</span>
              </p>
              <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                {product.imageURLs.map((item, index) => (
                  <button
                    key={index}
                    className="color-item w-12 h-12 rounded-xl duration-300 relative"
                    onClick={() => handleActiveColor(item.color.name)}
                  >
                    <Image
                      src={item.img}
                      alt={item.color.name}
                      width={48}
                      height={48}
                      className="rounded-xl object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-5">
              <div className="quantity-block md:p-3 p-2 flex items-center justify-between rounded-lg border border-line w-[140px] flex-shrink-0">
                <button
                  onClick={() => itemQty > 0 && setItemQty(itemQty - 1)}  // Prevent going below 0
                  className="cursor-pointer"
                >
                  -
                </button>
                <span className="body1 font-semibold">
                  {itemQty}
                </span>
                <button onClick={() => setItemQty(itemQty + 1)} className="cursor-pointer">
                  +
                </button>
              </div>
              <button
                className="button-main w-full text-center bg-white text-purple border border-purple"
                onClick={() => handleAddToCart(product,openModalCart,itemQty)}
              >
                Add To Cart
              </button>
            </div>

            <div className="button-block mt-5">
              <a href="/checkout" className="button-main w-full text-center text-white">
                Buy It Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;



