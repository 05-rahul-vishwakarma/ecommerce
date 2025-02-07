"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import TestimonialItem from "../Testimonial/TestimonialItem";
import { TestimonialType } from "@/type/TestimonialType";
import axios from "axios";

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonial, setTestimonial] = useState<TestimonialType[]>([]);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const getTestimonial = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/meta-content/testimonial/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`
      );
      const mappedTestimonials: TestimonialType[] =
        response?.data?.data?.items.map((item: any) => ({
          img: item.img, // Optional field
          id: item.SK, // Map SK to id
          rating: item.rating,
          name: item.name,
          businessType: item.businessType,
          description: item.description, // Optional field
          type: item.type,
        }));
      setTestimonial(mappedTestimonials);
    } catch (error) {
      console.error("Testimonial not Found!", error);
    }
  };
  useEffect(() => {
    getTestimonial();
  }, []);

<<<<<<< HEAD
  return (
    <>
      <div className="testimonial-block style-four bg-[#fffdfd] md:mt-20 mt-10 md:py-20 py-14">
        <div className="container flex items-center justify-between flex-wrap gap-y-6 max-md:flex-col-reverse">
          <div className="md:w-1/2 w-full list-testimonial section-swiper-navigation style-small-border">
            <div className="heading3 md:pb-10 pb-5 text-secondary">
              What People Say
=======
    const getTestimonial = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/meta-content/testimonial/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`
            );
            const mappedTestimonials: TestimonialType[] = response?.data?.data?.items.map((item: any) => ({
                img: item.img, // Optional field
                id: item.SK, // Map SK to id
                rating: item.rating,
                name: item.name,
                businessType: item.businessType,
                description: item.description, // Optional field
                type: item.type,
            }));
            setTestimonial(mappedTestimonials);
        } catch (error) {
            console.error('Testimonial not Found!', error);
        }
    };
    useEffect(() => {
        getTestimonial()
    }, [])


    return (
        <>
            <div className="testimonial-block style-four bg-[#fffdfd] md:mt-20 mt-10 md:py-20 py-14">
                <div className="container flex items-center justify-between flex-wrap gap-y-6 max-md:flex-col-reverse">
                    <div className="md:w-1/2 w-full list-testimonial section-swiper-navigation style-small-border">
                        <div className="heading3 md:pb-10 pb-5 text-secondary2">What People Say</div>
                        <Swiper
                            slidesPerView={1}
                            navigation
                            modules={[Navigation, Autoplay]}
                            className="h-full"
                            onSlideChange={handleSlideChange}
                        >
                            {testimonial.slice(0, 6).map((item, index) => (
                                <SwiperSlide key={index} data-item={item.id}>
                                    <TestimonialItem data={item} type="style-seven" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="list-avatar lg:w-5/12 md:w-1/2 md:pl-9 text-center">
                        {testimonial.slice(0, 6).map((item, index) => (
                            <div
                                className={`bg-img rounded-t-full overflow-hidden ${index === activeIndex ? 'active' : ''
                                    }`}
                                key={index}
                                data-item={item.id}
                            >
                                {item.img ? (
                                    <Image
                                        src={item.img}
                                        width={1000}
                                        height={700}
                                        alt={item.name}
                                        className="avatar w-full"
                                    />
                                ) : (
                                    <div className="avatar w-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
>>>>>>> 1a460d804c57f714cdf37f1bb048b31008d31ed8
            </div>
            <Swiper
              slidesPerView={1}
              navigation
              modules={[Navigation, Autoplay]}
              className="h-full"
              onSlideChange={handleSlideChange}
            >
              {testimonial.slice(0, 6).map((item, index) => (
                <SwiperSlide key={index} data-item={item.id}>
                  <TestimonialItem data={item} type="style-seven" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="list-avatar lg:w-5/12 md:w-1/2 md:pl-9 text-center">
            {testimonial.slice(0, 6).map((item, index) => (
              <div
                className={`bg-img rounded-t-full overflow-hidden ${
                  index === activeIndex ? "active" : ""
                }`}
                key={index}
                data-item={item.id}
              >
                {item.img ? (
                  <Image
                    src={item.img}
                    width={1000}
                    height={700}
                    alt={item.name}
                    className="avatar w-full"
                  />
                ) : (
                  <div className="avatar w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
