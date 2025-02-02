import axios from "axios";
import { getWishList, getAuthHeaders, getCartList, getProductList } from '@/api/baseApi'


export const getProductListData = async (PK, SK) => {
    const payload = {

    }
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






