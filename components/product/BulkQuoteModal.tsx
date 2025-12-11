// components/product/BulkQuoteModal.tsx
"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface BulkQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export default function BulkQuoteModal({ isOpen, onClose, productName }: BulkQuoteModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 禁止背景滚动
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // 模拟提交处理
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 🟢 假装我们在发请求 (Mock API Call)
        // 这种写法在面试中完全站得住脚，你可以说：
        // "后端接口还在联调，但我前端的 Loading 和 成功/失败 状态逻辑已经全写好了。"
        setTimeout(() => {
            // 假装 1.5秒后发送成功
            setIsSubmitting(false);
            setIsSuccess(true);

            // 或者是演示失败状态 (面试时可以改代码演示给面试官看)
            // setIsSubmitting(false);
            // setErrorMsg("Network Error (Simulation)");
        }, 1500);
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

            {/* 1. 半透明磨砂背景 */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* 2. 弹窗卡片 */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden scale-100 animate-fadeIn">

                {/* 关闭按钮 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                {isSuccess ? (
                    // 🟢 成功状态视图
                    <div className="p-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircleIcon className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Received!</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Thank you for your interest in <b>{productName}</b>. <br />
                            Our B2B specialists have received your request and will provide a custom quote within 24 hours.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    // 🟢 表单视图
                    <div className="p-8">
                        {/* 标题栏目 */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Volume Quote</h2>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Planning a bulk order for <strong>{productName}</strong>?
                                Fill out the form below for exclusive tiered pricing and shipping solutions.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* 订购数量栏目 */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1.5">
                                    Estimated Quantity
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="5"
                                    placeholder="e.g. 50 units"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>

                            {/* 邮件栏目 */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1.5">
                                    Business Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>

                            {/* 电话/WhatsApp 栏目 */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1.5">
                                    Phone / WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>

                            {/* 询价内容栏目 */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wide mb-1.5">
                                    Specific Requirements <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Any specific shipping needs, customization requests, or project timeline?"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 resize-none"
                                ></textarea>
                            </div>

                            {/* 发送按钮 */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`
                            w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg mt-2
                            transition-all active:scale-[0.98]
                            ${isSubmitting ? 'bg-gray-400 cursor-wait' : 'bg-[#0071e3] hover:bg-[#0077ed] hover:shadow-xl'}
                        `}
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                            </button>

                            <p className="text-xs text-center text-gray-400">
                                Our team typically responds within 24 hours.
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}