'use client';

import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTestimonialStore } from './store/testimonialStore';

export default function SubmitTestimonial() {

    function generateSKU(customerName,  timestamp) {
        // Take the first three characters of the product name and category, make them uppercase
        const namePart = customerName.slice(0, 3).toUpperCase();

        // Generate a unique identifier using the current timestamp or a random number
        const uniquePart = timestamp ? Date.now() : Math.floor(Math.random() * 10000);

        return `${namePart}-${uniquePart}`;
    }

    const sendTestimonialtData = async () => {
        const {
          customerName, customerImage, date, ratings, description
        } = useTestimonialStore.getState();

        // Construct the payload
        const payload = {
            businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE,
            sku: generateSKU(customerName, true),
            img: customerImage || "", // Assuming productImage or fallback to default image
          
            name: customerName,
            slug: `${customerName.toLowerCase().replace(/\s+/g, '-')}`,
            title: `Testimonial from ${customerName}`,
           date: date,
            ratings: ratings,
            description: description,
           
        };

       
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQSyI6IlNVQkhJX0VfTFREX1VTRVIjMGZiZjUxOTYtYjM4MC00M2NmLTk2OTgtYTAxZGFjMDkzYjcxIiwiU0siOiJQUk9GSUxFIzBmYmY1MTk2LWIzODAtNDNjZi05Njk4LWEwMWRhYzA5M2I3MSIsImlhdCI6MTczNTI5MTExNywiZXhwIjoxNzM3ODgzMTE3fQ.rBSa6aGtLzQYzn6R_7tSinYzwamqli-C7ZIN2s8a3lg";

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/testimonial`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Sending token in the headers
                    }
                }
            );
            toast.success('Successfully uploaded');
        } catch (error) {
            toast.error('Something went wrong');
        }
        set({name: ""})
        set({description: ""})
        
    };


    return (
        <button onClick={sendTestimonialtData} className="w-[40%] mt-8 justify-self-end flex justify-center mr-4 text-center mb-4 rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90  m-4 ">
            Submit
        </button>
    )
}
