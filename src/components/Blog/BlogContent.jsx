import Image from 'next/image'
import React from 'react'

export default function BlogDynamicPage({ data }) {
    return (
        <div className="blog grid md:py-20 py-10 bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Blog Image Section */}
                    <div className="relative w-full pb-[56.25%] bg-gray-100">
                        <Image
                            src={data?.BlogImage?.[1] || '/images/blog/blog1.jpg'}
                            fill
                            alt={data?.title || "Blog image"}
                            className="object-cover"
                            priority
                            sizes="(min-width: 1280px) 1200px, 100vw"
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end p-6">
                            <h1 className="text-white text-3xl font-semibold">{data?.title}</h1>
                        </div>
                    </div>

                    {/* Blog Content Section */}
                    <div className="p-6 md:p-10">
                        {/* Blog Tag */}
                        <span className="bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-full uppercase">
                            {data?.tags || 'Technology'}
                        </span>

                        {/* Blog Title */}
                        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-gray-900">{data?.title}</h2>

                        {/* Author & Date */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                            <span>by {data?.author}</span>
                            <div className="w-5 h-px bg-gray-400"></div>
                            <span>{data?.createdAt}</span>
                        </div>

                        {/* Blog Description */}
                        <p className="text-gray-700 text-lg leading-relaxed mt-6">{data?.description}</p>

                        {/* Blog Content */}
                        <div className="mt-6 prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                        </div>
                    </div>
                </article>
            </main>
        </div>
    )
}
