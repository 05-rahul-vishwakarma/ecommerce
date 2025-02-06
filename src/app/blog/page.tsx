
'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import blogData from '@/data/Blog.json';
import BlogItem from '@/components/Blog/BlogItem';
import Footer from '@/components/Footer/Footer';
import HandlePagination from '@/components/Other/HandlePagination';
import { useRouter } from 'next/navigation';
import MenuFour from '@/components/Header/MenuFour';

export default function page() {
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 9;
    const offset = currentPage * productsPerPage;
    const router = useRouter();

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuFour props="bg-transparent" />
            </div>
            <div className='blog grid md:py-20 py-10'>

                {/* Blog Content */}
                <main className="container mx-auto px-4 py-8">
                    <article className="max-w-3xl mx-auto">
                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                            How to Be Happy: 27 Habits to Add to Your Routine
                        </h1>

                        {/* Author Info */}
                        <div className="flex items-center space-x-4 mb-6">
                            <img
                                src="images/avatar/avatar1.png"
                                alt="Author"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium text-gray-800">Arya Stark</p>
                                <p className="text-sm text-gray-500">Jan 13, 2022</p>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mb-6">
                            <button className="text-gray-500 hover:text-purple-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M..." />
                                </svg>
                            </button>
                            <button className="text-gray-500 hover:text-purple-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M..." />
                                </svg>
                            </button>
                            <button className="text-gray-500 hover:text-purple-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M..." />
                                </svg>
                            </button>
                        </div>

                        {/* Featured Image */}
                        <figure className="mb-6">
                            <img
                                src="/blog5.jpg"
                                alt="blog"
                                className="rounded-lg"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2 text-center">
                                Perfect for Crafting!
                            </figcaption>
                        </figure>

                        {/* Blog Text */}
                        <div className="prose max-w-none text-gray-700">
                            <p>
                                This ribbon is just what I needed for my DIY projects. It’s easy to cut, doesn’t fray, and ties beautifully. Whether for decorations or handmade gifts, this ribbon never disappoints.
                            </p>
                            <p>
                                I am absolutely delighted with this ribbon! The quality is top-notch, and the colors are vibrant and exactly as shown in the photos. It’s perfect for all my crafting projects, from gift wrapping to decorations.
                            </p>
                            <p>
                                The texture is smooth, making it easy to work with, and it holds its shape beautifully. I’ve received so many compliments on the finished products I’ve created using it. Highly recommend this ribbon for anyone looking to add a touch of elegance to their projects!
                            </p>

                            <h2>Beautiful and High Quality!</h2>
                            <p>I absolutely love this ribbon! The material is soft yet durable, and the colors are so rich and vibrant. It added the perfect touch to my gift wrapping, and I’ve already ordered more for future projects. Highly recommended!</p>
                        </div>
                    </article>
                </main>

            </div>
            <Footer />
        </>
    )
}


const Blog = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="text-purple-600 font-bold text-xl">FitMind</div>
                    </div>
                    <nav className="hidden md:flex space-x-8 text-gray-600">
                        <a href="#" className="hover:text-purple-600">
                            Home
                        </a>
                        <a href="#" className="hover:text-purple-600">
                            About Us
                        </a>
                        <a href="#" className="hover:text-purple-600">
                            Courses
                        </a>
                        <a href="#" className="hover:text-purple-600">
                            Resources
                        </a>
                        <a href="#" className="text-purple-600 font-semibold">
                            Sign In
                        </a>
                    </nav>
                    <button className="block md:hidden text-gray-600">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>

        </div>
    );
};

