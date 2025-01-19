import React from "react";

const items = [
  {
    category: {
      name: "Classic Ribbon",
      id: "88888",
    },
    price: 345,
    productType: "Classic Ribbon",
  },
  {
    category: {
      name: "Cotton Ribbon",
      id: "88888",
    },
    price: 345,
    productType: "Cotton Ribbon",
  },
  {
    category: {
      name: "Diamond Ribbon",
      id: "88888",
    },
    price: 345,
    productType: "Diamond Ribbon",
  },
  {
    category: {
      name: "Foil Print Ribbons",
      id: "88888",
    },
    price: 98,
    productType: "Foil Print Ribbons",
  },
  {
    category: {
      name: "Grosgrain Ribbons",
      id: "88888",
    },
    price: 98,
    productType: "Grosgrain Ribbons",
  },
  {
    category: {
      name: "Embossed Ribbons",
      id: "88888",
    },
    price: 98,
    productType: "Embossed Ribbons",
  },
  {
    category: {
      name: "Printed Ribbon",
      id: "88888",
    },
    price: 78,
    productType: "Striped Ribbons",
  },
  {
    category: {
      name: "Satin Ribbon ",
      id: "88888",
    },
    price: 57,
    productType: "Custom Length Ribbons",
  },
  {
    category: {
      name: "Traditional Ribbons",
      id: "88888",
    },
    price: 200,
    productType: "Plaid and Tartan Ribbons",
  },
  {
    category: {
      name: "Glitter Ribbon",
      id: "88888",
    },
    price: 300,
    productType: "Ribbon ",
  },
  {
    category: {
      name: "Multi Color Ribbon",
      id: "88888",
    },
    price: 89,
    productType: "Classic Ribbon",
  },
  {
    category: {
      name: "Ribbon ",
      id: "88888",
    },
    price: 90,
    productType: "Pink Decorative Ribbon",
  },
  {
    category: {
      name: "Diamond Ribbon Set",
      id: "88888",
    },
    price: 200,
    productType: "Diamond Ribbon ",
  },
  {
    category: {
      name: "ribbon",
      id: "88888",
    },
    price: 4999,
    productType: "tradfdfdger trtob bpn ",
  },
  {
    category: {
      name: "20",
      id: "88888",
    },
    price: 199,
    productType: "ribbon",
  },
  {
    category: {
      name: "cotton",
      id: "88888",
    },
    price: 3000,
    productType: "ribbon",
  },
];

export default function FilterSide({data}) {

  const renderProductTypes = () => {
    const uniqueTypes = [...new Set(data.map((item) => item.productType))];
    return uniqueTypes.map((type, index) => (
      <div key={index} className="item flex items-center justify-between cursor-pointer">
        <div className="text-secondary has-line-before capitalize">{type}</div>
      </div>
    ));
  };

  return (
    <div>
      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
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
                  <div className="color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line">
                    <div className="color bg-[#F4C5BF] w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">Pink</div>
                  </div>
                  <div className="color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line">
                    <div className="color bg-red w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">Red</div>
                  </div>
                    <div className="color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line">
                    <div className="color bg-yellow w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">Red</div>
                  </div>
                  <div className="color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line">
                    <div className="color bg-green w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">Red</div>
                  </div>
                  
                  {/* Add more colors as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
