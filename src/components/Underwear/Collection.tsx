'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


const Collection = () => {
    const router = useRouter()

    const handleTypeClick = (type: string) => {
        router.push(`/shop/breadcrumb1?type=${type}`);
    };

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
                        <div className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer" onClick={() => handleTypeClick('swimwear')}>
                            <div className="bg-img">
                                <Image
                                    src={'/blog6.jpg'}
                                    width={1000}
                                    height={600}
                                    alt='Silk Ribon'
                                />
                            </div>
                            <div className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2  rounded-xl duration-500 bg-custom-purple-color  hover:bg-purple text-white">Silk Ribbon</div>
                        </div>
                        <div className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer" onClick={() => handleTypeClick('underwear')}>
                            <div className="bg-img">
                                <Image
                                    src={'/blog5.jpg'}
                                    width={1000}
                                    height={600}
                                    alt='Traditional Ribbon'
                                />
                            </div>
                            <div className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2 bg-custom-purple-color rounded-xl duration-500  text-white">Traditional Ribbon</div>
                        </div>
                        <div className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer" onClick={() => handleTypeClick('swimwear')}>
                            <div className="bg-img">
                                <Image
                                    src={'/6mmSingleSatinIndianQualityOliveGreenColor .jpg'}
                                    width={1000}
                                    height={600}
                                    alt='Golden Ribbon'
                                />
                            </div>
                            <div className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2 bg-custom-purple-color rounded-xl duration-500 text-white">Golden Ribbon</div>
                        </div>
                        <div className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer" onClick={() => handleTypeClick('underwear')}>
                            <div className="bg-img">
                                <Image
                                    src={'/18mm Orgnza Ribon Red Color.jpg'}
                                    width={1000}
                                    height={600}
                                    alt='custom Ribbon'
                                />
                            </div>
                            <div className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2 bg-custom-purple-color rounded-xl duration-500 text-white">Custom Ribbon</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection