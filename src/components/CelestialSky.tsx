import React from 'react';
import { MealMode } from '../types';

interface CelestialSkyProps {
  mode: MealMode;
}

export const CelestialSky: React.FC<CelestialSkyProps> = ({ mode }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-700">
      {/* Background Gradient based on mode */}
      {mode === 'morning' && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-rose-100 to-sky-100 transition-opacity duration-1000">
          {/* Morning Sun (初升的太阳) - Low horizon, warm gentle glow */}
          <div className="absolute top-10 left-1/4 sm:left-1/3 -translate-x-1/2 flex flex-col items-center">
            {/* Sun Rays */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300/80">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="50"
                    y1="12"
                    x2="50"
                    y2="2"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform={`rotate(${deg} 50 50)`}
                  />
                ))}
              </svg>
              {/* Rising Sun Ball */}
              <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 shadow-[0_0_40px_rgba(251,191,36,0.7)] flex items-center justify-center border-2 border-amber-200">
                <span className="text-2xl sm:text-3xl select-none">🌅</span>
              </div>
            </div>
            {/* Morning Tag */}
            <div className="mt-1 px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full shadow-sm">
              Rising Sun · 初升的太阳
            </div>
          </div>

          {/* Gentle Morning Pastel Clouds */}
          <div className="absolute top-16 left-6 opacity-80 animate-pulse">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="#FFFFFF">
              <ellipse cx="40" cy="25" rx="30" ry="14" fill="#FFFFFF" fillOpacity="0.9" />
              <ellipse cx="70" cy="22" rx="35" ry="16" fill="#FFF1F2" fillOpacity="0.85" />
              <ellipse cx="55" cy="15" rx="25" ry="14" fill="#FFFFFF" fillOpacity="0.95" />
            </svg>
          </div>
          <div className="absolute top-28 right-1/4 opacity-75">
            <svg width="90" height="30" viewBox="0 0 90 30" fill="#FFFFFF">
              <ellipse cx="30" cy="18" rx="22" ry="10" fill="#FFFFFF" fillOpacity="0.85" />
              <ellipse cx="55" cy="16" rx="25" ry="12" fill="#FEF3C7" fillOpacity="0.75" />
            </svg>
          </div>
        </div>
      )}

      {mode === 'noon' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-amber-50 transition-opacity duration-1000">
          {/* Midday Blazing Sun (正午的烈日) - High up, glowing intensely */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Blazing rays pulsating */}
            <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center animate-spin-reverse-slow">
              <svg viewBox="0 0 120 120" className="w-full h-full text-yellow-400">
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                  <polygon
                    key={deg}
                    points="60,4 66,24 54,24"
                    fill="#FBBF24"
                    transform={`rotate(${deg} 60 60)`}
                  />
                ))}
              </svg>
              {/* Blazing core with bright corona */}
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-400 shadow-[0_0_60px_rgba(245,158,11,0.9)] flex items-center justify-center border-4 border-yellow-200 animate-pulse">
                <span className="text-3xl sm:text-4xl select-none">☀️</span>
              </div>
            </div>
            {/* Noon Tag */}
            <div className="mt-1 px-3 py-1 bg-orange-600/90 text-white text-xs font-bold rounded-full shadow-sm">
              Blazing Sun · 正午烈日
            </div>
          </div>

          {/* Fluffy white summer clouds */}
          <div className="absolute top-12 left-10 opacity-90">
            <svg width="140" height="50" viewBox="0 0 140 50">
              <ellipse cx="45" cy="30" rx="35" ry="16" fill="#FFFFFF" />
              <ellipse cx="85" cy="28" rx="40" ry="18" fill="#FFFFFF" />
              <ellipse cx="65" cy="18" rx="30" ry="16" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="absolute top-14 right-12 opacity-85">
            <svg width="120" height="40" viewBox="0 0 120 40">
              <ellipse cx="40" cy="24" rx="30" ry="14" fill="#FFFFFF" />
              <ellipse cx="75" cy="22" rx="32" ry="15" fill="#FFFFFF" />
              <ellipse cx="60" cy="14" rx="25" ry="12" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      )}

      {mode === 'night' && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-800 transition-opacity duration-1000">
          {/* Twinkling Stars scattered */}
          {[
            { top: '12%', left: '8%', size: 'w-2 h-2', delay: '0s' },
            { top: '22%', left: '18%', size: 'w-3 h-3', delay: '0.4s' },
            { top: '15%', left: '32%', size: 'w-2 h-2', delay: '0.8s' },
            { top: '28%', left: '42%', size: 'w-2.5 h-2.5', delay: '1.2s' },
            { top: '10%', left: '68%', size: 'w-3 h-3', delay: '0.3s' },
            { top: '24%', left: '82%', size: 'w-2 h-2', delay: '0.7s' },
            { top: '14%', left: '92%', size: 'w-2.5 h-2.5', delay: '1.1s' },
            { top: '35%', left: '12%', size: 'w-1.5 h-1.5', delay: '0.5s' },
            { top: '38%', left: '78%', size: 'w-2 h-2', delay: '0.9s' },
          ].map((star, idx) => (
            <div
              key={idx}
              className={`absolute ${star.size} bg-yellow-200 rounded-full animate-ping shadow-[0_0_8px_#FDE047]`}
              style={{
                top: star.top,
                left: star.left,
                animationDuration: '2.5s',
                animationDelay: star.delay,
              }}
            />
          ))}

          {/* Night Moon (夜晚的月亮) - Radiant crescent moon with warm glow */}
          <div className="absolute top-6 left-1/3 -translate-x-1/2 flex flex-col items-center">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
              {/* Moon Glow Aura */}
              <div className="absolute w-24 h-24 rounded-full bg-yellow-100/20 blur-xl animate-pulse" />
              <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_25px_rgba(253,224,71,0.8)]">
                {/* Crescent Moon */}
                <path
                  d="M48 10C24 10 10 28 10 50C10 72 26 90 48 90C36 80 32 64 32 50C32 36 36 20 48 10Z"
                  fill="#FEF08A"
                  stroke="#FDE047"
                  strokeWidth="2"
                />
                {/* Cute Smiling Face on the moon */}
                <circle cx="24" cy="44" r="2.5" fill="#475569" />
                <path d="M22 52Q26 56 30 52" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="21" cy="48" r="2" fill="#F472B6" />
                {/* Night cap little star */}
                <polygon
                  points="52,18 54,23 59,23 55,26 57,31 52,28 47,31 49,26 45,23 50,23"
                  fill="#FACC15"
                />
              </svg>
            </div>
            {/* Night Tag */}
            <div className="mt-1 px-3 py-1 bg-indigo-500/90 text-white text-xs font-bold rounded-full shadow-sm">
              Night Moon · 夜晚月亮
            </div>
          </div>

          {/* Soft translucent night clouds */}
          <div className="absolute top-24 left-1/4 opacity-40">
            <svg width="160" height="40" viewBox="0 0 160 40">
              <ellipse cx="60" cy="25" rx="50" ry="14" fill="#6366F1" />
              <ellipse cx="110" cy="22" rx="40" ry="12" fill="#818CF8" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
