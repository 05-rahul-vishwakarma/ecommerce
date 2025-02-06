import axios from 'axios';
import { buyProduct, getAuthHeaders, getBuyProduct } from '../baseApi'

export const purchaseProduct = async (payload) => {
    try {
        const response = await axios.post(buyProduct, payload, {
            headers: getAuthHeaders()
        })
        return response;
    } catch (error) {
        return error;
    }
}

export const getPurchasedProduct = async () => {
    try {
        const response = await axios.post(getBuyProduct, {}, {
            headers: getAuthHeaders()
        })
        return response?.data?.data?.items;
    } catch (error) {
        return error;
    }
}
