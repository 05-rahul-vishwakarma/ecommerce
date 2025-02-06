// useCartStore.js
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { dltCartProduct } from '@/api/productApis/deleteApi';

const useCartStore = create((set, get) => ({
  mergedCart: [], 
  previousCart: [],

  updateCartItemQuantity: (SK, newQuantity) => {
    if (newQuantity < 1) return; 
    set((state) => ({
      mergedCart: state.mergedCart.map((item) =>
        item.SK === SK ? { ...item, qty: newQuantity } : item
      ),
    }));
  },

  increaseCartItemQuantity: (SK) => {
    console.log('yes working');
    set((state) => ({
      mergedCart: state.mergedCart.map((item) =>
        item.SK === SK ? { ...item, qty: item.qty + 1 } : item
      ),
    }));
  },

  decreaseCartItemQuantity: (SK) => {
    console.log('yes working');
    set((state) => ({
      mergedCart: state.mergedCart.map((item) =>
        item.SK === SK ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      ),
    }));
  },

  setCart: (newCartData) => set({ mergedCart: newCartData }),

  addToCart: (newItem) =>
    set((state) => {
      const exists = state.mergedCart.some((item) => item.SK === newItem.SK);
      if (exists) {
        return {
          mergedCart: state.mergedCart.map((item) =>
            item.SK === newItem.SK ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      } else {
        return {
          mergedCart: [...state.mergedCart, newItem],
        };
      }
    }),

  removeProductFromCart: async (PK, SK) => {
    set((state) => {
      const previousCart = state.mergedCart; // Save previous state
      const updatedCart = state.mergedCart.filter(
        (item) => item.PK !== PK || item.SK !== SK
      );
      return { mergedCart: updatedCart, previousCart };
    });

    try {
      await dltCartProduct(PK, SK);
    } catch (error) {
      toast.error(error?.message);
      set((state) => ({ mergedCart: state.previousCart }));
    } finally {
      set(() => ({ previousCart: [] }));
    }
  },
}));

export default useCartStore;
