import React from 'react'
import SliderUnderwear from '@/components/Slider/SliderUnderwear'
import Collection from '@/components/Underwear/Collection'
import FeaturedProduct from '@/components/Underwear/FeaturedProduct'
import TrendingProduct from '@/components/Underwear/TrendingProduct'
import testimonialData from '@/data/Testimonial.json'
import Testimonial from '@/components/Underwear/Testimonial'
import blogData from '@/data/Blog.json'
import OurBlog from '@/components/Underwear/OurBlog'
import Instagram from '@/components/Underwear/Instagram'
import Brand from '@/components/Underwear/Brand'
import Benefit from '@/components/Underwear/Benefit'
import Footer from '@/components/Footer/Footer'
import ModalNewsletter from '@/components/Modal/ModalNewsletter'
import TopNavThree from '@/components/Header/TopNav/TopNavThree'
import MenuFour from '@/components/Header/MenuFour'
import DyanamicProduct from '@/components/Product/DyanamicProduct'

export default function Home() {
    return (
        <>
            <TopNavThree props="style-three bg-white" />
            <div id="header" className='relative w-full'>
                <MenuFour props="bg-white" />
                <SliderUnderwear />
            </div>
            <Collection />
            <FeaturedProduct />
            <TrendingProduct start={0} limit={8} />
            <Testimonial data={testimonialData} limit={6} />
            <OurBlog data={blogData} start={3} limit={6} />
            <Instagram />
            <Benefit props="py-[60px]" />
            <Footer />
            {/* <ModalNewsletter /> */}
        </>
    )
}
