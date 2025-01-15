'use client';
import { useProductStore } from '@/components/Products/store/useProductStore';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

const BasicProductsDetails = () => {
    const {
        setProductName,
        setProductTitle,
        setUnit,
        setProductImage, setSubType, subType
    } = useProductStore();

    // State to hold the image preview
    const [imagePreview, setImagePreview] = useState(null);

    // Handle image change
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            const formData = new FormData();
            formData.append("Blog", file);

            const response = await axios.post(
                `https://dietghar.in/api/v1/file/ImageUpload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response?.data?.data[0], 'response');


            reader.onloadend = () => {
                const imageUrl = reader.result;
                setImagePreview(imageUrl); // Set the preview of the image
                setProductImage(response?.data?.data[0]); // Set the image URL in the store
            };
            reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
        }
    };

    return (
        <div>
            <div className='flex space-x-2 m-4 ' >
                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Product Name'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type='text'
                        placeholder={'Enter the product name'}
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Product Title'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type='text'
                        placeholder={'Enter the product title'}
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        onChange={(e) => setProductTitle(e.target.value)}
                    />
                </div>


                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Product Unit'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type='text'
                        placeholder={'Enter the product unit'}
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>


                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        {'Sub Type'}
                        <span className="text-red">*</span>
                    </label>
                    <input
                        type='text'
                        placeholder={'Enter the Sub Type Category'}
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        onChange={(e) => setSubType(e.target.value)}
                    />
                </div>
            </div>

            <div className='w-[75%] m-4'>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Product Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    onChange={handleImageChange} // Handle image upload
                />

                {/* Show the image preview if the image is selected */}
                {imagePreview && (
                    <div className="mt-4">
                        <Image
                            src={imagePreview}
                            width={350}
                            height={300}
                            alt="Product Preview"
                            className="w-full rounded-[7px] shadow-lg"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasicProductsDetails;
