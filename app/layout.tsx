// app/layout.tsx - 组件化版本

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Questrial } from "next/font/google";
import "./globals.css";

// 导入我们刚刚创建的组件
import Header from "@/components/Header";
import Footer from '@/components/footer'; 

import LotteryWheel from "@/components/LotteryWheel";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial", // 定义CSS变量名
  display: "swap",
});


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PARD | Global Leader in Thermal Imaging & Night Vision Scopes.",
  description: "PARD offers a range of top-quality thermal scopes and night vision scopes designed for hunting, security, and outdoor exploration within the Asian&Oceania district.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`${questrial.variable} font-sans bg-gray-50 text-gray-800 antialiased flex flex-col min-h-screen` }>
        {/* 把Header放在所有页面内容的前面 */}
        <Header />
        
        {/* 
          children就是我们具体的页面内容 (page.tsx)。
          我们给它一个min-height，确保页脚能被推到底部。
        */}
        <div className="flex-grow bg-gray-50">
          {children}
        </div>

        {/* 把Footer放在所有页面内容的后面 */}
        <Footer />
         {/* <LotteryWheel /> */}
      </body>
    </html>
  );
}




