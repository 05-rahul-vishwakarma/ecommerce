// Payment/Payment.js
'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const PaymentComponent = ({ amount, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Use useRouter to get the router
    const accessToken = Cookies.get('accessToken');
    const [userDetails, setUserDetails] = useState(null); // State to store user details

    // Function to fetch user profile
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user profile: ${response.status}`);
            }

            const data = await response.json();
            if (data.statusCode === 200) {
                setUserDetails(data.data); // Store user details in state
            } else {
                console.error("Failed to fetch user profile:", data.message);
                toast.error("Failed to fetch user profile.");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error(error.message || "Failed to fetch user profile.");
        }
    };

    // Load Razorpay SDK and fetch user profile on component mount
    useEffect(() => {
        const loadRazorpay = async () => {
            if (document.querySelector('#razorpay-script')) {
                return; // If script already exists, don't reload.
            }

            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.id = 'razorpay-script'; // Add an ID to the script for checking later.

            script.onload = () => {
                console.log("Razorpay SDK loaded successfully");
            };

            script.onerror = () => {
                console.error("Failed to load Razorpay SDK");
                toast.error('Failed to load payment SDK. Please try again.');
            };

            document.body.appendChild(script);
        };

        loadRazorpay();
        fetchUserProfile(); // Fetch user profile when the component mounts
    }, [accessToken]); // Fetch user profile when the component mounts, and when accessToken changes

    // Function to initiate payment
    const handlePayment = async () => {
        if (loading) return;
        setLoading(true);

        try {
            // 1. Create an order on your server
            const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/CreateOrder`, { // Use the correct API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    amount: amount, // Send the actual amount
                    currency: 'INR',
                }),
            });

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                throw new Error(errorData.message || 'Failed to create order');
            }

            const orderData = await orderResponse.json();
            const { order, key } = orderData.data; // Extract order and key from the response

            // 2. Configure Razorpay options
            const options = {
                key: key, // Get the key from your server
                amount: order.amount, //  Amount in paise
                currency: order.currency,
                name: 'The Ribbon Pack',
                description: 'Payment for your order',
                order_id: order.id, // Get the order ID from your server
                handler: async function (response) {
                    // 3. Verify the payment on your server
                    const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/VerifyPayment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(response),
                    });

                    if (!verificationResponse.ok) {
                        const errorData = await verificationResponse.json();
                        throw new Error(errorData.message || 'Payment verification failed');
                    }

                    // Payment is successful
                    toast.success('Payment successful!');
                    if (onSuccess) {
                        onSuccess(); // Call the onSuccess callback if provided
                    } else {
                        router.push('/orders');
                    }
                },
                prefill: {  // Optional, but good for UX
                    name: userDetails?.firstName || userDetails?.phoneNo || '', // Use user's name from profile
                    email: '', //  Add email from profile if available
                    contact: userDetails?.phoneNo || '', // Use user's phone number from profile
                },
                theme: {
                    color: '#F37254',
                },
            };

            // 4. Open Razorpay checkout
            const razorpay = new window.Razorpay(options);
            razorpay.open();

            razorpay.on('payment.failed', function (response) {
                console.error("Payment failed:", response);
                toast.error('Payment failed. Please try again.');
                setLoading(false);  // Ensure loading is set to false on failure
            });
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error(error.message || 'Failed to initiate payment. Please try again.');
            setLoading(false);  // Ensure loading is set to false on failure
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[black] font-semibold text-white py-3 rounded-lg mt-4 hover:bg-[#000000e0] transition duration-300"
            >
                {loading ? 'Processing Payment...' : `Pay ₹${amount.toFixed(2)}`}
            </button>
        </div>
    );
};

export default PaymentComponent;