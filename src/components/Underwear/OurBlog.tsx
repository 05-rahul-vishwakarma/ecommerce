'use client';
import BlogItem from "../Blog/BlogItem";
import { BlogType } from "@/type/BlogType";
import { blogListData } from "@/api/blogApis/getBlog";
import useSWR from 'swr';
import { Loader2 } from 'lucide-react';

const fetcher = async () => {
  const response = await blogListData();
  return response;
};

const OurBlog = () => {
  const { data: blogs, error, isLoading } = useSWR('blogs', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 300000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="news-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading3 text-center text-secondary">Our Blog</div>
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading3 text-center text-secondary">Our Blog</div>
          <div className="text-center text-red-500 mt-4">
            Failed to load blogs. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="news-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading3 text-center text-secondary">Our Blog</div>
          <div className="text-center text-gray-500 mt-4">
            No blogs available at the moment.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading3 text-center text-secondary">Our Blog</div>
        <div className="list-blog grid md:grid-cols-3 gap-[30px] md:mt-10 mt-6">
          {blogs?.map((blog: BlogType, index: number) => (
            <BlogItem key={index} data={blog} type="style-one" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
