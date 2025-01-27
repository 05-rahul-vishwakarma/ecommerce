'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCartListData, getProductListData } from '@/api/productApis/getPostApi';

// Define the type for a product item
interface ProductItem {
    PK: string;
    SK: string;
    img: string;
    name: string;
}

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
    productId: {
        PK: string;
        SK: string;
    };
}

// Define the merged cart item type
interface MergedCartItem extends CartItem {
    image?: string;
}

// Define the type for the context value
interface CartContextValue {
    cartData: CartItem[] | undefined;
    fetchCartData: () => Promise<void>;
    fetchProductDetails: (PK: string, SK: string) => Promise<void>;
    productIds: string[];
    cartProducts: ProductItem[];
    mergedCartData: MergedCartItem[];
}

// Create the context with a default value
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Define the type for the CartProvider props
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartData, setCartData] = useState<CartItem[] | undefined>(undefined);
    const [productIds, setProductIds] = useState<string[]>([]);
    const [cartProducts, setCartProducts] = useState<ProductItem[]>([]);
    const [mergedCartData, setMergedCartData] = useState<MergedCartItem[]>([]);

    const fetchCartData = async () => {
        try {
            const response = await getCartListData({});
            const cartItems: CartItem[] = response?.data?.items || [];
            setCartData(cartItems);

            const extractedProductIds = cartItems.map(item => item.productId.PK);
            setProductIds(extractedProductIds);

            // Fetch details for all products
            cartItems.forEach(({ productId }) => {
                if (productId.PK && productId.SK) {
                    fetchProductDetails(productId.PK, productId.SK);
                }
            });
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        }
    };

    const fetchProductDetails = async (PK: string, SK: string) => {
        try {
            const response = await getProductListData(PK, SK);
            const productItems: ProductItem[] = response.data?.items || [];
            setCartProducts(prev => [...prev, ...productItems]);
        } catch (error) {
            console.error('Failed to fetch product details:', error);
        }
    };

    // Merge cartData and cartProducts based on productId (PK and SK)
    useEffect(() => {
        if (cartData && cartProducts.length > 0) {
            const mergedData: MergedCartItem[] = cartData.map(cartItem => {
                const product = cartProducts.find(
                    product =>
                        product.PK === cartItem.productId.PK &&
                        product.SK === cartItem.productId.SK
                );
                return {
                    ...cartItem,
                    image: product?.img || 'placeholder-image-url', // Provide a fallback image
                    name: product?.name || 'Unknown Product',       // Provide a fallback name
                };
            });
            setMergedCartData(mergedData);
        }
    }, [cartData, cartProducts]);
    

    useEffect(() => {
        fetchCartData();
    }, []);

    // Provide the context value
    const contextValue: CartContextValue = {
        cartData,
        fetchCartData,
        fetchProductDetails,
        productIds,
        cartProducts,
        mergedCartData,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
