import React from "react";
import HandlePagination from "../Other/HandlePagination";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Product from "../Product/Product";


export default function FilterSide({ sidebarData, products }) {

  const renderProductTypes = () => {
    const uniqueTypes = [...new Set(sidebarData.map((item) => item?.productType))];
    return uniqueTypes.map((type, index) => (
      <div key={index} className="item flex items-center justify-between cursor-pointer">
        <div className="text-primary has-line-before capitalize">{type}</div>
      </div>
    ));
  };

  return (
    <div>
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
                      className="size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-purple"
                    >
                      {item}
                    </div>
                  ))}
                  <div className="size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-purple">
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
                      className="color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line"
                    >
                      <div className={`color bg-[${item.color}] w-5 h-5 rounded-full`}></div>
                      <div className="caption1 capitalize">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">
              <div className={`list-product hide-product-sold grid lg:grid-cols-${3} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7`}>
                {
                  products?.map((product) => {
                    return (
                      <Product key={product?.SK} product={product} />
                    )
                  })
                }
              </div>


              <div className="list-pagination flex items-center md:mt-10 mt-7">
                {/* <HandlePagination pageCount={pageCount} onPageChange={handlePageChange} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
