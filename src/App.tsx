import React, { useState, useRef, useEffect } from 'react';
import { MealMode, FoodItem } from './types';
import { MODES_DATA, ALL_FOODS } from './data/foods';
import { CelestialSky } from './components/CelestialSky';
import { ClockWidget } from './components/ClockWidget';
import { BoyCharacter } from './components/BoyCharacter';
import { FoodBuffet } from './components/FoodBuffet';
import { SentenceBar } from './components/SentenceBar';
import { GameControls } from './components/GameControls';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { soundManager } from './utils/audio';

export default function App() {
  // Current game mode (morning / noon / night)
  const [currentMode, setCurrentMode] = useState<MealMode>('morning');
  const currentModeInfo = MODES_DATA[currentMode];

  // Drag and feeding states
  const [draggingFoodId, setDraggingFoodId] = useState<string | null>(null);
  const [isFoodHovering, setIsFoodHovering] = useState<boolean>(false);
  const [isChewing, setIsChewing] = useState<boolean>(false);
  const [lastEatenFood, setLastEatenFood] = useState<FoodItem | null>(null);
  const [eatenCount, setEatenCount] = useState<number>(0);
  const [highlightSentence, setHighlightSentence] = useState<boolean>(false);

  // Audio states
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Teacher guide modal
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Boy mouth ref for drop zone
  const mouthRef = useRef<HTMLDivElement | null>(null);

  // Handle Mode Change
  const handleModeChange = (mode: MealMode) => {
    setCurrentMode(mode);
    setHighlightSentence(true);
    // Announce new mode's sentence gently
    soundManager.speak(MODES_DATA[mode].sentence, 0.85);
    setTimeout(() => {
      setHighlightSentence(false);
    }, 2000);
  };

  // Perform Eating Action
  const feedBoyWithFood = (food: FoodItem) => {
    setLastEatenFood(food);
    setIsChewing(true);
    setIsFoodHovering(false);
    setDraggingFoodId(null);
    setEatenCount((prev) => prev + 1);

    // 1. Play realistic crunch & gulp eating sound
    soundManager.playChewSound();

    // 2. Highlight bottom sentence
    setHighlightSentence(true);

    // 3. Play happy celebration chime
    setTimeout(() => {
      soundManager.playSuccessChime();
    }, 450);

    // 4. Voice read aloud target sentence
    setTimeout(() => {
      soundManager.speak(currentModeInfo.sentence, 0.85);
    }, 600);

    // 5. Reset chewing state after eating animation completes
    setTimeout(() => {
      setIsChewing(false);
    }, 1800);

    setTimeout(() => {
      setHighlightSentence(false);
    }, 4000);
  };

  // Drag & Drop Handlers
  const handleSelectOrDragFood = (food: FoodItem) => {
    setDraggingFoodId(food?.id || null);
  };

  const handleCharacterDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isFoodHovering) {
      setIsFoodHovering(true);
    }
  };

  const handleCharacterDragLeave = (e: React.DragEvent) => {
    // Only set to false if leaving the container itself
    const relatedTarget = e.relatedTarget as Node | null;
    if (!e.currentTarget.contains(relatedTarget)) {
      setIsFoodHovering(false);
    }
  };

  const handleCharacterDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsFoodHovering(false);

    const foodId = e.dataTransfer.getData('text/plain') || draggingFoodId;
    if (foodId) {
      const food = ALL_FOODS.find((f) => f.id === foodId);
      if (food) {
        feedBoyWithFood(food);
      }
    }
  };

  // Background Music Toggle
  const handleToggleBgm = () => {
    const isPlaying = soundManager.toggleBgm();
    setIsBgmActive(isPlaying);
  };

  // Mute Toggle
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMute(nextMute);
  };

  // Reset Game
  const handleReset = () => {
    soundManager.playPopSound();
    setEatenCount(0);
    setLastEatenFood(null);
    setIsChewing(false);
    setIsFoodHovering(false);
  };

  return (
    <div
      id="game-viewport"
      className="relative min-h-screen w-full flex flex-col justify-between text-slate-800 transition-colors duration-700 selection:bg-amber-300"
    >
      {/* Dynamic Celestial Environment (Sunrise / Midday Blazing Sun / Night Moon) */}
      <CelestialSky mode={currentMode} />

      {/* Main Game Interface Container */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen w-full max-w-7xl mx-auto p-3 sm:p-5 md:p-6 gap-3">
        {/* Top Header Row: Mode Switcher, Clock Widget, Game Controls */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
          {/* Top Left: Clock & Time display */}
          <div className="flex items-center gap-3">
            <ClockWidget mode={currentMode} />
          </div>

          {/* Top Center & Right: Navigation Modes & Sound Controls */}
          <GameControls
            currentMode={currentMode}
            onModeChange={handleModeChange}
            isBgmActive={isBgmActive}
            onToggleBgm={handleToggleBgm}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onReset={handleReset}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        </header>

        {/* Center Main Stage: Left is Food Buffet, Right is Boy with Open Mouth */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-1 sm:my-2">
          {/* Left Column (Foods Table - 7 cols on large screen) */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <FoodBuffet
              foods={ALL_FOODS}
              onSelectOrDragFood={handleSelectOrDragFood}
              draggingFoodId={draggingFoodId}
            />
          </div>

          {/* Right Column (Boy Character with Open Mouth - 5 cols on large screen) */}
          <div className="lg:col-span-5 h-full flex flex-col items-center justify-center py-2">
            <BoyCharacter
              isFoodHovering={isFoodHovering}
              isChewing={isChewing}
              lastEatenFood={lastEatenFood}
              eatenCount={eatenCount}
              mouthRef={mouthRef}
              onCharacterDrop={handleCharacterDrop}
              onCharacterDragOver={handleCharacterDragOver}
              onCharacterDragLeave={handleCharacterDragLeave}
            />
          </div>
        </main>

        {/* Bottom Stage: Target Sentence Learning Board */}
        <footer className="w-full">
          <SentenceBar
            modeInfo={currentModeInfo}
            highlighted={highlightSentence || isChewing}
          />
        </footer>
      </div>

      {/* Teacher Guide & Lesson Plan Modal */}
      <TeacherGuideModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
