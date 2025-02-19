'use client';

import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { motion } from 'framer-motion';
import { useProductStore } from '../Product/store/useProduct';

interface Props {
  start: number;
  limit: number;
  category: { name: string }[];
}

const TrendingProduct: React.FC<Props> = ({ category = [], start, limit }) => {
  const { products, fetchProducts, filteredProductsByFilter } = useProductStore();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts().finally(() => setLoading(false));
  }, [fetchProducts]);

  const handleTabClick = (type: string) => {
    setActiveTab(type);
    setLoading(true);
    if (type === 'All') {
      fetchProducts().finally(() => setLoading(false));
    } else {
      filteredProductsByFilter(type);
      setLoading(false);
    }
  };

  return (
    <div className="tab-features-block style-underwear md:pt-20 pt-10">
      <div className="container">
        <div className="heading flex flex-col items-center text-center">
          <div className="heading3 text-center text-secondary2">Trending Products</div>
          <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
            {[{ name: 'All' }, ...category.slice(1, 5)].map(({ name }) => (
              <div
                key={name}
                className={`tab-item relative text-secondary2 py-2 px-5 cursor-pointer duration-500 hover:text-purple ${activeTab === name ? 'active' : ''
                  }`}
                onClick={() => handleTabClick(name)}
              >
                {activeTab === name && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-2xl bg-custom-purple-color"
                  />
                )}
                <span className="relative text-button-uppercase z-[1]">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Animation */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500"></div>
          </div>
        ) : products?.length > 0 ? (
          <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
            {products.slice(start, limit).map((product) => (
              <Product key={product.SK} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <img src="/empty-data.svg" alt="No products available" className="w-64 h-64" />
            <p className="text-secondary2 mt-4">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingProduct;
