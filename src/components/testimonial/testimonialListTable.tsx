'use client'

const TestimonialTable = () => {
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Testimonial List</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>

          </thead>
          <tbody>

          </tbody>
        </table>

      </div>
    </div>
  )
}