'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCartListData, getProductListData } from '@/api/productApis/getPostApi';
import axios from 'axios';

// Define the type for a cart item
interface CartItem {
    totalAmount: ReactNode;
    id: string;
    name: string;
    price: number;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
    PK: string;
    SK: string;
    productId: string; // Product ID from API response
}

// Define the type for the context value
interface CartContextValue {
    cartData: CartItem[] | undefined;
    fetchCartData: () => Promise<void>;
    fetchProductDetails: (PK: string, SK: string) => Promise<void>;
    productIds: string[]; // New property for product IDs
    cartProducts: any[];
}

// Create the context with a default value
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Define the type for the CartProvider props
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartData, setCartData] = useState<CartItem[] | undefined>(undefined);
    const [productIds, setProductIds] = useState<string[]>([]); // Store product IDs separately
    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const fetchCartData = async () => {
        try {
            const response = await getCartListData({});
            setCartData(response?.data?.items);
            const extractedProductIds = response?.data?.items?.map((item: CartItem) => item.productId);
            setProductIds(extractedProductIds);
            extractedProductIds?.map((data: any) => {
                console.log(data?.PK);
                fetchProductDetails(data?.PK, data?.SK)
            })
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        }
    };

    const fetchProductDetails = async (PK: string, SK: string) => {
        try {
            console.log('yes working');
            const response = await getProductListData(PK, SK)
            setCartProducts(response.data?.items)
        } catch (error) {
            console.error('Failed to fetch product details:', error);
            throw error; // Re-throw the error for handling in the calling function
        }
    };

   

    useEffect(() => {
        fetchCartData();
    }, []);

    // Provide the context value
    const contextValue: CartContextValue = {
        cartData,
        fetchCartData,
        fetchProductDetails,
        productIds, // Expose product IDs in context
        cartProducts
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
