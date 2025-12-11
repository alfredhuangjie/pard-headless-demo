import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface SeriesCardProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  imageScale?: number;
  imageOffsetY?: string;
}

export default function SeriesCard({
  eyebrow,
  title,
  description,
  imageSrc,
  href,
  imageScale = 1,
  imageOffsetY = '0px',
}: SeriesCardProps) {
  return (
    <div className="relative group overflow-hidden h-[600px] md:h-[680px] w-full bg-[#F5F5F7] hover:bg-[#ebebeb] transition-colors duration-500 flex flex-col items-center text-center pt-16 md:pt-20">
      
      {/* 
         Layer 1: 全局点击覆盖层 (z-10)
         这个 Link 负责处理点击卡片空白处的跳转。
      */}
      <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${title}`} />

      {/* Text Area */}
      {/* pointer-events-none: 让鼠标穿透这个容器，打到底下的 Layer 1 上 */}
      <div className="relative px-6 flex flex-col items-center mb-10 pointer-events-none">
        
        <span className="text-orange-600 text-xs font-bold tracking-[0.15em] uppercase mb-4">
          {eyebrow}
        </span>
        
        <h3 className="text-black text-4xl md:text-6xl font-bold tracking-tight mb-5">
          {title}
        </h3>
        
        <p className="text-gray-900 text-sm md:text-lg max-w-md font-medium leading-relaxed mb-8">
          {description}
        </p>

        {/* 
            Layer 2: 交互按钮组
            pointer-events-auto: 恢复鼠标响应，让这里变成“实体”，浮在 Layer 1 之上
        */}
        <div className="flex items-center gap-5 pointer-events-auto relative z-20">
          
          {/* 
             修改点：变回了 Link 组件
             1. 加上了 z-20，让它浮在全局覆盖层上面。
             2. 只用了 hover:underline，去掉了 group-hover。
             3. 效果：只有鼠标精准摸到这几个字，才会出现下划线。
          */}
          <Link 
            href={href} 
            className="flex items-center gap-1 text-[#0066CC] hover:underline font-medium text-base md:text-lg transition-all"
          >
            Learn more
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
          
          {/* Buy 按钮保持不变 */}
          <Link 
            href={`${href}/buy`}
            className="px-6 py-2 rounded-full text-sm md:text-base font-bold border border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-all"
          >
            Buy
          </Link>
        </div>
      </div>

      {/* Image Area */}
      <div className="w-full relative flex-1 mt-auto mx-auto max-w-[95%] pb-12">
        <div className="relative w-full h-full transition-transform duration-700 group-hover:-translate-y-4 origin-bottom">
          <div 
            className="relative w-full h-full origin-bottom"
            style={{ transform: `scale(${imageScale}) translateY(${imageOffsetY})` }} 
          >
             <Image 
               src={imageSrc} 
               alt={title}
               fill
               className="object-contain object-bottom"
               sizes="(max-width: 768px) 100vw, 50vw"
               priority={false}
             />
          </div>
        </div>
      </div>
    </div>
  );
}
