import axios from "axios";
import { getWishList, getAuthHeaders, getCartList, getProductList, getProductListBySK, productList, getFilteredProductList, getReviewProduct, category } from '@/api/baseApi'
import { getServerAuthHeaders } from '@/api/server';

export const productListData = async () => {
    try {
        const response = await axios.post(productList, {}, {
            headers: getServerAuthHeaders(),
        });
        return response?.data?.data?.items;
    } catch (error) {
        return error;
    }
}

export const productListDataByFilter = async (data) => {
    try {
        const url = getFilteredProductList(data);
        const response = await axios.post(url, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching product list data:', error);
        throw error;
    }
}

export const getProductListData = async (PK, SK) => {
    try {
        const url = getProductList(PK, SK);
        const response = await axios.post(url, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching product list data:', error);
        throw error; // Re-throw the error for handling
    }
};

export const getProductListBySKData = async (SK) => {
    const payload = {

    }
    try {
        const url = getProductListBySK(SK);
        const response = await axios.post(url, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching product list data:', error);
        throw error; // Re-throw the error for handling
    }
}

export const getWishListData = async (payload) => {
    try {
        const response = await axios.post(getWishList, payload, {
            headers: getAuthHeaders()
        })
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const getCartListData = async (payload) => {
    try {
        const response = await axios.post(getCartList, payload, {
            headers: getAuthHeaders()
        })
        return response?.data;
    } catch (error) {
        return error?.response?.data || { message: "Something went wrong" };
    }
}

export const getReviewProductData = async (payload) => {
    try {
        const response = await axios.post(getReviewProduct, payload, {
            headers: getAuthHeaders()
        })
        return response?.data?.data?.items;
    } catch (error) {
        return error;
    }
}

export const productCategory = async () => {
    try {
        const response = await axios.post(category, {
            keys: [
                "name"
            ]
        }, {
            headers: getServerAuthHeaders()
        })
        return response?.data?.data?.items;
    } catch (error) {
        return error;
    }
}



