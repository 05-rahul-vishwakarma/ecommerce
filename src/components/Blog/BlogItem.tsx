"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@/type/BlogType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

interface BlogProps {
  data: BlogType;
  type: string;
}

const BlogItem: React.FC<BlogProps> = ({ data, type }) => {
  const router = useRouter();

  const handleBlogClick = (PK: string, SK: string) => {
    router.push(`/blog/id=${encodeURIComponent(PK)}&id2=${encodeURIComponent(SK)}`);
  };

  return (
    <>
      <div
        className="blog-item style-one h-full cursor-pointer"
        onClick={() => handleBlogClick(data?.PK, data?.SK)}
      >
        <div className="blog-main h-full block">
          <div className="blog-thumb rounded-[20px] overflow-hidden">
            <Image
              src={data?.BlogImage?.[0] || '/image3.png'}
              width={2000}
              height={1500}
              alt="blog-img"
              title="blog-img"
              className="w-full duration-500"
            />
          </div>
          <div className="blog-infor mt-7">

            <div className=" blog-title mt-3 duration-300 text-black font-medium leading-normal tracking-[0.8px]">
              {data?.title}
            </div>
            <div className="flex items-center gap-2 mt-2 ">
              <div className="blog-author caption1 text-secondary">
                by {data?.author}
              </div>
              <span className="w-[20px] h-[1px] bg-black"></span>
              <div className="blog-date caption1 text-secondary">
                {data?.createdAt}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BlogItem;
