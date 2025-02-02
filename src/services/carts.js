import { addCart } from '@/api/productApis/postApi';
import useCartStore from "@/globalStore/useCartStore";
import { toast } from 'react-toastify';
import { getCartListData, getProductListData } from '@/api/productApis/getPostApi';

async function cart(product, itemQty , openModalCart) {
    const payload = {
        businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
        productId: {
            PK: product?.PK,
            SK: product?.SK
        },
        qty: itemQty || 1,
        totalAmount: product?.price,
    };

    try {
        const response = await addCart(payload);
        const productDetails = await getProductListData({
            businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
            PK: response?.data?.data?.productId?.PK,
            SK: response?.data?.data?.productId?.SK,
        });

        const mergedData = {
            ...response?.data?.data,
            productDetails: productDetails?.data?.items, // Assuming the product details are in `data`
        };

        useCartStore.getState().addToCart(mergedData);
        openModalCart();
    } catch (error) {
        toast.error(error?.message);
    }
}

export const handleAddToCart = (product, openModalCart, itemQty) => {
    cart(product, itemQty,openModalCart);
};

export const fetchAndMergeCartData = async () => {
    try {
        const cartResponse = await getCartListData();
        const cartItems = cartResponse?.data?.items || [];
        console.log(cartItems, 'cartItems');

        const mergedCart = await Promise.all(
            cartItems.map(async (item) => {
                const productDetails = await getProductListData(item?.productId?.PK, item?.productId?.SK);
                return {
                    ...item,
                    productDetails: productDetails?.data, // Assuming the product details are in `data`
                };
            })
        );
        useCartStore.getState().setCart(mergedCart);
    } catch (error) {
        console.error('Failed to fetch and merge cart data:', error);
    }
};