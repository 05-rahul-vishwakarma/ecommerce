'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { ProductType } from '@/type/ProductType';
import { getWishListData } from '@/api/productApis/getPostApi';
import { dltWishListProduct } from '@/api/productApis/deleteApi';
import { addWishListProduct } from '@/api/productApis/postApi';
import { getProductListData } from '@/api/productApis/getPostApi'; // Import the function to fetch product details

interface WishlistItem extends ProductType {
    productId: {
        PK: string;
        SK: string;
    };
    productDetails?: ProductType[]; // Add product details to the wishlist item
}

interface WishlistState {
    wishlistArray: WishlistItem[];
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: { pk: string, sk: string } }
    | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

interface WishlistContextProps {
    wishlistState: WishlistState;
    addToWishlist: (item: ProductType) => void;
    removeFromWishlist: (pk: string, sk: string) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

const WishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            if (state.wishlistArray.some(item => item.PK === action.payload.PK && item.SK === action.payload.SK)) {
                return state; // Do not add duplicate items
            }
            return {
                ...state,
                wishlistArray: [...state.wishlistArray, action.payload],
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlistArray: state.wishlistArray.filter((item) => item.PK !== action.payload.pk || item.SK !== action.payload.sk),
            };
        case 'LOAD_WISHLIST':
            return {
                ...state,
                wishlistArray: action.payload,
            };
        default:
            return state;
    }
};

const useOptimistic = (initialState: WishlistState) => {
    const [state, setState] = useState(initialState);
    const [optimisticState, setOptimisticState] = useState(initialState);

    const dispatchOptimistic = (action: WishlistAction) => {
        // Update the optimistic state immediately
        setOptimisticState(prevState => WishlistReducer(prevState, action));
    };

    const dispatchActual = (action: WishlistAction) => {
        // Update the actual state after the API call
        setState(prevState => WishlistReducer(prevState, action));
    };

    return { state, optimisticState, dispatchOptimistic, dispatchActual };
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state, optimisticState, dispatchOptimistic, dispatchActual } = useOptimistic({ wishlistArray: [] });

    const fetchWishlistData = async () => {
        try {
            const result = await getWishListData({});
            const wishlistItems = result.data.items || [];

            const mergedWishlist = await Promise.all(
                wishlistItems.map(async (item: { productId: { PK: any; SK: any; }; }) => {

                    const productDetails = await getProductListData(item?.productId?.PK, item?.productId?.SK);
                    return {
                        ...item,
                        productDetails: productDetails?.data, // Assuming the product details are in `data`
                    };
                })
            );

            dispatchActual({ type: 'LOAD_WISHLIST', payload: mergedWishlist });
            dispatchOptimistic({ type: 'LOAD_WISHLIST', payload: mergedWishlist }); // Sync optimistic state
        } catch (error) {
            console.error('Failed to fetch wishlist data:', error);
        }
    };

    useEffect(() => {
        fetchWishlistData();
    }, []);

    const addToWishlist = async (item: ProductType) => {
        const payload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            productId: {
                PK: item?.PK,
                SK: item?.SK,
            },
        };

        try {
            const data = await addWishListProduct(payload);

            // Fetch product details for the newly added item
            const productDetails = await getProductListData({
                businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
                PK: data?.data?.productId?.PK,
                SK: data?.data?.productId?.SK,
            });

            const mergedData = {
                ...data?.data,
                productDetails: productDetails?.data?.items, // Merge product details
            };

            dispatchActual({ type: 'ADD_TO_WISHLIST', payload: mergedData });
        } catch (error) {
            console.error('Failed to add item to wishlist:', error);
            fetchWishlistData(); // Refresh the wishlist data on error
        }
    };

    const removeFromWishlist = async (pk: string, sk: string) => {
        dispatchOptimistic({ type: 'REMOVE_FROM_WISHLIST', payload: { pk, sk } });

        try {
            await dltWishListProduct(pk, sk);
            dispatchActual({ type: 'REMOVE_FROM_WISHLIST', payload: { pk, sk } });
        } catch (error) {
            console.error('Failed to remove item from wishlist:', error);
            fetchWishlistData(); // Refresh the wishlist data on error
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistState: optimisticState, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};