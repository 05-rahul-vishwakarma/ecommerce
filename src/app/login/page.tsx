'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuFour from '@/components/Header/MenuFour';
import axios from 'axios';

// Fetch data function outside the component
const fetchData = async (phoneNo, otp) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/verifyOtp`, 
            { phoneNo, otp } // Pass parameters as needed
        );
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error; // Rethrow error for further handling
    }
};

const Login = () => {
    const [phoneNo, setPhoneNo] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const data = await fetchData(phoneNo, otp); // Call fetchData with inputs
            setSuccess("OTP Verified Successfully!"); // Display success message
            console.log("Response Data:", data);
        } catch (err) {
            setError("Failed to verify OTP. Please try again."); // Display error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full text-purple'>
                <MenuFour props="bg-transparent" />
                <Breadcrumb heading='Login' subHeading='Login' />
            </div>
            <div className="login-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r p-5 border-line bg-[#f6efff]">
                            <div className="heading4">Login</div>
                            <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
                                <div className="email">
                                    <input 
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="username"
                                        type="number"
                                        placeholder="Enter Registered Number *"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)} // Update phoneNo
                                        required 
                                    />
                                </div>
                                <div className="pass mt-5">
                                    <input 
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="password"
                                        type="password"
                                        placeholder="OTP *"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)} // Update OTP
                                        required 
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-5">
                                    <div className='flex items-center'>
                                        <div className="block-input">
                                            <input type="checkbox" name='remember' id='remember' />
                                            <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                        </div>
                                        <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
                                    </div>
                                    <Link href={'/forgot-password'} className='font-semibold hover:underline'>Forgot Your Password?</Link>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main" disabled={loading}>
                                        {loading ? "Verifying..." : "Login"}
                                    </button>
                                </div>
                                {error && <p className="text-red-500 mt-3">{error}</p>}
                                {success && <p className="text-green-500 mt-3">{success}</p>}
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">New Customer</div>
                                <div className="mt-2 text-secondary">
                                    Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/register'} className="button-main">Register</Link>
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

export default Login;

