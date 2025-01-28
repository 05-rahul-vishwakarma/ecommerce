"use client";

import { useState } from "react";
import Image from "next/image";
import { useProductStore } from "@/components/Products/store/useProductStore";
import axios from "axios";

const ProductImages = () => {
  const { setProductImage, setColors, imageURLs, setImageURLs } = useProductStore();

  const handleImageUpload = async (e, color) => {
    const file = e.target.files[0];
    if (!file) return;


    const formData = new FormData();
    formData.append('ecommerce', file);

    try {

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      setProductImage(data?.imageUrl);
      setColors({ name: color.name, code: color.clrCode });

      const updatedImageURLs = imageURLs.map((item) =>
        item.color.name === color.name ? { ...item, img: data?.imageUrl } : item
      );
      setImageURLs(updatedImageURLs);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const handleColorChange = (e, colorName) => {
    const newColorCode = e.target.value;
    const updatedImageURLs = imageURLs.map((item) =>
      item.color.name === colorName
        ? { ...item, color: { ...item.color, clrCode: newColorCode } }
        : item
    );
    setImageURLs(updatedImageURLs);
  };

  const handleColorNameChange = (e, colorName) => {
    const newColorName = e.target.value;
    const updatedImageURLs = imageURLs.map((item) =>
      item.color.name === colorName
        ? { ...item, color: { ...item.color, name: newColorName } }
        : item
    );
    setImageURLs(updatedImageURLs);
  };

  return (
    <div className="m-4">
      <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
        Available Colors & Images
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {imageURLs.map((item, index) => (
          <div
            key={index}
            className="relative border rounded-lg overflow-hidden shadow-lg group"
          >
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
                unoptimized
              />
            </div>

            <div className="absolute bottom-1 left-2 flex gap-2">
              <label className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-xs font-medium rounded px-2 py-1 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, item.color)}
                />
              </label>

              <input
                type="color"
                className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full cursor-pointer"
                value={item.color.clrCode}
                onChange={(e) => handleColorChange(e, item.color.name)}
              />
            </div>

            <div className="absolute bottom-1 right-2 flex gap-2 w-full max-w-xs">
              <input
                type="text"
                placeholder="Color Name"
                className="flex-1 rounded-lg border bg-gray-100 px-3 py-1.5 text-xs text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={item.color.name}
                onChange={(e) => handleColorNameChange(e, item.color.name)}
              />
              <input
                type="text"
                placeholder="Color Code"
                className="w-24 rounded-lg border bg-gray-100 px-3 py-1.5 text-xs text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={item.color.clrCode}
                onChange={(e) => handleColorChange(e, item.color.name)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
