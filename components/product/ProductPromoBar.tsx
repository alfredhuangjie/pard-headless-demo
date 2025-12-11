// components/product/ProductPromoBar.tsx
"use client";

import Link from 'next/link';

export default function ProductPromoBar() {
    return (
        // 🟢 背景色：#F5F5F7 (Apple 经典的浅灰背景)
        // 🟢 边框：下边框 border-b border-gray-200 (增加层次感)
        <div className="w-full bg-[#F5F5F7] border-b border-gray-200 py-3 transition-colors">

            {/* 容器宽度和对齐方式与 StickyNav 保持一致 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <p className="text-xs md:text-sm text-gray-900 leading-normal">
                    {/* 这里的文案要克制，不要全部大写，不要用红色 */}
                    <span className="font-medium">Limited time offer: </span>
                    <span>Get 50% OFF storewide. Don't miss out on the best gear. </span>

                    {/* 链接样式：经典的 Apple 蓝 + 悬停下划线 */}
                    <Link
                        href="/sale"
                        className="text-[#0066CC] hover:text-[#004499] hover:underline ml-2 font-medium transition-colors inline-flex items-center"
                    >
                        Shop Now
                        {/* 加上一个小箭头，增加精致感 */}
                        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 ml-0.5 stroke-2 stroke-current">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </p>

            </div>
        </div>
    );
}