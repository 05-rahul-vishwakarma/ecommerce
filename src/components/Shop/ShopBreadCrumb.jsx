'use client';

import axios from "axios";
import BreadCrumbPart from "./BreadCrumbPart";
import FilterSide from './FilterSide';
import { useEffect, useState } from "react";

export default function ShopBreadCrumb() {

    const [products, setProducts] = useState([])

    const getProduct = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}`, {
                "keys": ["productType", "price", "category"]
            })
            setProducts(response?.data?.data?.items)

        } catch (error) {
            console.error("Error on Fetching Products ", error)
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>
            <BreadCrumbPart />
            <FilterSide data={products} />
        </div>
    )
}
