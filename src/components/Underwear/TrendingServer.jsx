import React from 'react'
import { productCategory } from '../../api/productApis/getPostApi'
import TrendingProduct from './TrendingProduct'

export default async function TrendingServer() {
    const category = await productCategory()

    if (!category || category.length === 0) {
        return <div>No trending categories found.</div>
    }

    return <TrendingProduct category={category} start={0} limit={8} />
}
