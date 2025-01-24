'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import TestimonialItem from '../Testimonial/TestimonialItem';
import data from '../../data/Testimonial.json';

import { TestimonialType } from '@/type/TestimonialType'
import axios from 'axios';

interface Props {
    data: Array<TestimonialType>;
    limit: number;
}

const Testimonial: React.FC<Props> = ({ data, limit }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [testimonial, setTestimonial] = useState<TestimonialType[]>([])

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    const getTestimonial = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/meta-content/testimonial/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`);
            setTestimonial(response?.data?.data?.items || [])
        } catch (error) {
            console.error("Testimonial not Found!", error)
        }
    }

    useEffect(() => {
        getTestimonial();
    }, [])

    return (
        <>
            <div className="testimonial-block style-four bg-[#fffdfd] md:mt-20 mt-10    md:py-20 py-14">
                <div className="container flex items-center justify-between flex-wrap gap-y-6 max-md:flex-col-reverse">
                    <div className="md:w-1/2 w-full list-testimonial section-swiper-navigation style-small-border">
                        <div className="heading3 md:pb-10 pb-5 text-secondary">What People Say</div>
                        <Swiper
                            slidesPerView={1}
                            navigation
                            modules={[Navigation, Autoplay]}
                            className='h-full'
                            onSlideChange={handleSlideChange}
                        >
                            {testimonial.slice(0, limit).map((item, index) => (
                                <SwiperSlide key={index} data-item={item.id}>
                                    <TestimonialItem data={item} type='style-seven' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="list-avatar lg:w-5/12 md:w-1/2 md:pl-9 text-center">
                        {testimonial.slice(0, limit).map((item, index) => (
                            <div
                                className={`bg-img rounded-t-full overflow-hidden ${index === activeIndex ? 'active' : ''}`}
                                key={index}
                                data-item={item.id}
                            >

                                <Image
                                    src={item.img}
                                    width={1000}
                                    height={700}
                                    alt={item.name}
                                    className='avatar w-full'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial