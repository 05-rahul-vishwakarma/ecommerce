'use client';

import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Editor from '@/components/Blogs/Creation/ReactQuill';
import axios from 'axios';

export default function CreationForm() {
    const [content, setContent] = useState('');
    const [createdTime, setCreatedTime] = useState('');
    const [updatedTime, setUpdatedTime] = useState('');
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    // Auto-fill created and updated time on component mount
    useEffect(() => {
        const currentTime = new Date().toISOString().slice(0, 16);
        setCreatedTime(currentTime);
        setUpdatedTime(currentTime);
    }, []);


    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('ecommerce', file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json(); // Ensure we get the response as JSON
                if (!result.imageUrl) {
                    console.error('Error uploading image');
                    return;
                }

                // Update the image at the specified index
                setImages((prevImages) => {
                    const newImages = [...prevImages];
                    newImages[index] = result.imageUrl; // Update the image at the given index
                    return newImages;
                });
            } catch (error) {
                console.error('Image upload failed:', error);
            }
        }
    };

    const handleSubmit = () => {
        const currentTime = new Date().toISOString().slice(0, 16);
        setUpdatedTime(currentTime);



        const blogData = {
            metaTitle: title,
            metaDescription: description,
            title,
            description,
            content,
            author,
            color,
            BlogImage: images,
            openGraph: {
                image: images,
                description: description,
                siteName: 'the ribbon pack',
                type: 'blog',
                title: title,
                locale: en_US,
                imageAlt: 'blog',
                // url: openGraphData.url,
                // article: {
                //     modifiedTime: openGraphData.article.modifiedTime,
                //     section: openGraphData.article.section,
                //     publishedTime: openGraphData.article.publishedTime,
                //     author: openGraphData.article.author,
                //     tags: openGraphData.article.tags,
                // },
            },
            twitterCard: {
                description: description,
                image: images,
                site: 'the ribbon pack',
                // creator: twitterCardData.creator,
                title: title,
                card: '',
            },

        };
        // {
        //     "businessType":"SUBHI_E_LTD",
        //     "category":"game"
        //     // "childs":[
        //     //     "ponyy",
        //     //     "statrsa"
        //     // ]
        //     }
        // try {
        //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meta-content/blog`, {

        //     })
        // } catch (error) {
        //     console.log(error);
        // }

        // Send the data to the server (you can replace this with your actual API call)
        console.log('Blog Data:', blogData);
        // fetch('/api/blogs', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(blogData),
        // });
    };

    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6'>
            <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">Create New Blog Post</h2>
            <div className="space-y-6">

                <div className='flex space-x-4'>
                    <div className='w-[60%]'>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            {"Title"} <span className="text-red">*</span>
                        </label>
                        <input
                            type='text'
                            placeholder={'Enter Blog Title'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            {"Author"} <span className="text-red">*</span>
                        </label>
                        <input
                            type='text'
                            placeholder={'Author Name'}
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Description
                    </label>
                    <textarea
                        rows={6}
                        placeholder="Write the Description"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    ></textarea>
                </div>

                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Blog Thumbnail Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 0)}
                        className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                </div>

                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Additional Images
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 1)}
                        className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {images.length > 0 && (
                        <ul className="mt-2 text-sm text-green-500">
                            {images.map((img, index) => (
                                <li key={index}>Image {index + 1} Selected</li>
                            ))}
                        </ul>
                    )}
                </div>

                <Editor content={content} setContent={setContent} />

                <div className='flex space-x-4 '>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Created Time
                        </label>
                        <input
                            type="datetime-local"
                            value={createdTime}
                            readOnly
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Updated Time
                        </label>
                        <input
                            type="datetime-local"
                            value={updatedTime}
                            readOnly
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-primary text-white px-6 py-2 rounded-[7px] hover:bg-primary-dark transition"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}