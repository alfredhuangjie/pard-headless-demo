import Link from 'next/link';
import Image from 'next/image';

// 定义服务卡片的数据
const SERVICES = [
  {
    id: 'warranty',
    // 模仿 Apple Trade In 顶部的 Logo 区域
    eyebrow: 'PARD CARE', 
    title: 'Warranty & Support',
    description: 'Get peace of mind with our 3-year official warranty and expert support.',
    linkText: 'Check Coverage',
    href: '/support/warranty',
    // 暂时用你现有的图，记得替换成 warranty-card.png
    imageSrc: '/images/NV007SP-Quick-Release-Adapter-3.png', 
    imageScale: 0.7, // 图片稍微缩小一点
  },
  {
    id: 'app',
    // 模仿 Apple Card 顶部的 Logo 区域
    eyebrow: 'PARDVISION', 
    title: 'The Ultimate Companion',
    description: 'Stream, record, and share your hunting moments directly from your phone.',
    linkText: 'Download App',
    href: '/app-download',
    // 暂时用你现有的图，记得替换成 app-phone.png
    imageSrc: '/images/night-vision-NV007SP-featured-image-1.png',
    imageScale: 0.9,
  }
];

export default function ServiceGrid() {
  return (
    <section className="bg-white py-4 px-2 md:px-4">
      {/* 
         核心布局：和 SeriesGrid 完全一致！
         grid-cols-1 (手机单列) -> md:grid-cols-2 (电脑双列)
         gap-4 (保持 Apple 标准间距)
      */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {SERVICES.map((item) => (
          <div 
            key={item.id}
            className="relative group overflow-hidden h-[500px] md:h-[580px] w-full bg-[#F5F5F7] hover:bg-[#ebebeb] transition-colors duration-500 flex flex-col items-center text-center pt-12 md:pt-16"
          >
            {/* 全卡片点击链接 (Layer 1) */}
            <Link href={item.href} className="absolute inset-0 z-10" aria-label={item.title} />

            {/* === 内容区域 === */}
            <div className="relative z-20 px-8 flex flex-col items-center pointer-events-none">
              
              {/* Logo / Eyebrow (模仿 Apple Trade In 上面的小 Logo) */}
              <div className="flex items-center gap-2 mb-2">
                {/* 如果有 Logo 图片可以用 <Image> 替代这里的文字 */}
                <span className="text-black font-bold text-sm md:text-base tracking-widest uppercase">
                    {item.eyebrow}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-black text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base max-w-xs font-medium leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Button (Layer 2 - 独立点击) */}
              {/* Apple 风格：蓝色胶囊按钮 */}
              <Link 
                href={item.href}
                className="pointer-events-auto px-5 py-2 rounded-full text-sm font-medium bg-[#0071e3] text-white hover:bg-[#0077ed] transition-all"
              >
                {item.linkText}
              </Link>
            </div>

            {/* === 图片区域 === */}
            <div className="w-full relative flex-1 mt-auto mx-auto max-w-[80%] pb-8">
              <div 
                className="relative w-full h-full transition-transform duration-700 group-hover:-translate-y-2 origin-bottom"
                style={{ transform: `scale(${item.imageScale})` }}
              >
                <Image 
                  src={item.imageSrc} 
                  alt={item.title}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}