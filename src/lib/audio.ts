export class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft, realistic pencil/marker on paper
  playScribble() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 2.0; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Create brown noise (softer than white noise)
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Compensate for gain
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800; // Very soft, muffled paper friction
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    
    // Gentle rhythmic envelope for writing
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1); 
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.3); 
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.5); 
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.8); 
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.0); 
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.3); 
    gain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.5); 
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(ctx.currentTime);
  }

  // Air swoosh for large layout shifts (scroll triggers)
  playWhoosh() {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; 
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    // Sweeping frequency from high to low for a "whoosh"
    filter.frequency.setValueAtTime(1500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.1); // Much louder (80%)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(ctx.currentTime);
  }

  // Tiny UI tick for hovers or small reveals
  playTick() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.01); // 80% volume for clear mechanical click
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }
}

export const soundEngine = new SoundEngine();
