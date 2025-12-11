// components/MenuToggle.tsx
'use client';

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuToggle({ isOpen, onClick }: MenuToggleProps) {
  return (
    <button 
      onClick={onClick}
      className="md:hidden relative w-5 h-5 flex flex-col justify-center items-center group z-[110]" // z-index 必须要高，保证菜单打开后还能点到它
      aria-label="Toggle Menu"
    >
      {/* 上面那根杠 */}
      <span 
        className={`
          h-[1.5px] w-full bg-white rounded-full transition-all duration-300 ease-out
          ${isOpen ? 'rotate-45 translate-y-[0.5px]' : '-translate-y-[3px]'}
        `}
      />
      
      {/* 下面那根杠 */}
      <span 
        className={`
          h-[1.5px] w-full bg-white rounded-full transition-all duration-300 ease-out
          ${isOpen ? '-rotate-45 -translate-y-[0.5px]' : 'translate-y-[3px]'}
        `}
      />
    </button>
  );
}