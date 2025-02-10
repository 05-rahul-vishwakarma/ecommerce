import axios from "axios";
import { getWishList, getAuthHeaders, getCartList, getProductList, getProductListBySK, productList, getFilteredProductList } from '@/api/baseApi'

export const productListData = async () => {
    try {
        const response = await axios.post(productList, {}, {
            headers: getAuthHeaders(),
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
        return error;
    }
}






