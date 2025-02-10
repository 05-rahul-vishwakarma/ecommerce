"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useProductStore } from "../Product/store/useProduct";
import { useCart } from "@/context/CartContext";
import useCartStore from "@/globalStore/useCartStore";
import { fetchAndMergeCartData } from "@/services/carts";
import { useRouter } from "next/navigation";

const ModalCart = () => {
  const router = useRouter(); // Correct way to use router in Next.js App Router
  const [activeTab, setActiveTab] = useState<string | undefined>("");
  const { isModalOpen, closeModalCart } = useModalCartContext();
  const { fetchProducts, products } = useProductStore();
  const { mergedCart, removeProductFromCart } = useCartStore();
  const subtotal = mergedCart?.reduce(
    (total: any, item: any) => total + item?.totalAmount * item?.qty,
    0
  );

  useEffect(() => {
    fetchAndMergeCartData();
    fetchProducts();
  }, []);

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };


  const checkoutHandler = () => {
    closeModalCart();
    const encodedProduct = encodeURIComponent(JSON.stringify(mergedCart));
    localStorage.setItem("cartData", encodedProduct);
    router.push(`/checkout/${'true'}`)
  };


  return (
    <>
      <div className={`modal-cart-block`} onClick={closeModalCart}>
        <div
          className={`modal-cart-main flex ${isModalOpen ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="left w-1/2 border-r border-line py-6 max-md:hidden">
            <div className="heading5 px-6 pb-3">You May Also Like</div>
            <div className="list px-6">
              {products?.slice(0, 3)?.map((product, i) => (
                <div
                  key={i}
                  className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                >
                  <div className="infor flex items-center gap-5">
                    <div className="bg-img">
                      <Image
                        src={product?.img} // Using the first image from imageURLs
                        width={300}
                        height={300}
                        alt={product.name}
                        className="w-[100px] aspect-square flex-shrink-0 rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="name text-button">{product.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="product-price text-title">
                          ${product.price}.00
                        </div>
                        {product.discount && (
                          <div className="product-origin-price text-title text-purple2">
                            <del>
                              $
                              {(
                                product.price /
                                (1 - product.discount / 100)
                              ).toFixed(2)}
                            </del>
                          </div>
                        )}

                      </div>
                      {/* <div className="quantity text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </div> */}
                    </div>
                  </div>
                  <div
                    className="text-xl text-secondary w-10 h-10 rounded-xl border border-purple flex items-center justify-center duration-300 cursor-pointer hover:bg-purple hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleAddToCart(product)
                    }}
                  >
                    <Icon.Handbag />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right cart-block md:w-1/2 w-full py-6 relative overflow-hidden">
            <div className="heading px-6 pb-3 flex items-center justify-between relative">
              <div className="heading5">Shopping Cart</div>
              <div
                className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-purple hover:text-white"
                onClick={closeModalCart}
              >
                <Icon.X size={14} />
              </div>
            </div>
            <div className="h-[65vh] px-6 overflow-y-scroll pb-[6rem] ">
              {mergedCart?.map((product: any, i: number) => {
                const productDetail = product?.productDetails || {};
                return (
                  <div
                    key={i}
                    className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                  >
                    <div className="infor flex items-center gap-3 w-full">
                      <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={productDetail?.img || "/image3.png"} // Fallback image if img is undefined
                          width={1000}
                          height={1000}
                          alt={productDetail?.name || "Product Image"} // Fallback alt text
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex items-center justify-between w-full">

                          <div className="flex-col ">
                            <div className="name text-button">
                              {productDetail?.name || "Product Name"}{" "}
                            </div>
                            <div className="choose-color mt-4">
                              <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                {product?.productDetails?.imageURLs.map((image: any, idx: any) => (
                                  <button
                                    key={idx}
                                    className={`color-item rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow`}
                                  >
                                    <Image
                                      src={image.img}
                                      alt={image.color.name}
                                      width={28}
                                      height={28}
                                      className="object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div
                            className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
                            onClick={() =>
                              removeProductFromCart(product?.PK, product?.SK)
                            }
                          >
                            Remove
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-3 w-full">
                          <div className="flex items-center text-purple2 capitalize">
                            {/* {product.selectedSize || product.sizes[0]}/{product.selectedColor || product.variation[0].color} */}
                          </div>
                          <div className="product-price text-title">
                            <input
                              type="number"
                              value={product?.qty || ''}
                              min="1"
                              // onChange={(e) => updateCartItemQty(item.PK, item.SK, e.target.value)}
                              className="w-12 text-center border border-gray-300 rounded"
                            />
                            <span className="">x</span>
                            ${product?.totalAmount}.00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="footer-modal bg-white absolute bottom-0 left-0 w-full">
              {/* <div className="flex items-center justify-center lg:gap-14 gap-8 px-6 py-4 border-b border-line">
                                <div
                                    className="item flex items-center gap-3 cursor-pointer  hover:text-secondary"
                                    onClick={() => handleActiveTab('note')}
                                >
                                    <Icon.NotePencil className='text-xl' />
                                    <div className="caption1">Note</div>
                                </div>
                                <div
                                    className="item flex items-center gap-3 cursor-pointer  hover:text-secondary"
                                    onClick={() => handleActiveTab('shipping')}
                                >
                                    <Icon.Truck className='text-xl' />
                                    <div className="caption1">Shipping</div>
                                </div>
                                <div
                                    className="item flex items-center gap-3 cursor-pointer  hover:text-secondary"
                                    onClick={() => handleActiveTab('coupon')}
                                >
                                    <Icon.Tag className='text-xl' />
                                    <div className="caption1">Coupon</div>
                                </div>
                            </div> */}
              <div className="flex items-center justify-between pt-6 px-6">
                <div className="heading5">Subtotal</div>
                <div className="heading5">${subtotal}.00</div>
              </div>
              <div className="block-button text-center p-6">
                <div className="flex items-center gap-4">
                  <Link
                    href={"/cart"}
                    className="button-main basis-1/2  bg-white border border-purple text-[black] text-center uppercase"
                    onClick={closeModalCart}
                  >
                    View cart
                  </Link>
                  <button
                    className="button-main basis-1/2 text-center uppercase"
                    onClick={() => checkoutHandler()}
                  >
                    Check Out
                  </button>
                </div>
                <div
                  onClick={closeModalCart}
                  className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block hover:text-secondary"
                >
                  Or continue shopping
                </div>
              </div>
              <div
                className={`tab-item note-block ${activeTab === "note" ? "active" : ""
                  }`}
              >
                <div className="px-6 py-4 border-b border-line">
                  <div className="item flex items-center gap-3 cursor-pointer">
                    <Icon.NotePencil className="text-xl" />
                    <div className="caption1">Note</div>
                  </div>
                </div>
                <div className="form pt-4 px-6">
                  <textarea
                    name="form-note"
                    id="form-note"
                    rows={4}
                    placeholder="Add special instructions for your order..."
                    className="caption1 py-3 px-4 bg-surface border-line rounded-md w-full"
                  ></textarea>
                </div>
                <div className="block-button text-center pt-4 px-6 pb-6">
                  <div
                    className="button-main w-full text-center"
                    onClick={() => setActiveTab("")}
                  >
                    Save
                  </div>
                  <div
                    onClick={() => setActiveTab("")}
                    className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
                  >
                    Cancel
                  </div>
                </div>
              </div>
              <div
                className={` tab-item note-block ${activeTab === "shipping" ? "active" : ""
                  }`}
              >
                <div className="px-6 py-4 border-b border-line">
                  <div className="item flex items-center gap-3 cursor-pointer">
                    <Icon.Truck className="text-xl" />
                    <div className="caption1">Estimate shipping rates</div>
                  </div>
                </div>
                <div className="form pt-4 px-6">
                  <div className="">
                    <label
                      htmlFor="select-country"
                      className="caption1 text-secondary"
                    >
                      Country/region
                    </label>
                    <div className="select-block relative mt-2">
                      <select
                        id="select-country"
                        name="select-country"
                        className="w-full py-3 pl-5 rounded-xl bg-white border border-line"
                        defaultValue={"Country/region"}
                      >
                        <option value="Country/region" disabled>
                          Country/region
                        </option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                        <option value="UK">UK</option>
                        <option value="USA">USA</option>
                      </select>
                      <Icon.CaretDown
                        size={12}
                        className="absolute top-1/2 -translate-y-1/2 md:right-5 right-2"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="select-state"
                      className="caption1 text-secondary"
                    >
                      State
                    </label>
                    <div className="select-block relative mt-2">
                      <select
                        id="select-state"
                        name="select-state"
                        className="w-full py-3 pl-5 rounded-xl bg-white border border-line"
                        defaultValue={"State"}
                      >
                        <option value="State" disabled>
                          State
                        </option>
                        <option value="Paris">Paris</option>
                        <option value="Madrid">Madrid</option>
                        <option value="London">London</option>
                        <option value="New York">New York</option>
                      </select>
                      <Icon.CaretDown
                        size={12}
                        className="absolute top-1/2 -translate-y-1/2 md:right-5 right-2"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="select-code"
                      className="caption1 text-secondary"
                    >
                      Postal/Zip Code
                    </label>
                    <input
                      className="border-line px-5 py-3 w-full rounded-xl mt-3"
                      id="select-code"
                      type="text"
                      placeholder="Postal/Zip Code"
                    />
                  </div>
                </div>
                <div className="block-button text-center pt-4 px-6 pb-6">
                  <div
                    className="button-main w-full text-center"
                    onClick={() => setActiveTab("")}
                  >
                    Calculator
                  </div>
                  <div
                    onClick={() => setActiveTab("")}
                    className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
                  >
                    Cancel
                  </div>
                </div>
              </div>
              <div
                className={`tab-item note-block ${activeTab === "coupon" ? "active" : ""
                  }`}
              >
                <div className="px-6 py-4 border-b border-line">
                  <div className="item flex items-center gap-3 cursor-pointer">
                    <Icon.Tag className="text-xl" />
                    <div className="caption1">Add A Coupon Code</div>
                  </div>
                </div>
                <div className="form pt-4 px-6">
                  <div className="">
                    <label
                      htmlFor="select-discount"
                      className="caption1 text-secondary"
                    >
                      Enter Code
                    </label>
                    <input
                      className="border-line px-5 py-3 w-full rounded-xl mt-3"
                      id="select-discount"
                      type="text"
                      placeholder="Discount code"
                    />
                  </div>
                </div>
                <div className="block-button text-center pt-4 px-6 pb-6">
                  <div
                    className="button-main w-full text-center"
                    onClick={() => setActiveTab("")}
                  >
                    Apply
                  </div>
                  <div
                    onClick={() => setActiveTab("")}
                    className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
