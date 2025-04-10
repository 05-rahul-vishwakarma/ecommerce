'use client';

import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { motion } from 'framer-motion';
import { useProductStore } from '../Product/store/useProduct';
import { searchProducts } from '@/api/productApis/getPostApi';

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
  category: { name: string }[];
  products?: any[];
  searchParams?: SearchParams;
}

const TrendingProduct: React.FC<Props> = ({ category = [], products: initialProducts = [], searchParams = {}, start, limit }) => {
  const { products: storeProducts, fetchProducts, filteredProductsByFilter } = useProductStore();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.query || '');

  useEffect(() => {
    setLoading(true);
    
    // If initial products were provided (from server), use them
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
  }, [fetchProducts, initialProducts, storeProducts]);

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
      filteredProductsByFilter(type);
      // The store won't return the filtered products directly, so we need to get them from the store
      setDisplayProducts(storeProducts);
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call the searchProducts with the correct parameters
      const results = await searchProducts({
        ...searchParams,
        query: searchQuery,
        category: activeTab !== 'All' ? activeTab : '',
      });
      
      if (Array.isArray(results)) {
        setDisplayProducts(results);
      } else {
        console.warn("Search returned non-array result:", results);
        setDisplayProducts([]);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setDisplayProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tab-features-block style-underwear md:pt-20 pt-10">
      <div className="container">
        <div className="heading flex flex-col items-center text-center">
          <div className="heading3 text-center text-secondary2">Trending Products</div>
          
          {/* Search bar */}
          <div className="w-full max-w-md mt-6 mb-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-custom-purple-color text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 transition duration-300"
              >
                Search
              </button>
            </form>
          </div>
          
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
        ) : displayProducts?.length > 0 ? (
          <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
            {displayProducts.slice(start, start + limit).map((product) => (
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
