'use client';

import React from 'react';
import useBlogStore from '../store/useBlogStore'; // Adjust the path if needed
import Editor from '@/components/Blogs/Creation/ReactQuill';

export default function BlogCreationForm() {
    const {
        title, author, description, metaTitle, metaDescription,
        createdTime, updatedTime, images, isSubmitting, setColor, color,
        setField, setThumbnail, addImages, submitBlogPost, initializeTimes, selectedCategory, setSelectedCategory
    } = useBlogStore();

    React.useEffect(() => {
        initializeTimes();
    }, [initializeTimes]);

    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6 space-y-6'>

            <div className='flex space-x-4'>
                <div className='w-1/2'>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Blog Title
                    </label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setField('title', e.target.value)}
                        placeholder='Enter Blog Title'
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                </div>

                <div className='w-1/2'>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Author
                    </label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setField('author', e.target.value)}
                        placeholder='Enter Author Name'
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                </div>
            </div>

            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Description
                </label>
                <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setField('description', e.target.value)}
                    placeholder="Write the Description"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Blog Thumbnail Image
                </label>
                <input
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-2 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                {images.length > 0 && (
                    <img src={images[0]} alt="Thumbnail" className="mt-3 rounded-lg w-32 h-20 object-cover" />
                )}
            </div>

            <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Additional Images
                </label>
                <input
                    type="file"
                    multiple
                    onChange={(e) => addImages(e.target.files)}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-2 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <div className="flex mt-3 space-x-2">
                    {images.slice(1).map((img, index) => (
                        <img key={index} src={img} alt={`Blog ${index}`} className="rounded-lg w-20 h-16 object-cover" />
                    ))}
                </div>
            </div>

            <div className='flex space-x-6 ' >
                <div className="mb-4.5">
                    <label className="mb-3 block text-body-sm text-dark dark:text-white">
                        Category
                    </label>

                    <div className="relative z-20 bg-transparent dark:bg-dark-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary ${selectedCategory ? "text-dark dark:text-white" : ""
                                }`}
                        >
                            <option value="" disabled className="text-dark-6">
                                Select your Category
                            </option>
                            <option value="Trending" className="text-dark-6">
                                Trending
                            </option>
                            <option value="WhatsNew" className="text-dark-6">
                                What&apos;s Today New
                            </option>
                        </select>

                        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                            <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
                                    fill=""
                                />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Content Color
                    </label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor("color", e.target.value)}
                        placeholder="Enter color"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                </div>
            </div>

            <Editor />

            <div>
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">SEO Section</h3>

                <div>
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Meta Title
                    </label>
                    <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setField('metaTitle', e.target.value)}
                        placeholder="Enter Meta Title"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                </div>

                <div className="mt-4">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Meta Description
                    </label>
                    <textarea
                        rows={3}
                        value={metaDescription}
                        onChange={(e) => setField('metaDescription', e.target.value)}
                        placeholder="Enter Meta Description"
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-4 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                </div>
            </div>

            <div className='flex space-x-4'>
                <div className="flex-1">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Created Time
                    </label>
                    <input type="datetime-local" readOnly value={createdTime} className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>

                <div className="flex-1">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Updated Time
                    </label>
                    <input type="datetime-local" readOnly value={updatedTime} className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
            </div>

            <button
                onClick={submitBlogPost}
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition"
            >
                {isSubmitting ? "Submitting..." : "Submit Blog"}
            </button>
        </div>
    );
}
