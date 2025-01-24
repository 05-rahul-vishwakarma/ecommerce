import axios from 'axios';
import { cookies } from 'next/headers';
import React from 'react';
import DyanamicProduct from '@/components/Product/DyanamicProduct';
import { redirect } from 'next/navigation';

export default async function page({ params }) {
    try {
        const slug = (await params)?.product

        const cookieStore = cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        // Redirect to login if accessToken is not available
        if (!accessToken) {
            redirect('/login'); // Replace '/login' with your actual login page route
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${(process.env.NEXT_PUBLIC_BUSINESS_NAME)}&slug=${slug}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        
        const product = response?.data?.data?.items[0];
                 

        return (
            <section>
                <DyanamicProduct productMain={product} />
            </section>
        );
    } catch (error) {
        return (
            <div>
                <h1>{error?.message}</h1>
                <p>Failed to fetch product data. Please try again later.</p>
            </div>
        );
    }
}
