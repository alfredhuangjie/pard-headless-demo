import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function PromoBanner() {
  return (
    <div className="relative bg-black overflow-hidden py-3">
      {/* 
         === 修复重点 ===
         1. bg-no-repeat: 禁止背景重复，这是解决“闪一下/不连贯”的核心。
            防止流光还没跑完，后面又稍微露出来一点导致跳变。
         2. Gradient 调整: 我把 red 的范围改小了一点 (transparent_40%...60%)，
            让光束更聚拢，不会因为太宽而导致边缘穿帮。
      */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,transparent_40%,rgba(255,0,0,0.6)_50%,transparent_60%,transparent_100%)] bg-[length:200%_200%] bg-no-repeat animate-shine" />
      
      <div className="container mx-auto px-4 relative z-10 flex justify-center items-center gap-4 text-white text-sm md:text-base font-medium">
        
        {/* 
           3. 加回 animate-pulse
           你说的“忽明忽暗”效果。
        */}
        <span className="animate-pulse text-red-500 font-bold tracking-wider">
          LIMITED TIME
        </span>

        <p className="tracking-wide text-center">
          Year-End Sale: <span className="font-bold text-white">50% OFF</span> Storewide. 
          <span className="hidden sm:inline"> Don't miss out on the best gear.</span>
        </p>
        
        <Link 
          href="/shop" 
          className="group flex items-center gap-1 text-red-500 hover:text-red-400 font-bold transition-colors uppercase text-xs tracking-widest border-b border-red-500 hover:border-red-400 pb-0.5"
        >
          Shop Now
          <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}