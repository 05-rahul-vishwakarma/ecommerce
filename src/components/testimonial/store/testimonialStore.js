import { create } from "zustand";


export const useTestimonialStore = create((Set, get) => ({
  customerName: 'Light Yagami',
  customerImage: "monika", 
  rating: '4',
  setDate: (newDate) => Set({ date: newDate }),
  description: 'Absolutely Stunning Ribbons',



  setCustomerName: (value) => Set({ customerName: value}),
  setCustomerImage: (value) => Set({ customerImage: value}),
  setRating: (value) => Set({ rating: value}),
  // setDate: (value) => Set({ date: value}),
  setDescription: (value) => Set({ description: value}),
}));
