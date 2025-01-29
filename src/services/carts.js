
import Cookies from "js-cookie";
import { toast } from 'react-toastify'
import { addCart } from '@/api/productApis/postApi';
import useCartStore from "@/globalStore/useCartStore";

async function cart(product,itemQty) {
    console.log(itemQty);
    
    const payload = {
        businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
        productId: {
            PK: product?.PK,
            SK: product?.SK
        },
        qty: itemQty || 1,
        totalAmount: product?.price,
        name: product?.name,
        sku: product?.sku,
        img: product?.img
    }
    try {
        const response = await addCart(payload);
        useCartStore.getState().addToCart(response?.data?.data); // Update mergedCart in Zustand
    } catch (error) {
        toast.error(error?.message);
    }
}

export const handleAddToCart = (product, openModalCart , itemQty) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
        toast.error("Please log in to add items to the cart.");
        router.push("/login"); // Redirect to login page
        return;
    }
    cart(product,itemQty);
    openModalCart()
};
