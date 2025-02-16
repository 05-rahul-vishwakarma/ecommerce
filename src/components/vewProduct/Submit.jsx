'use client';

import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useProductStore } from '../Products/store/useProductStore';

export default function Submit({PK,SK}) {


    const sendProductData = async () => {
        const {
            productWidth, productMeter,
        } = useProductStore.getState();

        const payload = {
            additionalInformation: [
                {
                    key: "width",
                    value: productWidth,
                },
                {
                    key: "length",
                    value: productMeter,
                },
            ],
        };

        const token = localStorage.getItem('accessToken');

        if (!token) {
            toast.error('Unauthorized: No token found');
            return;
        }

        console.log(payload);


        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/product/update?PK=${encodeURIComponent(PK)}&SK=${encodeURIComponent(SK)}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Sending token in the headers
                    }
                }
            );
            if (response) {
                toast.success('Successfully uploaded');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }

    };


    return (
        <button onClick={() => sendProductData()} className="w-[40%] justify-self-end flex justify-center mr-4 text-center mb-4 rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90  m-4 ">
            Update Product
        </button>
    )
}