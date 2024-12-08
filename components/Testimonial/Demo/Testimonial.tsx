import Image from 'next/image'
import React from 'react'

export default function Testimonial() {

  return (
    <div>
      <div>
        <div>
          <p>All Testimonial</p>
          <p>Home ${`>`} All Testimonial</p>
        </div>
        <div>
          <button className=''>ADD NEW TESTIMONIAL</button>
        </div>
      </div>
      <div>
        <button>APPROVED</button>
        <button>INREVIEW</button>
      </div>
      <div className='w-10 h-14 border-secondary2'>

        <div>
          <Image
            src={""}
            alt=''
            className='' />
          <p>What People Say</p>
          <p>Rating</p>
          <p>CUSTOMER REVIEWS</p>
          <p>Summary</p>
          <p>Fukuda E.</p>
          <p>November 10, 2023</p>
          <div>
            <button>ADD</button>
            <button>DELETE</button>
          </div>

        </div>
      </div>
    </div>
  )
}
