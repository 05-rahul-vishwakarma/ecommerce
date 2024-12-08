import React from 'react'

export default function LatestOrder() {
  return (
    <div>
      <p>Latest Orders</p>
      <p>More ${`->`} </p>
      <table >
        <thead className='bg-custom-purple-color'>
          <th>Products</th>
          <th>QTY</th>
          <th>Date</th>
          <th>Revenue</th>
          <th>Net Profit</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}
