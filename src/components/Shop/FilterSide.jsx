"use client";
import HandlePagination from "../Other/HandlePagination";
import Product from "../Product/Product";
import { useState } from "react";
import { useProductStore } from "../Product/store/useProduct";

export default function FilterSide({ sidebarData, products: initialProducts }) {
    const [activeCategory, setActiveCategory] = useState(null);
    const fetchProductsByCategory = useProductStore((state) => state.fetchProductsByCategory);
    const fetchProducts = useProductStore((state) => state.fetchProducts);

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat.PK);
        fetchProductsByCategory(cat.PK);
    };

    return (
        <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
            <div className="container">
                <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
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
                                        fetchProducts();
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
                            {initialProducts?.map((product) => (
                                <Product key={product?.SK} product={product} />
                            ))}
                        </div>
                    </div>


                </div>
                <HandlePagination />
            </div>
        </div>
    );
}