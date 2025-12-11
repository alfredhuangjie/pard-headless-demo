'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'; // 需确保已安装 heroicons

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// 定义数据结构，方便渲染表格
const PREFERENCES = [
  {
    id: 'functional',
    category: 'Functional',
    purpose: 'Enables enhanced functionality, such as videos and live chat. If you do not allow these, then some or all of these functions may not work properly.',
    default: false,
  },
  {
    id: 'analytics',
    category: 'Analytics',
    purpose: 'Provide statistical information on site usage, e.g., web analytics so we can improve this website over time.',
    default: true,
  },
  {
    id: 'marketing',
    category: 'Targeting; Advertising',
    purpose: 'Used to create profiles or personalize content to enhance your shopping experience.',
    default: false,
  },
];

export default function DataPreferencesModal({ isOpen, onClose }: Props) {
  // 状态管理：记录每个类别的 Yes/No (true/false)
  const [selections, setSelections] = useState<Record<string, boolean>>({
    functional: false,
    analytics: true,
    marketing: false,
  });

  if (!isOpen) return null;

  const handleToggle = (id: string, value: boolean) => {
    setSelections((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    // 这里可以扩展：保存到 localStorage 或 Cookie
    console.log('Saved Preferences:', selections);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 黑色遮罩背景 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* 弹窗主体 */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-900">Website Data Collection Preferences</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            Pard uses data collected by cookies and JavaScript libraries to improve your shopping experience. 
            The table below outlines how we use this data by category. To opt out of a category of data collection, 
            select 'No' and save your preferences.
          </p>

          {/* Table */}
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4 w-32">Allow</th>
                  <th className="p-4 w-40">Category</th>
                  <th className="p-4">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {PREFERENCES.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50/50">
                    <td className="p-4 align-top">
                      <div className="flex flex-col space-y-2">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name={item.id} 
                            checked={selections[item.id] === true}
                            onChange={() => handleToggle(item.id, true)}
                            className="w-4 h-4 text-slate-900 focus:ring-slate-900 border-gray-300"
                          />
                          <span className={`ml-2 font-medium ${selections[item.id] ? 'text-slate-900' : 'text-gray-500'}`}>Yes</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name={item.id}
                            checked={selections[item.id] === false}
                            onChange={() => handleToggle(item.id, false)}
                            className="w-4 h-4 text-slate-900 focus:ring-slate-900 border-gray-300"
                          />
                          <span className={`ml-2 font-medium ${!selections[item.id] ? 'text-slate-900' : 'text-gray-500'}`}>No</span>
                        </label>
                      </div>
                    </td>
                    <td className="p-4 align-top text-slate-700 font-medium">
                      {item.category}
                    </td>
                    <td className="p-4 align-top text-slate-600 leading-relaxed">
                      {item.purpose}
                    </td>
                  </tr>
                ))}
                
                {/* Essential Row (Static) */}
                <tr className="bg-gray-50/30">
                  <td className="p-4 align-top text-gray-400">N/A</td>
                  <td className="p-4 align-top text-slate-700 font-medium">Essential</td>
                  <td className="p-4 align-top text-slate-600 leading-relaxed">
                    Essential for the site and any requested services to work, but do not perform any additional or secondary function.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2 bg-gray-800 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-black transition-colors shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}