import React from 'react';
import { X, BookOpen, Clock, CheckCircle2, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border-4 border-amber-300 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">
              备课指南 · Mealtime English Lesson Plan
            </h2>
            <p className="text-xs text-slate-500">
              一日三餐少儿英语教学目标与课堂互动指引
            </p>
          </div>
        </div>

        {/* Core Sentence Targets */}
        <div className="space-y-3 mb-5">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>核心目标句型 (Target Sentences)</span>
          </h3>

          <div className="grid gap-2.5">
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-amber-700">1. 早上模式 (7:00 AM · 初升太阳)</div>
                <div className="text-base font-extrabold text-slate-900 font-mono">
                  I have breakfast in the morning.
                </div>
                <div className="text-xs text-slate-600">我早上吃早餐。</div>
              </div>
              <button
                onClick={() => soundManager.speak('I have breakfast in the morning.', 0.85)}
                className="p-2 rounded-xl bg-amber-200/60 hover:bg-amber-300 text-amber-900 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-orange-700">2. 中午模式 (12:00 PM · 正午烈日)</div>
                <div className="text-base font-extrabold text-slate-900 font-mono">
                  I have lunch at noon.
                </div>
                <div className="text-xs text-slate-600">我中午吃午餐。</div>
              </div>
              <button
                onClick={() => soundManager.speak('I have lunch at noon.', 0.85)}
                className="p-2 rounded-xl bg-orange-200/60 hover:bg-orange-300 text-orange-900 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-indigo-700">3. 晚上模式 (7:00 PM · 夜晚月亮)</div>
                <div className="text-base font-extrabold text-slate-900 font-mono">
                  I have dinner at night.
                </div>
                <div className="text-xs text-slate-600">我晚上吃晚餐。</div>
              </div>
              <button
                onClick={() => soundManager.speak('I have dinner at night.', 0.85)}
                className="p-2 rounded-xl bg-indigo-200/60 hover:bg-indigo-300 text-indigo-900 transition-colors"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Teaching steps guide */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-slate-900">💡 课堂建议互动步骤:</div>
          <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
            <li>
              <strong>看时间识时段</strong>：切换模式，引导孩子观察时钟（7点/12点/7点）和天空（初升太阳/正午烈日/夜空月亮），说出对应时间词汇。
            </li>
            <li>
              <strong>食物拖拽喂食</strong>：邀请孩子上台或在平板上拖拽食物喂给男孩，伴随生动吃东西音效，激发兴趣。
            </li>
            <li>
              <strong>句子朗读与点读</strong>：吃完食物后下方出现目标句子，点击单词可单独跟读，点击整句发音按钮进行全班合读。
            </li>
          </ol>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            开始游戏 (Start Game)
          </button>
        </div>
      </div>
    </div>
  );
};
