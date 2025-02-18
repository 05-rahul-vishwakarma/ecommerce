"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function DefaultLayout({
  Children,
}: {
  Children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const router = useRouter();

  if (!accessToken) {
    router.push('/auth/signin')
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {Children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
