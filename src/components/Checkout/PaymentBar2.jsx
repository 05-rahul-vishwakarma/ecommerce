"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useCartStore from '@/globalStore/useCartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import PaymentComponent from '../Payment/Payment'; // Ensure the path is correct
import { purchaseProduct } from '.././../api/purchaseApis/purchasePost';

// Utility function to prevent errors
const safeParseInt = (value) => {
  try {
    return parseInt(value, 10);
  } catch (error) {
    console.error("Error parsing integer:", error);
    return 1; // Default value
  }
};

// Reusable function to calculate discounted price
const calculateDiscountedPrice = (price, discount, qty) => {
  const discountedPrice = price * (1 - discount / 100);
  return discountedPrice * qty;
};

export default function PaymentBar({ cartData }) {
  const [decodedData, setDecodedData] = useState([]);
  const [activeColors, setActiveColors] = useState({});
  const [activeImages, setActiveImages] = useState({});
  const { removeProductFromCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCallback, setPaymentCallback] = useState({
    onSuccess: () => { },
    onError: () => { }
  });

  // Initialize decodedData from props
  useEffect(() => {
    if (cartData) {
      setDecodedData(cartData);
    }
  }, [cartData]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return decodedData.reduce((total, item) => {
      const price = parseFloat(item.productDetails.price) || 0;
      const discount = parseFloat(item.productDetails.discount) || 0;
      const qty = parseInt(item.qty) || 1;
      return total + calculateDiscountedPrice(price, discount, qty);
    }, 0);
  }, [decodedData]);

  // Update cart item quantity
  const updateCartItemQty = useCallback((PK, SK, newQty) => {
    setDecodedData(prevData => prevData.map(item =>
      item.PK === PK && item.SK === SK
        ? { ...item, qty: Math.max(1, safeParseInt(newQty)) }
        : item
    ));
  }, []);

  const handleRemoveFromCart = useCallback((PK, SK) => {
    setDecodedData(prevData => prevData.filter(item => !(item.PK === PK && item.SK === SK)));
    removeProductFromCart(PK, SK);
    toast.success('Item removed from cart successfully!');

    // Remove from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cartData')) || [];
    const updatedLocalCart = storedCart.filter(item => !(item.PK === PK && item.SK === SK));
    localStorage.setItem('cartData', JSON.stringify(updatedLocalCart));

    // Remove from sessionStorage
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('cart_')) {
        const sessionCart = JSON.parse(sessionStorage.getItem(key) || '[]');
        const updatedSessionCart = sessionCart.filter(item => !(item.PK === PK && item.SK === SK));

        if (updatedSessionCart.length === 0) {
          sessionStorage.removeItem(key);
        } else {
          sessionStorage.setItem(key, JSON.stringify(updatedSessionCart));
        }
      }
    });
  }, [removeProductFromCart]);

  // Handle color selection
  const handleColorSelection = useCallback((PK, SK, colorName, imageUrl) => {
    setActiveColors(prevState => ({ ...prevState, [PK + SK]: colorName }));
    setActiveImages(prevState => ({ ...prevState, [PK + SK]: imageUrl }));
    setDecodedData(prevData => prevData.map(item =>
      item.PK === PK && item.SK === SK
        ? { ...item, selectedColor: colorName, img: imageUrl }
        : item
    ));
  }, []);

  // Generate order payload
  const generateOrderPayloads = useCallback(() => {
    return decodedData.map(item => {
      const price = parseFloat(item.productDetails.price) || 0;
      const discount = parseFloat(item.productDetails.discount) || 0;
      const qty = parseInt(item.qty) || 1;
      const finalAmount = Math.round(calculateDiscountedPrice(price, discount, qty) * 100);

      return {
        businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
        productIds: [{
          PK: item?.productId?.PK,
          SK: item?.productId?.SK,
          quantity: qty,
        }],
        amount: finalAmount,
      };
    });
  }, [decodedData]);

  const handlePlaceOrder = async () => {
    if (loading) return;
    setLoading(true);
  
    try {
      const orderPayloads = generateOrderPayloads();
  
      // Validate cart data
      if (orderPayloads.length === 0) {
        throw new Error('Your cart is empty. Please add items to proceed.');
      }
  
      const paymentResult = await new Promise((resolve, reject) => {
        setShowPayment(true);
        setPaymentCallback({
          onSuccess: (response) => resolve(response),
          onError: (error) => reject(error),
        });
      });
  
      if (paymentResult) {
        for (const payload of orderPayloads) {
          try {
            const response = await purchaseProduct(payload);
  
            // Check if the response indicates success
            if (response?.statusCode === 200) {
              const { PK, SK } = payload.productIds[0];
              removeProductFromCart(PK, SK);
              toast.success('Order placed successfully! Redirecting to orders page...');
            } else {
              throw new Error(response.data?.message);
            }
          } catch (error) {
            // Handle API call errors
            const backendErrorMessage = error?.response?.data?.message || error.message;
            toast.error(backendErrorMessage || 'Failed to place order. Please try again.');
            throw error; // Re-throw to stop further processing
          }
        }
  
        // Clear local storage and redirect after all orders are successful
        localStorage.removeItem('checkoutProduct');
        router.push('/orders');
      }
    } catch (error) {
      console.error('Order Placement Error:', error);
  
      // Display the actual backend error message to the user
      const userFriendlyMessage = error.message || 'Failed to place order. Please try again.';
      toast.error(userFriendlyMessage);
    } finally {
      setLoading(false);
      setShowPayment(false);
    }
  };

  const itemDetails = useMemo(() => {
    return decodedData.map(item => {
      const widthInfo = item?.productDetails?.additionalInformation?.find((info) => info.key === "width");
      const lengthInfo = item?.productDetails?.additionalInformation?.find((info) => info.key === "length");

      return {
        widths: widthInfo ? widthInfo.value.split(",") : [],
        lengths: lengthInfo ? lengthInfo.value.split(",") : [],
      };
    });
  }, [decodedData]);

  return (
    <div className="right md:w-5/12 w-full">
      <div className="checkout-block bg-white p-6 rounded-lg shadow-lg">
        <div className="heading5 pb-3 text-2xl font-bold text-gray-800">Your Order</div>
        <div className="list-product-checkout">
          {decodedData.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              activeImages={activeImages}
              activeColors={activeColors}
              itemDetails={itemDetails[index]}
              updateCartItemQty={updateCartItemQty}
              handleColorSelection={handleColorSelection}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
        <div className="total-cart-block pt-6 flex justify-between border-t border-gray-200">
          <div className="heading5 text-xl font-bold text-gray-800">Total</div>
          <div className="heading5 total-cart text-xl font-bold text-purple-600">₹ {totalAmount.toFixed(2)}</div>
        </div>
      </div>

      {showPayment ? (
        <PaymentComponent
          amount={totalAmount}
          onSuccess={paymentCallback.onSuccess}
          onError={paymentCallback.onError}
          isMultipleProducts={true}
        />
      ) : (
        <button
          className="w-full bg-[black] font-semibold text-white py-3 rounded-lg mt-4 hover:bg-[#000000e0] transition duration-300"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      )}
    </div>
  );
}

