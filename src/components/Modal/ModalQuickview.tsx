"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import Rate from "../Other/Rate";
import { accesstToken } from "@/api/baseApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleAddToCart } from "@/services/carts";

interface ImageURL {
  img: string;
  color: {
    name: string;
    clrCode: string;
  };
}

interface AdditionalInformation {
  key: string;
  value: string;
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
  additionalInformation: AdditionalInformation[];
  slug: string;
  sku: string;
  category: {
    name: string;
    id: string;
  };
}

const ModalQuickview = () => {
  const { selectedProduct, closeQuickview } = useModalQuickviewContext();
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeWidth, setActiveWidth] = useState<string | null>(null);
  const [activeLength, setActiveLength] = useState<string | null>(null);
  const { openModalCart } = useModalCartContext();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const router = useRouter();

  

  // Calculate discounted price
  const calculateDiscountedPrice = useCallback((price: number, discount: number) => {
    return price - (price * discount / 100);
  }, []);

  const discountedPrice = selectedProduct ? calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount || 0) : 0;

  const handleCart = useCallback(
    (product: any) => {
      const accessToken = accesstToken;
      if (!accessToken) {
        toast.error("Please log in to add items to the cart.");
        router.push("/login");
        return;
      } else {
        handleAddToCart(product, openModalCart);
      }
    },
    [openModalCart, router]
  );

  const checkouthandler = useCallback(() => {
    closeQuickview();
    if (selectedProduct) {
      router.push(`/product/${selectedProduct.slug}`);
    }
  }, [closeQuickview, router, selectedProduct]);

  // Separate width and length extraction
  const widths = useMemo(() => {
    const widthInfo = selectedProduct?.additionalInformation?.find((info) => info.key === "width");
    return widthInfo ? widthInfo.value.split(",") : [];
  }, [selectedProduct?.additionalInformation]);

  const lengths = useMemo(() => {
    const lengthInfo = selectedProduct?.additionalInformation?.find((info) => info.key === "length");
    return lengthInfo ? lengthInfo.value.split(",") : [];
  }, [selectedProduct?.additionalInformation]);

  if (!selectedProduct) {
    return null;
  }

  // Validation to ensure both width and length are selected before adding to cart
  const canAddToCart = activeWidth !== null && activeLength !== null;

  const handleAddToCartClick = () => {
    if (canAddToCart) {
      // Add the selected width and length to the product data or context as needed
      const productWithDimensions = {
        ...selectedProduct,
        selectedWidth: activeWidth,
        selectedLength: activeLength,
      };
      handleCart(productWithDimensions);
    } else {
      toast.error("Please select both width and length before adding to cart.");
    }
  };

  

  return (
    <div className={`modal-quickview-block`} onClick={closeQuickview}>
      <div
        className={`modal-quickview-main py-6 ${selectedProduct !== null ? "open" : ""
          }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex h-full max-md:flex-col gap-y-6">
          <div className="heading pb-6 px-4 flex items-center justify-between relative">
            <div
              className="close-btn absolute right-0 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-purple hover:text-white"
              onClick={closeQuickview}
            >
              <Icon.X size={14} />
            </div>
          </div>
          <div className="left lg:w-[388px] md:w-[300px] flex-shrink-0 px-6">
            <div className="list-img max-md:flex items-center gap-4">
              {selectedProduct.imageURLs.map((item, index) => (
                <div
                  className="bg-img w-full aspect-[3/4] max-md:w-[150px] max-md:flex-shrink-0 rounded-[20px] overflow-hidden md:mt-6"
                  key={index}
                >
                  <Image
                    src={item.img}
                    width={1500}
                    height={2000}
                    alt={"product"}
                    priority={true}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="right w-full px-4">
            <div className="product-infor px-4">
              <div className="flex justify-between">
                <div>
                  <div className="caption2 text-secondary font-semibold uppercase">
                    {/* {selectedProduct.type} */}
                  </div>
                  <div className="heading4 mt-1">{selectedProduct.name}</div>
                </div>
                <div
                  className={`add-wishlist-btn w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-lg duration-300 flex-shrink-0 hover:bg-purple hover:text-white `}
                >
                  {/* <Icon.Heart size={20} weight="fill" className="text-red" /> */}
                </div>
              </div>
              <div className="flex items-center mt-3">
                <Rate currentRate={3} size={14} />
                <span className="caption1 text-secondary">(1.234 reviews)</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                <div className="product-price heading5">₹{discountedPrice.toFixed(2)}</div>
                <div className="w-px h-4 bg-line"></div>
                <div className="product-origin-price font-normal text-purple2">
                  <del>₹{selectedProduct.price.toFixed(2)}</del>
                </div>
                {selectedProduct.discount && (
                  <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                    -{selectedProduct.discount}%
                  </div>
                )}
                {/* <div className="desc text-secondary mt-3">{selectedProduct.description}</div> */}

                <div className="desc text-secondary mt-3 space-y-2">
                  {selectedProduct?.description?.split('\n').map((line, index) => (
                    <p key={index} className="text-base leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>

              </div>
              <div className="list-action mt-6">
                <div className="choose-color">
                  <div className="text-title">
                    Colors: <span className="text-title color">{activeColor}</span>
                  </div>
                  <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                    {selectedProduct.imageURLs.map((image, index) => (
                      <div
                        key={index}
                        className={`color-item w-8 h-8 rounded-[10px] duration-300 relative ${activeColor === image.color.name ? "ring-2 ring-purple" : ""
                          }`}
                        style={{ backgroundColor: image.color.clrCode }}
                        onClick={() => setActiveColor(image.color.name)}
                      >
                        <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                          {image.color.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="my-[8px] ">
                  <h3> Size: </h3>
                  <div className="flex items-center gap-3  ">
                    <div className="choose-size">
                      <div className="heading flex items-center justify-between">
                        <div className="text-title"></div>
                      </div>
                      <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                        {widths.map((width) => (
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

                    <div className="choose-size">
                      <div className="heading flex items-center justify-between">
                        <div className="text-title"></div>
                      </div>
                      <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                        {lengths.map((length) => (
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
                </div>

                {/* Changed div to a button element */}
                <button
                  onClick={handleAddToCartClick}
                  className={`button-main bg-custom-purple-color mt-4 w-full text-center  text-secondary border border-purple mb-3 ${canAddToCart ? "" : "disabled"
                    }`}
                  disabled={!canAddToCart}  // Correctly use disabled on a button
                >
                  Add To Cart
                </button>

                <button onClick={checkouthandler} className="button-block mt-5">
                  <div className="button-main w-full text-center">Buy It Now</div>
                </button>

                <div className="more-infor mt-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Icon.ArrowClockwise className="body1" />
                      <div className="text-title">Non Refundable</div>
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

                        const options: Intl.DateTimeFormatOptions = {
                          day: "numeric",
                          month: "long",
                        };

                        return `${startDate.toLocaleDateString("en-US", options)} - ${endDate.toLocaleDateString("en-US", options)}`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-1 mt-3 hidden ">
                    <Icon.Eye className="body1" />
                    <span className="text-title">38</span>
                    <span className="text-secondary">people viewing this product right now!</span>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">SKU:</div>
                    <div className="text-secondary">{selectedProduct.sku}</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">Categories:</div>
                    <div className="text-secondary">{selectedProduct.category.name}</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">Tag:</div>
                    <div className="text-secondary">{selectedProduct.productType}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalQuickview;