"use client";
import HandlePagination from "../Other/HandlePagination";
import Product from "../Product/Product";
import { useState, useEffect } from "react";
import { useProductStore } from "../Product/store/useProduct";

export default function FilterSide({ sidebarData }) {
    const [activeCategory, setActiveCategory] = useState(null);
    const { products, lastEvaluatedKey, fetchProductsByCategory, fetchProducts , fetchMoreProducts  } = useProductStore();

    useEffect(() => {
      // Initial fetch when component mounts
      if (!activeCategory) {
        fetchProducts();
      }
    }, [fetchProducts, activeCategory]);

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat.PK);
        fetchProductsByCategory(cat.PK);
    };

    const handleLoadMore = () => {
      if (activeCategory) {
        fetchProductsByCategory(activeCategory, lastEvaluatedKey);
      } else {
        // If no category is active, load more for the default product list
        // Assuming fetchProducts also handles pagination if needed, or add a separate fetchMoreProducts for the default list.
        // For now, calling fetchProductsByCategory with null categoryId might not work as intended.
        // We should have a dedicated fetchMoreProducts for the main product list.
        // For this fix, we'll only enable 'Load More' for category filtered results.
        fetchMoreProducts(lastEvaluatedKey); // Call fetchProducts with lastEvaluatedKey
      }
    };

    return (
        <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
            <div className="container">
                <div className="flex max-md:flex-wrap max-md:flex-col gap-y-8">
                    {/* Sidebar */}
                    <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
                        <div className="filter-type pb-8 border-b border-line">
                            <div className="heading6">Categories</div>
                            <div className="list-type mt-4">
                                {/* All Products / Reset Filter */}
                                <div
                                    className={`item flex items-center justify-between cursor-pointer capitalize text-secondary ${!activeCategory ? 'text-indigo-600 font-semibold' : ''}`}
                                    onClick={() => {
                                        setActiveCategory(null);
                                        fetchProducts(); // Fetch initial products
                                    }}
                                >
                                    All Products
                                </div>
                                {sidebarData && sidebarData.length > 0 ? (
                                    sidebarData.map((cat) => (
                                        <div
                                            key={cat.PK}
                                            className={`item flex items-center justify-between cursor-pointer capitalize text-secondary ${activeCategory === cat.PK ? 'text-[#592dbb] font-semibold' : ''}`}
                                            onClick={() => handleCategoryClick(cat)}
                                        >
                                            {cat.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-400">No categories found</div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Product List */}
                    <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">
                        <div className="list-product grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                            {products?.map((product) => (
                                <Product key={product?.SK} product={product} />
                            ))}
                        </div>
                        {/* {lastEvaluatedKey && (
                          <div className="flex justify-center mt-8">
                            <button
                              className="button-main"
                              onClick={handleLoadMore}
                            >
                              Load More
                            </button>
                          </div>
                        )} */}
                    </div>


                </div>
                <HandlePagination
                  activeCategory={activeCategory}
                  lastEvaluatedKey={lastEvaluatedKey}
                  fetchMoreProducts={fetchMoreProducts}
                  fetchProductsByCategory={fetchProductsByCategory}
                />
            </div>
        </div>
    );
}