import axios from 'axios';
import React, { Suspense } from 'react'
import TestimonialListTable from '@/components/testimonial/testimonialListTable'

const fetchTestimonialLists = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meta-content/testimonial/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}`)
    return response?.data?.data?.items;
  } catch (error) {
    console.error('Error fetching Testimonials!', error);
    return [];
  }
}


export default function page() {
  return (
    <Suspense fallback={<div>
      Loading Testimonials...
    </div>}>
    <section className='rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card'>
      <TestimonialList/>
    </section>
    </Suspense>
  )
}

const TestimonialList = async () => {
  const data = await fetchTestimonialLists();
  return (
    <TestimonialListTable data={data}/>
  )
}
