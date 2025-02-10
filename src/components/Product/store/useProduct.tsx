import { create } from 'zustand';
import axios from 'axios';
import { productListDataByFilter } from '@/api/productApis/getPostApi';

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

interface ProductStore {
    products: Product[];
    productDetails: ProductDetail[];
    filteredProducts: Product[];
    fetchProducts: () => Promise<void>;
    filteredProductsByFilter: (data: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    productDetails: [],
    filteredProducts: [],

    fetchProducts: async () => {
        try {
            const response = await axios.post<{ data: { items: Product[] } }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=100`
            );

            console.log(response);

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

    filteredProductsByFilter: async (filterData: string) => {
        try {
            if (filterData === "") {
                set({ filteredProducts: get().products }); // Reset to show all products
                return;
            }

            const response = await productListDataByFilter(filterData);
            set({
                products: response?.data?.items || [],
            });
        } catch (error) {
            console.error("Error on Fetching Filtered Products", error);
        }
    },

}));
