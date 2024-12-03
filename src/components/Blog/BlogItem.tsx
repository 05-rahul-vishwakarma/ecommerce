'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogType } from '@/type/BlogType'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation'

interface BlogProps {
    data: BlogType
    type: string
}

const BlogItem: React.FC<BlogProps> = ({ data, type }) => {
    const router = useRouter()

    const handleBlogClick = () => {
        router.push(`/blog`);
    };

    return (
        <>
            {type === "style-one" ? (
                <div
                    className="blog-item style-one h-full cursor-pointer"
                    onClick={() => handleBlogClick()}
                >
                    <div className="blog-main h-full block">
                        <div className="blog-thumb rounded-[20px] overflow-hidden  border-2">
                            <Image
                                src={data.thumbImg}
                                width={2000}
                                height={1500}
                                alt='blog-img'
                                className='w-full duration-500'
                            />
                        </div>
                        <div className="blog-infor mt-7">
                            <div className="blog-tag bg-custom-purple-color hover:bg-purple py-2 px-3.5  rounded-[10px] text-button-uppercase inline-block text-surface">{data.tag}</div>
                            <div className=" blog-title mt-3 duration-300 text-black font-medium leading-normal tracking-[0.8px]">{data.title}</div>
                            <div className="flex items-center gap-2 mt-2 ">
                                <div className="blog-author caption1 text-secondary">by {data.author}</div>
                                <span className='w-[20px] h-[1px] bg-black'></span>
                                <div className="blog-date caption1 text-secondary">{data.date}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {type === "style-list" ? (
                        <div
                            className="blog-item style-list h-full cursor-pointer"
                            onClick={() => handleBlogClick()}
                        >
                            <div className="blog-main h-full flex max-md:flex-col md:items-center md:gap-9 gap-6">
                                <div className="blog-thumb md:w-1/2 w-full rounded-[20px] overflow-hidden flex-shrink-0">
                                    <Image
                                        src={data.thumbImg}
                                        width={2000}
                                        height={1500}
                                        alt='blog-img'
                                        className='w-full duration-500 flex-shrink-0'
                                    />
                                </div>
                                <div className="blog-infor">
                                    <div className="blog-tag bg-green py-1 px-2.5 rounded-full text-button-uppercase inline-block">{data.tag}</div>
                                    <div className="heading6 blog-title mt-3 duration-300">{data.title}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="blog-author caption1 text-secondary">by {data.author}</div>
                                        <span className='w-[20px] h-[1px] bg-black'></span>
                                        <div className="blog-date caption1 text-secondary">{data.date}</div>
                                    </div>
                                    <div className="body1 text-secondary mt-4">{data.shortDesc}</div>
                                    <div className="text-button underline mt-4">Read More</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {type === "style-default" && (
                                <div
                                    className="blog-item style-default h-full cursor-pointer"
                                    onClick={() => handleBlogClick()}
                                >
                                    <div className="blog-main h-full block pb-8 border-b border-line">
                                        <div className="blog-thumb rounded-[20px] overflow-hidden">
                                            <Image
                                                src={data.thumbImg}
                                                width={2000}
                                                height={1500}
                                                alt='blog-img'
                                                className='w-full duration-500'
                                            />
                                        </div>
                                        <div className="blog-infor mt-7">
                                            <div className="blog-tag bg-green py-1 px-2.5 rounded-full text-button-uppercase inline-block">{data.tag}</div>
                                            <div className="heading6 blog-title mt-3 duration-300">{data.title}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="blog-author caption1 text-secondary">by {data.author}</div>
                                                <span className='w-[20px] h-[1px] bg-black'></span>
                                                <div className="blog-date caption1 text-secondary">{data.date}</div>
                                            </div>
                                            <div className="body1 text-secondary mt-4">{data.shortDesc}</div>
                                            <div className="text-button underline mt-4">Read More</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                    }
                </>
            )
            }
        </>
    )
}

export default BlogItem