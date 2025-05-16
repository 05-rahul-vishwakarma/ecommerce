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
                "name",
                "PK",
                "SK"
            ]
        }, {
            headers: getServerAuthHeaders()
        })
        return response?.data?.data?.items;
    } catch (error) {
        return error;
    }
}

export const searchProducts = async (params) => {
    const { query = '', category = '', productType = '', minPrice = 0, maxPrice = 0, sort = '', page = 1, limit = 8 } = params;
    
    try {
        // Use the main product list endpoint instead of filtered endpoint
        const url = productList;
        
        // Create a payload structure that matches what the API expects
        const payload = {};
        
        // Add search parameters only if they are provided
        if (query && query.trim() !== '') {
            // Most APIs expect a 'search' or 'q' parameter for search
            payload.search = query.trim();
        }
        
        // Add category filter if provided
        if (category && category !== 'All') {
            payload.filters = payload.filters || {};
            payload.filters.category = category;
        }
        
        // Add product type filter if provided
        if (productType && productType !== 'All') {
            payload.filters = payload.filters || {};
            payload.filters.productType = productType;
        }
        
        // Add price range if min or max price is provided
        if (minPrice > 0 || maxPrice > 0) {
            payload.filters = payload.filters || {};
            payload.filters.price = {
                min: minPrice || 0,
                max: maxPrice || 999999 // A high number as default max
            };
        }
        
        // Add pagination parameters
        if (page > 0 && limit > 0) {
            payload.pagination = {
                page: page,
                limit: limit
            };
        }
        
        // Add sorting if provided
        if (sort) {
            payload.sort = sort;
        }
        
        // Make API request with proper headers
        const response = await axios.post(url, payload, {
            headers: getServerAuthHeaders(),
        });
        
        // Return the items array or an empty array if null
        return response?.data?.data?.items || [];
    } catch (error) {
        console.error('Error searching products:', error);
        // Return empty array on error rather than throwing
        return [];
    }
}



