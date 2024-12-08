import Image from 'next/image';
import { title } from 'process';
import React from 'react'

export default function RevenueByDeviceAndTraffic() {
  const items = [
    { title: "Revenue by device", more: "", image: "", desktop: "$830.03", percentage: "64.2%", },
    { title: "Revenue by device", more: "", image: "", desktop: "$830.03", percentage: "64.2%", },
  ];
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className=' flex w-1/2 h-[25px] bg-white rounded-[5px] shadow-secondary2'>
          <h4>{item.title}</h4>
          <Image
          src={""}
          alt='img'/>
        </div>
      ))}

    </div>
  )
}
