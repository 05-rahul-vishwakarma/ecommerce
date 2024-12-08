import Image from 'next/image'
import React from 'react'

export default function Blogs() {
  return (
    <div>
      <div>
        <div>
          <p>All Blogs</p>
          <p>Home ${`>`} All Blogs</p>
        </div>
        <div>
          <button>ADD NEW BLOG</button>
        </div>
      </div>

      <div>
        <Image
        src={""}
        alt=''
        className=''/>
        <p>RIBBONS</p>
       <p>Unlocking the Secrets of Anti-Aging:</p>
       <p>Effective Strategies and Products</p>
       <p>by Louis Ancelotti -- Dec 21, 2023</p>
       <div>
        <button>Update</button>
        <button>Delete</button>
       </div>
      </div>
    </div>
  )
}
