import React from 'react'
import { productListData } from '../../api/productApis/getPostApi'
import FeaturedProduct from './FeaturedProduct'

export default async function FeaturedServer() {
    const data = await productListData()

    console.log(data,'data');
    

    if (!data || data.length === 0) {
        return <div>No featured products available.</div>
    }

    return <FeaturedProduct data={data} />
}
