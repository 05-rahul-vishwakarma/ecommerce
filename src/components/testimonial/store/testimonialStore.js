import { create } from "zustand";


export const useTestimonialStore = create((Set, get) => ({
  customerName: '',
  customerImage: null, 
  rating: '',
  description: '',



  setCustomerName: (value) => Set({ customerName: value}),
  setCustomerImage: (value) => Set({ customerImage: value}),
  setRating: (value) => Set({ rating: value}),
  setDescription: (value) => Set({ description: value}),
}));
