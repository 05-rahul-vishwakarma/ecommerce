import axios from 'axios';
import { cookies } from 'next/headers';
import React from 'react';
import DyanamicProduct from '@/components/Product/DyanamicProduct';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

export default async function page({ params }) {
    try {
        const slug = (await params)?.product;

        const cookieStore = cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        // Redirect to login if accessToken is not available
        if (!accessToken) {
            toast.error('Login First');
            redirect('/login'); // Redirects to the login page
            return null; // Stop further execution
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/product/get?businessType=${process.env.NEXT_PUBLIC_BUSINESS_NAME}&slug=${slug}`,
            {},
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
        redirect('/login');
        return null;
    }
}
