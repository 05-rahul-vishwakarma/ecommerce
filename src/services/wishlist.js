
import { toast } from 'react-toastify'
import { addWishListProduct } from '@/api/productApis/postApi';


const addWishList = async (product) => {
    const payload = {
        businessType: process.env.NEXT_PUBLIC_BUSINESS_NAME,
        productId: {
            PK: product?.PK,
            SK: product?.SK
        }
    }
    try {
        addWishListProduct(payload);
        toast.success('successfully listed')
    } catch (error) {
        console.log(error);

    }
};

export const handleAddToWishlist = (product, openModalWishlist) => {
    addWishList(product)
    openModalWishlist(product);
};
