// components/AnimatedLogo.tsx

export default function AnimatedLogo() {
  return (
    <div className="h-8 w-auto flex items-center select-none">
      <svg
        viewBox="0 0 220 50" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* --- 黑色文字部分 --- */}
        {/* 
            关键：fill="currentColor" 
            这样它就会跟随 Header.tsx 里的 text-white 变成白色，
            在白色背景下如果你设置 text-black 它就会变成黑色。
        */}
        <g fill="currentColor">
          {/* P: 宽体版 */}
          <path d="M4 50 V0 H30 C46 0 54 6 54 17 C54 28 46 34 30 34 H14 V50 H4 Z M14 26 H30 C36 26 42 23 42 17 C42 11 36 8 30 8 H14 V26 Z" />
          
          {/* A: 【这是你要的那个版本】自定义超稳平顶底座 */}
          <path d="M45 50 L58 31 H86 L99 50 H88 L84 40 H60 L56 50 H45 Z" />
          
          {/* R: 宽体版 */}
          <path d="M105 50 V0 H132 C148 0 156 6 156 17 C156 24 150 28 140 30 L154 50 H142 L130 32 H115 V50 H105 Z M115 24 H130 C138 24 144 21 144 17 C144 13 138 8 130 8 H115 V24 Z" />
          
          {/* D: 宽体版 */}
          <path d="M162 50 V0 H185 C208 0 218 10 218 25 C218 40 208 50 185 50 H162 Z M172 42 H185 C198 42 206 35 206 25 C206 15 198 8 185 8 H172 V42 Z" />
        </g>

        {/* --- 红色瞄准三角 --- */}
        {/* 
            位置：配合平顶 A (Y=31) 的悬浮位置
            中心点 x=72
        */}
        <g className="origin-[72px_15px] animate-triangle-spin">
          <path 
            d="M72 5 L84 25 H60 L72 5Z" 
            fill="#DC2626" 
          />
        </g>
      </svg>
    </div>
  );
}