import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface HeroProductProps {
  category: string;
  model: string;
  tagline: string;
  imageSrc: string;
  textColor?: 'white' | 'black'; // 以防以后有白色背景的图
  align?: 'center' | 'left'; // 文字对齐方式
  linkHref: string;
}

export default function HeroProduct({
  category,
  model,
  tagline,
  imageSrc,
  textColor = 'white',
  align = 'center',
  linkHref,
}: HeroProductProps) {

  const textClass = textColor === 'white' ? 'text-white' : 'text-slate-900';
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section className="relative w-full h-[90vh] md:h-screen flex flex-col justify-end pb-20 md:justify-start md:pt-32 overflow-hidden bg-black">

      {/* 1. 背景图片层 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] hover:scale-105"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        {/* 遮罩层：确保文字在任何图片上都清晰可见 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* 2. 内容层 */}
      <div className={`relative z-10 container mx-auto px-6 flex flex-col ${alignClass} animate-fade-in-up`}>

        {/* line 1: 品类 (定性/扫盲) */}
        <span className="text-orange-500 font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
          {category}
        </span>

        {/* line 2: 型号 (聚焦/锚点) */}
        <h2 className={`${textClass} text-5xl md:text-7xl font-bold tracking-tighter mb-3 leading-none`}>
          {model}
        </h2>

        {/* line 3: 描述 (种草/诱惑) */}
        <p className="text-gray-300 text-lg md:text-2xl font-light tracking-wide mb-8 max-w-2xl">
          {tagline}
        </p>

        {/* 按钮组 */}
        <div className="flex items-center gap-6">
          <Link
            href={`${linkHref}/specs`}
            className="group flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-lg transition-colors"
          >
            Learn more
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={linkHref}
            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            Buy
          </Link>
        </div>

      </div>
    </section>
  );
}