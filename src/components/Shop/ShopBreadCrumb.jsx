'use client'
import { useProductStore } from "../Product/store/useProduct";
import BreadCrumbPart from "./BreadCrumbPart";
import FilterSide from './FilterSide';
import { useEffect } from "react";

export default function ShopBreadCrumb() {
    const { products, fetchProducts  , categories , fetchCategories } = useProductStore();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    return (
        <div>
            <BreadCrumbPart />
            <FilterSide sidebarData={categories} products={products} />
        </div>
    )
}
