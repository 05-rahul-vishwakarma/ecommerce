'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

const PaymentComponent = () => {

    useEffect(() => {
        // Razorpay script is loaded automatically by Next.js Script component
    }, []);

    const handlePayment = () => {
        const options = {
            key: 'rzp_test_f2GUXkhf7ipbqz', // Your Razorpay Key
            amount: 1000, // Amount in paise (INR)
            currency: 'INR',
            name: 'Test Payment',
            description: 'Payment for order #123',
            // image: 'https://your-logo-url.com/logo.png',
            handler: function(response) {
                alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            },
            prefill: {
                name: 'Rahul Vishwakarma',
                email: 'rahul930vishwakarma@example.com',
                contact: '9304411522',
            },
            theme: {
                color: '#F37254',
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div>
            {/* Add Razorpay Checkout Script */}
            <Script 
                src="https://checkout.razorpay.com/v1/checkout.js" 
                strategy="beforeInteractive" // Make sure it loads before user interaction
            />
            <button onClick={handlePayment}>
                Pay ₹ 10.00
            </button>
        </div>
    );
};

export default PaymentComponent;
