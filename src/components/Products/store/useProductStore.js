import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
    productName: '',
    productTitle: '',
    unit: '',
    productPrice: '',
    productDiscount: '',
    quantity: '',
    productBrand: '',
    productCategory: '',
    status: 'in-stock',
    description: '',
    screenSize: '',
    colors: { name: '', code: '' }, // Store the color name and code
    screenResolution: '',
    maxResolution: '',
    processor: '',
    graphics: '',
    wirelessType: '',
    tags: '',
    sellCount: '',
    isFeatured: false,
    productImage: null, // Store the product image URL or file
    imageURLs: [ // Store the default color-image mappings
        {
            color: { name: "Purply Blue", clrCode: "#C1BAE4" },
            img: "https://i.ibb.co/WVdTgR8/headphone-1.png",
        },
        {
            color: { name: "Light Grey", clrCode: "#D8D7DD" },
            img: "https://i.ibb.co/zh9x3Q0/headphone-2.png",
        },
        {
            color: { name: "Baby Pink", clrCode: "#F3C0D1" },
            img: "https://i.ibb.co/JBZk7sS/headphone-3.png",
        },
        {
            color: { name: "Bluish Cyan", clrCode: "#64BFD1" },
            img: "https://i.ibb.co/SrPq3r0/headphone-4.png",
        },
    ],
    productType: '',
    setProductType: (value) => set({ productType: value }),
    setProductName: (value) => set({ productName: value }),
    setProductTitle: (value) => set({ productTitle: value }),
    setUnit: (value) => set({ unit: value }),
    setProductPrice: (value) => set({ productPrice: value }),
    setProductDiscount: (value) => set({ productDiscount: value }),
    setQuantity: (value) => set({ quantity: value }),
    setProductBrand: (value) => set({ productBrand: value }),
    setProductCategory: (value) => set({ productCategory: value }),
    setStatus: (value) => set({ status: value }),
    setDescription: (value) => set({ description: value }),
    setScreenSize: (value) => set({ screenSize: value }),
    setColors: (value) => set({ colors: value }), // Setter for color
    setScreenResolution: (value) => set({ screenResolution: value }),
    setMaxResolution: (value) => set({ maxResolution: value }),
    setProcessor: (value) => set({ processor: value }),
    setGraphics: (value) => set({ graphics: value }),
    setWirelessType: (value) => set({ wirelessType: value }),
    setTags: (value) => set({ tags: value }),
    setSellCount: (value) => set({ sellCount: value }),
    setIsFeatured: (value) => set({ isFeatured: value }),
    setProductImage: (value) => set({ productImage: value }), // Setter for product image
    setImageURLs: (value) => set({ imageURLs: value }), // Setter for image URLs array

}));
