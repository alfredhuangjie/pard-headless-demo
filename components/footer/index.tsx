'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // 后面记得确保有一张 Logo 图片，或者暂时用文字代替
import Newsletter from './Newsletter';
import DataPreferencesModal from './DataPreferencesModal';
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import AnimatedLogo from '@/components/AnimatedLogo';

// === 1. 定义图片中的菜单数据 ===
const FOOTER_LINKS = [
  {
    title: 'PRODUCTS',
    links: [
      { name: 'Thermal Imaging', href: '/products/thermal-imaging' },
      { name: 'Night Vision', href: '/products/night-vision' },
      { name: 'Multi-Spectral', href: '/products/multi-spectral' },
      { name: 'Accessories', href: '/products/accessories' },
    ]
  },
  {
    title: 'SUPPORT',
    links: [
      { name: 'Warranty Registration', href: '/support/warranty' },
      { name: 'Download Center', href: '/support/downloads' },
      { name: 'FAQ', href: '/support/faq' },
      { name: 'How To Videos', href: '/support/videos' },
    ]
  },
  {
    title: 'BLOG',
    links: [
      { name: 'PARD News', href: '/blog/news' },
      { name: 'Product Guides', href: '/blog/guides' },
      { name: 'PARD Reviews', href: '/blog/reviews' },
    ]
  },
  {
    title: 'ABOUT',
    links: [
      { name: 'Policy Information', href: '/about/policy' },
      { name: 'Warranty & Returns', href: '/about/returns' },
      { name: 'Contact Us', href: '/about/contact' },
      { name: 'About Us', href: '/about' },
    ]
  },
];

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#151515] text-white pt-16 pb-8 border-t border-gray-800 font-sans">
      <div className="container mx-auto px-6 lg:px-12">

        {/* === 主内容区：Grid 布局 === */}
        {/* 移动端单列，平板2列，桌面端 12列网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* A. 左侧品牌与联系信息 (占 4 列) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* Logo 区域 - 假设你有 svg 或 png，这里先用文字模拟图片样式 */}
            <div className="mb-2">
              {/* <Image src="/logo-white.png" width={180} height={50} alt="PARD Logo" /> */}
              {/* 暂时用 CSS 模拟你图片中的 Logo 样式 */}
              {/* === 修改后的 Logo 区域 === */}
              <div className="mb-3"> {/* mb-6 -> mb-8: 让整个块和下方内容的距离也稍微拉大 */}

                {/* 1. 放大 Logo: w-40 -> w-56 (从 160px 变大到 224px) */}
                <Link href="/" className="block w-56 text-white leading-none">
                  <AnimatedLogo />
                </Link>

                {/* 2. 放大文字: text-[10px] -> text-xs (12px), 并往下推 mt-3 */}
                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mt-3 pl-1">
                  Night Vision & Thermal Optics
                </p>

              </div>

            </div>

            {/* 联系方式 */}
            <div className="space-y-2 text-sm text-gray-300">
              <p>Toll Free: <a href="tel:7758154319" className="hover:text-white transition-colors">775-815-4319</a></p>
              <p><a href="mailto:Customer.Support@pard.com" className="hover:text-white transition-colors">Customer.Support@parddemo.com</a></p>
            </div>

            {/* 社交图标 (对应图片：Ins, YT, FB) */}
            <div className="flex gap-6 pt-2">
              <a href="#" aria-label="Instagram" className="text-white hover:text-gray-400 transition-colors"><FaInstagram size={24} /></a>
              <a href="#" aria-label="YouTube" className="text-white hover:text-gray-400 transition-colors"><FaYoutube size={24} /></a>
              <a href="#" aria-label="Facebook" className="text-white hover:text-gray-400 transition-colors"><FaFacebookF size={20} /></a>
            </div>

            {/* 这里插入订阅组件，放在左侧下方，或者你可以把它移到最右侧 */}
            <div className="pt-6">
              <Newsletter />
            </div>
          </div>

          {/* B. 菜单链接 (占 8 列) - 对应图片中的4列 */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8">
            {FOOTER_LINKS.map((column) => (
              <div key={column.title}>
                <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-white">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* === 底部栏 === */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-500">

          {/* 左下角：版权 + 隐私设置 (Stack 堆叠显示) */}
          <div className="flex flex-col gap-2">
            <p>Copyright © {new Date().getFullYear()} Pard Co., Ltd. All rights reserved.</p>

            {/* 弹窗触发按钮 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-left underline decoration-gray-700 underline-offset-2 hover:text-gray-300 hover:decoration-gray-500 transition-all w-fit"
            >
              Manage Website Data Collection Preferences
            </button>
          </div>

          {/* 右下角：Sitemap */}
          <div>
            {/* 
              注意：这是一个真实的链接。
              Next.js 中你需要创建一个 app/sitemap.ts 或 public/sitemap.xml 
            */}
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* 挂载隐私弹窗 */}
      <DataPreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </footer>
  );
}