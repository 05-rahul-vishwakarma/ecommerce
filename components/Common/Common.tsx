import { headers } from 'next/headers';
import React from 'react'
// import * as Icon from ""

export default function CommonLeftSideBar() {

  const items = [
    { icon: "", heading: "Dashboard" },
    { icon: "", heading: "Products" },
    { icon: "", heading: "Blogs" },
    { icon: "", heading: "Analytics" },
    { icon: "", heading: "Testimonials" },
    { icon: "", heading: "Users" },
  ];
  return (
    <div className=' h-full rounded-sm'>
      <h3 className='text-center font-semibold'>The Ribbon Pack</h3>
      <div className='mx-5 mb-5 sm:mb-0 mt-20'>
        {items.map((item, index) => (
          <div key={index} className='m-2 '>

            <ul className='w-24 m-auto text-start'>

              <li className=' mb-5 bg-purple-500 bg-purple hover:bg-white hover:text-purple'>
              <div className="icon-home text-2xl text-custom-purple-color"></div>
                <a>{item.heading}</a>
              </li>

            </ul>
          </div>
        ))}
      </div>

    </div>
  )
}
