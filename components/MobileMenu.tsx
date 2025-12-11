// components/MobileMenu.tsx - 纯净版 (无关闭按钮)
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { NAV_ITEMS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void; // 这个 prop 虽然传进来了，但我们在这个文件里不用它，而是靠 Header 里的按钮来调它
}

export default function MobileMenu({ isOpen }: MobileMenuProps) { // 这里只解构 isOpen
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setActiveSubmenu(null), 700);
    }
  }, [isOpen]);

  const currentNav = NAV_ITEMS.find(item => item.name === activeSubmenu);
  const currentSubmenuItems = currentNav?.type === 'dropdown' && currentNav.columns
    ? currentNav.columns.flatMap(col => col.items) : [];

  return (
    <div 
      className={`
        fixed inset-0 z-[100] bg-[#050507] text-[#E8E8ED] 
        transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] 
        ${isOpen ? 'opacity-100 visible top-0' : 'opacity-0 invisible -top-10'} 
      `}
      style={{ paddingTop: '44px' }} // 留出 Header 的位置
    >
      {/* 菜单内容容器 */}
      <div className="container mx-auto px-6 pt-4 relative h-full overflow-hidden">
         {/* ... 这里面的主菜单/子菜单逻辑保持完全不变 ... */}
         {/* ... 之前发给你的代码里这部分是对的，直接保留 ... */}
         
         {/* 为了节省篇幅，这里省略内部 JSX，请保留原有的两级菜单逻辑 */}
         {/* ... Copy from previous version ... */}
         <div className={`absolute inset-0 px-11 pt-8 transition-transform duration-500 ease-in-out ${activeSubmenu ? '-translate-x-1/4 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
            <ul className="space-y-1">
                {NAV_ITEMS.map((item, index) => (
                <li key={item.name} className={`transform transition-all duration-700`} style={{ transitionDelay: isOpen ? `${index * 30}ms` : '0ms', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(20px)' }}>
                    {item.type === 'dropdown' ? (
                    <button onClick={() => setActiveSubmenu(item.name)} className="flex items-center justify-between w-full py-2 text-2xl font-bold text-[#E8E8ED] hover:text-white group text-left">
                        {item.name}
                        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    ) : (
                    <Link href={item.href} className="block py-2 text-2xl font-bold text-[#E8E8ED] hover:text-white">
                        {item.name}
                    </Link>
                    )}
                </li>
                ))}
            </ul>
         </div>
         <div className={`absolute inset-0 px-11 pt-8 transition-transform duration-500 ease-in-out ${activeSubmenu ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
            <button onClick={() => setActiveSubmenu(null)} className="flex items-center text-gray-400 hover:text-white mb-6 text-sm font-medium py-2 -ml-1">
                <ChevronLeftIcon className="h-4 w-4 mr-1" /> Back
            </button>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{activeSubmenu}</h2>
            <ul className="space-y-0 overflow-y-auto max-h-[calc(100vh-200px)] pb-20">
                {currentSubmenuItems.map((subItem, idx) => (
                <li key={idx}>
                    <Link href="#" className="block py-2.5 text-[17px] font-medium text-gray-300 hover:text-white transition-colors border-b border-gray-800/50">
                    {subItem}
                    </Link>
                </li>
                ))}
            </ul>
         </div>
      </div>
    </div>
  );
}