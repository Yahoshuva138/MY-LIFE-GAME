/* ═══════════════════════════════════════════════════════════════
   YAHOSHUVA: ORIGIN ZERO — Cinematic Opening Sequence Engine
   
   Sequence Timeline:
   ─────────────────
   0.0s  - Total darkness, ambient audio begins
   2.0s  - Particles emerge (stars / dust motes)
   5.0s  - Mountain landscape silhouette fades in
   7.0s  - Horizon glow intensifies
   8.5s  - Pre-title text appears
   9.5s  - Main title "YAHOSHUVA" strikes in
   10.5s - Subtitle "ORIGIN ZERO" fades up
   12.5s - Tagline fades in
   14.0s - Decorative lines extend
   16.0s - "Press any key" prompt appears
   ═══════════════════════════════════════════════════════════════ */

// ── Audio Engine (Web Audio API — no external files needed) ──
class AtmosphericAudio {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.isPlaying = false;
    }

    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
    }

    // Deep atmospheric drone
    createDrone(freq, volume = 0.08) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Slow frequency modulation for organic feel
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.05 + Math.random() * 0.1, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(freq * 0.008, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, this.ctx.currentTime);
        filter.Q.setValueAtTime(1, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start();

        return { osc, gain, filter, lfo, lfoGain };
    }

    // Ethereal pad layer
    createPad(freq, delay = 0) {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        const reverb = this.ctx.createConvolver();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc2.frequency.setValueAtTime(freq * 1.002, this.ctx.currentTime); // slight detune

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + delay + 6);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc1.start(this.ctx.currentTime + delay);
        osc2.start(this.ctx.currentTime + delay);

        return { osc1, osc2, gain };
    }

    // Wind / breath noise
    createWind() {
        const bufferSize = this.ctx.sampleRate * 4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(300, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.5, this.ctx.currentTime);

        // Modulate wind filter
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(200, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.015, this.ctx.currentTime + 5);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start();

        return { source, gain, filter };
    }

    // Title impact sound
    playTitleImpact() {
        const time = this.ctx.currentTime;

        // Sub bass hit
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(60, time);
        subOsc.frequency.exponentialRampToValueAtTime(30, time + 2);
        subGain.gain.setValueAtTime(0.25, time);
        subGain.gain.exponentialRampToValueAtTime(0.001, time + 3);
        subOsc.connect(subGain);
        subGain.connect(this.masterGain);
        subOsc.start(time);
        subOsc.stop(time + 3);

        // Impact noise burst
        const impactBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.3, this.ctx.sampleRate);
        const impactData = impactBuffer.getChannelData(0);
        for (let i = 0; i < impactData.length; i++) {
            impactData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.05));
        }
        const impactSource = this.ctx.createBufferSource();
        impactSource.buffer = impactBuffer;
        const impactGain = this.ctx.createGain();
        const impactFilter = this.ctx.createBiquadFilter();
        impactFilter.type = 'lowpass';
        impactFilter.frequency.setValueAtTime(600, time);
        impactGain.gain.setValueAtTime(0.12, time);
        impactGain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);
        impactSource.connect(impactFilter);
        impactFilter.connect(impactGain);
        impactGain.connect(this.masterGain);
        impactSource.start(time);

        // Resonant tone (cinematic "braaam" feel)
        [55, 82.5, 110].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = i === 0 ? 'sawtooth' : 'sine';
            osc.frequency.setValueAtTime(freq, time);
            g.gain.setValueAtTime(0.06 / (i + 1), time);
            g.gain.exponentialRampToValueAtTime(0.001, time + 4);
            const f = this.ctx.createBiquadFilter();
            f.type = 'lowpass';
            f.frequency.setValueAtTime(500, time);
            osc.connect(f);
            f.connect(g);
            g.connect(this.masterGain);
            osc.start(time);
            osc.stop(time + 4);
        });
    }

    start() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        // Fade in master
        this.masterGain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 3);

        // Layer 1: Deep drones
        this.createDrone(55, 0.06);     // A1
        this.createDrone(82.5, 0.04);   // E2 (fifth)

        // Layer 2: Ethereal pads (enter later)
        this.createPad(220, 4);   // A3
        this.createPad(330, 6);   // E4
        this.createPad(277.18, 8); // C#4

        // Layer 3: Wind atmosphere
        this.createWind();
    }
}


