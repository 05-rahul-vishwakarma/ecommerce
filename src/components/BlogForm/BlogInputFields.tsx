"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
interface BlogData {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  image: File | string | null; // Allow both File and base64 string
}

interface BlogInputFieldsProps {
  blogData: BlogData;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function BlogInputFields({
  blogData,
  onInputChange,
  onImageUpload,
}: BlogInputFieldsProps) {
  return (
    <>
      <div className="mb-4">
        <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={blogData.title}
          onChange={onInputChange}
          className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Active textarea
        </label>
        <textarea
          value={blogData.content}
          onChange={onInputChange}
          rows={6}
          placeholder="Active textarea"
          className="w-full rounded-[7px] border-[1.5px] border-primary bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:bg-dark-2 dark:text-white"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={blogData.author}
          onChange={onInputChange}
          className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={blogData.category}
          onChange={onInputChange}
          className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <input
          type="text"
          name="tags"
          value={blogData.tags}
          onChange={onInputChange}
          className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
          Image
        </label>
        <input
          type="file"
          name="image"
          onChange={onImageUpload}
          className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
    </>
  );
}
