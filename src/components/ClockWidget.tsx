import React from 'react';
import { MealMode } from '../types';

interface ClockWidgetProps {
  mode: MealMode;
}

export const ClockWidget: React.FC<ClockWidgetProps> = ({ mode }) => {
  // Mode specific time details
  const timeConfig = {
    morning: { hour: 7, minute: 0, text: '7:00 AM', label: '7:00 上午' },
    noon: { hour: 12, minute: 0, text: '12:00 PM', label: '12:00 中午' },
    night: { hour: 7, minute: 0, text: '7:00 PM', label: '7:00 晚上' },
  }[mode];

  // Calculate clock hand degrees
  // 12 hours = 360 deg -> 30 deg per hour
  const hourDegrees = (timeConfig.hour % 12) * 30 + (timeConfig.minute / 60) * 30;
  const minuteDegrees = timeConfig.minute * 6; // 60 mins = 360 deg -> 6 deg per minute

  return (
    <div
      id="game-clock-widget"
      className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border-2 border-white/80 transition-all duration-300 hover:scale-105"
    >
      {/* Clock Face SVG */}
      <div className="relative w-14 h-14 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Clock Outer Rim */}
          <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#334155" strokeWidth="5" />
          <circle cx="50" cy="50" r="42" fill="#FFFFFF" />

          {/* Hour ticks */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
            const angle = (num * 30 * Math.PI) / 180;
            const x1 = 50 + 34 * Math.sin(angle);
            const y1 = 50 - 34 * Math.cos(angle);
            const isCardinal = num % 3 === 0;
            return (
              <circle
                key={num}
                cx={x1}
                cy={y1}
                r={isCardinal ? 2.5 : 1.5}
                fill={isCardinal ? '#0F172A' : '#94A3B8'}
              />
            );
          })}

          {/* Clock Numbers for 12, 3, 6, 9 */}
          <text x="50" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
            12
          </text>
          <text x="79" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
            3
          </text>
          <text x="50" y="83" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
            6
          </text>
          <text x="22" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
            9
          </text>

          {/* Hour Hand */}
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: `rotate(${hourDegrees}deg)`,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="28"
              stroke="#0F172A"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* Minute Hand */}
          <g
            style={{
              transformOrigin: '50px 50px',
              transform: `rotate(${minuteDegrees}deg)`,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="18"
              stroke="#EF4444"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Center Pin */}
          <circle cx="50" cy="50" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>

        {/* Mini Pendulum/Badge */}
        <div className="absolute -bottom-1 -right-1 bg-amber-400 text-[10px] font-black px-1.5 py-0.5 rounded-full text-amber-950 border border-white shadow-xs">
          ⏰
        </div>
      </div>

      {/* Digital readout */}
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Time · 时间
        </span>
        <span className="text-base font-extrabold text-slate-800 leading-tight font-mono">
          {timeConfig.text}
        </span>
        <span className="text-[11px] font-medium text-slate-600">
          {timeConfig.label}
        </span>
      </div>
    </div>
  );
};
