'use client';

import React, { useState } from 'react';
import { useProductStore } from '../Product/store/useProduct';

const HandlePagination = ({ onPageChange, currentPage }) => {
    const { fetchProducts, lastEvaluatedKey, pushPrevKey, popPrevKey, prevKeyStack } = useProductStore();

    return (
        <div className="pagination flex gap-2 justify-center">
            <button
                onClick={() => {
                    const prevKey = popPrevKey();
                    fetchProducts(prevKey);
                    onPageChange(currentPage - 1);
                }}
                disabled={prevKeyStack.length === 0}
                className={`px-4 py-2 border rounded ${prevKeyStack.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Previous
            </button>
            <span className="px-4 py-2">{currentPage + 1}</span>
            <button
                onClick={() => {
                    pushPrevKey(lastEvaluatedKey);
                    fetchProducts(lastEvaluatedKey);
                    onPageChange(currentPage + 1);
                }}
                disabled={lastEvaluatedKey === null || lastEvaluatedKey === 'null'}
                className={`px-4 py-2 border rounded ${(lastEvaluatedKey === null || lastEvaluatedKey === 'null') ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Next
            </button>
        </div>
    );
};

export default HandlePagination;
