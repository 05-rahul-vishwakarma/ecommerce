"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const SliderUnderwear = () => {
  const [featuredProductImage, setFeaturedProductImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const cache = await caches.open('featured-products-cache');
        const response = await cache.match('/api/featured-products-data');

        if (response) {
          const data = await response.json();
          // Use the image from the product at index 3, if available
          const image = data?.[3]?.imageURLs?.[0]?.img;
          if (image) {
            setFeaturedProductImage(image);
          }
        } else {
          // console.log('Featured products data not found in cache.');
        }
      } catch (error) {
        console.error('Failed to fetch featured products data from cache:', error);
      }
    };

    fetchCachedData();
  }, []); // Run only once on component mount

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={featuredProductImage || "/images/slider/image2.jpg"} />
      </Head>
      <div className="slider-block style-one bg-linear xl:py-[100px] px-4 md:py-20 py-14 w-full ">
        <div className="slider-main h-full w-full flex items-center  justify-center gap-10">
            
          <div className="sub-img w-[440px] max-md:w-1/2 rounded-b-full overflow-hidden max-md:hidden">
            <Image
              src={featuredProductImage || "/images/slider/image2.jpg"}
              width={2000}
              height={1936}
              alt="bg-underwear1"
              priority={true}
              className="w-full"
            />
          </div>
          <div className="text-content w-fit">
            <div className="text-sub-display text-center hidden ">
              Sale! Up To 50% Off!
            </div>
            <div className="text-display text-center md:mt-4 mt-2">
            Wrap Your World <br/>
            in Color with Premium <br/>
            Ribbons
              
            </div>
            <div className="text-center">
              <Link
                href="/product"
                // where does it comming from
                className="button-main md:mt-8 mt-3 "
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="sub-img w-[440px] max-md:w-1/2 rounded-t-full overflow-hidden">
            <Image
              src={featuredProductImage || "/images/slider/image2.jpg"}
              width={2000}
              height={1936}
              alt="bg-underwear2"
              priority={true}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderUnderwear;
