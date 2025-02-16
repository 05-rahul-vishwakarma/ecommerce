import axios from 'axios';
import { getAuthHeaders, updateProfile } from '../baseApi'

export const updateProfileData = async (payload) => {
    try {
        const response = await axios.put(
            updateProfile,  
            payload,       
            {             
                headers: getAuthHeaders()
            }
        );
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Update failed');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error('Request setup error');
        }
    }
};