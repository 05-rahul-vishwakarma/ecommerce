'use client';

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useProductStore } from '../Product/store/useProduct';

interface Props {
    onPageChange: (selected: number) => void;
}

const HandlePagination: React.FC<Props> = ({ onPageChange }) => {
    const { fetchProducts, lastEvaluatedKey } = useProductStore();
    const [pageCount, setPageCount] = useState(2); // Initially show 1 and 2 pages

    useEffect(() => {
        if (!lastEvaluatedKey) {
            setPageCount((prev) => prev + 1); // Add a new page if lastEvaluatedKey exists
        }
    }, [lastEvaluatedKey]);

    return (
        <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => {
                if (selected === 1 && lastEvaluatedKey !== null) {
                    fetchProducts(lastEvaluatedKey);
                }
                onPageChange(selected);
            }}
            containerClassName="pagination"
            activeClassName="active"
        />
    );
};

export default HandlePagination;
