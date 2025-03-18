// Payment/Payment.js
'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const PaymentComponent = ({ amount, onSuccess, onError, isMultipleProducts = false }) => {
    console.log(amount,'amount from the payment component');
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const accessToken = Cookies.get('accessToken');
    const [userDetails, setUserDetails] = useState(null);

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
            // Ensure amount is properly formatted for Razorpay (in paise)
            const amountInPaise = Math.round(parseFloat(amount) * 100);

            if (isNaN(amountInPaise)) {
                console.error('Invalid amount:', amount);
                throw new Error('Invalid amount');
            }

            console.log('Payment amount calculation:', {
                originalAmount: amount,
                amountInPaise: amountInPaise
            });

            const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/CreateOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    amount: amountInPaise,
                    currency: 'INR',
                    isMultipleProducts: isMultipleProducts
                }),
            });

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                throw new Error(errorData.message || 'Failed to create order');
            }

            const orderData = await orderResponse.json();
            const { order, key } = orderData.data;

            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: 'The Ribbon Pack',
                description: isMultipleProducts ? 'Payment for multiple items' : 'Payment for your order',
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // Ensure we have a valid payment response
                        if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
                            throw new Error('Invalid payment response');
                        }

                        const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/VerifyPayment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${accessToken}`,
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                isMultipleProducts: isMultipleProducts
                            }),
                        });

                        if (!verificationResponse.ok) {
                            const errorData = await verificationResponse.json();
                            throw new Error(errorData.message || 'Payment verification failed');
                        }

                        const verificationData = await verificationResponse.json();
                        if (verificationData.statusCode !== 200) {
                            throw new Error(verificationData.message || 'Payment verification failed');
                        }

                        toast.success('Payment successful!');
                        if (onSuccess) {
                            onSuccess(response);
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        toast.error(error.message || 'Payment verification failed');
                        if (onError) {
                            onError(error);
                        }
                    }
                },
                prefill: {
                    name: userDetails?.firstName || userDetails?.phoneNo || '',
                    email: userDetails?.email || '',
                    contact: userDetails?.phoneNo || '',
                },
                theme: {
                    color: '#592dbb',
                },
                modal: {
                    ondismiss: function() {
                        if (onError) {
                            onError(new Error('Payment cancelled by user'));
                        }
                    },
                    escape: false,
                    confirm_close: true
                },
                retry: {
                    enabled: true,
                    max_count: 3
                },
                notes: {
                    isMultipleProducts: isMultipleProducts ? 'true' : 'false'
                }
            };

            const razorpay = new window.Razorpay(options);
            
            // Add event listeners before opening the payment
            razorpay.on('payment.failed', function (response) {
                const error = response.error || {};
                const errorMessage = error.description || error.reason || error.message || 'Payment failed';
                console.error("Payment failed:", error);
                toast.error(errorMessage);
                if (onError) {
                    onError(new Error(errorMessage));
                }
            });

            razorpay.on('payment.error', function (error) {
                const errorMessage = error?.description || error?.message || 'Payment error occurred';
                console.error("Payment error:", error);
                toast.error(errorMessage);
                if (onError) {
                    onError(new Error(errorMessage));
                }
            });

            // Open the payment modal
            razorpay.open();

        } catch (error) {
            console.error("Payment Error:", error);
            toast.error(error.message || 'Failed to initiate payment');
            if (onError) {
                onError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Automatically trigger payment when component mounts
    useEffect(() => {
        handlePayment();
    }, []); // Empty dependency array means this runs once when component mounts

    return null; // No need for a button as payment is triggered automatically
};

export default PaymentComponent;