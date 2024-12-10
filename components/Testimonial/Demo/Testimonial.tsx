import { AdminTestimonialType } from '@/type/AdminTestimonialType'
import Image from 'next/image'
import React from 'react'
import testimonial from '@/data/Testimonial.json';
import { motion } from 'framer-motion';



interface AdminTestimonialProps {
  data: AdminTestimonialType[]; //for multiple testimonial
  type: string;
}

const Testimonial: React.FC<AdminTestimonialProps> = ({ data, type }) => {

  return (

    <div className='h-full flex'>
      <div className='left w-1/6 bg-custom-purple-color text-white'>
        monika
      </div>
      <div className='right w-5/6 ml-10 mt-10'>
      <div className='flex justify-center'>
      <div className='flex justify-between w-[92%]'>
          <div className=''>
            <p className='text-purple font-semibold'>All Testimonials</p>
            <p className='text-secondary'>Home {`>`} All Testimonials</p>
          </div>
          <div>
            <button className=' bg-custom-purple-color text-white hover:bg-purple focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-10 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>ADD NEW TESTIMONIAL</button>
          </div>
        </div>
      </div>
     

        <div className='flex justify-center'>
          <div className="bg-white flex justify-center gap-3 items-center mt-20 w-1/4 h-16 shadow-lg rounded-lg">
            <button className="relative text-purple inline-flex items-center justify-center px-5 py-2.5 text-md font-medium  rounded-lg border border-purple hover:bg-purple hover:text-white">
           
                APPROVED
              
            </button>
            <button className="relative text-purple inline-flex items-center justify-center px-5 py-2.5 text-md font-medium  rounded-lg border border-purple hover:bg-purple hover:text-white ">
              IN REVIEW
            </button>
          </div>

        </div>



        <div className=' w-[97%] mt-10 flex flex-wrap justify-center gap-6'>
          {data.map((testimonial) => (
            <div key={testimonial.id} className='p-5 mt-5 rounded-lg shadow-lg bg-white max-w-sm '>
              <div className="flex justify-center ">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={90}
                  height={90}
                  className='rounded-full justify-center' />
              </div>

              <div className='mt-3'>
                <p className='font-semibold text-4xl mb-3'>{testimonial.title}</p>
                <p>{testimonial.star}</p>
              </div>

              <p className="text-secondary2 text-lg mt-2 mb-2">{testimonial.category}</p>
              <p className='text-secondary mb-4'>{testimonial.description}</p>
              <div className="text-gray-500 text-sm">
                <p>{testimonial.name}</p>
                <p className="text-secondary2 text-sm mt-2 mb-2">{testimonial.date}</p>
              </div>

              <div className='mt-5 flex justify-center gap-2'>
                <button className="bg-yellow text-white font-medium text-md rounded-lg w-[120px] hover:bg-green px-5 py-2.5 me-2 mb-2">ADD</button>
                <button className="bg-red text-white font-medium text-md rounded-lg w-[120px] hover:bg-custom-red-color px-5 py-2.5 me-2 mb-2">DELETE</button>
              </div>

            </div>

          ))}

        </div>

      </div>


    </div>



  )
}

export default Testimonial;
