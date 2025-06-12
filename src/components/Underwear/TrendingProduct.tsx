'use client';

import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { motion } from 'framer-motion';
import { useProductStore } from '../Product/store/useProduct';
import { searchProducts } from '@/api/productApis/getPostApi';
import { useRouter } from 'next/navigation';

interface SearchParams {
  query: string;
  category: string;
  productType: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
  page: number;
  limit: number;
}

interface Props {
  start: number;
  limit: number;
  category: { PK: string; name: string }[];
  products?: any[];
  searchParams?: SearchParams;
}

const TrendingProduct: React.FC<Props> = ({ category = [], products: initialProducts = [], searchParams = {}, start, limit }) => {
  const { products: storeProducts, fetchProducts, fetchProductsByCategory } = useProductStore();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);



  useEffect(() => {
    setLoading(true);
    if (initialProducts && initialProducts.length > 0) {
      setDisplayProducts(initialProducts);
      setLoading(false);
    } else {
      // Otherwise fetch from the store
      fetchProducts()
        .then(() => {
          setDisplayProducts(storeProducts || []);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleTabClick = (type: string) => {
    setActiveTab(type);
    setLoading(true);
    if (type === 'All') {
      fetchProducts()
        .then(() => {
          setDisplayProducts(storeProducts || []);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      fetchProductsByCategory(type);
      setLoading(false);
    }
  };


  const router = useRouter();


  return (
    <div className="tab-features-block style-underwear md:pt-20 pt-10">
      <div className="container">
        <div className="heading flex flex-col items-center text-center">
          <div className="heading3 text-center text-secondary2">Trending Products</div>



          <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
            {[{ name: 'All', PK: 'All' }, ...category.slice(1, 5)].map(({ name, PK }) => (
              <div
                key={PK}
                className={`tab-item relative text-secondary2 py-2 px-5 cursor-pointer duration-500 hover:text-purple ${activeTab === PK ? 'active' : ''}`}
                onClick={() => handleTabClick(PK)}
              >
                {activeTab === PK && (
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
        ) : storeProducts?.length > 0 ? (
          <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
            {storeProducts.slice(start, start + limit).map((product) => (
              <Product key={product.SK} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <img src="/empty-data.svg" alt="No products available" className="w-64 h-64" title="empty-data" />
            <p className="text-secondary2 mt-4">No products available</p>
          </div>
        )}

        <div className='flex justify-center w-full '>
          <button onClick={() => router.push('/shop')} className='button-main w-max px-4 py-2   mt-5'> show more </button>
        </div>

      </div>
    </div>
  );
};

export default TrendingProduct;
