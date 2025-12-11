import type { Config } from "tailwindcss";

const config: Config = {
  // 告诉 Tailwind 去哪里扫描你的 class
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 必须和 layout.tsx 里的 variable 名字一模一样！
        sans: ['var(--font-questrial)', 'sans-serif'], 
      },
      
      // === 动画关键帧定义 (Keyframes) ===
      keyframes: {
        // 1. Logo 动画：极速旋转 + 长时间停顿
        'rotate-text': {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(720deg)' }, // 0.6秒内转两圈
          '100%': { transform: 'rotate(720deg)' }, // 剩下时间停住
        },
        
        // 2. Banner 流光特效
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        
        // 3. 首页文字上浮显现特效
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        // 4. 背景渐变流动
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      
      // === 动画实用类 (Animation Utilities) ===
      animation: {
        // Logo 动画: 总时长 6s
        'triangle-spin': 'rotate-text 6s linear infinite',
        
        // 首页 Banner 动画
        'shine': 'shine 3s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        
        // 文字入场动画
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      }
    },
  },

  plugins: [
    // 文章排版插件
    require('@tailwindcss/typography'), 
  ],
};

export default config;