// Reusable CartItem component
const CartItem = React.memo(({
  item,
  activeImages,
  activeColors,
  itemDetails,
  updateCartItemQty,
  handleColorSelection,
  handleRemoveFromCart,
}) => {
  const { widths, lengths } = itemDetails;
  const price = item?.productDetails?.price || 0;
  const discount = item?.productDetails?.discount || 0;
  const discountedPrice = price * (1 - discount / 100);

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <div className="name text-lg font-semibold text-gray-700">{item?.productDetails?.name || 'No Name'}</div>
      <div className="item flex flex-col md:flex-row items-center justify-between w-full gap-6">
        <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden shadow-md">
          <Image
            src={activeImages[item.PK + item.SK] || item?.productDetails?.img || '/image3.png'}
            width={500}
            height={500}
            alt="Product Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-sm text-gray-500 mt-2 flex">
              <span className="size capitalize">{item?.productDetails?.unit || "No Unit"}</span>
              <span>/</span>
              <span className="color capitalize">{item?.productDetails?.quantity == 0 ? <p className='text-[red]'> Out Of Stock </p> : item?.productDetails?.status}</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <span className="font-semibold">Price:</span> ₹{price}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <span className="font-semibold">Discount:</span> {discount}%
            </div>
          </div>
          <div className="quantity-block md:p-3 p-2 flex items-center justify-between rounded-lg border border-gray-300 w-[140px] flex-shrink-0">
            <input
              type="number"
              value={item?.qty || ''}
              min="1"
              onChange={(e) => updateCartItemQty(item.PK, item.SK, e.target.value)}
              className="w-12 text-center border border-gray-300 rounded"
            />
            <span className="px-1">x</span>
            <span>₹{discountedPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="choose-color mt-4">

        <div className="list-color flex items-center gap-2 flex-wrap mt-3">
          {item?.productDetails?.imageURLs?.map((image, idx) => (
            <button
              key={idx}
              className={`color-item w-12 h-12 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${activeColors[item.PK + item.SK] === image.color.name ? "border-2 border-purple-600" : "border-2 border-transparent"}`}
              onClick={() => handleColorSelection(item.PK, item.SK, image.color.name, image.img)}
            >
              <Image
                src={image.img}
                alt={image.color.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="heading flex items-center justify-between mt-[1rem] ">
        <div className="text-title">{'size'}:</div>
      </div>
      <div className='flex space-x-2 ' >
        {widths.length > 0 && (
          <SizeSelection title="Width" sizes={widths} />
        )}

        {lengths.length > 0 && (
          <SizeSelection title="Length" sizes={lengths} />
        )}
      </div>

      <div className="flex justify-end w-full text-[red]">
        <div
          className="remove-cart-btn text-sm font-semibold text-red-500 underline cursor-pointer hover:text-red-700"
          onClick={() => handleRemoveFromCart(item.PK, item.SK)}
        >
          Remove
        </div>
      </div>
    </div>
  );
});

// Reusable SizeSelection component
const SizeSelection = ({ title, sizes }) => (
  <div className="choose-size">
    {/* <div className="heading flex items-center justify-between">
      <div className="text-title">{'size'}:</div>
    </div> */}
    <div className="list-size flex items-center gap-2 flex-wrap mt-3">
      {sizes.map((size) => (
        <button
          key={size}
          className="size-button"
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);