'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ProductType } from '@/type/ProductType';
import { getWishListData } from '@/api/productApis/getPostApi';

interface WishlistItem extends ProductType { }

interface WishlistState {
    wishlistArray: WishlistItem[];
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: ProductType }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
    | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

interface WishlistContextProps {
    wishlistState: WishlistState;
    addToWishlist: (item: ProductType) => void;
    removeFromWishlist: (itemId: string) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

const WishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            if (state.wishlistArray.some(item => item.id === action.payload.id)) {
                return state; // Do not add duplicate items
            }
            return {
                ...state,
                wishlistArray: [...state.wishlistArray, { ...action.payload }],
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlistArray: state.wishlistArray.filter((item) => item.id !== action.payload),
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

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistState, dispatch] = useReducer(WishlistReducer, { wishlistArray: [] });

    const fetchWishlistData = async () => {
        try {
            const result = await getWishListData({});
            const items = result.data.items.map((item: any) => ({
                id: item?.productId?.SK, // Extract product ID
                name: item?.productId?.name || 'Unknown', // Add product name if available
                images: item?.productId?.images || [], // Ensure images are an array
                price: item?.productId?.price || 0, // Default price if not provided
                originPrice: item?.productId?.originPrice || 0, // Default origin price
            }));
            dispatch({ type: 'LOAD_WISHLIST', payload: items });
        } catch (error) {
            console.error('Failed to fetch wishlist data:', error);
        }
    };

    useEffect(() => {
        fetchWishlistData();
    }, []);

    const addToWishlist = (item: ProductType) => {
        dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
    };

    const removeFromWishlist = (itemId: string) => {
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: itemId });
    };

    return (
        <WishlistContext.Provider value={{ wishlistState, addToWishlist, removeFromWishlist }}>
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
