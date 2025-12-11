// components/ContactForm.tsx

'use client'; // 【极其重要】这行代码，告诉Next.js：这个组件是一个客户端组件！

import { useState } from 'react';

export default function ContactForm() {
  // 使用useState来管理表单的状态
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // 表单提交的处理函数
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单的默认刷新行为
    setStatus('loading');   // 进入“加载中”状态
    setMessage('');

    // 从表单事件中获取数据
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // 使用fetch，向我们之前创建的API Route发送POST请求
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.message || '发生未知错误。');
      }
    } catch (error) {
      setStatus('error');
      setMessage('无法连接到服务器，请检查你的网络。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      {/* 表单的输入框部分 (和之前一样) */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">姓名</label>
        <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required disabled={status === 'loading'} />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">邮箱</label>
        <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required disabled={status === 'loading'} />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">内容</label>
        <textarea id="message" name="message" rows={5} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required disabled={status === 'loading'}></textarea>
      </div>

      <div className="text-center">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-400" disabled={status === 'loading'}>
          {status === 'loading' ? '发送中...' : '发送'}
        </button>
      </div>

      {/* 根据状态，显示不同的提示信息 */}
      {status === 'success' && <p className="mt-4 text-green-600 text-center">{message}</p>}
      {status === 'error' && <p className="mt-4 text-red-600 text-center">{message}</p>}
    </form>
  );
}