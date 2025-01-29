'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { ProductType } from '@/type/ProductType';
import { getWishListData } from '@/api/productApis/getPostApi';
import { dltWishListProduct } from '@/api/productApis/deleteApi';
import { addWishListProduct } from '@/api/productApis/postApi';

interface WishlistItem extends ProductType {
    productId: string;
}

interface WishlistState {
    wishlistArray: WishlistItem[];
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: ProductType }
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
            if (state.wishlistArray.some(item => item.id === action.payload.id)) {
                return state; // Do not add duplicate items
            }
            return {
                ...state,
                wishlistArray: [...state.wishlistArray, {
                    ...action.payload,
                    productId: ''
                }],
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
            dispatchActual({ type: 'LOAD_WISHLIST', payload: result.data.items });
            dispatchOptimistic({ type: 'LOAD_WISHLIST', payload: result.data.items }); // Sync optimistic state
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
                SK: item?.SK
            }
        };
        try {
            const data = await addWishListProduct(payload);
            dispatchActual({ type: 'ADD_TO_WISHLIST', payload: data });
        } catch (error) {
            console.error('Failed to add item to wishlist:', error);
            fetchWishlistData();
        }
    };

    const removeFromWishlist = async (pk: string, sk: string) => {
        // Optimistically update the UI
        dispatchOptimistic({ type: 'REMOVE_FROM_WISHLIST', payload: { pk, sk } });

        try {
            // Perform the API call
            await dltWishListProduct(pk, sk);
            // Sync the actual state with the server
            dispatchActual({ type: 'REMOVE_FROM_WISHLIST', payload: { pk, sk } });
        } catch (error) {
            console.error('Failed to remove item from wishlist:', error);
            // Revert the optimistic state if the API call fails
            fetchWishlistData();
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