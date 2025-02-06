import axios from "axios";
import { addToCart, addWishList, getAuthHeaders, reviewProduct, } from "../baseApi";

export const addWishListProduct = async (payload) => {
    try {
        const response = await axios.post(addWishList, payload, {
            headers: getAuthHeaders()
        })
        return response?.data?.data;
    } catch (error) {
        return error;
    }
}

export const addCart = async (payload) => {
    try {
        const response = await axios.post(addToCart, payload, {
            headers: getAuthHeaders()
        })
        return response;
    } catch (error) {
        return error;
    }
}

export const reviewProd = async (payload) => {
    try {
        const response = await axios.post(reviewProduct, payload, {
            headers: getAuthHeaders()
        })
        return response;
    } catch (error) {
        return error;
    }
}




