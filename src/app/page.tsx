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
import Script from "next/script";


const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Ribbon Pack',
    url: 'https://www.theribbonpack.com',
    // Add potentialAction if you have a site-specific search feature
    'potentialAction': {
      '@type': 'SearchAction',
      'query-input': 'required name=search_term_string'
    }
};

export default function Home() {
    return (
        <>
            <Script
                id="json-ld-homepage"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TopNavThree props="style-three bg-white" />
            <div id="header" className='relative w-full'>
                <MenuFour props="bg-white" />
                <SliderUnderwear />
            </div>
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
