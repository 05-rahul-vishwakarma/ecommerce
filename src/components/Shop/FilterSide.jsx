import React, { useState } from "react";
import HandlePagination from "../Other/HandlePagination";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Product from "../Product/Product";
import { useProductStore } from "../Product/store/useProduct";

export default function FilterSide({ sidebarData, products }) {
  const { filteredProductsByFilter , fetchProducts } = useProductStore();

  // State for selected filters
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Handle filter selection
  const toggleFilter = (filterType, value) => {
    switch (filterType) {
      case 'type':
        setSelectedTypes((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
      case 'size':
        setSelectedSizes((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
      case 'color':
        setSelectedColors((prev) =>
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    fetchProducts();
  };

  const renderProductTypes = () => {
    const uniqueTypes = [...new Set(sidebarData.map((item) => item?.productType))];
    return uniqueTypes.map((type, index) => (
      <div
        key={index}
        onClick={() => {
          toggleFilter('type', type);
          filteredProductsByFilter(type); 
        }}
        className={`item flex items-center justify-between cursor-pointer capitalize ${selectedTypes.includes(type) ? 'text-primary font-bold' : 'text-secondary'}`}
      >
        {type}
      </div>
    ));
  };


  return (
    <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
      <div className="container">
        <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
          {/* Sidebar */}
          <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
            {/* Products Type */}
            <div className="filter-type pb-8 border-b border-line">
              <div className="heading6">Products Type</div>
              <div className="list-type mt-4">{renderProductTypes()}</div>
            </div>

            {/* Size Filter */}
            <div className="filter-size pb-8 border-b border-line mt-8">
              <div className="heading6">Size</div>
              <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => toggleFilter('size', item)}
                    className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-purple ${selectedSizes.includes(item) ? 'bg-primary text-white' : ''}`}
                  >
                    {item}
                  </div>
                ))}
                <div
                  onClick={() => toggleFilter('size', 'Freesize')}
                  className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-purple ${selectedSizes.includes('Freesize') ? 'bg-primary text-white' : ''}`}
                >
                  Freesize
                </div>
              </div>
            </div>

            {/* Colors Filter */}
            <div className="filter-color pb-8 border-b border-line mt-8">
              <div className="heading6">Colors</div>
              <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                {[
                  { color: "#F4C5BF", name: "Pink" },
                  { color: "red", name: "Red" },
                  { color: "yellow", name: "Yellow" },
                  { color: "green", name: "Green" },
                ].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => toggleFilter('color', item.name)}
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line cursor-pointer ${selectedColors.includes(item.name) ? 'border-primary' : ''}`}
                  >
                    <div className={`color bg-[${item.color}] w-5 h-5 rounded-full`}></div>
                    <div className="caption1 capitalize">{item.name}</div>
                  </div>
                ))}
              </div>
              <div className="reset-filter mt-4">
                <button
                  onClick={resetFilters}
                  className="text-sm text-center text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  Clear All Filters
                </button>
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

            <div className="list-pagination flex items-center md:mt-10 mt-7">
              {/* Pagination Component */}
              <HandlePagination pageCount={5} onPageChange={(page) => console.log("Page changed:", page)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
