'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";

interface Testimonial {
  PK: string;
  SK: string;
  name: string;
  rating: number;
  description: string;
  sku: string;
}

interface TestimonialTableProps {
  data: Testimonial[];
}

const TestimonialTable: React.FC<TestimonialTableProps> = ({ data: initialData }) => {
  const router = useRouter();
  const [data, setData] = useState<Testimonial[]>(initialData);

  const handleViewTestimonial = async (PK:string, SK: string) => {
    const encodedPK = encodeURIComponent(PK);
    const encodedSK = encodeURIComponent(SK);
 
    router.push(`/testimonial/${encodedPK}&${encodedSK}`);
  };
  const handleDelete = async (PK:string, SK: string) => {
    try {
      const encodedPK = encodeURIComponent(PK);
      const encodedSK = encodeURIComponent(SK);

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/meta-content/testimonial/delete?PK=${encodedPK}&SK=${encodedSK}`);
      setData((preData) =>
        preData.filter((item) => item.PK !== PK || item.SK !== SK),
      );
    } catch (error) {
      console.error("Error deleting item: ", error)

    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Testimonial List</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>

          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item.sku} className="transition-colors duration-300 hover:bg-gray-100 dark:bg-[#0000002a] dark:shadow-card dark:hover:bg-gray-600">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-left">{item.name}</td>
                <td className="px-4 py-2 text-center">{item.rating}</td>
                <td className="px-4 py-2 text-left">{item.description}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex space-x-4">
                    <button
                    onClick={() => handleViewTestimonial(item?.PK, item?.SK)}
                    className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">View</button>

                    <button onClick={() => handleDelete(item?.PK, item?.SK)} className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600">Delete</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TestimonialTable;