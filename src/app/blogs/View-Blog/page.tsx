"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Use next/image for better optimization

interface BlogData {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  image: string; // Store image URL or base64 string
  createdAt: string; // Store the creation date as a string
}

export default function ViewBlogsPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    setBlogs(storedBlogs);
  }, []);

  if (blogs.length === 0) {
    return (
      <div className="container mx-auto px-6 py-10 text-center text-gray-700 dark:text-gray-300">
        <h1 className="text-3xl font-bold mb-4">No Blogs Found</h1>
        <p className="text-lg">Start by creating your first blog!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-900"
          >
            {blog.image && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized // Allow base64 or non-optimized images
                />
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <strong>Author:</strong> {blog.author}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <strong>Created At:</strong>{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {blog.content}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <strong>Category:</strong> {blog.category}
            </p>
            <Link
              href={`/blogs/${blog.id}`}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            >
              View Blog
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
