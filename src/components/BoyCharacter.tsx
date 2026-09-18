import React, { useEffect, useState } from 'react';
import { FoodItem } from '../types';
import { FoodIcon } from './FoodIcon';

interface BoyCharacterProps {
  isFoodHovering: boolean;
  isChewing: boolean;
  lastEatenFood: FoodItem | null;
  eatenCount: number;
  mouthRef: React.RefObject<HTMLDivElement | null>;
  onCharacterDrop?: (e: React.DragEvent) => void;
  onCharacterDragOver?: (e: React.DragEvent) => void;
  onCharacterDragLeave?: (e: React.DragEvent) => void;
}

export const BoyCharacter: React.FC<BoyCharacterProps> = ({
  isFoodHovering,
  isChewing,
  lastEatenFood,
  eatenCount,
  mouthRef,
  onCharacterDrop,
  onCharacterDragOver,
  onCharacterDragLeave,
}) => {
  // Blinking animation state
  const [isBlinking, setIsBlinking] = useState(false);
  // Animate food flying into mouth state
  const [flyingFood, setFlyingFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // When a new food is eaten, show food flying into the mouth
  useEffect(() => {
    if (lastEatenFood && isChewing) {
      setFlyingFood(lastEatenFood);
      const timer = setTimeout(() => {
        setFlyingFood(null);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [lastEatenFood, isChewing]);

  return (
    <div
      id="boy-character-container"
      onDragOver={onCharacterDragOver}
      onDragLeave={onCharacterDragLeave}
      onDrop={onCharacterDrop}
      className={`relative flex flex-col items-center justify-center select-none rounded-3xl p-3 sm:p-4 transition-all duration-300 ${
        isFoodHovering
          ? 'bg-amber-100/60 ring-4 ring-amber-400/80 scale-[1.02] shadow-xl'
          : 'bg-transparent'
      }`}
    >
      {/* Speech / Reaction Bubble */}
      <div className="h-14 mb-2 flex items-center justify-center">
        {isChewing ? (
          <div className="animate-bounce bg-white px-4 py-1.5 rounded-full shadow-lg border-2 border-amber-400 flex items-center gap-2">
            <span className="text-xl">😋</span>
            <span className="text-sm sm:text-base font-black text-amber-700">
              Yummy! 好吃！
            </span>
          </div>
        ) : isFoodHovering ? (
          <div className="animate-pulse bg-emerald-50 px-4 py-1.5 rounded-full shadow-md border-2 border-emerald-400 flex items-center gap-1.5">
            <span className="text-lg">🤤</span>
            <span className="text-sm font-bold text-emerald-800">
              Drop here to feed! 松开投喂！
            </span>
          </div>
        ) : (
          <div className="bg-white/85 backdrop-blur-xs px-3.5 py-1 rounded-full shadow-xs border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <span>👋</span>
            <span>Drag food anywhere here to feed! 拖动食物到男孩区域投喂！</span>
          </div>
        )}
      </div>

      {/* Boy Avatar Graphic Container */}
      <div className="relative w-64 sm:w-80 md:w-96 flex flex-col items-center">
        {/* Floating Sparkles / Hearts when chewing */}
        {isChewing && (
          <>
            <div className="absolute -top-6 left-12 text-2xl animate-float-up text-pink-500">
              💖
            </div>
            <div className="absolute -top-8 right-14 text-2xl animate-float-up-delayed text-amber-400">
              ✨
            </div>
            <div className="absolute top-10 -right-4 text-xl animate-float-up text-orange-400">
              🌟
            </div>
          </>
        )}

        {/* 
          SVG Boy Illustration with naturally proportioned features:
          Y-coordinates hierarchy:
          - Hair: 30 - 130
          - Eyebrows: 132 - 142
          - Eyes: 155
          - Cheeks: 178 - 188
          - Nose: 182 - 192 (STRICTLY ABOVE MOUTH)
          - Mouth Cavity: 206 - 280 (STRICTLY BELOW NOSE, WIDE OPEN FOR FOOD)
          - Chin: 290
          - Body & Neck: 280 - 340
        */}
        <svg
          viewBox="0 0 320 340"
          className="w-full h-auto drop-shadow-xl transition-transform duration-300"
        >
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#291002" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF1E6" />
              <stop offset="100%" stopColor="#FFE0C8" />
            </linearGradient>
            <linearGradient id="mouthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B0C22" />
              <stop offset="100%" stopColor="#3B0511" />
            </linearGradient>
            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>

          {/* Hair back layer */}
          <path
            d="M75 140C60 65 115 20 160 20C205 20 260 65 245 140Z"
            fill="url(#hairGrad)"
          />

          {/* Ears */}
          <circle cx="72" cy="175" r="22" fill="#FED7AA" stroke="#FDBA74" strokeWidth="3" />
          <circle cx="72" cy="175" r="12" fill="#FDBA74" opacity="0.6" />
          <circle cx="248" cy="175" r="22" fill="#FED7AA" stroke="#FDBA74" strokeWidth="3" />
          <circle cx="248" cy="175" r="12" fill="#FDBA74" opacity="0.6" />

          {/* Boy Body & Shoulders (under head) */}
          <path
            d="M95 280C75 285 45 305 35 340H285C275 305 245 285 225 280Z"
            fill="url(#shirtGrad)"
          />
          {/* T-shirt Collar */}
          <path
            d="M120 280C120 300 200 300 200 280"
            fill="#FEF08A"
            stroke="#EAB308"
            strokeWidth="3.5"
          />
          {/* T-shirt Stripes */}
          <path d="M50 315C90 302 230 302 270 315" stroke="#38BDF8" strokeWidth="10" fill="none" />
          {/* Meal Spoon Badge on Chest */}
          <circle cx="160" cy="320" r="15" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
          <text x="160" y="325" textAnchor="middle" fontSize="13" fill="#FFFFFF">
            🥄
          </text>

          {/* Boy Face Contour (Smooth friendly shape) */}
          <path
            d="M80 135C80 75 120 60 160 60C200 60 240 75 240 135C240 215 225 292 160 292C95 292 80 215 80 135Z"
            fill="url(#skinGrad)"
            stroke="#FDBA74"
            strokeWidth="3.5"
          />

          {/* Hair Front Bangs / Cute spiky kid fringe */}
          <path
            d="M78 120C78 68 115 32 160 32C205 32 242 68 242 120C226 100 206 100 192 115C175 96 145 96 128 115C114 100 94 100 78 120Z"
            fill="url(#hairGrad)"
          />
          {/* Cute hair cowlick tuft */}
          <path
            d="M160 32Q175 12 192 22Q176 27 165 34"
            fill="url(#hairGrad)"
          />

          {/* Rosy Cheeks */}
          <ellipse
            cx="102"
            cy="188"
            rx="16"
            ry={isChewing ? 14 : 10}
            fill="#FB7185"
            opacity={isChewing ? 0.85 : 0.5}
          />
          <ellipse
            cx="218"
            cy="188"
            rx="16"
            ry={isChewing ? 14 : 10}
            fill="#FB7185"
            opacity={isChewing ? 0.85 : 0.5}
          />

          {/* Eyebrows (positioned at Y: 130-142) */}
          <path
            d={isFoodHovering ? 'M100 134Q118 124 136 134' : 'M102 138Q118 130 135 138'}
            stroke="#451A03"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={isFoodHovering ? 'M184 134Q202 124 220 134' : 'M185 138Q202 130 218 138'}
            stroke="#451A03"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyes (positioned at Y: 154) */}
          {isChewing ? (
            // Chewing / Happy closed curved eyes (^ ^)
            <>
              <path
                d="M104 156Q119 143 134 156"
                stroke="#1E293B"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M186 156Q201 143 216 156"
                stroke="#1E293B"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : isBlinking ? (
            // Blinking straight slits
            <>
              <line x1="106" y1="154" x2="132" y2="154" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
              <line x1="188" y1="154" x2="214" y2="154" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            // Normal / Wide open eyes with bright highlights
            <>
              {/* Left Eye */}
              <circle cx="119" cy="154" r={isFoodHovering ? 14 : 12} fill="#1E293B" />
              <circle cx="122" cy="150" r={isFoodHovering ? 5.5 : 4.5} fill="#FFFFFF" />
              <circle cx="115" cy="157" r="2" fill="#FFFFFF" />

              {/* Right Eye */}
              <circle cx="201" cy="154" r={isFoodHovering ? 14 : 12} fill="#1E293B" />
              <circle cx="204" cy="150" r={isFoodHovering ? 5.5 : 4.5} fill="#FFFFFF" />
              <circle cx="197" cy="157" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* 
            CUTE NOSE: Strictly positioned at Y: 184 (BELOW EYES, ABOVE MOUTH!) 
          */}
          <path
            d="M156 181Q160 188 164 181"
            stroke="#EA580C"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="160" cy="180" rx="4.5" ry="3.5" fill="#FB923C" opacity="0.65" />

          {/* Small bridge contour */}
          <line x1="160" y1="172" x2="160" y2="178" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* 
          THE BOY'S BIG OPEN MOUTH ("张大嘴巴") 
          Positioned naturally at top 66% (Y roughly 210-275), safely BELOW the nose (Y 181)!
        */}
        <div
          ref={mouthRef}
          id="boy-mouth-target"
          className={`absolute top-[65.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-34 h-18 sm:h-22 rounded-[36px] flex items-center justify-center transition-all duration-200 pointer-events-none ${
            isFoodHovering
              ? 'scale-115'
              : isChewing
              ? 'animate-chew'
              : ''
          }`}
        >
          {/* Mouth Cavity SVG with Tooth, Tongue and Depth */}
          <svg viewBox="0 0 140 90" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Mouth cavity depth (Dark red) */}
            <path
              d={
                isChewing
                  ? 'M28 45C28 32 112 32 112 45C112 65 28 65 28 45Z'
                  : isFoodHovering
                  ? 'M15 36C15 12 125 12 125 36C125 88 15 88 15 36Z'
                  : 'M20 36C20 18 120 18 120 36C120 80 20 80 20 36Z'
              }
              fill="#881337"
              stroke="#4C0519"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Throat depth */}
            <ellipse
              cx="70"
              cy="48"
              rx={isFoodHovering ? 25 : 20}
              ry={isFoodHovering ? 16 : 12}
              fill="#4C0519"
            />

            {/* Upper Teeth (Clean white arch) */}
            <path
              d="M48 26C48 26 53 36 70 36C87 36 92 26 92 26"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />

            {/* Pink Bouncy Tongue */}
            <path
              d="M45 60C45 46 95 46 95 60C95 74 45 74 45 60Z"
              fill="#FB7185"
            />
            <path d="M70 48V58" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />

            {/* Dashed guide ring when dragging food over boy */}
            {isFoodHovering && (
              <rect
                x="6"
                y="8"
                width="128"
                height="74"
                rx="37"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-spin-slow"
              />
            )}
          </svg>

          {/* Visual animation of food flying into the mouth */}
          {flyingFood && (
            <div className="absolute top-1/2 left-1/2 animate-food-enter-mouth z-30">
              <div className="w-16 h-16 drop-shadow-2xl flex items-center justify-center bg-white/95 rounded-2xl p-1.5 border-2 border-amber-300">
                <FoodIcon type={flyingFood.svgType} size={48} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meals Fed Counter */}
      <div className="mt-3 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-xl border border-slate-200 shadow-xs">
        <span className="text-base">🍱</span>
        <span className="text-xs font-bold text-slate-700">
          Foods eaten (已喂食):{' '}
          <span className="text-sm font-black text-amber-600 font-mono">
            {eatenCount}
          </span>
        </span>
      </div>
    </div>
  );
};