// ── Particle System ──
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawn(count = 1) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height * 0.7,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: -Math.random() * 0.15 - 0.02,
                opacity: 0,
                maxOpacity: Math.random() * 0.6 + 0.2,
                fadeSpeed: Math.random() * 0.003 + 0.001,
                phase: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                // Golden-white color variation
                hue: 40 + Math.random() * 20,
                saturation: 30 + Math.random() * 40,
                lightness: 70 + Math.random() * 25
            });
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Fade in
            if (p.opacity < p.maxOpacity) {
                p.opacity += p.fadeSpeed;
            }

            // Gentle floating motion
            p.x += p.speedX + Math.sin(p.phase) * 0.1;
            p.y += p.speedY;
            p.phase += p.pulseSpeed;

            // Pulsing opacity
            const pulse = 0.5 + 0.5 * Math.sin(p.phase * 2);
            const currentOpacity = p.opacity * (0.7 + pulse * 0.3);

            // Draw particle with glow
            const gradient = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.size * 4
            );
            gradient.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${currentOpacity})`);
            gradient.addColorStop(0.3, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${currentOpacity * 0.4})`);
            gradient.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0)`);

            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            this.ctx.fill();

            // Core bright point
            this.ctx.beginPath();
            this.ctx.fillStyle = `hsla(${p.hue}, 20%, 95%, ${currentOpacity * 0.8})`;
            this.ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();

            // Remove if off screen
            if (p.y < -20 || p.x < -20 || p.x > this.canvas.width + 20) {
                this.particles.splice(i, 1);
            }
        }
    }
}


// ── Cinematic Sequence Controller ──
class CinematicSequence {
    constructor() {
        this.audio = new AtmosphericAudio();
        this.particles = new ParticleSystem(document.getElementById('particle-canvas'));
        this.startTime = null;
        this.isRunning = false;
        this.sequenceStarted = false;
        this.titleRevealed = false;
        this.promptShown = false;
        this.particleSpawnRate = 0;

        // Cache DOM elements
        this.elements = {
            clickOverlay: document.getElementById('click-to-start'),
            landscape: document.getElementById('landscape-layer'),
            titlePre: document.getElementById('title-pre'),
            titleMain: document.getElementById('title-main'),
            titleSub: document.getElementById('title-sub'),
            titleTagline: document.getElementById('title-tagline'),
            lineLeft: document.getElementById('title-line-left'),
            lineRight: document.getElementById('title-line-right'),
            startPrompt: document.getElementById('start-prompt'),
            lensFlare: document.getElementById('lens-flare'),
        };

        this.bindEvents();
    }

    bindEvents() {
        // Click to start
        this.elements.clickOverlay.addEventListener('click', () => {
            this.audio.init();
            this.elements.clickOverlay.classList.add('hidden');
            setTimeout(() => {
                this.elements.clickOverlay.style.display = 'none';
                this.beginSequence();
            }, 800);
        });
    }

    beginSequence() {
        if (this.sequenceStarted) return;
        this.sequenceStarted = true;
        this.isRunning = true;
        this.startTime = performance.now();

        // Start ambient audio
        this.audio.start();

        // Begin animation loop
        this.animate();
    }

    animate() {
        if (!this.isRunning) return;

        const elapsed = (performance.now() - this.startTime) / 1000; // seconds

        // ── Phase 1: Particles emerge (2s+) ──
        if (elapsed > 2) {
            // Gradually increase spawn rate
            const particleIntensity = Math.min((elapsed - 2) / 8, 1);
            if (Math.random() < particleIntensity * 0.3) {
                this.particles.spawn(1);
            }
        }

        // ── Phase 2: Landscape reveals (5s) ──
        if (elapsed > 5 && !this.elements.landscape.classList.contains('visible')) {
            this.elements.landscape.classList.add('visible');
        }

        // ── Phase 3: Lens flare (7s) ──
        if (elapsed > 7 && !this.elements.lensFlare.classList.contains('visible')) {
            this.elements.lensFlare.classList.add('visible');
        }

        // ── Phase 4: Title Sequence ──
        // Pre-title (8.5s)
        if (elapsed > 8.5 && !this.elements.titlePre.classList.contains('reveal-pre')) {
            this.elements.titlePre.classList.add('reveal-pre');
        }

        // Main title YAHOSHUVA (9.5s)
        if (elapsed > 9.5 && !this.titleRevealed) {
            this.titleRevealed = true;
            this.elements.titleMain.classList.add('reveal-main');
            this.elements.titleMain.classList.add('flash');

            // Play impact sound
            this.audio.playTitleImpact();

            // Burst of particles on impact
            this.particles.spawn(30);

            // Add breathing glow after strike
            setTimeout(() => {
                document.querySelector('.title-name').classList.add('breathing');
            }, 2000);
        }

        // Subtitle ORIGIN ZERO (10.5s)
        if (elapsed > 10.5 && !this.elements.titleSub.classList.contains('reveal-sub')) {
            this.elements.titleSub.classList.add('reveal-sub');
        }

        // Tagline (12.5s)
        if (elapsed > 12.5 && !this.elements.titleTagline.classList.contains('reveal-tagline')) {
            this.elements.titleTagline.classList.add('reveal-tagline');
        }

        // Decorative lines (14s)
        if (elapsed > 14) {
            this.elements.lineLeft.classList.add('visible');
            this.elements.lineRight.classList.add('visible');
        }

        // ── Phase 5: Start Prompt (16s) ──
        if (elapsed > 16 && !this.promptShown) {
            this.promptShown = true;
            this.elements.startPrompt.classList.add('visible');
            this.bindStartAction();
        }

        // Update particles
        this.particles.update();

        requestAnimationFrame(() => this.animate());
    }

    bindStartAction() {
        const handleStart = (e) => {
            // Prevent re-trigger
            document.removeEventListener('keydown', handleStart);
            document.removeEventListener('click', handleStart);

            // Flash to white then transition
            this.transitionToGame();
        };

        document.addEventListener('keydown', handleStart);
        document.addEventListener('click', handleStart);
    }

    transitionToGame() {
        // Create white flash overlay
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: white; z-index: 9999; opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(flash);

        // Flash in
        requestAnimationFrame(() => {
            flash.style.opacity = '1';
        });

        // Fade to black
        setTimeout(() => {
            flash.style.background = '#000';
            flash.style.transition = 'opacity 2s ease';
            flash.style.opacity = '1';
        }, 300);

        // Transition to Storyline 01
        setTimeout(() => {
            window.location.href = 'storyline01.html';
        }, 2500);
    }
}

// ── Initialize ──
window.addEventListener('DOMContentLoaded', () => {
    const game = new CinematicSequence();
});
