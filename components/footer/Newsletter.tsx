'use client';

import { useState, FormEvent } from 'react';
import { ArrowLongRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'success') return;

    setStatus('loading');

    // 模拟网络请求，1.5秒后显示成功
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-medium text-white mb-2">Stay Updated</h3>
      <p className="text-gray-400 text-sm mb-4">
        Subscribe to our newsletter for the latest product updates and technical specs.
      </p>

      <form onSubmit={handleSubmit} className="relative">
        {status === 'success' ? (
          <div className="flex items-center gap-2 p-3 bg-green-900/30 border border-green-800 rounded text-green-400 animate-fade-in">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Thanks for subscribing!</span>
          </div>
        ) : (
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors rounded-l-md"
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors rounded-r-md disabled:opacity-70 flex items-center justify-center min-w-[80px]"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowLongRightIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}