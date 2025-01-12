import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import image from '../../../public/images/collection/swimwear.png'

const Collection = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=4`)
    const data = response?.data?.data?.items;
    return (
        <>
            <div className="collection-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading text-center">
                        <div className="heading3 text-center">Explore Collections</div>
                        <div className="heading6 text-center md:mt-2 mt-2">Discover Our Stunning Ribbon Collections</div>
                        <div className="heading6 font-normal normal-case text-secondary md:mt-4 mt-2">Perfect for every occasion – From elegant gifts to creative crafts, our ribbons bring beauty and quality to your projects at affordable prices!</div>
                    </div>

                    <div className="list-collection grid lg:grid-cols-4 grid-cols-2 gap-8 md:mt-10 mt-6">

                        {
                            data?.map((data: any, i: any) => {
                                return (
                                    <Link key={i} href={'/shop/breadcrumb1'}>
                                        <div className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer" >
                                            <div className="bg-img">
                                                <Image
                                                    src={data?.img || image}
                                                    width={1000}
                                                    height={600}
                                                    alt='Traditional Ribbon'
                                                />
                                            </div>
                                            <div className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2 bg-custom-purple-color rounded-xl duration-500  text-white"> {data?.name} </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection