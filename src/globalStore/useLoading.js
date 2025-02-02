import { create } from 'zustand';

const useLoadingStore = create((set) => ({
    loading: true, 
    setLoading: (state) => set({ loading: state }),
}));