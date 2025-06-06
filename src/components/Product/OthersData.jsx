"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Rate from "../Other/Rate";
import { getReviewProductData, productListData } from "@/api/productApis/getPostApi";
import Product from "./Product";
import ReviewForm from "../Form/Review";
import { formatDistanceToNow } from 'date-fns';

export default function OthersData({ PK, SK , productMain }) {
  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [reviewsData, setReviewsData] = useState();

  const fetchReviewsData = async() => {
    try {
      const response = await getReviewProductData(); 
      setReviewsData(response)  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productListData();
        setProducts(response); // Set the fetched data to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchReviewsData();
    fetchProducts();
  }, []);

  

  return (
    <div>
      {/* Product Carousel Section */}
      <div className="list-product hide-product-sold menu-main mt-6 mx-[2rem] max-sm:hidden block ">
        <div className="heading5 pb-4">You'll love this too</div>
        <Swiper
          spaceBetween={4}
          slidesPerView={4}
          scrollbar={{ hide: false }}
          modules={[Navigation, Scrollbar]}
          breakpoints={{
            576: { slidesPerView: 2, spaceBetween: 12 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1290: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="pb-4"
        >
          {products?.map((data, i) => {
            return (
              <SwiperSlide key={i}>
                <Product product={data} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Description and Specifications Section */}
      {/* <div className="desc-tab md:pb-20 pb-10">
        <div className="container">
          <div className="flex items-center justify-center w-full">
            <div className="menu-tab flex items-center md:gap-[60px] gap-8">
              <div className="tab-item heading5 has-line-before text-purple2 hover:text-secondary duration-300">
                Description
              </div>
              <div className="tab-item heading5 has-line-before text-purple2 hover:text-secondary duration-300">
                Specifications
              </div>
            </div>
          </div>
          <div className="desc-block mt-8">
            <div className="desc-item description">
              <div className="grid md:grid-cols-2 gap-8 gap-y-5">
                <div className="left">
                  <div className="heading6">Description</div>
                  <div className="text-secondary mt-2">
                    Keep your home organized, yet elegant with storage cabinets
                    by Onita Patio Furniture.
                  </div>
                </div>
                <div className="right">
                  <div className="heading6">About This Products</div>
                  <div className="list-feature">
                    <div className="item flex gap-1 text-secondary mt-1">
                      <Icon.Dot size={28} />
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                    <div className="item flex gap-1 text-secondary mt-1">
                      <Icon.Dot size={28} />
                      <p>Nulla luctus libero quis mauris vestibulum dapibus.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-[30px] md:mt-10 mt-6">
                <div className="item">
                  <div className="icon-delivery-truck text-4xl"></div>
                  <div className="heading6 mt-4">Shipping Faster</div>
                  <div className="text-secondary mt-2">
                    Use on walls, furniture, doors and many more surfaces.
                  </div>
                </div>
                <div className="item">
                  <div className="icon-cotton text-4xl"></div>
                  <div className="heading6 mt-4">Cotton Material</div>
                  <div className="text-secondary mt-2">
                    Use on walls, furniture, doors and many more surfaces.
                  </div>
                </div>
              </div>
            </div>
            <div className="desc-item specifications flex items-center justify-center">
              <div className="lg:w-1/2 sm:w-3/4 w-full">
                <div className="item bg-surface flex items-center gap-8 py-3 px-10">
                  <div className="text-title sm:w-1/4 w-1/3">Rating</div>
                  <div className="flex items-center gap-1">
                    <Rate currentRate={4} size={12} />
                    <p>(1.234)</p>
                  </div>
                </div>
                <div className="item flex items-center gap-8 py-3 px-10">
                  <div className="text-title sm:w-1/4 w-1/3">Outer Shell</div>
                  <p>100% polyester</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="review-block md:py-20 py-10 bg-surface  ">
        <div className="container hidden ">
          <Reviews
            reviews={reviewsData}
            productMain={productMain}
          />
          <div id="form-review" className="form-review pt-6">
            <ReviewForm PK={PK} SK={SK} />
          </div>
        </div>

        <div className="related-product md:py-20 py-10">
          <div className="container">
            <div className="heading3 text-center">Related Products</div>
            <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 md:gap-[30px] gap-5 md:mt-10 mt-6">
              {products?.slice(0, 12).map((data, i) => {
                return <Product product={data} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Reviews = ({ reviews, productMain }) => {

  const averageRating = reviews?.reduce((acc, curr) => acc + curr.rating, 0) / reviews?.length;
  const totalReviews = reviews?.length;

  // Calculate rating distribution
  const ratingDistribution = {
    5: reviews?.filter(item => item.rating === 5).length,
    4: reviews?.filter(item => item.rating === 4).length,
    3: reviews?.filter(item => item.rating === 3).length,
    2: reviews?.filter(item => item.rating === 2).length,
    1: reviews?.filter(item => item.rating === 1).length,
  };


  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="product-reviews">
      <div className="top-overview flex justify-between py-6 max-md:flex-col gap-y-6">
        <div className="rating lg:w-1/4 md:w-[30%] lg:pr-[75px] md:pr-[35px]">
          <div className="heading flex items-center justify-center flex-wrap gap-3 gap-y-4">
            <div className="text-display">{averageRating?.toFixed(1)}</div>
            <div className="flex flex-col items-center">
              <Rate currentRate={Math.round(averageRating)} size={18} />
              <div className="text-secondary text-center mt-1">
                ({totalReviews?.toLocaleString()} Ratings)
              </div>
            </div>
          </div>
          <div className="list-rating mt-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="item flex items-center justify-between gap-1.5 mb-2">
                <div className="flex items-center gap-1">
                  <div className="caption1">{rating}</div>
                  <Icon.Star size={14} weight="fill" />
                </div>
                <div className="progress bg-line relative w-3/4 h-2">
                  <div
                    className="progress-percent absolute bg-yellow h-full left-0 top-0"
                    style={{ width: `${(ratingDistribution[rating] / totalReviews) * 100}%` }}
                  ></div>
                </div>
                <div className="caption1">
                  {Math.round((ratingDistribution[rating] / totalReviews) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="list-img lg:w-3/4 md:w-[70%] lg:pl-[15px] md:pl-[15px]">
          <div className="heading5">All Images ({productMain?.imageURLs?.length || 0})</div>
          <div className="list md:mt-6 mt-3">
            <Swiper
              spaceBetween={16}
              slidesPerView={3}
              modules={[Navigation]}
              breakpoints={{
                576: { slidesPerView: 4, spaceBetween: 16 },
                640: { slidesPerView: 5, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                992: { slidesPerView: 5, spaceBetween: 20 },
                1100: { slidesPerView: 5, spaceBetween: 20 },
                1290: { slidesPerView: 7, spaceBetween: 20 },
              }}
            >
              {productMain?.imageURLs?.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={img.img}
                    width={400}
                    height={400}
                    alt=""
                    className="w-[120px] aspect-square object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="list-review">
        {reviews?.map((review, index) => (
          <div key={index} className="item flex max-lg:flex-col gap-y-4 w-full py-6 border-t border-line">
            <div className="left lg:w-1/4 w-full lg:pr-[15px]">
              <div className="user mt-3">
                <div className="text-title">
                  {review.userId.SK.split('#')[1].slice(0, 8)} {/* Example user ID display */}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-purple2">{formatDate(review?.createdAt)}</div>
                </div>
              </div>
            </div>
            <div className="right lg:w-3/4 w-full lg:pl-[15px]">
              <Rate currentRate={review?.rating} size={16} />
              <div className="body1 mt-3">{review?.comment}</div>
              <div className="action mt-3">
                <div className="flex items-center gap-4">
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};