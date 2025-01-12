
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import image from '../../../public/images/collection/swimwear.png'

interface ProductType {
    img: string;
    name: string;
}

const Collection = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=4`)
    const data = response?.data?.data?.items;
    return (
        <div className="list-collection grid lg:grid-cols-4 grid-cols-2 gap-8 md:mt-10 mt-6">
            {data.map((product: any, index: any) => (
                <div
                    key={index}
                    className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer"
                >
                    <div className="bg-img">
                        <Image
                            src={product.img || image} // Fallback for missing image
                            width={1000}
                            height={600}
                            alt={product.name || "Product Image"} // Fallback for missing name
                        />
                    </div>
                    <div className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2 rounded-xl duration-500 bg-custom-purple-color hover:bg-purple text-white">
                        {product.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Collection;
