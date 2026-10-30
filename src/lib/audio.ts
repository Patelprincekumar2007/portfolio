export class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private scribbleBuffer: AudioBuffer | null = null;
  private whooshBuffer: AudioBuffer | null = null;

  init() {
    if (typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Audio init warning - silent fallback
    }
  }

  private getScribbleBuffer(): AudioBuffer | null {
    if (this.scribbleBuffer) return this.scribbleBuffer;
    if (!this.ctx) return null;
    const ctx = this.ctx;
    const bufferSize = Math.floor(ctx.sampleRate * 2.0);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0,
      b1 = 0,
      b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      data[i] = (b0 + b1 + b2 + white * 0.1) * 0.5;
    }
    this.scribbleBuffer = buffer;
    return buffer;
  }

  // Silent signature sound (voice/audio removed as requested)
  playSignatureSound() {
    // Silent
  }

  // Alias for backward compatibility
  playScribble() {
    // Silent
  }

  // Air swoosh for transitions
  playWhoosh() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;

    if (!this.whooshBuffer) {
      const bufferSize = Math.floor(ctx.sampleRate * 0.4);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.whooshBuffer = buffer;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = this.whooshBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.35);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.08);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    try {
      noise.start(ctx.currentTime);
    } catch {
      // safe fallback
    }
  }

  // Mechanical tick for interactions
  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.04);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.008);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    try {
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // safe fallback
    }
  }
}

export const soundEngine = new SoundEngine();
