// useCartStore.js
import { create } from 'zustand';


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
}));

export default useCartStore;