import React from 'react'

export default function Users() {
  return (
    <div>
      <div>
        <p>All Users</p>
        <p>Home ${`>`} All Users</p>
      </div>
      <div className='w-80 h-60'>
        Recent Active Users
        <table>
          <thead>
            <th>Name</th>
            <th>Joined Date</th>
            <th>Revenue</th>
            <th>Net Profit</th>
            <th>Status</th>
            <th>Actions</th>
       
          </thead>
          <tbody>
            <td>User 1</td>
            <td>Feb 5, 2020</td>
            <td>$253.82</td>
            <td>$60.76</td>
            <td>Action</td>
            <td>
              <button className=''>Block</button>
            </td>

          </tbody>
        </table>
      </div>
    </div>

  )
}
