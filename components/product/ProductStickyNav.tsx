// components/product/ProductStickyNav.tsx

"use client";

interface ProductStickyNavProps {
    title: string;
}

export default function ProductStickyNav({ title }: ProductStickyNavProps) {
    return (
        // 🟢 关键修复 1: 修正 'top' 值
        // 你的 Header 高度是 h-11 (44px)，所以这个二级导航必须从 44px 的位置开始吸顶。
        <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all">

            {/* 🟢 关键修复 2: 容器对齐
                下面的这行 className 和你的 Header.tsx 完全一致。
                这能保证它们的 content-box 宽度和内边距完全相同，从而实现像素级垂直对齐。
            */}
            <div className="mx-auto max-w-[1062px] px-6 lg:px-4">

                {/* h-12 (48px) 是一个比较舒适的二级导航高度 */}
                <div className="flex justify-between items-center h-12">

                    {/* 左侧：产品名称 */}
                    {/* 字体大小、粗细和字母间距都做了微调，使其更像 Apple 风格 */}
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight uppercase">
                        {title}
                    </h2>

                    {/* 右侧：导航链接 */}
                    <nav className="flex space-x-6 pr-5 text-xs md:text-sm font-medium text-gray-500">
                        <span className="cursor-default hover:text-black transition-colors">
                            Overview
                        </span>
                        <span className="cursor-default hover:text-black transition-colors">
                            Tech Specs
                        </span>
                    </nav>

                </div>
            </div>
        </div>
    );
}