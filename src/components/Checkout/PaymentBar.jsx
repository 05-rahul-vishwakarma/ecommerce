import Image from 'next/image';
import React from 'react'

export default function PaymentBar() {

    const discount = 10; // Static discount value
    const ship = 5; // Static shipping value

    const staticCartData = [
        {
            id: 1,
            name: 'Orange Ribbon',
            price: 50,
            quantity: 2,
            thumbImage: ['https://res.cloudinary.com/dxgapyggk/image/upload/v1737728286/uploads/1737728283464_IMG_01902.jpg.jpg'],
            selectedSize: 'Medium',
            selectedColor: 'Orange',
        },
        {
            id: 2,
            name: 'Blue Ribbon',
            price: 30,
            quantity: 1,
            thumbImage: ['https://res.cloudinary.com/dxgapyggk/image/upload/v1737728286/uploads/1737728283464_IMG_01902.jpg.jpg'],
            selectedSize: 'Small',
            selectedColor: 'Blue',
        },
    ];

    const totalCart = staticCartData.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="right md:w-5/12 w-full ml-5">
            <div className="checkout-block">
                <div className="heading5 pb-3">Your Order</div>
                <div className="list-product-checkout">
                    {staticCartData.map((product) => (
                        <div key={product.id} className="item flex flex-col md:flex-row items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                            <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                    src={product.thumbImage[0]}
                                    width={500}
                                    height={500}
                                    alt='img'
                                    className='w-full h-full'
                                />
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="name text-title">{product.name}</div>
                                    <div className="caption1 text-secondary mt-2">
                                        <span className='size capitalize'>{product.selectedSize}</span>
                                        <span>/</span>
                                        <span className='color capitalize'>{product.selectedColor}</span>
                                    </div>
                                </div>
                                <div className="text-title">
                                    <span className='quantity'>{product.quantity}</span>
                                    <span className='px-1'>x</span>
                                    <span>${product.price}.00</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="discount-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Discounts</div>
                    <div className="text-title">-${discount}.00</div>
                </div>
                <div className="ship-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Shipping</div>
                    <div className="text-title">${ship}.00</div>
                </div>
                <div className="total-cart-block pt-5 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5 total-cart">${totalCart - discount + ship}.00</div>
                </div>
            </div>
        </div>
    )
}
