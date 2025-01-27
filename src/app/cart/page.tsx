'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuFour from '@/components/Header/MenuFour'
import { useCart } from '@/context/CartContext'

const Cart = () => {
  const router = useRouter()
  const { mergedCartData } = useCart();
  console.log(mergedCartData, 'mergedCartData');

  // const totalCart = cartProducts?.reduce((total, item) => {
  //   const discountAmount = (item.price * item.discount) / 100; // Calculate discount amount
  //   const discountedPrice = item.price - discountAmount; // Calculate discounted price
  //   return total + discountedPrice * item.quantity; // Add to total
  // }, 0);

  const discountCart = 10; // Static discount value (additional discount, if any)
  const shipCart = 0; // Static shipping value

  const finalTotal = 800 - discountCart + shipCart;


  const redirectToCheckout = () => {
    router.push('/checkout')
  }

  return (
    <>
      {/* Header Section */}
      <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" />
      <div id="header" className='relative w-full text-purple'>
        <MenuFour props="bg-transparent" />
        <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
      </div>

      {/* Cart Content Section */}
      <div className="cart-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
            {/* Left Section: Cart Items */}
            <div className="xl:w-2/3 xl:pr-3 w-full">
              {/* Free Shipping Banner */}
              <div className="heading banner mt-5">
                <div className="text">
                  Buy <span className="text-button">more to get </span>
                  <span className="text-button">freeship</span>
                </div>
                <div className="tow-bar-block mt-4">
                  {/* Progress bar for free shipping (static) */}
                  <div
                    className="progress-line"
                    style={{ width: '50%' }} // Static width for demonstration
                  ></div>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="list-product w-full sm:mt-7 mt-5">
                <div className='w-full'>
                  <div className="heading bg-surface bora-4 pt-4 pb-4">
                    <div className="flex">
                      <div className="w-1/2">
                        <div className="text-button text-center">Products</div>
                      </div>
                      <div className="w-1/12">
                        <div className="text-button text-center">Price</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">Quantity</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">Total Price</div>
                      </div>
                    </div>
                  </div>
                  <div className="list-product-main w-full mt-3">
                    {/* Display static cart items */}
                    {mergedCartData?.map((product) => (
                      <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
                        <div className="w-1/2">
                          <div className="flex items-center gap-6">
                            <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                              <Image
                                src={product?.image || ""}
                                width={1000}
                                height={1000}
                                alt={product.name}
                                className='w-full h-full object-cover rounded-lg'
                              />
                            </div>
                            <div>
                              <div className="text-title">{product.name}</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/12 price flex items-center justify-center">
                          <div className="text-title text-center">${product?.totalAmount}.00</div>
                        </div>
                        <div className="w-1/6 flex items-center justify-center">
                          <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                            <Icon.Minus className="text-base max-md:text-sm" />
                            <div className="text-button quantity"> {product?.qty} </div>
                            <Icon.Plus className='text-base max-md:text-sm' />
                          </div>
                        </div>
                        <div className="w-1/6 flex total-price items-center justify-center">
                          <div className="text-title text-center">${product?.totalAmount}.00</div>
                        </div>
                        <div className="w-1/12 flex items-center justify-center">
                          <Icon.XCircle className='text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-500' />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Discount Code Input */}
              <div className="input-block discount-code w-full h-12 sm:mt-7 mt-5">
                <form className='w-full h-full relative'>
                  <input type="text" placeholder='Add voucher discount' className='w-full h-full bg-surface pl-4 pr-14 rounded-lg border border-line' required />
                  <button className='button-main absolute top-1 bottom-1 right-1 px-5 rounded-lg flex items-center justify-center'>Apply Code</button>
                </form>
              </div>

              {/* Voucher List */}
              <div className="list-voucher flex items-center gap-5 flex-wrap sm:mt-7 mt-5">
                {/* Static voucher items */}
                {[
                  { discount: '10% OFF', minOrder: 200, code: 'AN6810' },
                  { discount: '15% OFF', minOrder: 300, code: 'AN6815' },
                  { discount: '20% OFF', minOrder: 400, code: 'AN6820' },
                ].map((voucher, index) => (
                  <div key={index} className="item border border-line rounded-lg py-2">
                    <div className="top flex gap-10 justify-between px-3 pb-2 border-b border-dashed border-line">
                      <div className="left">
                        <div className="caption1">Discount</div>
                        <div className="caption1 font-bold">{voucher.discount}</div>
                      </div>
                      <div className="right">
                        <div className="caption1">For all orders <br />from ${voucher.minOrder}</div>
                      </div>
                    </div>
                    <div className="bottom gap-6 items-center flex justify-between px-3 pt-2">
                      <div className="text-button-uppercase">Code: {voucher.code}</div>
                      <div className="button-main py-1 px-2.5 capitalize text-xs">Apply Code</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Order Summary */}
            <div className="xl:w-1/3 xl:pl-12 w-full">
              <div className="checkout-block bg-surface p-6 rounded-2xl">
                <div className="heading5">Order Summary</div>
                <div className="total-block py-5 flex justify-between border-b border-line">
                  <div className="text-title">Subtotal</div>
                  <div className="text-title">${finalTotal}.00</div>
                </div>
                <div className="discount-block py-5 flex justify-between border-b border-line">
                  <div className="text-title">Discounts</div>
                  <div className="text-title">-${discountCart}.00</div>
                </div>
                <div className="ship-block py-5 flex justify-between border-b border-line">
                  <div className="text-title">Shipping</div>
                  <div className="choose-type flex gap-12">
                    <div className="left">
                      <div className="type">
                        <input id="shipping" type="radio" name="ship" checked={shipCart === 0} readOnly />
                        <label className="pl-1" htmlFor="shipping">Free Shipping:</label>
                      </div>
                      <div className="type mt-1">
                        <input id="local" type="radio" name="ship" value={30} readOnly />
                        <label className="text-on-surface-variant1 pl-1" htmlFor="local">Local:</label>
                      </div>
                      <div className="type mt-1">
                        <input id="flat" type="radio" name="ship" value={40} readOnly />
                        <label className="text-on-surface-variant1 pl-1" htmlFor="flat">Flat Rate:</label>
                      </div>
                    </div>
                    <div className="right">
                      <div className="ship">$0.00</div>
                      <div className="local text-on-surface-variant1 mt-1">$30.00</div>
                      <div className="flat text-on-surface-variant1 mt-1">$40.00</div>
                    </div>
                  </div>
                </div>
                <div className="total-cart-block pt-4 pb-4 flex justify-between">
                  <div className="heading5">Total</div>
                  <div className="heading5">${800 - discountCart + shipCart}.00</div>
                </div>
                <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                  <div className="checkout-btn button-main text-center w-full" onClick={redirectToCheckout}>Process To Checkout</div>
                  <Link className="text-button hover-underline" href="/shop/breadcrumb1">Continue shopping</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  )
}

export default Cart