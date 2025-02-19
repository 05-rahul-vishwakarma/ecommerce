import React from 'react'
import { productListData } from '../../api/productApis/getPostApi'
import FeaturedProduct from './FeaturedProduct';

export default async function FeaturedServer() {
    const data = await productListData()
    return (
        <FeaturedProduct data={data} />
    )
}
