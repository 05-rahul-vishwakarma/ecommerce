import { getCardListData } from '@/api/productApis/getPostApi';
import { create } from 'zustand';


const useCartStore = create((set) => ({
    cartData: [],

    fetchCartData: async () => {
        try {
            const response = await getCardListData({});
            console.log(response, 'response');
            set({ cartData: response?.data?.items })
        } catch (error) {
            console.log(error);
        }
    },
}));

export default useCartStore;