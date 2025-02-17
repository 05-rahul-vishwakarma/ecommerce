"use client";
import React, { useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuFour from "@/components/Header/MenuFour";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const otpSend = async () => {
    const payload = {
      phoneNo: phoneNo,
      businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    const payload = {
      phoneNo: phoneNo,
      otp: otp,
      businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/verifyOtp`,
        payload
      );
      Cookies.set("accessToken", response?.data?.data?.accessToken, {
        expires: 1,
      }); 
      toast.success("User Loged In");
    } catch (error: unknown) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleSendOtp = (): void => {
    if (phoneNo.length === 10) {
      otpSend();
      toast.success("OTP sent successfully!");
      setOtpSent(true);
      setSuccess("OTP sent successfully!");
      setError(null);
    } else {
      setError("Please enter a valid 10-digit number.");
      setSuccess(null);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    setLoading(true);
    verifyOtp();
    setLoading(false);
    setSuccess("OTP verified successfully!");
    setPhoneNo("");
    setOtp("");
    router.push("/");
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-white"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full text-secondary">
        <MenuFour props="bg-transparent" />
        <Breadcrumb heading="Login" subHeading="Login" />
      </div>
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r p-5 border-line bg-[#f6efff]">
              <div className="heading4">Login</div>
              <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
                <div className="email">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      +91
                    </span>
                    <input
                      className="border-line px-4 pl-12 pt-3 pb-3 w-full rounded-lg"
                      id="number"
                      type="tel"
                      placeholder="Enter Registered Number *"
                      value={phoneNo}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 10); // Limit to 10 digits
                        if (/^\d*$/.test(value)) {
                          setPhoneNo(value);
                          setError(null);
                        } else {
                          setError("Only numbers are allowed.");
                          setSuccess(null);
                        }
                      }}
                      required
                    />
                  </div>
                  {phoneNo.length === 10 && !otpSent && (
                    <button
                      type="button"
                      className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 button-main bg-custom-purple-color "
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </button>
                  )}
                </div>
                {otpSent && (
                  <div className="pass mt-5">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="otp"
                      type="number"
                      placeholder="Enter OTP *"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center">
                    <div className="block-input">
                      <input type="checkbox" name="remember" id="remember" />
                      <Icon.CheckSquare
                        size={20}
                        weight="fill"
                        className="icon-checkbox"
                      />
                    </div>
                    <label htmlFor="remember" className="pl-2 cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <Link
                    href={"/forgot-password"}
                    className="font-semibold hover:underline"
                  >
                    Forgot Your Password?
                  </Link>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button
                    className="button-main"
                    disabled={loading || !otpSent}
                  >
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
                <div className="mt-2 text-secondary2">
                  Be part of our growing family of new customers! Join us today
                  and unlock a world of exclusive benefits, offers, and
                  personalized experiences.
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={"/register"} className="button-main">
                    Register
                  </Link>
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
