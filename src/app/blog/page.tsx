"use client";
import React, { useState } from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import blogData from "@/data/Blog.json";
import BlogItem from "@/components/Blog/BlogItem";
import Footer from "@/components/Footer/Footer";
import HandlePagination from "@/components/Other/HandlePagination";
import { useRouter } from "next/navigation";
import MenuFour from "@/components/Header/MenuFour";

export default function page() {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9;
  const offset = currentPage * productsPerPage;
  const router = useRouter();

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuFour props="bg-transparent" />
      </div>

      <Footer />
    </>
  );
}
