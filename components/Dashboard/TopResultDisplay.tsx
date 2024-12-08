import React from 'react'

export default function TopResultDisplay() {

  const items = [
    { title: "Revenue", result: "$7,825", percentage: "+ 22%", graph: "" },
    { title: "Revenue", result: "$7,825", percentage: "+ 22%", graph: "" },
    { title: "Revenue", result: "$7,825", percentage: "+ 22%", graph: "" },
    { title: "Revenue", result: "$7,825", percentage: "+ 22%", graph: "" },
  ];

  return (
    <div className='w-4 h-2'>
      {items.map((item, index) => (
        <div key={index} className='flex flex-row bg-pink-300'>
          <div className='w-1/2'><h4 className='text-red-400'>{item.title}</h4>
            <p className='text-blue-400'>{item.result}</p></div>
          <div className='w-1/2'>  <p>{item.percentage}</p>
            <p>{item.graph}</p></div>

        </div>
      ))}

    </div>
  )
}
