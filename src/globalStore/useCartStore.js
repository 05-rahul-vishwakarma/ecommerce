// useCartStore.js
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { dltCartProduct } from '@/api/productApis/deleteApi';

const useCartStore = create((set) => ({
    mergedCart: [], // Initially empty, will be populated dynamically

    updateCartItemQuantity: (SK, newQuantity) =>
        set((state) => ({
            mergedCart: state.mergedCart.map((item) =>
                item.SK === SK ? { ...item, qty: newQuantity } : item
            ),
        })
        ),

    updateCartItemColor: (SK, newColor) =>
        set((state) => ({
            mergedCart: state.mergedCart.map((item) =>
                item.SK === SK ? { ...item, selectedColor: newColor } : item
            ),
        })),

    setCart: (newCartData) => set({ mergedCart: newCartData }), // Function to set dynamic data

    addToCart: (newItem) =>
        set((state) => {
            const exists = state.mergedCart.some((item) => item.SK === newItem.SK);
            return {
                mergedCart: exists
                    ? state.mergedCart.map((item) =>
                        item.SK === newItem.SK ? { ...item, qty: item.qty + 1 } : item
                    )
                    : [...state.mergedCart, newItem],
            };
        }),

    removeProductFromCart: async (PK, SK) => {
        set((state) => {
            const previousCart = state.mergedCart; // Save previous state
            const updatedCart = state.mergedCart.filter((item) => item.PK !== PK || item.SK !== SK);
            return { mergedCart: updatedCart, previousCart }; // Store previous cart
        });

        try {
            await dltCartProduct(PK, SK);
        } catch (error) {
            toast.error(error?.message);
            set((state) => ({ mergedCart: state.previousCart }));
        } finally {
            set(() => ({ previousCart: null }));
        }
    },

}));

export default useCartStore;