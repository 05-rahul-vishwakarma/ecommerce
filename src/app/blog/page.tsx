
'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import blogData from '@/data/Blog.json'
import BlogItem from '@/components/Blog/BlogItem';
import Footer from '@/components/Footer/Footer'
import HandlePagination from '@/components/Other/HandlePagination'
import { useRouter } from 'next/navigation'
import MenuFour from '@/components/Header/MenuFour';

export default function page() {
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 9;
    const offset = currentPage * productsPerPage;
    const router = useRouter()

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
                                src="https://via.placeholder.com/40"
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
                                src="/images/blg.png"
                                alt="Yoga"
                                className="rounded-lg"
                            />
                            <figcaption className="text-sm text-gray-500 mt-2 text-center">
                                Pexels-Vlada Karpovich
                            </figcaption>
                        </figure>

                        {/* Blog Text */}
                        <div className="prose max-w-none text-gray-700">
                            <p>
                                Habits matter. If you’ve ever tried breaking a bad habit, you know
                                all too well how ingrained they are.
                            </p>
                            <p>
                                Here’s a look at some daily, monthly, and yearly habits to help
                                kickstart your quest. Just remember that everyone’s version of
                                happiness is a little different, and so is their path to achieving
                                it.
                            </p>
                            <p>
                                If some of these habits create added stress or just don’t fit your
                                lifestyle, ditch them. With a little time and practice, you’ll
                                figure out what does and doesn’t work for you.
                            </p>

                            <h2>Daily habits</h2>
                            <p>Most adults need at least 7 hours of sleep every night...</p>
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

