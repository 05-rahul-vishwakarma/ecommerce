
import axios from 'axios';
import React, { Suspense } from 'react';
import BlogTable from '@/components/Blogs/BlogLists/BlogTable';

const fetchBlogList = async () => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meta-content/blog/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_TYPE}`);
        console.log(response);

        return response?.data?.data?.items;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <section className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                <BlogList />
            </section>
        </Suspense>
    );
}

const BlogList = async () => {
    const data = await fetchBlogList();
    return (
        <BlogTable data={data} />
    );
};