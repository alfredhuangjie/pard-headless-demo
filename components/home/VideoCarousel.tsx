'use client';

import BlogMarquee from './BlogMarquee';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AnimatedLogo from '@/components/AnimatedLogo';
import { FaYoutube, FaPlay, FaPause } from 'react-icons/fa';

const SLIDES = [
  {
    id: 1,
    image: '/images/picture1.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=IhzGkltua5k',
    title: 'Thermal Imaging Monocular Review',
    productModel: 'PARD Leopard 640x512',
    channelName: 'Chris Parkin Shooting Sports',
  },
  {
    id: 2,
    image: '/images/picture2.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=xRrg2hj7Df0',
    title: 'Night Vision Clip-on Report',
    productModel: 'Pard NV007SP2',
    channelName: 'Optics Trade',
  },
  {
    id: 3,
    image: '/images/picture3.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=L5VNH2wKbr4',
    title: 'Night Vision Rifle Scopes Review',
    productModel: 'Pard Nightstalker PRO and EX',
    channelName: 'Sporting Shooter',
  },
];

const DOUBLED_SLIDES = [...SLIDES, ...SLIDES];

export default function VideoCarousel() {

  const [isMounted, setIsMounted] = useState(false);

  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlay = () => {
    if (!swiperInstance) return;
    if (isPlaying) {
      swiperInstance.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperInstance.autoplay.start();
      setIsPlaying(true);
    }
  };


  if (!isMounted) {
    return <section className="w-full bg-white pt-0 pb-4 h-[500px]" />;
  }

  return (
    <section className="w-full bg-white pt-0 pb-4 overflow-hidden">

      <Swiper
        key={isMounted ? 'loaded' : 'loading'}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        modules={[Autoplay, Pagination]}
        loop={true}
        observer={true}
        observeParents={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        centeredSlides={true}
        slidesPerView={1.1}
        spaceBetween={16}
        breakpoints={{
          // 手机
          640: { slidesPerView: 1.3, spaceBetween: 16 },

          // 🟢 笔记本 (MacBook Air 就在这个区间 1024 ~ 1535)
          // 保持 1.5 (中间海报占 2/3)，这样在 13寸屏幕上看起来够大、够清楚
          1024: { slidesPerView: 1.5, spaceBetween: 16 },

          // 🔵 大屏台式机 (1536px 以上)
          // 只有屏幕够大时，才变成 2.1 (中间海报占 50%)
          1536: { slidesPerView: 2.1, spaceBetween: 16 },
        }}
        slideToClickedSlide={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-gray-300 opacity-100 !w-2.5 !h-2.5 !mx-2',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-black',

        }}
        className="w-full !pb-10 video-carousel"
      >
        {DOUBLED_SLIDES.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`}>
            {({ isActive }) => (
              <Link
                href={slide.videoUrl}
                target="_blank"
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                  }
                }}
                className={`relative block w-full aspect-[16/9] overflow-hidden transition-opacity duration-500 bg-black
                  ${isActive
                    ? 'opacity-100 z-10'
                    : 'opacity-40 hover:opacity-60 z-0'
                  }
                `}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0 || index === 1}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>

                  {/* 右上角 Logos */}
                  <div className="absolute top-[30px] right-[30px] md:top-[50px] md:right-[50px] xl:top-[80px] xl:right-[80px] flex items-center gap-5 z-20">
                    <div className="w-20 md:w-24 xl:w-28 text-white">
                      <AnimatedLogo />
                    </div>
                    <span className="text-white/40 text-sm md:text-base">✕</span>
                    <div className="flex items-center gap-2 text-white/90 drop-shadow-lg">
                      <FaYoutube className="w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8 text-[#FF0000]" />
                      <span className="font-bold tracking-tight text-sm md:text-base xl:text-lg hidden md:block">
                        YouTube
                      </span>
                    </div>
                  </div>

                  {/* 
                     === 中间大标题 (无注释干扰版) ===
                     Leopard (id:1) -> top-[40%]
                     其他 -> top-[50%]
                  */}
                  <div className={`
                      absolute left-0 w-full px-16 text-center z-10 pointer-events-none transform -translate-y-1/2
                      
                      ${slide.id === 1
                      // 针对 Leopard (第1张图)
                      // top-[40%]    -> 手机/平板
                      // lg:top-[35%] -> 🟢 笔记本专用 (13/14寸)
                      // 2xl:top-[30%] -> 🔵 大屏专用 (24/27寸+)，笔记本不会受影响！
                      ? 'top-[40%] lg:top-[35%] 2xl:top-[30%]'

                      // 针对 其他图片 (第2,3张图)
                      // top-[50%]    -> 手机/平板
                      // lg:top-[50%] -> 🟢 笔记本专用 (居中)
                      // 2xl:top-[55%] -> 🔵 大屏专用 (稍微往下压)，笔记本不会受影响！
                      : 'top-[50%] lg:top-[50%] 2xl:top-[30%]'
                    }
                  `}>
                    <h3 className="
                        font-extrabold text-white/95 leading-tight tracking-tight drop-shadow-2xl
                        
                        {/* 
                           字体大小隔离：
                           text-2xl    -> 手机
                           md:text-4xl -> 平板
                           lg:text-4xl -> 🟢 笔记本 (强制调小)
                           xl:text-5xl -> 15寸大笔记本
                           2xl:text-[80px] -> 🔵 大屏台式机 (只有超级大屏才会变巨大)
                        */}
                        text-2xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[60px]
                    ">
                      {slide.title}
                    </h3>
                  </div>

                  {/* 左下角信息 */}
                  <div className="absolute bottom-[30px] left-[30px] md:bottom-[50px] md:left-[50px] xl:bottom-[80px] xl:left-[80px] z-20 flex flex-row items-center gap-6 max-w-[95%]">

                    <div className="group/btn flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg cursor-pointer whitespace-nowrap">
                      <FaPlay className="w-3 h-3 md:w-3.5 md:h-3.5 ml-0.5" />
                      <span className="font-bold text-xs md:text-sm tracking-wide">Watch now</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white drop-shadow-md select-none">
                      <span className="font-extrabold text-sm md:text-base xl:text-lg tracking-wide text-white">
                        {slide.productModel}
                      </span>
                      <span className="text-gray-400 text-sm md:text-base xl:text-lg font-light">·</span>
                      <span className="font-medium text-sm md:text-base xl:text-lg text-gray-200 tracking-normal">
                        {slide.channelName}
                      </span>
                    </div>

                  </div>
                </div>

              </Link>
            )}
          </SwiperSlide>
        ))}

      </Swiper>
      <div className="relative z-10">
        <BlogMarquee />
      </div>

      {/* 2. 播放按钮 (放在第二个轮播图下面，靠右) */}
      <div className="container mx-auto pr-0 mr-4 flex justify-end -mt-7 -mb-3 relative z-20">
        <button
          onClick={togglePlay}
          // 🟢 这里恢复了之前的圆形按钮样式 (p-3 rounded-full)，而不是长条胶囊
          className="p-1.5 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow-md text-gray-600 hover:text-black transition-all transform hover:scale-105 active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <FaPause className="w-3 h-3 md:w-4 md:h-4" />
          ) : (
            <FaPlay className="w-3 h-3 md:w-4 md:h-4 ml-0.5" />
          )}
        </button>
      </div>
    </section>
  );
}