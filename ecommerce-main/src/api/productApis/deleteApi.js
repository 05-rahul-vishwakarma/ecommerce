import axios from 'axios';
import { getAuthHeaders, deleteCartProduct, deleteWishListProduct } from '../baseApi';

export const dltCartProduct = async (PK, SK) => {
    try {
        const url = deleteCartProduct(PK, SK);
        const response = await axios.delete(url, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Delete Cart Product Error:", error);
        throw error;
    }
};


export const dltWishListProduct = async (PK, SK) => {
    try {
        const url = deleteWishListProduct(PK, SK);
        const response = await axios.delete(url, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Delete Cart Product Error:", error);
        throw error;
    }
};

