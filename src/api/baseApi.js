import Cookies from "js-cookie"; // Install js-cookie: npm install js-cookie

export const getAuthHeaders = () => {
    const accessToken = Cookies.get('accessToken'); // Access token from 
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

export const getProductList = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;

export const addWishList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist`;
export const getWishList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`;
export const deleteWishListProduct = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist/delete?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;

export const addToCart = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart`;
export const getCartList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`

export const deleteCartProduct = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist/delete?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;


export const updateProfile = `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`;
export const deleteCartProduct = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart/delete?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;


