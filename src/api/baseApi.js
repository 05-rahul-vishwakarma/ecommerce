import Cookies from "js-cookie"; // Install js-cookie: npm install js-cookie

export const getAuthHeaders = () => {
    const accessToken = Cookies.get('accessToken');
    return {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };
};

export const accesstToken = Cookies.get('accessToken');

export const sendOtp = `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`;


export const productList = `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}?limit=12`;
export const getFilteredProductList = (data) => `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&category.id=${encodeURIComponent(data)}`;
export const getProductList = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;
export const getProductListBySK = (SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&SK=${encodeURIComponent(SK)}`;

export const getProductListByCategory = (categoryId) => `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&category.id=${encodeURIComponent(categoryId)}`;


export const addWishList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist`;
export const getWishList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`;
export const deleteWishListProduct = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/wishlist/delete?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;

export const addToCart = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart`;
export const getCartList = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`
export const deleteCartProduct = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/cart/delete?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;

export const getProfile = `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`;
export const updateProfile = `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`;

export const buyProduct = `${process.env.NEXT_PUBLIC_BASE_URL}/product/puchased`;
export const getBuyProduct = `${process.env.NEXT_PUBLIC_BASE_URL}/product/puchased/get?businessType=SUBHI_E_LTD`;

export const reviewProduct = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/review`;
export const getReviewProduct = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/review/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`;

export const getBlogList = `${process.env.NEXT_PUBLIC_BASE_URL}/meta-content/blog/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`;
export const getBlogListByPkSk = (PK, SK) => `${process.env.NEXT_PUBLIC_BASE_URL}/meta-content/blog/get?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`;

export const category = `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/category/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=100`