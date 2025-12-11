'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useQuery, gql, Provider, createClient, cacheExchange, fetchExchange } from 'urql';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import 'swiper/css';

const GRAPHQL_ENDPOINT = 'https://founderblog.exongear.com/graphql';

const client = createClient({
    url: GRAPHQL_ENDPOINT,
    exchanges: [cacheExchange, fetchExchange],
});

const POSTS_QUERY = gql`
  query GetRecentPosts {
    posts(first: 10) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

function BlogMarqueeContent() {
    const [result] = useQuery({ query: POSTS_QUERY });
    const { data, fetching, error } = result;

    console.log("🔥 博客组件状态 - Loading:", fetching);
    console.log("🔥 博客组件数据:", data);
    console.log("🔥 博客组件报错:", error);

    if (error) console.error("BlogMarquee Error:", error);

    if (fetching) return (
        <div className="w-full h-[150px] bg-white flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-200 animate-spin rounded-full"></div>
        </div>
    );

    if (error) return null;

    const posts = data?.posts?.nodes || [];
    if (posts.length === 0) return null;

    const MARQUEE_DATA = [...posts, ...posts];

    return (
        <section className="w-full bg-white pt-0 pb-8 -mt-0 relative z-10">

            <div className="w-full">
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        reverseDirection: false,
                        pauseOnMouseEnter: false, // 关掉自带暂停，交给 CSS
                    }}
                    speed={5000} // 默认速度

                    slidesPerView={2.5}
                    spaceBetween={16}
                    breakpoints={{
                        640: { slidesPerView: 3.5, spaceBetween: 16 },
                        1024: { slidesPerView: 5.5, spaceBetween: 16 },
                    }}
                    allowTouchMove={true}

                    // 🟢 核心修改区：用 Tailwind 语法替代 style 标签
                    // 1. [&_.swiper-wrapper]:!ease-linear  -> 强制内部 wrapper 匀速
                    // 2. hover:[&_.swiper-wrapper]:!duration-[15000ms] -> 鼠标放上去，强制动画时长变成 15秒 (变慢)
                    className="w-full [&_.swiper-wrapper]:!ease-linear hover:[&_.swiper-wrapper]:!duration-[15000ms]"
                >
                    {MARQUEE_DATA.map((post: any, index: number) => {
                        const imgUrl = post.featuredImage?.node?.sourceUrl;

                        return (
                            <SwiperSlide key={`${post.id}-${index}`}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group relative block w-full aspect-[4/3] overflow-hidden cursor-pointer bg-gray-100"
                                >
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 33vw, 20vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white/20 font-bold tracking-widest">
                                            PARD
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-1 flex items-center gap-1">
                                            Read more
                                            <ArrowLongRightIcon className="w-4 h-4" />
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 flex items-end p-4 group-hover:opacity-40 transition-opacity duration-300">
                                        <h4 className="text-white text-xs md:text-sm font-bold leading-tight line-clamp-2 drop-shadow-md">
                                            {post.title}
                                        </h4>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* 🟢 删除了底部的 <style jsx global>，现在代码非常干净，不会报错了 */}
        </section>
    );
}

export default function BlogMarquee() {
    return (
        <Provider value={client}>
            <BlogMarqueeContent />
        </Provider>
    );
}