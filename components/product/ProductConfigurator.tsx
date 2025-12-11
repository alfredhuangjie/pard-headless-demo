// components/product/ProductConfigurator.tsx

"use client";

import { useState, useMemo } from 'react';
// 🟢 1. 引入新图标
import { CubeIcon, MinusIcon, PlusIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import BulkQuoteModal from './BulkQuoteModal';
// --- 类型定义 (保持不变) ---
interface AttributeNode {
    name: string;
    options: string[];
}
interface VariationAttribute {
    name: string;
    value: string;
}
interface VariationNode {
    databaseId: number;
    name: string;
    price: string;
    regularPrice: string;
    salePrice: string | null;
    stockStatus: string;
    attributes: {
        nodes: VariationAttribute[];
    };
}
interface ProductConfiguratorProps {
    product: {
        name: string;
        price: string;
        attributes: {
            nodes: AttributeNode[];
        };
        variations?: {
            nodes: VariationNode[];
        };
    };
}

// 辅助函数：价格转数字 (保持不变)
const parsePrice = (priceString: string | null | undefined): number => {
    if (!priceString) return 0;
    const cleanString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(cleanString) || 0;
};

// 🟢 辅助函数：格式化美元 (新增)
const formatPrice = (amount: number) => {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// 辅助函数：字符串标准化 (保持不变)
const normalize = (str: string | null | undefined) => {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

export const ProductConfigurator = ({ product }: ProductConfiguratorProps) => {
    const attributes = product.attributes?.nodes || [];
    const variations = product.variations?.nodes || [];

    // 1. 初始化选中状态 (保持不变)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
        const defaults: Record<string, string> = {};
        attributes.forEach((attr) => {
            if (attr.options && attr.options.length > 0) {
                defaults[attr.name] = attr.options[0];
            }
        });
        return defaults;
    });

    // 🟢 2. 新增数量状态
    const [quantity, setQuantity] = useState(1);

    // 2. 匹配当前变体 (保持不变)
    const currentVariation = useMemo(() => {
        return variations.find((variation) => {
            return variation.attributes.nodes.every((vAttr) => {
                const selectedAttrKey = Object.keys(selectedOptions).find(
                    key => normalize(key) === normalize(vAttr.name)
                );
                if (!selectedAttrKey) return true;
                return normalize(vAttr.value) === normalize(selectedOptions[selectedAttrKey]);
            });
        });
    }, [selectedOptions, variations]);

    // 3. 处理点击 (保持不变)
    const handleOptionSelect = (attributeName: string, value: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [attributeName]: value,
        }));
    };

    // 🟢 处理数量变更
    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc') {
            setQuantity(prev => prev + 1);
        } else {
            setQuantity(prev => (prev > 1 ? prev - 1 : 1));
        }
    };

    // 4. 核心算法：计算基于“同行最低价”的差价 (保持不变)
    const getOptionPriceLabel = (attrName: string, targetOption: string) => {
        const hypotheticalOptions = { ...selectedOptions, [attrName]: targetOption };
        const targetVariation = variations.find((variation) => {
            return variation.attributes.nodes.every((vAttr) => {
                const hKey = Object.keys(hypotheticalOptions).find(k => normalize(k) === normalize(vAttr.name));
                if (!hKey) return true;
                return normalize(vAttr.value) === normalize(hypotheticalOptions[hKey]);
            });
        });

        if (!targetVariation) return "Unavailable";
        const targetPrice = parsePrice(targetVariation.price);

        let minPriceInRow = Infinity;
        const currentAttribute = attributes.find(a => a.name === attrName);

        if (currentAttribute) {
            currentAttribute.options.forEach(opt => {
                const tempOptions = { ...selectedOptions, [attrName]: opt };
                const v = variations.find((variation) => {
                    return variation.attributes.nodes.every((vAttr) => {
                        const hKey = Object.keys(tempOptions).find(k => normalize(k) === normalize(vAttr.name));
                        if (!hKey) return true;
                        return normalize(vAttr.value) === normalize(tempOptions[hKey]);
                    });
                });

                if (v) {
                    const p = parsePrice(v.price);
                    if (p < minPriceInRow) minPriceInRow = p;
                }
            });
        }

        if (minPriceInRow === Infinity) return null;
        const diff = targetPrice - minPriceInRow;
        if (diff > 0.01) return `+ $${diff.toFixed(2)}`;
        return null;
    };

    // 🟢 计算最终单价和总价
    const currentUnitPrice = currentVariation ? parsePrice(currentVariation.price) : parsePrice(product.price);
    const totalPrice = currentUnitPrice * quantity;
    const isAvailable = currentVariation ? currentVariation.stockStatus === 'IN_STOCK' : false;

    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);


    return (
        <div className="space-y-10 max-w-[370px]">

            {/* 标题区 (保持不变) */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                    Customize your <span className="uppercase">{product.name}</span>
                </h1>
                <div className="flex flex-col gap-1 min-h-[3rem]">
                    {attributes.map(attr => (
                        <div key={attr.name} className="text-gray-500 text-lg font-medium leading-tight">
                            {selectedOptions[attr.name]}
                        </div>
                    ))}
                </div>
            </div>

            {/* 顶部单价显示 (保持不变) */}
            <div className="flex items-baseline gap-2">
                <span key={currentUnitPrice} className="text-3xl font-bold text-gray-900 transition-all">
                    {formatPrice(currentUnitPrice)}
                </span>
            </div>

            {/* 属性选择器 (保持不变) */}
            <div className="space-y-10">
                {attributes.map((attr) => (
                    <div key={attr.name} className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 tracking-wide">
                            {attr.name}
                        </h3>
                        <div className="flex flex-col gap-3">
                            {attr.options.map((option) => {
                                const isSelected = selectedOptions[attr.name] === option;
                                const addedPriceLabel = getOptionPriceLabel(attr.name, option);
                                const isOptionUnavailable = addedPriceLabel === "Unavailable";

                                return (
                                    <div
                                        key={option}
                                        onClick={() => handleOptionSelect(attr.name, option)}
                                        className={`
                                            relative p-4 rounded-xl cursor-pointer transition-all duration-200 
                                            flex justify-between items-center
                                            ${isSelected
                                                ? 'border-[3px] border-[#0071e3] bg-white ring-0 z-10'
                                                : 'border-[1px] border-gray-400 bg-white hover:border-gray-500'
                                            }
                                            ${isOptionUnavailable ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
                                        `}
                                        style={{ minHeight: '60px' }}
                                    >
                                        <span className={`font-semibold text-base ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {option}
                                        </span>
                                        {addedPriceLabel && addedPriceLabel !== "Unavailable" && (
                                            <span className="text-sm font-normal text-gray-600">
                                                {addedPriceLabel}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🟢 🟢 🟢 全新设计的结算卡片区域 (Summary Box) 🟢 🟢 🟢 */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-100">

                {/* 1. 产品名 */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">{product.name}</h3>

                {/* 2. 物流状态 */}
                <div className="flex items-start gap-3 mb-6">
                    <CubeIcon className="w-5 h-5 text-gray-700 mt-0.5" />
                    <div>
                        <div className="text-sm font-bold text-gray-900">Delivery:</div>
                        <div className="text-sm text-gray-600">In Stock</div>
                        <div className="text-sm text-gray-600">Free Shipping</div>
                    </div>
                </div>

                {/* 3. 动态总价 (随数量变化) */}
                <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(totalPrice)}
                    </span>
                </div>

                {/* 4. 数量选择器 */}
                <div className="mb-8">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">Quantity</div>
                    <div className="flex items-center w-[140px] bg-white border border-gray-300 rounded-lg">
                        <button
                            onClick={() => handleQuantityChange('dec')}
                            disabled={quantity <= 1}
                            className="p-3 text-gray-600 hover:text-black disabled:opacity-30 transition-colors"
                        >
                            <MinusIcon className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center font-semibold text-gray-900">
                            {quantity}
                        </div>
                        <button
                            onClick={() => handleQuantityChange('inc')}
                            className="p-3 text-gray-600 hover:text-black transition-colors"
                        >
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* 5. 两个按钮 (Checkout & Add to Cart) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Checkout (Secondary Style) */}
                    <button
                        disabled={!isAvailable || !currentVariation}
                        className={`
                            w-full py-3.5 px-4 rounded-xl font-bold text-base border-2 transition-all active:scale-[0.98]
                            ${(!currentVariation || !isAvailable)
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-[#0071e3] text-[#0071e3] hover:bg-blue-50'
                            }
                        `}
                    >
                        Checkout
                    </button>

                    {/* Add to Cart (Primary Style) */}
                    <button
                        disabled={!isAvailable || !currentVariation}
                        className={`
                            w-full py-3.5 px-4 rounded-xl font-bold text-base text-white shadow-md transition-all active:scale-[0.98]
                            ${(!currentVariation || !isAvailable)
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-[#0071e3] hover:bg-[#0077ed] hover:shadow-lg'
                            }
                        `}
                    >
                        {/* 按钮文字逻辑 */}
                        {!currentVariation
                            ? 'Select Options'
                            : (!isAvailable ? 'Out of Stock' : 'Add to Cart')
                        }
                    </button>
                </div>

                {/* 6. Bulk Purchase 入口 */}
                <div className="pt-4 border-t border-gray-200 flex justify-center">
                    <button
                        // 👇 修改这里
                        onClick={() => setIsBulkModalOpen(true)}
                        className="flex items-center gap-2 text-gray-500 hover:text-[#0071e3] transition-colors group"
                    >
                        <CurrencyDollarIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold underline decoration-gray-300 group-hover:decoration-[#0071e3] underline-offset-4">
                            Bulk Purchase? Get a Quote
                        </span>
                    </button>
                </div>

            </div>
            <BulkQuoteModal
                isOpen={isBulkModalOpen}
                onClose={() => setIsBulkModalOpen(false)}
                productName={product.name}
            />

        </div>
    );
};

export default ProductConfigurator;