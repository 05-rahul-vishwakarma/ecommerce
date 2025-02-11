import { cookies } from 'next/headers';

export async function getAccessToken() {
    const nextCookies = cookies();
    return (await nextCookies).get('accessToken')?.value || null;
}

import { getAccessToken } from "@/utils/getAccessToken";
import { redirect } from 'next/navigation';

export async function getProfileData() {
    const accessToken = getAccessToken();

    if (!accessToken) {
        redirect('/login'); 
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: 'no-store', // Ensures fresh data on each request
        });

        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`);

        return await res.json();
    } catch (error) {
        console.error("Profile fetch failed:", error);
        return null;
    }
}

export async function sendOtp() {
    
}