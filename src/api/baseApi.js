import Cookies from "js-cookie"; // Install js-cookie: npm install js-cookie

export const getAuthHeaders = () => {
    console.log('yes function calling');
    const accessToken = Cookies.get('accessToken'); // Access token from 
    console.log(accessToken, 'scce token');

    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

export const getProductList = `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`

export const addWishList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist`;
export const getWishList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`;
export const addToCart = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart`;
export const getCartList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`