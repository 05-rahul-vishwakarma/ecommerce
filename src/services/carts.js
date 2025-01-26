
import Cookies from "js-cookie";
import { toast } from 'react-toastify'
import { addCart } from '@/api/productApis/postApi';

function cart(product) {
    const payload = {
        businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
        productId: {
            PK: product?.PK,
            SK: product?.SK
        },
        qty: 1,
        totalAmount: product?.price
    }
    try {
        addCart(payload)
    } catch (error) {
        toast.error(error?.message);
    }
}

export const handleAddToCart = (product, openModalCart) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
        toast.error("Please log in to add items to the cart.");
        router.push("/login"); // Redirect to login page
        return;
    }
    cart(product);
    openModalCart()
};
