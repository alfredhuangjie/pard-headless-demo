// components/product/ProductGallery.tsx
"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 👈 1. 引入传送门
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Zoom } from 'swiper/modules';
import { XMarkIcon, PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface ImageNode {
    sourceUrl: string;
    altText?: string;
}

interface ProductGalleryProps {
    mainImage: ImageNode;
    galleryImages: ImageNode[];
}

export default function ProductGallery({ mainImage, galleryImages }: ProductGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    // 增加一个 mounted 状态，确保只在客户端渲染 Portal
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const allImages = [mainImage, ...galleryImages];
    const uniqueImages = Array.from(new Set(allImages.map(img => img?.sourceUrl)))
        .map(url => allImages.find(img => img?.sourceUrl === url)!)
        .filter(Boolean);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!mainImage) return null;

    return (
        <>
            {/* 1. 页面上的静态展示区 (保持不变) */}
            <div className="w-full flex flex-col items-center">
                <div
                    className="relative w-full aspect-square flex items-center justify-center cursor-zoom-in group"
                    onClick={() => setIsOpen(true)}
                >
                    <Image
                        src={mainImage.sourceUrl}
                        alt="Product Main"
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        priority={true}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="mt-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-all text-sm font-medium"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    <span>View gallery</span>
                </button>
            </div>

            {/* 🟢 2. 全屏模态框：使用 Portal 传送到 body */}
            {mounted && isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] bg-white animate-fadeIn">
                    {/* z-[9999] 确保它是宇宙最高层级 */}

                    {/* 顶部控制栏 */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex justify-end z-10">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    {/* Swiper 轮播区域 */}
                    <div className="h-full w-full flex items-center justify-center py-10">
                        <Swiper
                            modules={[Navigation, Pagination, Keyboard, Zoom]}
                            spaceBetween={40}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.custom-next',
                                prevEl: '.custom-prev',
                            }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            keyboard={{ enabled: true }}
                            zoom={true}
                            loop={true}
                            className="w-full h-full max-w-[90vw] md:max-w-[80vw]"
                        >
                            {uniqueImages.map((img, idx) => (
                                <SwiperSlide key={idx} className="flex items-center justify-center">
                                    <div className="swiper-zoom-container w-full h-full relative">
                                        <Image
                                            src={img.sourceUrl}
                                            alt=""
                                            fill
                                            className="object-contain"
                                            sizes="90vw"
                                            priority={idx === 0}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* 自定义导航箭头 */}
                        <button className="custom-prev absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-100/80 hover:bg-gray-200 text-gray-800 transition-all z-20">
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <button className="custom-next absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-100/80 hover:bg-gray-200 text-gray-800 transition-all z-20">
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>,
                document.body // 👈 这就是传送的目的地：直接挂载到 <body> 标签下
            )}
        </>
    );
}