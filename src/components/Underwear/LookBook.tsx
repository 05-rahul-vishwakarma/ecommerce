"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/type/ProductType";
import Product from "../Product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  data: Array<ProductType>;
}

const LookBook: React.FC<Props> = ({ data }) => {
  const [products, setProducts] = useState<Props[]>([]);

  const router = useRouter();
  const [prd, setPrd] = useState("28");

  const getProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`
      );
      console.log("lookbook: ", response?.data?.data?.items);
      const data = response?.data?.data?.items;
      setProducts(data);
    } catch (error) {
      console.error("Error On Fetching Products ", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleDetailProduct = (productId: string) => {
    // redirect to shop with category selected
    router.push(`/product/default?id=${productId}`);
  };

  return (
    <>
      <div className="lookbook bg-[#faf6ff] xl:h-[780px] lg:h-[600px] md:h-[500px] relative">
        <div className="container h-full">
          <div className="left hide-product-sold  md:w-1/2 py-10 h-full flex flex-col items-center justify-center">
            <div className="heading4 md:pb-10 pb-5 text-secondary mr-5">
              The Summer Look book uwlookbook
            </div>
            <div className="w-1/2">
              {data
                .slice(Number(prd), Number(prd) + 1)
                .map((product, index) => (
                  <Product key={index} data={product} type="grid" />
                ))}
            </div>
          </div>
        </div>
        {products.map((product, index) => {
          return (
            <div
            key={index}
            className="right list-img h-full md:w-1/2 md:absolute top-0 right-0 bottom-0">
              <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                loop={true}
                autoplay={{
                  delay: 4000,
                }}
                className="h-full relative dots-white"
              >
                <SwiperSlide>
                  <div className="item h-full">
                    <Image
                      // src={'/images/banner/b15.png'}
                      src={product?.img}
                      width={2000}
                      height={1000}
                      alt={product?.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="dots absolute top-[40%] left-[60%] cursor-pointer">
                      <div
                        className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center "
                        onClick={() => setPrd("28")}
                      >
                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                      </div>
                    </div>
                    <div className="dots bottom-dot absolute bottom-[13%] left-[54%] cursor-pointer">
                      <div
                        className="w-8 h-8 rounded-full bg-outline flex items-center justify-center"
                        onClick={() => setPrd("29")}
                      >
                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item h-full">
                    <Image
                      src={product?.img}
                      width={2000}
                      height={1000}
                      alt={product?.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="dots absolute top-[38%] left-[45%] cursor-pointer">
                      <div
                        className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center"
                        onClick={() => setPrd("30")}
                      >
                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                      </div>
                    </div>
                    <div className="dots bottom-dot absolute bottom-[10%] left-[20%] cursor-pointer">
                      <div
                        className="w-8 h-8 rounded-full bg-outline flex items-center justify-center"
                        onClick={() => setPrd("31")}
                      >
                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item h-full">
                    <Image
                      src={product?.img}
                      width={2000}
                      height={1000}
                      alt={product?.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="dots absolute top-[42%] left-[50%] cursor-pointer">
                      <div
                        className="top-dot w-8 h-8 rounded-full bg-outline flex items-center justify-center"
                        onClick={() => setPrd("32")}
                      >
                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                      </div>
                    </div>
                    <div className="dots bottom-dot absolute bottom-[12%] left-[62%] cursor-pointer">
                      <div
                        className="w-8 h-8 rounded-full bg-outline flex items-center justify-center"
                        onClick={() => setPrd("33")}
                      >
                        <span className="bg-white w-3 h-3 rounded-full duration-300"></span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LookBook;
