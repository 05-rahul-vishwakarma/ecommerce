import React from 'react'
import Testimonials from '@/components/Testimonial/Demo/Testimonial'
import testimonialsData from '@/data/Testimonial.json';

export default function Testimonial() {
  return (
    <div>
      <Testimonials data={testimonialsData} type='approved'/>
    </div>
  )
}
