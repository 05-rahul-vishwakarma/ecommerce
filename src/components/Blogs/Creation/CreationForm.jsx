'use client';

import React, { useEffect, useCallback } from 'react';
import 'react-quill/dist/quill.snow.css';
import Editor from '@/components/Blogs/Creation/ReactQuill';
import axios from 'axios';
import { useBlogStore } from '../store/useBlogStore';

export default function CreationForm() {
    const {
        content,
        setContent,
        createdTime,
        setCreatedTime,
        updatedTime,
        setUpdatedTime,
        images,
        setImages,
        title,
        setTitle,
        author,
        setAuthor,
        description,
        setDescription,
        metaTitle,
        setMetaTitle,
        metaDescription,
        setMetaDescription,
        isSubmitting,
        setIsSubmitting,
    } = useBlogStore();

    useEffect(() => {
        const currentTime = new Date().toISOString().slice(0, 16);
        setCreatedTime(currentTime);
        setUpdatedTime(currentTime);
    }, [setCreatedTime, setUpdatedTime]);

    const uploadFile = useCallback(async (file) => {
        const formData = new FormData();
        formData.append('ecommerce', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (!result.imageUrl) throw new Error('Upload failed');
            return result.imageUrl;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    }, []);

    const handleThumbnailUpload = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const imageUrl = await uploadFile(file);
            if (imageUrl) {
                setImages((prev) => [imageUrl, ...prev.slice(1)]);
            }
        } catch (error) {
            console.error('Thumbnail upload failed:', error);
        }
    }, [uploadFile, setImages]);

    const handleAdditionalImagesUpload = useCallback(async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        try {
            const uploadPromises = files.map(file => uploadFile(file));
            const newUrls = (await Promise.all(uploadPromises)).filter(url => url);

            setImages((prev) => [...prev, ...newUrls]);
        } catch (error) {
            console.error('Additional images upload failed:', error);
        }
    }, [uploadFile, setImages]);

    const handleSubmit = useCallback(async () => {
        setIsSubmitting(true);
        const currentTime = new Date().toISOString().slice(0, 16);
        setUpdatedTime(currentTime);

        const {
            metaTitle,
            metaDescription,
            title,
            description,
            content,
            author,
            images
        } = useBlogStore.getState();

        const blogData = {
            businessType:process.env.NEXT_PUBLIC_BUSINESS_TYPE,
            metaTitle,
            metaDescription,
            title,
            description,
            content,
            author,
            BlogImage: images,
            openGraph: {
                image: images,
                description: metaDescription,
                siteName: 'the ribbon pack',
                type: 'blog',
                title: metaTitle,
                locale: 'en_US',
                imageAlt: 'blog',
            },
            twitterCard: {
                description: metaDescription,
                image: images,
                site: 'the ribbon pack',
                title: metaTitle,
            },
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/meta-content/blog`,
                blogData
            );
            console.log('Blog submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting blog:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [setIsSubmitting, setUpdatedTime]);

    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6'>
            <h2 className="text-2xl font-bold mb-6 text-dark dark:text-white">Create New Blog Post</h2>
            <div className="space-y-6">

                <div className='flex space-x-4'>
                    <div className='w-[60%]'>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Title <span className="text-red">*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Blog Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Author <span className="text-red">*</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Author Name'
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
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Blog Thumbnail Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
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
                        onChange={handleAdditionalImagesUpload}
                        className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {images.length > 1 && (
                        <div className="mt-2 text-sm text-green-500">
                            {images.length - 1} additional image(s) selected
                        </div>
                    )}
                </div>

                <Editor content={content} setContent={setContent} />

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-dark dark:text-white">SEO Section</h2>
                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                            Meta Description
                        </label>
                        <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>

                <div className='flex space-x-4'>
                    <div className="flex-1">
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

                    <div className="flex-1">
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
                        disabled={isSubmitting}
                        className={`bg-primary text-white px-6 py-2 rounded-[7px] transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                            }`}
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}