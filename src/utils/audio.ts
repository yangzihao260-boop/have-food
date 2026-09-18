// Audio Synthesizer and Speech Engine using Web Audio API and Web Speech API

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;
  private isMuted = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Eating / Chewing sound ("Crunch, munch, nom!")
  public playChewSound() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;

      // 3 rapid munching sounds
      for (let i = 0; i < 3; i++) {
        const startTime = now + i * 0.13;

        // Bandpass noise for crunchy texture
        const bufferSize = this.ctx.sampleRate * 0.08;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400 - i * 150, startTime);
        filter.Q.setValueAtTime(3, startTime);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3, startTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.07);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noise.start(startTime);
        noise.stop(startTime + 0.08);

        // Low pitch thud for mouth chew
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180 - i * 20, startTime);
        osc.frequency.exponentialRampToValueAtTime(90, startTime + 0.08);

        oscGain.gain.setValueAtTime(0.25, startTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.08);
      }

      // Satisfied gulp sound at the end
      setTimeout(() => {
        this.playGulpSound();
      }, 420);
    } catch {
      // Audio not permitted yet or failed safely
    }
  }

  // Cute swallow sound ("Gulp!")
  public playGulpSound() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // safe fallback
    }
  }

  // Rewarding pleasant celebration chime
  public playSuccessChime() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);
      });
    } catch {
      // safe fallback
    }
  }

  // Light bubble pop for clicks / grab
  public playPopSound(highPitch = false) {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startFreq = highPitch ? 600 : 420;
      const endFreq = highPitch ? 950 : 700;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.07);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // safe fallback
    }
  }

  // Background Music Synthesizer (Upbeat, gentle children's nursery style)
  public toggleBgm(): boolean {
    this.initCtx();
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public getBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.bgmGain) {
      this.bgmGain.gain.value = muted ? 0 : 0.08;
    }
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public startBgm() {
    this.initCtx();
    if (!this.ctx || this.isBgmPlaying) return;

    this.isBgmPlaying = true;
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);
    this.bgmGain.connect(this.ctx.destination);

    // Simple warm, happy melody loop (C-D-E-G / nursery melody)
    const melody: { note: number; dur: number }[] = [
      { note: 261.63, dur: 0.35 }, // C4
      { note: 329.63, dur: 0.35 }, // E4
      { note: 392.00, dur: 0.35 }, // G4
      { note: 523.25, dur: 0.5 },  // C5
      { note: 440.00, dur: 0.35 }, // A4
      { note: 392.00, dur: 0.35 }, // G4
      { note: 329.63, dur: 0.6 },  // E4
      { note: 293.66, dur: 0.35 }, // D4
      { note: 329.63, dur: 0.35 }, // E4
      { note: 392.00, dur: 0.35 }, // G4
      { note: 293.66, dur: 0.5 },  // D4
      { note: 261.63, dur: 0.7 },  // C4
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;

      const item = melody[noteIndex];
      const now = this.ctx.currentTime;

      // Soft marimba-like bell tone
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.note, now);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.6, now + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + item.dur);

      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + item.dur + 0.05);

      noteIndex = (noteIndex + 1) % melody.length;
      this.bgmTimer = window.setTimeout(playNextNote, (item.dur + 0.08) * 1000);
    };

    playNextNote();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.bgmGain) {
      try {
        this.bgmGain.disconnect();
      } catch {
        // ignore
      }
      this.bgmGain = null;
    }
  }

  // Speak sentence with English TTS
  public speak(text: string, rate: number = 0.88): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.pitch = 1.15; // slightly higher friendly pitch for kids

      // Try finding pleasant English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Victoria')) && v.lang.startsWith('en')
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }
}

export const soundManager = new SoundManager();
