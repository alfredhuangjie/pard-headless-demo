// app/api/draw/route.ts

import { NextResponse } from 'next/server';

// 我们的奖品池：4个折扣码 + 1个“谢谢参与”
// weight(权重)越高的，中奖概率越大
const coupons = [
  { id: 1, code: 'BF-SAVE10', prize: '全场九折优惠', weight: 50 },
  { id: 2, code: 'BF-SAVE20', prize: '全场八折优惠', weight: 25 },
  { id: 3, code: 'BF-SAVE50', prize: '全场五折优惠', weight: 10 },
  { id: 4, code: 'BF-FREESHIP', prize: '全球免运费', weight: 14 },
  { id: 5, code: 'NO-LUCK', prize: '谢谢参与', weight: 1 },
];

// 加权随机抽奖算法
function getWeightedRandomCoupon() {
  const totalWeight = coupons.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  for (const coupon of coupons) {
    if (random < coupon.weight) return coupon;
    random -= coupon.weight;
  }
  return coupons[coupons.length - 1]; // Fallback
}

export async function POST(request: Request) {
  try {
    // 真正的抽奖逻辑在服务器端执行，保证公平
    const winningCoupon = getWeightedRandomCoupon();

    // 模拟网络延迟，让体验更真实
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    return NextResponse.json({ success: true, coupon: winningCoupon });
  } catch (error) {
    return NextResponse.json({ success: false, message: '抽奖服务出错' }, { status: 500 });
  }
}