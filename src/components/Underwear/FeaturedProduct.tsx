"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Autoplay } from "swiper/modules";
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
  size: any;
  unit: string;
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

const FeaturedProduct: React.FC<{ data: Product[] }> = React.memo(({ data }) => {
  const [products] = useState<Product[]>(data);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [colorQuantities, setColorQuantities] = useState<Record<string, number>>({});
  const { openModalCart } = useModalCartContext();
  const router = useRouter();
  const [activeWidth, setActiveWidth] = useState<string | null>(null);
  const [activeLength, setActiveLength] = useState<string | null>(null);

  const product = useMemo(() => products[0], [products]);

  useEffect(() => {
    if (product) {
      const defaultColor = product.imageURLs[0]?.color?.name;
      setActiveColor(defaultColor);
      setActiveImage(product.imageURLs[0]?.img);

      const initialQuantities: Record<string, number> = {};
      product.imageURLs.forEach((img) => {
        initialQuantities[img.color.name] = 0;
      });
      setColorQuantities(initialQuantities);
    }
  }, [product]);

  const handleActiveColor = useCallback((color: string) => {
    setActiveColor(color);
    const selectedImage = product?.imageURLs.find(
      (item) => item.color.name === color
    )?.img;
    setActiveImage(selectedImage || "");
    setColorQuantities((prev) => ({ ...prev, [color]: 0 }));
  }, [product]);

  const widths = useMemo(() => {
    const widthInfo = product?.additionalInformation?.find((info) => info.key === "width");
    return widthInfo ? widthInfo.value.split(",") : [];
  }, [product?.additionalInformation]);

  const lengths = useMemo(() => {
    const lengthInfo = product?.additionalInformation?.find((info) => info.key === "length");
    return lengthInfo ? lengthInfo.value.split(",") : [];
  }, [product?.additionalInformation]);

  const handleQuantityChange = useCallback(
    (color: string, change: number) => {
      setColorQuantities((prev) => {
        const newQuantity = Math.max(0, (prev[color] || 0) + change);
        return { ...prev, [color]: newQuantity };
      });
    },
    []
  );

  if (!products.length) return null;

  const checkoutHandler = useCallback(() => {
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
        selectedWidth: activeWidth,
        selectedLength: activeLength
      },
    ];

    localStorage.setItem("checkoutProduct", JSON.stringify(checkoutProduct));
    router.push("/checkout");
  }, [product, colorQuantities, activeColor, activeWidth, activeLength, router]);

  return (
    <div className="featured-product underwear md:py-20 py-14">
      <div className="container flex lg:items-center justify-between gap-y-6 flex-wrap">
        <div className="list-img md:w-1/2 w-full p-4 ">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs, Autoplay]}
            className="mySwiper2 rounded-2xl overflow-hidden"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop
          >
            <SwiperSlide>
              {activeImage || product?.imageURLs[0]?.img ? (
                <Image
                  src={activeImage || product?.imageURLs[0]?.img}
                  width={1000}
                  height={1000}
                  alt="Product Image"
                  className="w-full aspect-[3/4] object-cover"
                  priority
                />
              ) : (
                <p>No image available</p>
              )}
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
            {product?.imageURLs?.map((image, idx) => (
              <SwiperSlide key={`thumb-${idx}`}>
                <Image
                  src={image.img}
                  width={1000}
                  height={1000}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                  onClick={() => setActiveImage(image.img)}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info Section */}
        <div className="product-info md:w-1/2 w-full lg:pl-16 md:pl-6">
          <div className="caption2 text-secondary2 font-semibold uppercase">
            {product?.productType}
          </div>
          <h2 className="heading4 mt-1">{product?.name}</h2>

          <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
            <div className="product-price heading5">₹{product?.price?.toFixed(2)}</div>
            <div className="w-px h-4 bg-line"></div>
            <div className="product-origin-price font-normal text-purple2">
              <del>
                ₹{(product?.price / (1 - product?.discount / 100))?.toFixed(2)}
              </del>
            </div>
            <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
              -{product?.discount}%
            </div>
          </div>

          <div className="desc text-secondary mt-3 space-y-2">
              {product?.description?.split('\n').map((line, index) => (
                <p key={index} className="text-base leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

          <div className="list-action mt-6">
            {/* Color Selection */}
            <div className="choose-color">
              <p className="text-title">Color: <span>{activeColor}</span></p>
              <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                {product?.imageURLs ? (
                  product.imageURLs.map((item, index) => (
                    <button
                      key={index}
                      className={`color-item w-12 h-12 rounded-xl ${activeColor === item.color.name ? "border-2 border-purple" : ""}`}
                      onClick={() => handleActiveColor(item.color.name)}
                    >
                      <Image
                        src={item?.img}
                        alt={item?.color?.name}
                        width={48}
                        height={48}
                        className="rounded-xl object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>


            <div className="heading flex items-center justify-between mt-[1rem] ">
              <div className="text-title">size:</div>
            </div>

            <div className="flex space-x-2 place-items-center ">
              <div className="">
                <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                  {widths.map((width: any) => (
                    <button
                      key={width}
                      className={`size-button ${activeWidth === width ? "active" : ""}`}
                      onClick={() => setActiveWidth(width)}
                    >
                      {width}
                    </button>
                  ))}
                </div>
              </div>
               <div className="mx-2 mt-1.5 text-secondary2"> X </div>
              <div className="">
                <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                  {lengths?.map((length: any) => (
                    <button
                      key={length}
                      className={`size-button ${activeLength === length ? "active" : ""}`}
                      onClick={() => setActiveLength(length)}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="choose-quantity flex items-center gap-5 mt-5">
              <div className="quantity-block md:p-3 p-2 flex items-center justify-between rounded-lg border border-line w-[140px] flex-shrink-0">
                <button
                  onClick={() => handleQuantityChange(activeColor, -1)}
                >
                  -
                </button>
                <span>{colorQuantities[activeColor] || 0}</span>
                <button
                  onClick={() => handleQuantityChange(activeColor, 1)}
                >
                  +
                </button>
              </div>
              <button
                className="button-main w-full text-center bg-white text-purple border border-purple"
                onClick={() => handleAddToCart(product, openModalCart, colorQuantities[activeColor], activeColor, activeWidth, activeLength)}
              >
                Add To Cart
              </button>
            </div>

            <button className="button-main w-full mt-5" onClick={checkoutHandler}>
              Buy It Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FeaturedProduct;