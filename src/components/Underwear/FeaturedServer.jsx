import React from 'react'
import FeaturedProduct from './FeaturedProduct'
import axios from 'axios';

const dataFetch = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&limit=12`)
      return response?.data?.data?.items
    } catch (error) {
      console.log(error,'error');
    }
  }

export default async function FeaturedServer() {

    const data = await dataFetch()

    console.log(data, 'data');

    if (!data || data.length === 0) {
        return <div>No featured products available.</div>
    }

    // Rotate the data array based on the current hour
    const hour = new Date().getHours();
    const rotatedData = data.slice(hour % data.length).concat(data.slice(0, hour % data.length));

    return <FeaturedProduct data={rotatedData} />
}
