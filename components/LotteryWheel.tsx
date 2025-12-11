// components/LotteryWheel.tsx

'use client';

import { useState } from 'react';

// 奖品在轮盘上的显示顺序和内容
// 【注意】ID必须和后端的奖品池对应，以便正确停在指定奖品上
const prizes = [
  { id: 1, name: '九折' }, 
  { id: 2, name: '八折' }, 
  { id: 5, name: '谢谢参与' },
  { id: 3, name: '五折' }, 
  { id: 4, name: '免运费' }, 
  { id: 1, name: '九折' }, 
  { id: 2, name: '八折' }, 
  { id: 4, name: '免运费' },
];

export default function LotteryWheel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ prize: string; code: string } | null>(null);
  const [rotation, setRotation] = useState(0);

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // 启动“表演性”转动（至少5圈）
    const randomExtraRotation = Math.floor(Math.random() * 360);
    const baseRotation = rotation + 360 * 5 + randomExtraRotation;
    setRotation(baseRotation);

    try {
      // 向后端API发送真正的抽奖请求
      const response = await fetch('/api/draw', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        const winningPrize = data.coupon;
        
        // 计算中奖奖品在轮盘上的位置
        const prizeIndex = prizes.findIndex(p => p.id === winningPrize.id);
        const prizeAngle = 360 / prizes.length;
        
        // 计算最终需要停在的角度
        const finalAngle = baseRotation - (baseRotation % 360) + (360 - (prizeIndex * prizeAngle)) - (prizeAngle / 2);

        setRotation(finalAngle);
        
        // 等待动画结束后再显示结果
        setTimeout(() => {
          setResult({ prize: winningPrize.prize, code: winningPrize.code });
          setIsSpinning(false);
        }, 4000); // 这里的时长需要和CSS动画的duration一致
      }
    } catch (error) {
      setIsSpinning(false);
      alert('抽奖失败，请检查网络后重试。');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-transform hover:scale-110 animate-bounce"
        >
          幸运抽奖!
        </button>
      )}

      {isOpen && (
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-2xl relative w-80 md:w-96 border-4 border-yellow-400">
           <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 text-3xl font-bold leading-none"
          >
            &times;
          </button>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">幸运大转盘</h2>
          
          <div className="relative w-64 h-64 border-8 border-yellow-400 rounded-full mb-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-600 z-10"></div>
            <div 
              className="w-full h-full rounded-full overflow-hidden transition-transform duration-4000ms ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {prizes.map((prize, index) => (
                <div 
                  key={index} 
                  className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left flex items-center justify-center font-bold text-xs"
                  style={{ 
                    transform: `rotate(${index * (360 / prizes.length)}deg)`,
                    backgroundColor: index % 2 === 0 ? '#fffbe0' : '#fff1a0',
                  }}
                >
                  <span className="transform rotate-[22.5deg] -translate-y-4">{prize.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSpin} 
            disabled={isSpinning}
            className="w-full px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-red-700 disabled:bg-gray-400 transition-all"
          >
            {isSpinning ? '转动中...' : '开始抽奖!'}
          </button>

          {result && (
             <div className="mt-4 p-4 bg-gray-50 border rounded-lg text-center w-full">
               {result.code !== 'NO-LUCK' ? (
                 <>
                   <h3 className="text-lg font-bold text-green-700">恭喜你!</h3>
                   <p className="mt-1 text-gray-800">你获得了 **{result.prize}**!</p>
                   <p className="mt-2 text-base font-mono bg-green-100 text-green-900 p-2 rounded">
                     <strong>{result.code}</strong>
                   </p>
                 </>
               ) : (
                 <>
                   <h3 className="text-lg font-bold text-yellow-700">谢谢参与</h3>
                   <p className="mt-1 text-gray-600">下次好运！</p>
                 </>
               )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}