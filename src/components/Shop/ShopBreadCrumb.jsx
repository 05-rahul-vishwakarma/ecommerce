import BreadCrumbPart from "./BreadCrumbPart";
import FilterSide from './FilterSide';

export default function ShopBreadCrumb({ products, productDetails }) {
    return (
        <div>
            <BreadCrumbPart />
            <FilterSide sidebarData={productDetails} products={products} />
        </div>
    )
}
