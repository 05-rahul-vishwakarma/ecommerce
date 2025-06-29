"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";

const Instagram = () => {
  return (
    <>
      <div className="instagram-block mt-20">
        <div className="list-instagram">
          <Swiper
            slidesPerView={2}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
            }}
            breakpoints={{
              500: {
                slidesPerView: 2,
              },
              680: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide>
              <Link
                href={"https://www.instagram.com/"}
                target="_blank"
                className="item relative block aspect-square bg-gray-100 overflow-hidden"
              >
                <Image
                  src={"/images/instagram/i9.png"}
                  fill
                  alt="Instagram post 1"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(min-width: 1200px) 20vw, (min-width: 992px) 25vw, (min-width: 680px) 33.33vw, 50vw"
                />
                <div className="icon w-12 h-12 bg-white hover:bg-purple duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] opacity-0 group-hover:opacity-100">
                  <div className="icon-instagram text-2xl text-secondary"></div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={"https://www.instagram.com/"}
                target="_blank"
                className="item relative block overflow-hidden"
              >
                <Image
                  src={"/images/instagram/i6.png"}
                  width={300}
                  height={300}
                  alt="1"
                  className="h-full w-full duration-500 relative"
                />
                <div className="icon w-12 h-12 bg-white hover:bg-purple duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                  <div className="icon-instagram text-2xl text-secondary"></div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={"https://www.instagram.com/"}
                target="_blank"
                className="item relative block overflow-hidden"
              >
                <Image
                  src={"/images/instagram/i10.png"}
                  width={300}
                  height={300}
                  alt="1"
                  className="h-full w-full duration-500 relative"
                />
                <div className="icon w-12 h-12 bg-white hover:bg-purple duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                  <div className="icon-instagram text-2xl text-secondary"></div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={"https://www.instagram.com/"}
                target="_blank"
                className="item relative block overflow-hidden"
              >
                <Image
                  src={"/images/instagram/i7.png"}
                  width={300}
                  height={300}
                  alt="1"
                  className="h-full w-full duration-500 relative"
                />
                <div className="icon w-12 h-12 bg-white hover:bg-purple duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                  <div className="icon-instagram text-2xl text-secondary"></div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link
                href={"https://www.instagram.com/"}
                target="_blank"
                className="item relative block overflow-hidden"
              >
                <Image
                  src={"/images/instagram/i9.png"}
                  width={300}
                  height={300}
                  alt="1"
                  className="h-full w-full duration-500 relative"
                />
                <div className="icon w-12 h-12 bg-white hover:bg-purple duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                  <div className="icon-instagram text-2xl text-secondary"></div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Instagram;
