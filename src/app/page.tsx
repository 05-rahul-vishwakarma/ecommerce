import React from 'react'
import SliderUnderwear from '@/components/Slider/SliderUnderwear'
import Collection from '@/components/Underwear/Collection'
import Testimonial from '@/components/Underwear/Testimonial'
import OurBlog from '@/components/Underwear/OurBlog'
import Instagram from '@/components/Underwear/Instagram'
import Footer from '@/components/Footer/Footer'
import TopNavThree from '@/components/Header/TopNav/TopNavThree'
import MenuFour from '@/components/Header/MenuFour'
import FeaturedServer from '@/components/Underwear/FeaturedServer'
import TrendingServer from '@/components/Underwear/TrendingServer'


export default function Home() {
    return (
        <>
            <TopNavThree props="style-three bg-white" />
            <div id="header" className='relative w-full'>
                <MenuFour props="bg-white" />
                <SliderUnderwear />
            </div>
            <h1 className="text-center text-3xl font-bold py-8">Explore Our Premium Ribbons for Every Occasion</h1>
            <Collection />
            <FeaturedServer />
            <TrendingServer />
            <Testimonial />
            <OurBlog />
            <Instagram />
            <Footer />
            {/* <ModalNewsletter /> */}
        </>
    )
}
