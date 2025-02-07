"use client";

import React, { useEffect, useState, useMemo } from "react";
import Product from "../Product/Product";
import { motion } from "framer-motion";
import { useProductStore } from "../Product/store/useProduct";

interface Props {
  start: number;
  limit: number;
}

const TrendingProduct: React.FC<Props> = ({ start, limit }) => {
  const { products, fetchProducts } = useProductStore();
  const [activeTab, setActiveTab] = useState<string>("");
  const [isClicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const randomTabs = useMemo(() => {
    if (!products || products.length === 0) return [];
    const uniqueTypes = Array.from(
      new Set(products.map((product) => product.productType))
    );
    return uniqueTypes.sort(() => Math.random() - 0.5).slice(0, 5);
  }, [products]);

  useEffect(() => {
    if (randomTabs.length > 0 && !activeTab) {
      setActiveTab(randomTabs[0]);
    }
  }, [randomTabs, activeTab]);

  const handleTabClick = (type: string) => {
    setActiveTab(type);
    setClicked(!isClicked);
  };

  const filteredProducts = useMemo(() => {
    if (!activeTab) return [];
    return products.filter((product) => product.productType === activeTab);
  }, [products, activeTab]);

  useEffect(() => {
    if (randomTabs.length > 0 && !activeTab) {
      setActiveTab(randomTabs[0]);
    }
  }, [randomTabs, activeTab]);

  return (
    <div className="tab-features-block style-underwear md:pt-20 pt-10">
      <div className="container">
        <div className="heading flex flex-col items-center text-center">
<<<<<<< HEAD
          <div className="heading3 text-center text-secondary">
            Trending Products
          </div>
=======
          <div className="heading3 text-center text-secondary2">Trending Products</div>
>>>>>>> 1a460d804c57f714cdf37f1bb048b31008d31ed8
          <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
            {randomTabs.map((type) => (
              <div
                key={type}
<<<<<<< HEAD
                className={`tab-item relative text-secondary py-2 px-5 cursor-pointer duration-500 hover:text-secondary ${
                  activeTab === type ? "active" : ""
                }`}
=======
                className={`tab-item relative text-secondary2 py-2 px-5 cursor-pointer duration-500 hover:text-purple ${activeTab === type ? 'active' : ''
                  }`}
>>>>>>> 1a460d804c57f714cdf37f1bb048b31008d31ed8
                onClick={() => handleTabClick(type)}
              >
                {activeTab === type && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-2xl bg-custom-purple-color"
                  />
                )}
                <span className="relative text-button-uppercase z-[1]">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isClicked ? (
          <>
            <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
              {filteredProducts.length > 0 ? (
                filteredProducts
                  .slice(start, limit)
                  .map((product) => (
                    <Product key={product.SK} product={product} />
                  ))
              ) : (
                <div className="text-center col-span-full">
                  No Products Available
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
              {products?.slice(start, limit).map((product, i) => (
                <Product key={product.SK} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendingProduct;
