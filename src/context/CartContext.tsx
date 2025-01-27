'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
    useMemo,
} from 'react';
import { getCartListData, getProductListData } from '@/api/productApis/getPostApi';
import useCartStore from '@/globalStore/useCartStore';

// Define the type for a product item
interface ProductItem {
    PK: string;
    SK: string;
    img: string;
    name: string;
    imageURLs: ImageURL[];
}

// Define the type for a cart item
interface CartItem {
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

interface Color {
    name: string; // Color name (e.g., "Purply Blue")
    clrCode: string; // Color code in hex format (e.g., "#9e93d7")
}

// Define the structure of each imageURL item
interface ImageURL {
    color: Color; // Color details for the image
    img: string; // Image URL
}

// Define the merged cart item type
interface MergedCartItem extends CartItem {
    qty: number;
    totalAmount: number;
    image?: string;
    imageUrl?: ImageURL[];
}

// Define the type for the context value
interface CartContextValue {
    cartData: CartItem[] | undefined;
    fetchCartData: () => Promise<void>;
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
    const { setCart } = useCartStore();

    const fetchCartData = useCallback(async () => {
        try {
            const response = await getCartListData({});
            const cartItems: CartItem[] = response?.data?.items || [];
            setCartData(cartItems);

            const extractedProductIds = cartItems.map(item => item.productId.PK);
            setProductIds(extractedProductIds);

            // Fetch details for all products
            const productDetails = await Promise.all(
                cartItems.map(({ productId }) =>
                    getProductListData(productId.PK, productId.SK)
                )
            );

            const products = productDetails.map(response => response.data?.items || []).flat();
            setCartProducts(products);
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        }
    }, []);

    const mergedCartData = useMemo(() => {
        if (!cartData || cartProducts.length === 0) return [];

        return cartData.map(cartItem => {
            const product = cartProducts.find(
                product =>
                    product.PK === cartItem.productId.PK &&
                    product.SK === cartItem.productId.SK
            );
            const qty = cartItem.quantity || 1;
            const totalAmount = qty * cartItem.price;

            return {
                ...cartItem,
                qty,
                totalAmount,
                image: product?.img || 'placeholder-image-url', // Provide a fallback image
                name: product?.name || cartItem.name,           // Fallback to cartItem name
                imageUrl: product?.imageURLs || [],             // Provide fallback empty array
            };
        });
    }, [cartData, cartProducts]);

    useEffect(() => {
        if (mergedCartData.length > 0) {
            setCart(mergedCartData);
        }
    }, [mergedCartData, setCart]);

    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    // Provide the context value
    const contextValue: CartContextValue = {
        cartData,
        fetchCartData,
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
