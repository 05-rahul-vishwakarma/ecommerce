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
import useCartStore from '@/globalStore/useCartStore'


const shippingOptions = [
  { id: "free", label: "Free Shipping", price: 0 },
  { id: "local", label: "Local", price: 30 },
  { id: "flat", label: "Flat Rate", price: 40 },
];

const CartItem = ({ product }) => {
  const { removeProductFromCart , decreaseCartItemQuantity , increaseCartItemQuantity} = useCartStore();
  
  
  return (
    <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
      <div className="w-1/2 flex items-center gap-6">
        <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
          <Image src={product?.productDetails?.[0]?.img  || "/image3.png"} width={1000} height={1000} alt={'product'} title={''} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="text-title">{product?.productDetails?.[0]?.name}</div>
      </div>
      <div className="w-1/12 text-center text-title">${product?.totalAmount}.00</div>
      <div className="w-1/6 flex justify-center">
        <div className="quantity-block bg-surface p-3 flex items-center justify-between rounded-lg border border-line md:w-[100px] w-20">
          <Icon.Minus onClick={() => decreaseCartItemQuantity(product?.SK)} className="text-base cursor-pointer" />
          <div className="text-button">{product?.qty}</div>
          <Icon.Plus onClick={() => increaseCartItemQuantity(product?.SK)} className="text-base cursor-pointer" />
        </div>
      </div>
      <div className="w-1/6 text-center text-title">${product?.totalAmount}.00</div>
      <div onClick={() => removeProductFromCart(product?.PK, product?.SK)} className="w-1/12 flex justify-center">
        <Icon.XCircle className="text-xl text-red cursor-pointer hover:text-black transition duration-500" />
      </div>
    </div>
  )
}

const Cart = () => {
  const router = useRouter();
  const { mergedCart } = useCartStore();
  const subtotal = mergedCart.reduce((total, item) => total + item.totalAmount * item.qty, 0);
  return (
    <>
      <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" />
      <div id="header" className="relative w-full text-purple">
        <MenuFour props="bg-transparent" />
        <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      </div>

      <div className="cart-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex justify-between max-xl:flex-col gap-y-8">

            <div className="xl:w-2/3 xl:pr-3 w-full">
              <div className="list-product w-full sm:mt-7 mt-5">
                <div className="heading bg-surface bora-4 pt-4 pb-4 flex">
                  <div className="w-1/2 text-center text-button">Products</div>
                  <div className="w-1/12 text-center text-button">Price</div>
                  <div className="w-1/6 text-center text-button">Quantity</div>
                  <div className="w-1/6 text-center text-button">Total Price</div>
                </div>
                <div className="list-product-main w-full mt-3">
                  {mergedCart.map((product,i) => (
                    <CartItem key={i} product={product} />
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:w-1/3 xl:pl-12 w-full">
              <div className="checkout-block bg-surface p-6 rounded-2xl">
                <div className="heading5">Order Summary</div>
                <div className="py-5 flex justify-between border-b border-line">
                  <div className="text-title">Subtotal</div>
                  <div className="text-title">${subtotal}.00</div>
                </div>
                <div className="py-5 flex justify-between border-b border-line">
                  <div className="text-title">Shipping</div>
                  <div className="choose-type flex gap-12">
                    <div className="left">
                      {shippingOptions?.map(({ id, label, price }) => (
                        <div key={id} className="type mt-1">
                          <input id={id} type="radio" name="ship" defaultChecked={price === 0} readOnly />
                          <label className="pl-1" htmlFor={id}>{label}:</label>
                        </div>
                      ))}
                    </div>
                    <div className="right">
                      {shippingOptions?.map(({ id, price }) => (
                        <div key={id} className="text-on-surface-variant1 mt-1">${price}.00</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-4 pb-4 flex justify-between">
                  <div className="heading5">Total</div>
                  <div className="heading5">${subtotal}.00</div>
                </div>
                <div className="flex flex-col items-center gap-y-4 mt-5">
                  <button className="checkout-btn button-main text-center w-full" onClick={() => router.push('/checkout')}>
                    Process To Checkout
                  </button>
                  <Link className="text-button hover-underline" href="/shop/breadcrumb1">Continue shopping</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
