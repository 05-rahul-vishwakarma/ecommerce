"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useTestimonialStore } from "@/components/testimonial/store/testimonialStore";
import TestimonialDatePicker from '@/components/testimonial/testimonialDate';
import SubmitTestimonial from '@/components/testimonial/submitTestimonial'

export default function Testimonial() {
  const {
    setCustomerName,
    setCustomerImage,
    setDate,
    setRatings,
    setDescription,
    ratings,
  } = useTestimonialStore();

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append("ecommerce", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImagePreview(imageUrl);
        setCustomerImage(data?.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChangeRatings = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value <= 5) {
      setRatings(value);
    } else {
      e.target.value = ''; // Clear the input if the value is invalid
      alert("Please enter a rating between 0 and 5.");
    }
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
            placeholder={"Enter the Customer name"}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Description for the Ribbon"}
            <span className="text-red">*</span>
          </label>
          <textarea
            placeholder={"Enter descrition for your ribbon"}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="m-4 w-[75%]">
        <div>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {"Ratings "}
            <span className="text-red">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            placeholder={"Enter ratings"}
            className="w-[45%] mb-4 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={handleChangeRatings}
          />
        </div>
        <TestimonialDatePicker/>
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
