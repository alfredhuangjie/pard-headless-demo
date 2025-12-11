// app/buy/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/urql';
import { GET_PRODUCT_BY_SLUG } from '@/lib/queries';
import ProductConfig from '@/components/product/ProductConfigurator';
import ProductGallery from '@/components/product/ProductGallery';
import ProductStickyNav from '@/components/product/ProductStickyNav';
import ProductPromoBar from '@/components/product/ProductPromoBar';

// 🟢 1. 引入需要的图标
import { TruckIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const { data } = await client.query(GET_PRODUCT_BY_SLUG, { slug }).toPromise();
    if (!data?.product) return { title: 'Product Not Found' };
    return {
        title: `${data.product.name} | PARD Official`,
        description: data.product.shortDescription?.replace(/<[^>]*>?/gm, '').slice(0, 160),
        openGraph: { images: [data.product.image?.sourceUrl] },
    };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const { data, error } = await client.query(GET_PRODUCT_BY_SLUG, { slug }).toPromise();

    if (error || !data?.product) {
        console.error(`Failed to load product: ${slug}`, error);
        notFound();
    }

    const product = data.product;

    return (
        <div className="bg-white min-h-screen">

            <ProductStickyNav title={product.name} />
            <ProductPromoBar />

            <div className="pt-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 scroll-mt-32 items-start">

                        {/* 🟢 左侧：Sticky Gallery + 服务承诺区 */}
                        {/* flex-col gap-10: 让画廊和服务区垂直排列，有间距 */}
                        <div className="w-full lg:col-span-7 lg:sticky lg:top-24 h-fit transition-all duration-300 flex flex-col gap-10">

                            {/* 画廊 */}
                            <ProductGallery
                                mainImage={product.image}
                                galleryImages={product.galleryImages?.nodes || []}
                            />

                            {/* 🟢 新增：Apple 风格服务承诺区 */}
                            <div className="w-full max-w-[360px] mx-auto">

                                {/* 上半部分：网格布局 (物流 & 保修) */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-center">

                                    {/* 📦 Shipping */}
                                    <div className="flex flex-col items-center gap-2">
                                        <TruckIcon className="w-7 h-7 text-gray-900 stroke-[1.5]" />
                                        <p className="text-xs font-semibold text-gray-900 leading-tight">
                                            Fast & Reliable Shipping
                                        </p>
                                    </div>

                                    {/* 🛡️ Warranty */}
                                    <div className="flex flex-col items-center gap-2">
                                        <ShieldCheckIcon className="w-7 h-7 text-gray-900 stroke-[1.5]" />
                                        <div className="flex flex-col items-center">
                                            <p className="text-xs font-semibold text-gray-900 leading-tight mb-1.5">
                                                Hassle-free Warranty & Support:
                                            </p>
                                            {/* 极小字体说明 */}
                                            <div className="text-[10px] text-gray-500 leading-tight space-y-0.5">
                                                <p>Night Vision: 2 Years</p>
                                                <p>Thermal & Multi: 3 Years</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 分割线 */}
                                <div className="h-px bg-gray-200 w-full my-8" />

                                {/* 下半部分：Chat 支持 */}
                                <div className="flex gap-4 items-start text-left px-2">
                                    <ChatBubbleLeftRightIcon className="w-7 h-7 text-gray-900 stroke-[1.5] shrink-0" />

                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs font-bold text-gray-900 leading-tight">
                                            Have questions about buying {product.name}?
                                        </p>

                                        <a href="/contact" className="text-xs text-[#0071e3] hover:underline flex items-center justify-center gap-1 font-medium mt-0.5">
                                            Chat with a PARD Specialist
                                            <span className="text-[10px]">↗</span>
                                        </a>

                                        <div className="text-[10px] text-gray-500 leading-relaxed mt-1.5 flex flex-col items-center ">
                                            <p>Toll Free: +800 986 4370 Office: +1 775 815 4319</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* 右侧：购买决策区 */}
                        <div className="flex flex-col pt-2 h-fit lg:col-span-5">
                            {/* 配置器 */}
                            <ProductConfig product={product} />

                            {/* 🟢 已移除：旧的 Free delivery 列表 (现在这部分已经在左侧展示了) */}
                        </div>
                    </div>

                    <div className="h-px bg-gray-200 w-full my-24" />
                    <div id="specs" className="max-w-4xl mx-auto scroll-mt-32">
                        <h3 className="text-3xl font-bold mb-10 text-center tracking-tight">Tech Specs</h3>
                        <div
                            className="prose prose-lg prose-slate max-w-none text-gray-600 prose-headings:font-semibold prose-img:rounded-2xl"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}