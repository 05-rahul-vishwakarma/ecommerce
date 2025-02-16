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
  additionalInformation: Array<{
    value: string;
    key: string;
  }>;
}

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [colorQuantities, setColorQuantities] = useState<Record<string, number>>({});
  const { openModalCart } = useModalCartContext();

  const router = useRouter();

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
      const defaultColor = products[1]?.imageURLs[0]?.color?.name;
      setActiveColor(defaultColor);
      setActiveImage(products[1]?.imageURLs[0]?.img);

      // Initialize quantity tracking per color
      const initialQuantities: Record<string, number> = {};
      products[1]?.imageURLs.forEach((img) => {
        initialQuantities[img.color.name] = 0;
      });
      setColorQuantities(initialQuantities);
    }
  }, [products]);

  const handleActiveColor = (color: string) => {
    setActiveColor(color);
    const selectedImage = products[1]?.imageURLs.find(
      (item) => item.color.name === color
    )?.img;
    setActiveImage(selectedImage || "");

    // Reset quantity when a new color is selected
    setColorQuantities((prev) => ({ ...prev, [color]: 0 }));
  };

  if (!products.length) return null;

  const product = products[1];

  const checkouthandler = () => {
    const itemQty = colorQuantities[activeColor] || 0;

    if (!product || itemQty <= 0) {
      alert("Select a quantity before checkout.");
      return;
    }

    const checkoutProduct = [
      {
        ...product,
        itemQty,
        selectedColor: activeColor,
      },
    ];

    const encodedProduct = encodeURIComponent(JSON.stringify(checkoutProduct));
    localStorage.setItem("checkoutProduct", encodedProduct);
    router.push("/checkout");
  };


  const formattedData = product?.additionalInformation?.map(info => ({
    key: info.key,
    values: info.value
      .replace(/\s/g, '') // Removing spaces
      .split(',')
      .map(value => value + (info.key === "width" ? "mm" : "cm"))
      .join(', ')
  }));

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
            <SwiperSlide>
              <Image
                src={activeImage || product.imageURLs[0]?.img}
                width={1000}
                height={1000}
                alt="Product Image"
                className="w-full aspect-[3/4] object-cover"
              />
            </SwiperSlide>
          </Swiper>

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

        {/* Product Info Section */}
        <div className="product-info md:w-1/2 w-full lg:pl-16 md:pl-6">
          <div className="caption2 text-secondary2 font-semibold uppercase">
            {product.productType}
          </div>
          <h2 className="heading4 mt-1">{product.name}</h2>

          <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
            <div className="product-price heading5">${product.price.toFixed(2)}</div>
            <div className="w-px h-4 bg-line"></div>
            <div className="product-origin-price font-normal text-purple2">
              <del>
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </del>
            </div>
            <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
              -{product.discount}%
            </div>
          </div>

          <p className="desc text-secondary2 mt-3">{product.description}</p>

          <div className="list-action mt-6">
            {/* Color Selection */}
            <div className="choose-color">
              <p className="text-title">Color: <span>{activeColor}</span></p>
              <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                {product.imageURLs.map((item, index) => (
                  <button
                    key={index}
                    className={`color-item w-12 h-12 rounded-xl ${activeColor === item.color.name ? "border-2 border-purple" : ""}`}
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

            <div className="choose-size mt-5">
              <div className="heading flex items-center justify-between">
                <div className="text-title">
                  Size:{" "}
                  {formattedData?.map((item:any, index:any) => (
                    <p key={index}>
                      {item.key.charAt(0).toUpperCase() + item.key.slice(1)} Sizes: {item.values}
                    </p>
                  ))}
                </div>
              </div>
              <div className="list-size flex items-center gap-2 flex-wrap mt-3"></div>
            </div>

            {/* Quantity Selection */}
            <div className="choose-quantity flex items-center gap-5 mt-5">
              <div className="quantity-block md:p-3 p-2 flex items-center justify-between rounded-lg border border-line w-[140px] flex-shrink-0">
                <button
                  onClick={() =>
                    setColorQuantities((prev) => ({
                      ...prev,
                      [activeColor]: Math.max(0, prev[activeColor] - 1),
                    }))
                  }
                >
                  -
                </button>
                <span>{colorQuantities[activeColor]}</span>
                <button
                  onClick={() =>
                    setColorQuantities((prev) => ({
                      ...prev,
                      [activeColor]: prev[activeColor] + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>
              <button
                className="button-main w-full text-center bg-white text-purple border border-purple"
                onClick={() => handleAddToCart(product, openModalCart, colorQuantities[activeColor], activeColor)}
              >
                Add To Cart
              </button>
            </div>

            <button className="button-main w-full mt-5" onClick={checkouthandler}>
              Buy It Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
