"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// Dynamically import JoditEditor to disable SSR
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// Define the BlogData interface
interface BlogData {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  image: string | ArrayBuffer | null; // Updated type for FileReader compatibility
  createdAt?: string; // Optional field for the created timestamp
}

export default function CreateBlogPage() {
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    image: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setBlogData({ ...blogData, image: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditorChange = (newContent: string) => {
    setBlogData({ ...blogData, content: newContent });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Retrieve existing blogs from localStorage
    const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

    // Add new blog with a unique ID and createdAt timestamp
    const newBlog = {
      ...blogData,
      id: blogs.length + 1,
      createdAt: new Date().toLocaleString(), // Add timestamp
    };

    // Save the new blog to localStorage
    localStorage.setItem("blogs", JSON.stringify([...blogs, newBlog]));

    // Show success toast
    toast.success("Blog successfully submitted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Reset form fields
    setBlogData({
      title: "",
      content: "",
      author: "",
      category: "",
      tags: "",
      image: null,
    });
  };

  return (
    <div className="container mx-auto max-w-2xl p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Create a New Blog
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter blog title"
            value={blogData.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Author Input */}
        <div>
          <label
            htmlFor="author"
            className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter author name"
            value={blogData.author}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Category Input */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter blog category"
            value={blogData.category}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Tags Input */}
        <div>
          <label
            htmlFor="tags"
            className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter tags, separated by commas"
            value={blogData.tags}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="imageUpload"
            className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border rounded-lg shadow-sm"
          />
          {blogData.image && (
            <div className="mt-4 flex justify-center">
              <Image
                src={blogData.image as string}
                alt="Image Preview"
                width={200}
                height={200}
                className="rounded-lg shadow-lg"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div>
          <label
            className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Blog Content
          </label>
          <JoditEditor
            value={blogData.content}
            onChange={handleEditorChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Blog
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
