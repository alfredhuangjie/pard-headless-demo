// components/Header.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AnimatedLogo from './AnimatedLogo';
import MobileMenu from './MobileMenu';
import { NAV_ITEMS } from '@/lib/constants';
import MenuToggle from './MenuToggle';

export default function Header() {
  const pathname = usePathname();

  // 判断是否在产品详情页
  const isProductPage = pathname.startsWith('/buy/') || pathname.startsWith('/products/');

  // ----- 下面是下拉菜单和移动端菜单的逻辑 (保持不变) -----
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (activeMenu) setVisibleMenu(activeMenu);
  }, [activeMenu]);

  const handleMouseEnter = (itemName: string, isDropdown: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isDropdown) {
      setActiveMenu(null);
      return;
    }
    if (activeMenu) {
      setActiveMenu(itemName);
    } else {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(itemName);
      }, 200);
    }
  };

  const handleMouseLeaveHeader = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(null);
  };

  const isMenuOpen = activeMenu !== null;

  return (
    // 🟢 核心修改区
    <header
      // 如果是产品页 -> relative: 随页面自然滚动，滚上去就没了，丝滑且无黑线
      // 如果是其他页 -> sticky top-0: 永远吸顶
      className={`
                z-50 w-full font-sans
                ${isProductPage ? 'relative' : 'sticky top-0'}
            `}
      onMouseLeave={handleMouseLeaveHeader}
    >
      <div className={`
                relative z-[101] bg-[#050507] transition-all duration-300 border-b border-white/10
                ${isMenuOpen || mobileMenuOpen ? 'border-b-0' : 'border-b border-white/10'} 
            `}>
        <div className="mx-auto max-w-[1024px] px-6 lg:px-4 h-11 flex items-center justify-between text-white text-[12px] tracking-wide">

          {/* Logo */}
          <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity ml-0 lg:-ml-11">
            <div className="scale-[0.65] origin-center">
              <AnimatedLogo />
            </div>
          </Link>

          {/* PC端 导航链接 */}
          <nav className="hidden md:flex h-full items-center mx-auto md:space-x-4 lg:space-x-8 xl:space-x-10">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(item.name, item.type === 'dropdown')}
              >
                <Link
                  href={item.href}
                  className={`transition-colors duration-300 whitespace-nowrap ${activeMenu === item.name ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* 右侧 Icons */}
          <div className="flex items-center space-x-6 opacity-90 relative z-[120]">
            <button className="hover:text-white hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="hover:text-white hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
            <MenuToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* 下拉区域 */}
      <div
        className={`
                    absolute left-0 w-full bg-[#050507] text-white overflow-hidden transition-all ease-in-out
                    ${activeMenu
            ? 'max-h-[400px] border-b border-gray-800 opacity-100 duration-700'
            : 'max-h-0 opacity-0 duration-300'
          }
                `}
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
        onMouseLeave={handleMouseLeaveHeader}
      >
        {/* 下拉菜单内容 */}
        <div className="mx-auto max-w-[1024px] px-4 md:pl-11 lg:pl-4 py-10">
          {NAV_ITEMS.map((item) => (
            item.name === visibleMenu && item.columns && (
              <div key={item.name} className="grid grid-cols-12 md:gap-2 lg:gap-8 animate-fadeIn">
                {/* Column 1 */}
                <div className="col-span-4 md:ml-0 lg:-ml-5">
                  <p className="text-[11px] text-gray-400 mb-3 font-semibold">{item.columns[0].title}</p>
                  <ul className="space-y-3">
                    {item.columns[0].items.map(subItem => (
                      <li key={subItem}>
                        <Link href="#" className="text-2xl font-bold text-white hover:text-gray-200 block leading-tight">
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Column 2 */}
                <div className="col-span-2 col-start-4.5">
                  <p className="text-[11px] text-gray-400 mb-3 font-semibold">{item.columns[1].title}</p>
                  <ul className="space-y-2">
                    {item.columns[1].items.map(subItem => (
                      <li key={subItem}>
                        <Link href="#" className="text-[12px] text-gray-200 hover:text-white block font-medium">
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Column 3 */}
                <div className="col-span-2">
                  <p className="text-[11px] text-gray-400 mb-3 font-semibold">{item.columns[2].title}</p>
                  <ul className="space-y-2">
                    {item.columns[2].items.map(subItem => (
                      <li key={subItem}>
                        <Link href="#" className="text-[12px] text-gray-200 hover:text-white block font-medium">
                          {subItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* 遮罩层 */}
      {activeMenu && (
        <div
          className="fixed inset-0 top-11 z-[-1] bg-black/40 backdrop-blur-sm transition-opacity duration-700"
          style={{ height: 'calc(100vh - 44px)' }}
        />
      )}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}