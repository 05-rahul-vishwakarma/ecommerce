import { create } from 'zustand';
import axios from 'axios';

interface Product {
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

interface ProductStore {
    products: Product[];
    productDetails: ProductDetail[];
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    productDetails: [],
    fetchProducts: async () => {
        try {
            const response = await axios.post<{ data: { items: Product[] } }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=100`
            );

            const uniqueData = new Set<string>();

            const allUniqueData: ProductDetail[] = [];

            response?.data?.data?.items?.forEach((data: Product) => {
                const { category, productType, price, brand } = data;

                const uniqueKey = productType;

                if (!uniqueData.has(uniqueKey)) {
                    uniqueData.add(uniqueKey);
                    allUniqueData.push({
                        category: category?.name,
                        productType,
                        price,
                        brand: brand?.name,
                    });
                }
            });

            set({
                productDetails: allUniqueData,
                products: response?.data?.data?.items || [],
            });
        } catch (error) {
            console.error("Error on Fetching Products", error);
        }
    },
}));
