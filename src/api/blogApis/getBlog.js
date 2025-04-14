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

export async function blogListDataByPkSk(id, id2) {
    try {
        const response = await fetch(`/api/blog?id=${id}&id2=${id2}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return null;
    }
}
