'use client'
import React from 'react'
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
// import Benefit from '@/components/Home1/Benefit'
// import Newsletter from '@/components/Home4/Newsletter'
// import Instagram from '@/components/Home6/Instagram'
// import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'
import MenuFour from '@/components/Header/MenuFour';

const AboutUs = () => {
    return (
        <>
            <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full text-purple'>
                <MenuFour props="bg-transparent" />
                <Breadcrumb heading='About Us' subHeading='About Us' />
            </div>
            <div className='about md:pt-20 pt-10'>
                <div className="about-us-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <div className="heading3 text-2xl text-center text-secondary">I{String.raw`'m`} obsessed with the dress Pippa Middleton wore to her brother{String.raw`'s`} wedding.</div>
                                <div className="body1 text-center md:mt-7 mt-5 text-[15px]">Ribbons need no introduction. Over the years, they have transformed countless creative projects, from crafting elegant decorations to adding the perfect finishing touch to gifts. Our ribbons have traveled into homes, parties, and events, bringing charm and sophistication to every occasion. Whether you're wrapping presents, designing crafts, or creating stunning décor, our ribbons are here to inspire your imagination and elevate your creations</div>
                            </div>
                        </div>
                        <div className="list-img grid sm:grid-cols-3 gap-[30px] md:pt-20 pt-10">
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/aboutus-3.png'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/aboutus-2.png'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/aboutus-4.png'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Benefit props="md:pt-20 pt-10" /> */}
            {/* <Newsletter props="bg-green md:mt-20 mt-10" /> */}
            {/* <Instagram /> */}
            {/* <Brand /> */}
            <Footer />
        </>
    )
}

export default AboutUs