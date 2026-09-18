import React from 'react';
import { MealMode } from '../types';
import { soundManager } from '../utils/audio';
import { Music, Volume2, VolumeX, RotateCcw, Info } from 'lucide-react';

interface GameControlsProps {
  currentMode: MealMode;
  onModeChange: (mode: MealMode) => void;
  isBgmActive: boolean;
  onToggleBgm: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onReset: () => void;
  onOpenHelp: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  currentMode,
  onModeChange,
  isBgmActive,
  onToggleBgm,
  isMuted,
  onToggleMute,
  onReset,
  onOpenHelp,
}) => {
  const modes: {
    id: MealMode;
    icon: string;
    title: string;
    sub: string;
    time: string;
    activeColor: string;
  }[] = [
    {
      id: 'morning',
      icon: '🌅',
      title: 'Morning',
      sub: '早上',
      time: '7:00 AM',
      activeColor: 'bg-amber-500 text-white shadow-amber-300/50 border-amber-600',
    },
    {
      id: 'noon',
      icon: '☀️',
      title: 'Noon',
      sub: '中午',
      time: '12:00 PM',
      activeColor: 'bg-orange-500 text-white shadow-orange-300/50 border-orange-600',
    },
    {
      id: 'night',
      icon: '🌙',
      title: 'Night',
      sub: '晚上',
      time: '7:00 PM',
      activeColor: 'bg-indigo-600 text-white shadow-indigo-400/50 border-indigo-700',
    },
  ];

  return (
    <div
      id="game-navigation-controls"
      className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-3xl shadow-lg border border-white/80"
    >
      {/* Three Mode Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:inline">
          Modes:
        </span>
        {modes.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                onModeChange(m.id);
                soundManager.playPopSound();
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer transform active:scale-95 ${
                isActive
                  ? `${m.activeColor} shadow-md scale-105`
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300/80'
              }`}
            >
              <span className="text-base sm:text-lg">{m.icon}</span>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{m.title} · {m.sub}</span>
                <span className={`text-[10px] ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                  {m.time}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Auxiliary Controls (BGM, SFX Mute, Reset, Teacher Guide) */}
      <div className="flex items-center gap-2">
        {/* BGM Toggle */}
        <button
          onClick={onToggleBgm}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isBgmActive
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
          title={isBgmActive ? 'Turn off background music' : 'Turn on background music (开启轻松背景音)'}
        >
          <Music className={`w-3.5 h-3.5 ${isBgmActive ? 'animate-bounce text-emerald-600' : ''}`} />
          <span>BGM {isBgmActive ? 'ON' : 'OFF'}</span>
        </button>

        {/* SFX Mute */}
        <button
          onClick={onToggleMute}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Reset Counter */}
        <button
          onClick={onReset}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          title="Reset game stats (重置)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Lesson Help / Instructions */}
        <button
          onClick={onOpenHelp}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold transition-colors cursor-pointer"
          title="Lesson objective & guide (备课指南与游戏说明)"
        >
          <Info className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Guide 教学指南</span>
        </button>
      </div>
    </div>
  );
};
