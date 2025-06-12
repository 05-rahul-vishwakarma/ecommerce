import { toast } from 'react-toastify';
import { addWishListProduct } from '@/api/productApis/postApi';
import { useWishlist } from '@/context/WishlistContext'; // Import the context

const addWishList = async (product, addToWishlist) => {
    const payload = {
        businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
        productId: {
            PK: product?.PK,
            SK: product?.SK
        }
    };

    try {
        // Optimistically update the UI
        addToWishlist(product);

        // Call the API
        const response = await addWishListProduct(payload);

        // Show success message
        toast.success('Successfully added to wishlist');
    } catch (error) {
        console.error(error);
        toast.error('Failed to add to wishlist');
    }
};

export const handleAddToWishlist = (product, openModalWishlist, addToWishlist) => {
    addWishList(product, addToWishlist);
    openModalWishlist(product);
};