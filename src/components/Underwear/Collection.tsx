"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ProductType {
  img: string;
  name: string;
}
const Collection = () => {
  const router = useRouter();
  //   state to store fetched data from api
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`
      );
      console.log("response Data", response?.data?.data?.items);
      const data = response?.data?.data?.items;
      setProducts(data);
      //   console.log(data);
    } catch (error) {
      console.error("Error on fetching products ", error);
    }
  };

  // fetch products on components mounts
  useEffect(() => {
    getProduct();
  }, []);

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb1?type=${type}`);
  };

  return (
    <>
      <div className="collection-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading text-center">
            <div className="heading3 text-center">Explore Collections</div>
            <div className="heading6 text-center md:mt-2 mt-2">
              Discover Our Stunning Ribbon Collection
            </div>
            <div className="heading6 font-normal normal-case text-secondary md:mt-4 mt-2">
              Perfect for every occasion – From elegant gifts to creative
              crafts, our ribbons bring beauty and quality to your projects at
              affordable prices!
            </div>
          </div>
          <div className="list-collection grid lg:grid-cols-4 grid-cols-2 gap-8 md:mt-10 mt-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="collection-item block relative rounded-t-full overflow-hidden cursor-pointer"
                onClick={() => handleTypeClick(product.name)}
              >
                <div className="bg-img">
                  <Image
                    src={product.img || "/placeholder.jpg"} // Fallback for missing image
                    width={1000}
                    height={600}
                    alt={product.name || "Product Image"} // Fallback for missing name
                  />
                </div>
                <div className="collection-name text-lg font-[600] text-center sm:bottom-5 bottom-3 md:w-[200px] max-md:px-4 max-md:whitespace-nowrap md:py-3 py-2 rounded-xl duration-500 bg-custom-purple-color hover:bg-purple text-white">
                  {product.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
