'use client';

import React from 'react'
import { useProductStore } from '../Product/store/useProduct'

export default function HandlePagination() {
    const { lastEvaluatedKey, fetchMoreProducts } = useProductStore();

    // Hide button if lastEvaluatedKey is null or empty string
    if (!lastEvaluatedKey || lastEvaluatedKey === 'null') {
        return null;
    }
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}></span>
            <button
                style={{
                    padding: '10px 28px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#1976d2',
                    color: '#fff',
                    fontWeight: '500',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
                }}
                onClick={() => fetchMoreProducts(lastEvaluatedKey)}
                onMouseOver={e => e.currentTarget.style.background = '#1565c0'}
                onMouseOut={e => e.currentTarget.style.background = '#1976d2'}
            >
                Load More
            </button>
        </div>
    )
}
