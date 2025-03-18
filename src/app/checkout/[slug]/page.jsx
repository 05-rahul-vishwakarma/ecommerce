"use client";

import React, { useState, useEffect } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import PersonalForm from "@/components/Form/PersonalForm";
import PaymentBarTwo from "../../../components/Checkout/PaymentBar2";

const CheckoutContent = ({ params }) => {
    // Unwrap the params object using React.use()
    const unwrappedParams = React.use(params);
    const { slug: cartId } = unwrappedParams; // Access the dynamic route parameter (cartId)

    const [cartData, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (cartId) {
            const data = sessionStorage.getItem(cartId);
            if (data) {
                setCartData(JSON.parse(data));
            } else {
                console.error("Cart data not found in sessionStorage");
            }
            setIsLoading(false);
        }
    }, [cartId]);

    // Handle loading state
    if (isLoading) {
        return <div>Loading cart data...</div>;
    }

    // Handle case where cart data is not found
    if (!cartData || cartData.length === 0) {
        return <div>No items in the cart.</div>;
    }

    return (
        <>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex flex-col md:flex-row justify-between gap-5">
                        <div className="left md:w-1/2 w-full">
                            <div className="form-login-block mt-3 bg-[#f6efff]">
                                <form className="p-5 border border-line rounded-lg">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="email">
                                            <input
                                                className="border-line px-4 py-3 w-full rounded-lg"
                                                id="username"
                                                type="email"
                                                placeholder="Username or email"
                                                required
                                            />
                                        </div>
                                        <div className="pass">
                                            <input
                                                className="border-line px-4 py-3 w-full rounded-lg"
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="block-button mt-3">
                                        <button className="button-main button-blue-hover w-full">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <PersonalForm />
                        </div>
                        {cartData && <PaymentBarTwo cartData={cartData} />}
                    </div>
                </div>
            </div>
        </>
    );
};

const Page = ({ params }) => {
    return (
        <>
            <TopNavOne
                props="style-one bg-white"
                slogan="New customers save 10% with the code GET10"
            />
            <div id="header" className="relative w-full text-secondary">
                <MenuFour props="bg-transparent" />
                <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
            </div>
            <CheckoutContent params={params} />
            <Footer />
        </>
    );
};

export default Page;