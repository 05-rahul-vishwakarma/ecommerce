'use client'
import React, { useEffect } from 'react'
import ViewTestimonial from '@/components/testimonial/viewTestimonial';
import { useTestimonialStore } from '@/components/testimonial/store/testimonialStore';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function DyanamicPage() {
  const params = useParams();

  const slug = decodeURIComponent(params?.slug);
  const id = slug.split('&');
  console.log(id);
  const PK = id[0];
  const SK = id[1];

  const {
    setCustomerName,
    setRating,
    setDescription,
    setCustomerImage,
  } = useTestimonialStore();

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meta-content/testimonial/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}&PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`);
        console.log(response);
        const testimonialData = response?.data?.data[0];

        setCustomerName(testimonialData?.name || '');
        setCustomerImage(testimonialData?.img || '');
        setDescription(testimonialData?.description || '');
        setRating(testimonialData?.rating || '');

      } catch (error) {
        console.error('Error fetching product data', error);
      }
    };
    fetchTestimonial();
  }, [setCustomerName, setDescription, setCustomerImage, setRating, PK, SK]);
  return (

    <section className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
      <ViewTestimonial />
    </section>
  )
}
