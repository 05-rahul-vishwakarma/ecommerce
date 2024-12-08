import React from 'react'

export default function CommonLeftSideBarcom() {
  return (
    <div className='w-1/12 h-full border-2 border-e-white bg-blue-900'>
    <div className='mx-5 mb-5 sm:mb-0 '>
      <ul className='w-24 m-auto text-center'>
        <li className=' mb-5'>
          <a>Dashboard</a>
        </li>
        <li className=' mb-5 bg-purple-500 hover:bg-white hover:text-purple'>
          <a>Product</a>
        </li>
        <li className=' mb-5'>
          <a>Blogs</a>
        </li>
        <li className=' mb-5'>
          <a>Analytics</a>
        </li>
        <li className=' mb-5'>
          <a>Testimonials</a>
        </li>
        <li className=' mb-5'>
          <a>Users</a>
        </li>
      </ul>
    </div>
  </div>
  )
}
