import { create } from "zustand";


export const useTestimonialStore = create((Set, get) => ({
  customerName: '',
  customerImage: "monika", 
  ratings: '',
  date: null,
  setDate: (newDate) => Set({ date: newDate }),
  description: '',



  setCustomerName: (value) => Set({ customerName: value}),
  setCustomerImage: (value) => Set({ customerImage: value}),
  setRatings: (value) => Set({ ratings: value}),
  setDate: (value) => Set({ date: value}),
  setDescription: (value) => Set({ description: value}),
}));
