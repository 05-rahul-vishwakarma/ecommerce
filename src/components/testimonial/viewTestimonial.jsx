"use client";
import React, { useState } from "react";
import SubmitTestimonial from "./submitTestimonial";
import { useTestimonialStore } from "./store/testimonialStore";
import Image from "next/image";

export default function ViewTestimonial() {
  const [imagePreview, setImagePreview] = useState("");
  const {
    customerName,
    rating,
    description,

    setCustomerName,
    setCustomerImage,
    setDate,
    setRating,
    setDescription,
  } = useTestimonialStore();

  const handleCustomerNameChange = (e) => {
    setCustomerName(String(e.target.value));
  };
  const handleChangeRatings = (e) => {
    setRating(Number(e.target.value));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Read the selected image and update preview
    const reader = new FileReader();
    reader.onload = () => setCustomerImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <section className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="m-4 grid grid-cols-2 space-x-2 ">
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Customer Name"}
            <span className="text-red">*</span>
          </label>
          <input
            type="text"
            value={customerName}
            placeholder={"Enter the Customer name"}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={handleCustomerNameChange}
          />
        </div>
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Ratings "}
            <span className="text-red">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={rating}
            placeholder={"Enter ratings"}
            className="mb-4 w-[75%] rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={handleChangeRatings}
          />
        </div>

        <div className="">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Description for the Ribbon"}
            <span className="text-red">*</span>
          </label>
          <textarea
            placeholder={"Enter descrition for your ribbon"}
            value={description}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={handleDescriptionChange}
          />
        </div>
      </div>

      <div className="m-4 w-[75%]">
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Customer Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          onChange={handleImageChange} // Handle image upload
        />

        {/* Show the image preview if the image is selected */}
        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              width={350}
              height={300}
              alt="Product Preview"
              className="w-full rounded-[7px] shadow-lg"
            />
          </div>
        )}
      </div>

      <div>
        <SubmitTestimonial />
      </div>
    </section>
  );
}
