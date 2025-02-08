import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialType } from "@/type/TestimonialType";
import Rate from "../Other/Rate";

interface TestimonialProps {
  data: TestimonialType;
  type: string;
}

const TestimonialItem: React.FC<TestimonialProps> = ({ data, type }) => {
  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="testimonial-item style-seven h-full">
      <div className="testimonial-main h-full">
        <Rate currentRate={data.rating} size={14} />
        <div className="text-button-uppercase text-secondary2 mt-4">
          Customer reviews
        </div>
        <div className="text-lg font-[600] normal-case desc  mt-2">
          {data.description}
        </div>
        <div className="text-button name text-secondary2 mt-4">{data.name}</div>
        <div className="caption2 text-secondary2 date text-sm">
          {currentDate}
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
