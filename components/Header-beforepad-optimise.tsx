// components/Header.tsx - 防误触智能版

'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react'; // 引入 useRef
import AnimatedLogo from './AnimatedLogo';

const NAV_ITEMS = [
  { 
    name: 'Store', 
    href: '/store', 
    type: 'dropdown', 
    columns: [
      {
        title: 'Shop by Category',
        items: ['New Arrivals', 'Best Sellers', 'Thermal Scopes', 'Night Vision', 'Clip-on Systems', 'Accessories']
      },
      {
        title: 'Quick Links',
        items: ['Find a Dealer', 'Order Status', 'Financing', 'Returns & Warranty']
      },
      {
        title: 'Special Offers',
        items: ['Certified Refurbished', 'Education Program', 'Government & L.E.', 'Clearance Sale']
      }
    ]
  },
  { 
    name: 'Thermal Imaging', 
    href: '/thermal-imaging', 
    type: 'dropdown',
    columns: [
      {
        title: 'Explore Thermal',
        items: ['PARD TA32', 'PARD TS3x', 'PARD FT32', 'Compare All Models']
      },
      {
        title: 'Shop Thermal',
        items: ['Shop Thermal Imaging', 'Accessories', 'Financing', 'Order Status']
      },
      {
        title: 'More from Thermal',
        items: ['Thermal Support', 'PARD Care+', 'Manuals & Downloads']
      }
    ]
  },
  { 
    name: 'Night Vision', 
    href: '/night-vision', 
    type: 'dropdown',
    columns: [
      {
        title: 'Explore NV',
        items: ['PARD NV007', 'PARD NV008', 'Digital Night Vision', 'Clip-on Scopes']
      },
      {
        title: 'Shop NV',
        items: ['Shop Night Vision', 'IR Illuminators', 'Mounts', 'Batteries']
      },
      {
        title: 'Learn More',
        items: ['How NV Works', 'NV vs Thermal', 'Hunting Tips']
      }
    ]
  },
  { name: 'Multi-Spectral', href: '/multi-spectral', type: 'link' },
  { name: 'Accessories', href: '/accessories', type: 'link' },
  { name: 'Dealer Locator', href: '/dealers', type: 'link' },
  { name: 'Support', href: '/support', type: 'link' },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  
  // 【新】使用 useRef 来存储定时器，这样不会触发组件重新渲染
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeMenu) {
      setVisibleMenu(activeMenu);
    }
  }, [activeMenu]);

  // 【新逻辑】智能处理鼠标移入
  const handleMouseEnter = (itemName: string, isDropdown: boolean) => {
    // 1. 如果有正在等待关闭的定时器，先清除它（防止闪烁）
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isDropdown) {
      // 如果是普通链接，立刻关闭菜单
      setActiveMenu(null);
      return;
    }

    // 2. 智能判断：
    if (activeMenu) {
      // A. 如果菜单已经是打开的，用户只是在切换 Tab，那么【立即切换】，不要延迟
      setActiveMenu(itemName);
    } else {
      // B. 如果菜单是关着的，用户刚移进来，那么【延迟 200ms】再打开
      // 这就是“防误触”的核心！
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(itemName);
      }, 200); // 200毫秒的“犹豫期”
    }
  };

  // 【新逻辑】处理鼠标移出 Header 区域
  const handleMouseLeaveHeader = () => {
    // 清除任何正在等待打开的定时器（防止鼠标划过出去了，菜单却突然弹开）
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(null);
  };

  const isMenuOpen = activeMenu !== null;

  return (
    <header 
      className="sticky top-0 z-50 w-full font-sans"
      onMouseLeave={handleMouseLeaveHeader} // 绑定新的离开逻辑
    >
      <div className={`
        relative z-50 bg-[#050507] transition-all duration-300 border-b border-white/10
        ${isMenuOpen ? 'bg-opacity-100' : 'bg-opacity-90 backdrop-blur-md'}
      `}>
        <div className="mx-auto max-w-[1024px] px-4 h-11 flex items-center justify-between text-white text-[12px] tracking-wide">
          
          {/* Logo */}
          <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity -ml-11"> 
             <div className="scale-[0.65] origin-center">
                <AnimatedLogo />
             </div>
          </Link>

          {/* 导航链接 */}
          <nav className="hidden md:flex h-full items-center justify-evenly flex-1 px-4">
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.name} 
                className="h-full flex items-center"
                // 绑定新的智能移入逻辑
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

          {/* Icons */}
          <div className="flex items-center space-x-6 opacity-90">
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
        // 当鼠标在下拉区域内移动时，保持打开状态
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          // 不需要 setActiveMenu，保持当前状态即可
        }}
        onMouseLeave={handleMouseLeaveHeader}
      >
        <div className="mx-auto max-w-[1024px] px-4 py-10">
          {NAV_ITEMS.map((item) => (
             item.name === visibleMenu && item.columns && (
              <div key={item.name} className="grid grid-cols-12 gap-8 animate-fadeIn">
                <div className="col-span-4 -ml-5">
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
    </header>
  );
}