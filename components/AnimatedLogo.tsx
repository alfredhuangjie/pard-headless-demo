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
        <g fill="currentColor">
          {/* P, A, R, D 路径保持不变，是你满意的版本 */}
          <path d="M4 50 V0 H30 C46 0 54 6 54 17 C54 28 46 34 30 34 H14 V50 H4 Z M14 26 H30 C36 26 42 23 42 17 C42 11 36 8 30 8 H14 V26 Z" />
          <path d="M45 50 L58 31 H86 L99 50 H88 L84 40 H60 L56 50 H45 Z" />
          <path d="M105 50 V0 H132 C148 0 156 6 156 17 C156 24 150 28 140 30 L154 50 H142 L130 32 H115 V50 H105 Z M115 24 H130 C138 24 144 21 144 17 C144 13 138 8 130 8 H115 V24 Z" />
          <path d="M162 50 V0 H185 C208 0 218 10 218 25 C218 40 208 50 185 50 H162 Z M172 42 H185 C198 42 206 35 206 25 C206 15 198 8 185 8 H172 V42 Z" />
        </g>

        {/* --- 红色瞄准三角 --- */}
        {/* 
            【修正1】位置上移：顶点 Y=0，底边 Y=20。
            这样顶点就和 P/R/D 的顶部齐平了。
            同时和下方 A 底座 (Y=31) 之间有了 11px 的宽敞悬浮空间。
        */}
        {/* 
            【修正2】旋转中心：根据新位置 (0-20) 计算出的重心 Y=13.33
            现在它会死死定在原地自转。
        */}
        <g className="origin-[72px_13.33px] animate-triangle-spin">
          <path 
            d="M72 0 L84 20 H60 L72 0Z" 
            fill="#DC2626" 
          />
        </g>
      </svg>
    </div>
  );
}