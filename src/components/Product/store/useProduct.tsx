import { create } from 'zustand';
import axios from 'axios';
import { category as categoryApi, getProductListByCategory } from '@/api/baseApi';

interface Product {
    productDetails: any;
    SK: string;
    category: { name: string };
    productType: string;
    price: number;
    ProductType: string;
    brand: { name: string };
    name: string;
    featured: boolean;
    discount: number;
    quantity: number;
    img: string;
    imageURLs: {
        img: string;
        color: {
            clrCode: string;
            name: string;
        };
    }[];
}

interface ProductDetail {
    category: string;
    productType: string;
    price: number;
    brand: string;
}

interface Category {
    id: string;
    name: string;
}

interface ProductStore {
    products: Product[];
    productDetails: ProductDetail[];
    categories: Category[];
    lastEvaluatedKey: any;
    fetchProducts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    fetchProductsByCategory: (categoryId: string) => Promise<void>;
    fetchMoreProducts: (lastEvaluatedKey: any) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    productDetails: [],
    categories: [],
    lastEvaluatedKey:[],


    fetchProducts: async () => {
        try {
            const response = await axios.post<{
                data: {
                    items: Product[];
                    lastEvaluatedKey: string | null;
                    count: number;
                    scannedCount: number
                }
            }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=12`
            );


         
            set({
                products: response?.data?.data?.items || [],
                lastEvaluatedKey:response?.data?.data?.lastEvaluatedKey || ''
            });

        } catch (error) {
            console.error("Error on Fetching Products", error);
        }
    },

    fetchCategories: async () => {
        try {
            const response = await axios.post(categoryApi, {
                "keys": ["name", "PK", "SK"]
            });
            set({ categories: response?.data?.data?.items || [] });
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    },

    fetchProductsByCategory: async (categoryId: string) => {
        try {
            const url = getProductListByCategory(categoryId);
            const response = await axios.post(url);
            set({ products: response?.data?.data?.items || [] });
        } catch (error) {
            console.error('Error fetching products by category', error);
        }
    },

    fetchMoreProducts: async (lastEvaluatedKey: any) => {
        try {
            if (!lastEvaluatedKey || lastEvaluatedKey === 'null') return;

            const response = await axios.post<{
                data: {
                    items: Product[];
                    lastEvaluatedKey: string | null;
                    count: number;
                    scannedCount: number
                }
            }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=12&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(lastEvaluatedKey))}`
            );
            set((state: any) => ({
                products: [...state.products, ...(response?.data?.data?.items || [])],
                lastEvaluatedKey: response?.data?.data?.lastEvaluatedKey || ''
            }));
        } catch (error) {
            console.error('Error fetching more products', error);
        }
    },

}));


