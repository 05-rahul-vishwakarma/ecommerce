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
    lastEvaluatedKey: string | null; // Add lastEvaluatedKey
}


export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    productDetails: [],
    filteredProducts: [],
    lastEvaluatedKey:null,

    fetchProducts: async (lastKey: string | null = null) => {
        try {
            const response = await axios.post<{ 
                data: { 
                    items: Product[]; 
                    lastEvaluatedKey: string | null; 
                    count: number; 
                    scannedCount: number 
                } 
            }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}${
                    lastKey ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(lastKey))}` : ''
                }`
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
                lastEvaluatedKey: response?.data?.data?.lastEvaluatedKey || null,
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




// import { create } from 'zustand';
// import axios from 'axios';
// import { productListDataByFilter } from '@/api/productApis/getPostApi';


// interface Product {
//     productDetails: any;
//     SK: string;
//     category: { name: string };
//     productType: string;
//     price: number;
//     ProductType: string;
//     brand: { name: string };
//     name: string;
//     featured: boolean;
//     discount: number;
//     quantity: number;
//     img: string;
//     imageURLs: {
//         img: string;
//         color: {
//             clrCode: string;
//             name: string;
//         };
//     }[];
// }

// interface ProductDetail {
//     category: string;
//     productType: string;
//     price: number;
//     brand: string;
// }

// interface ProductStore {
//     products: Product[];
//     productDetails: ProductDetail[];
//     filteredProducts: Product[];
//     lastEvaluatedKey: string | null; // Add lastEvaluatedKey
//     totalCount: number; // Add totalCount
//     fetchProducts: (lastKey?: string | null) => Promise<void>; // Update fetchProducts to accept lastKey
//     filteredProductsByFilter: (data: string, lastKey?: string | null) => Promise<void>; // Update filteredProductsByFilter to accept lastKey
// }


// export const useProductStore = create<ProductStore>((set, get) => ({
//     products: [],
//     productDetails: [],
//     filteredProducts: [],
//     lastEvaluatedKey: null,
//     totalCount: 0,


//     fetchProducts: async (lastKey: string | null = null) => {
//         try {
//             const response = await axios.post<{ 
//                 data: { 
//                     items: Product[]; 
//                     lastEvaluatedKey: string | null; 
//                     count: number; 
//                     scannedCount: number 
//                 } 
//             }>(
//                 `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}${
//                     lastKey ? `&lastEvaluatedKey=${encodeURIComponent(JSON.stringify(lastKey))}` : ''
//                 }`
//             );
            

//             const uniqueData = new Set<string>();
//             const allUniqueData: ProductDetail[] = [];

//             response?.data?.data?.items?.forEach((data: Product) => {
//                 const { category, productType, price, brand } = data;
//                 const uniqueKey = productType;

//                 if (!uniqueData.has(uniqueKey)) {
//                     uniqueData.add(uniqueKey);
//                     allUniqueData.push({
//                         category: category?.name,
//                         productType,
//                         price,
//                         brand: brand?.name,
//                     });
//                 }
//             });

//             set({
//                 products: response?.data?.data?.items || [],
                // lastEvaluatedKey: response?.data?.data?.lastEvaluatedKey || null,
//                 totalCount: response?.data?.data?.scannedCount || 0
//             });
//         } catch (error) {
//             console.error("Error on Fetching Products", error);
//         }
//     },

//     filteredProductsByFilter: async (filterData: string) => {
//         try {
//             if (filterData === "") {
//                 set({ filteredProducts: get().products }); // Reset to show all products
//                 return;
//             }

//             const response = await productListDataByFilter(filterData);
//             set({
//                 products: response?.data?.items || [],
//             });
//         } catch (error) {
//             console.error("Error on Fetching Filtered Products", error);
//         }
//     },

// }));
