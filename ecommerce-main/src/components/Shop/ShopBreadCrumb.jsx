'use client';

import axios from "axios";
import BreadCrumbPart from "./BreadCrumbPart";
import FilterSide from './FilterSide';
import { useEffect, useState } from "react";

export default function ShopBreadCrumb({ products, productDetails }) {

    return (
        <div>
            <BreadCrumbPart />
            <FilterSide sidebarData={productDetails} products={products} />
        </div>
    )
}
