import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import image from '../../../public/images/collection/swimwear.png'
import Link from 'next/link'

const Collection = async () => {
    let data = []

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=4&parent=round`)
        data = response?.data?.data?.items || []
    } catch (error) {
        console.error("Failed to fetch products:", error)
    }

    if (data.length === 0) {
        return <div className="text-center mt-10 text-gray-500 text-xl">No items available</div>
    }

    return (
        <div className="list-collection grid lg:grid-cols-4 grid-cols-2 gap-8 md:mt-20 mt-20 px-20">
            {data.map((product: any, index: number) => (
                <div
                    key={index}
                    className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer"
                >
                    <div className="bg-img">
                        <Image
                            src={product.img || image}
                            width={1000}
                            height={600}
                            alt={product.name || "Product Image"}
                        />
                    </div>
                    <Link href={`/product/${product?.slug}`} className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2 rounded-xl duration-500 bg-custom-purple-color hover:bg-purple text-white">
                        {product.title || "Product Title"}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Collection
