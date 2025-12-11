// app/contact/layout.tsx

// 我们需要从React导入类型，来定义children
import type { ReactNode } from 'react';

// 这就是我们contact专属的布局组件
export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    // 你可以把这个section看作是专门为contact部分准备的一个“内胆”
    // 它会被塞进根layout的children里

        <div className="max-w-2xl mx-auto">
            <h3>gogogo</h3>
          {children}
        </div>
        
  );
}