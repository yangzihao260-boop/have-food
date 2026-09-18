import React, { useState } from 'react';
import { ModeInfo } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface SentenceBarProps {
  modeInfo: ModeInfo;
  highlighted: boolean;
  onSentenceSpoken?: () => void;
}

export const SentenceBar: React.FC<SentenceBarProps> = ({
  modeInfo,
  highlighted,
  onSentenceSpoken,
}) => {
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  const handleReadFullSentence = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    soundManager.playPopSound(true);

    try {
      await soundManager.speak(modeInfo.sentence, speechRate);
    } finally {
      setIsSpeaking(false);
      onSentenceSpoken?.();
    }
  };

  const handleWordClick = async (word: string, idx: number) => {
    setActiveWordIdx(idx);
    soundManager.playPopSound();
    await soundManager.speak(word, 0.8);
    setTimeout(() => {
      setActiveWordIdx(null);
    }, 600);
  };

  return (
    <div
      id="game-sentence-board"
      className={`relative w-full max-w-4xl mx-auto rounded-3xl p-4 sm:p-5 border-4 transition-all duration-500 shadow-xl ${
        highlighted
          ? 'bg-amber-50/95 border-amber-400 ring-4 ring-amber-300/60 scale-[1.01]'
          : 'bg-white/95 border-slate-200'
      }`}
    >
      {/* Top Banner with Mode and Meal Identifier */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-500">
            Target English Sentence · 核心教学目标句型
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${modeInfo.badgeBg} border`}>
            {modeInfo.mealName.toUpperCase()} · {modeInfo.mealChinese}
          </span>
        </div>

        {/* Classroom Speed & Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const nextRate = speechRate === 0.85 ? 0.65 : 0.85;
              setSpeechRate(nextRate);
              soundManager.playPopSound();
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Toggle speech speed for kids"
          >
            <span>Speed 语速:</span>
            <span className="font-bold text-amber-600">
              {speechRate === 0.85 ? 'Normal (正常)' : 'Slow (慢速)'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Sentence Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Interactive Word Chips */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5">
          {modeInfo.words.map((w, idx) => {
            const isTargetMealWord =
              w.clean.toLowerCase() === modeInfo.mealName.toLowerCase();
            const isActive = activeWordIdx === idx;

            return (
              <button
                key={idx}
                onClick={() => handleWordClick(w.clean, idx)}
                className={`relative px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xl sm:text-2xl md:text-3xl font-extrabold transition-all duration-200 transform active:scale-95 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-amber-500 text-white scale-110 shadow-md ring-2 ring-amber-300'
                    : isTargetMealWord
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-400 font-black'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/80'
                }`}
                title={`Click to pronounce: "${w.clean}" (点击跟读该单词)`}
              >
                {w.text}
                {isTargetMealWord && (
                  <span className="absolute -top-2.5 -right-1 text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                    ★
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Read Aloud Button */}
        <button
          onClick={handleReadFullSentence}
          disabled={isSpeaking}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-base sm:text-lg shadow-md transition-all duration-200 shrink-0 transform active:scale-95 cursor-pointer ${
            isSpeaking
              ? 'bg-amber-400 animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg'
          }`}
          title="Play standard sentence pronunciation (整句发音)"
        >
          <Volume2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isSpeaking ? 'animate-bounce' : ''}`} />
          <span>{isSpeaking ? 'Reading... 朗读中' : 'Read Sentence 读句子'}</span>
        </button>
      </div>

      {/* Chinese Meaning & Classroom Tip */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-700">中文释义:</span>
          <span className="text-slate-800 font-semibold text-sm sm:text-base">
            {modeInfo.sentenceChinese}
          </span>
        </div>
        <div className="text-slate-500 text-[11px] sm:text-xs italic">
          💡 Click each word to listen and repeat! (点击每个单词可单独点读)
        </div>
      </div>
    </div>
  );
};
