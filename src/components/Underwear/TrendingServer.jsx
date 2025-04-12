import React from 'react'
import { productCategory, searchProducts } from '../../api/productApis/getPostApi'
import TrendingProduct from './TrendingProduct'

export default async function TrendingServer({ searchQuery = '', category = '', productType = '', minPrice = 0, maxPrice = 0, sort = '', page = 1, limit = 8 }) {
    // Fetch categories for filtering options
    let categories = [];
    let products = [];
    
    try {
        categories = await productCategory() || [];
        
        // Fetch products with search and filter parameters
        const searchParams = {
            query: searchQuery,
            category: category,
            productType: productType,
            minPrice: minPrice > 0 ? minPrice : 0,
            maxPrice: maxPrice > 0 ? maxPrice : 0,
            sort: sort,
            page: page > 0 ? page : 1,
            limit: limit > 0 ? limit : 8
        };
        
        products = await searchProducts(searchParams) || [];
    } catch (error) {
        console.error("Error in TrendingServer:", error);
        // Continue with empty arrays if there's an error
    }
    
    return (
        <TrendingProduct 
            category={categories} 
            products={products} 
            searchParams={{
                query: searchQuery,
                category: category,
                productType: productType,
                minPrice: minPrice,
                maxPrice: maxPrice,
                sort: sort,
                page: page,
                limit: limit
            }}
            start={0} 
            limit={limit} 
        />
    )
}
