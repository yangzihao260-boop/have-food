import React, { useState } from 'react';
import { FoodItem } from '../types';
import { FoodIcon } from './FoodIcon';
import { Utensils } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FoodBuffetProps {
  foods: FoodItem[];
  onSelectOrDragFood: (food: FoodItem) => void;
  draggingFoodId: string | null;
}

export const FoodBuffet: React.FC<FoodBuffetProps> = ({
  foods,
  onSelectOrDragFood,
  draggingFoodId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'grain' | 'meat' | 'veggie' | 'drink'>('all');

  const categories = [
    { id: 'all', label: '全部 (16)' },
    { id: 'grain', label: '主食面点' },
    { id: 'meat', label: '肉类' },
    { id: 'veggie', label: '蔬菜' },
    { id: 'drink', label: '饮品' },
  ];

  const filteredFoods = selectedCategory === 'all'
    ? foods
    : foods.filter((f) => f.category === selectedCategory);

  return (
    <div
      id="food-buffet-panel"
      className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-xl flex flex-col h-full max-h-[580px]"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
              Delicious Food Table · 美味食物餐盘
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Drag food to feed the boy (拖拽食物喂给男孩)
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id as any);
              soundManager.playPopSound();
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-white shadow-xs scale-105'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Food Grid - PURE PATTERNS / ICONS ONLY (No English text labels) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto pr-1 flex-1 py-1">
        {filteredFoods.map((food) => {
          const isDragging = draggingFoodId === food.id;

          return (
            <div
              key={food.id}
              id={`food-item-${food.id}`}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', food.id);
                e.dataTransfer.effectAllowed = 'copyMove';
                soundManager.playPopSound(true);
                onSelectOrDragFood(food);
              }}
              onDragEnd={() => {
                // Clear drag state if dropped outside
                onSelectOrDragFood({} as any);
              }}
              title="拖动投喂给男孩"
              className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-lg select-none min-h-[96px] ${
                isDragging
                  ? 'opacity-40 scale-95 border-amber-400 bg-amber-50'
                  : 'bg-white hover:bg-amber-50/50 border-slate-200 hover:border-amber-400 hover:-translate-y-0.5'
              }`}
            >
              {/* Food Graphic / Pattern only */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-115 transition-transform duration-200 drop-shadow-sm">
                <FoodIcon type={food.svgType} size={70} />
              </div>

              {/* Drag handle hint badge */}
              <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-amber-600 font-bold bg-amber-100 px-1.5 py-0.5 rounded-full pointer-events-none">
                拖我 ✋
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
