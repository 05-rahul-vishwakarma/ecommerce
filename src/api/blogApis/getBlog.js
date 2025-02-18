import axios from 'axios';
import { getAuthHeaders, getBlogList, getBlogListByPkSk } from '../baseApi'

export const blogListData = async () => {
    try {
        const response = await axios.post(getBlogList, {}, {
            headers: {
                "Cache-Control": "no-cache",  
                "Pragma": "no-cache"
            }
        });
        return response?.data?.data?.items;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
};

export const blogListDataByPkSk = async (PK, SK) => {
    try {
        const url = getBlogListByPkSk(PK, SK);
        const response = await axios.post(url, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching product list data:', error);
        throw error;
    }
};
