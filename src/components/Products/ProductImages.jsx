'use client';

import { useState } from "react";
import Image from "next/image";
import { useProductStore } from '@/components/Products/store/useProductStore'; // Import your store hook

const ProductImages = () => {
  const { setProductImage, setColors, imageURLs, setImageURLs } = useProductStore();

  const handleImageUpload = (e, color) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Generate a file URL
      // Set the uploaded image and its corresponding color
      setProductImage(imageURL); // Set the image URL
      setColors({ name: color.name, code: color.clrCode });

      // Update the imageURLs array in the store with the new image
      const updatedImageURLs = imageURLs.map((item) =>
        item.color.name === color.name
          ? { ...item, img: imageURL } // Update the image with the file URL
          : item
      );
      setImageURLs(updatedImageURLs); // Set updated image URLs in the store
    }
  };

  const handleColorChange = (e, colorName) => {
    const newColorCode = e.target.value;
    const updatedImageURLs = imageURLs.map((item) =>
      item.color.name === colorName
        ? { ...item, color: { ...item.color, clrCode: newColorCode } } // Update the color code
        : item
    );
    setImageURLs(updatedImageURLs);
  };

  const handleColorNameChange = (e, colorName) => {
    const newColorName = e.target.value;
    const updatedImageURLs = imageURLs.map((item) =>
      item.color.name === colorName
        ? { ...item, color: { ...item.color, name: newColorName } } // Update the color name
        : item
    );
    setImageURLs(updatedImageURLs);
  };

  return (
    <div className="m-4">
      <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Available Colors & Images</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {imageURLs.map((item, index) => (
          <div key={index} className="relative border rounded-lg overflow-hidden shadow-lg group">
            <div className="relative">
              <div
                className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-white dark:bg-gray-700 shadow rounded-full"
                style={{ backgroundColor: item.color.clrCode }}
              >
                {item.color.name}
              </div>

              <Image
                src={item.img}
                alt={item.color.name}
                width={200}
                height={200}
                className="w-full h-48 object-contain rounded-t-lg group-hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="absolute bottom-1 left-2 flex gap-2">
              <label className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-xs font-medium rounded px-2 py-1 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, item.color)} // Handle image upload
                />
              </label>

              {/* Color Picker */}
              <input
                type="color"
                className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full cursor-pointer"
                value={item.color.clrCode}
                onChange={(e) => handleColorChange(e, item.color.name)} // Handle color change
              />
            </div>

            <div className="w-[60%] absolute right-1 bottom-1 flex gap-2">
              <input
                type="text"
                placeholder="Product Color Name"
                className="w-full rounded-[7px] border-[1.5px] bg-gray-100 border-stroke bg-transparent px-5.5 py-1.5 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                value={item.color.name} // Display the current color name
                onChange={(e) => handleColorNameChange(e, item.color.name)} // Handle color name change
              />
              <input
                type="text"
                placeholder="Color Code"
                className="w-24 rounded-[7px] border-[1.5px] bg-gray-100 border-stroke bg-transparent px-5.5 py-1.5 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                value={item.color.clrCode} // Display the current color code
                onChange={(e) => handleColorChange(e, item.color.name)} // Handle color code change
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
