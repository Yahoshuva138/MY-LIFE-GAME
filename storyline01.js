/* ═══════════════════════════════════════════════════════════════
   YAHOSHUVA: ORIGIN ZERO — Storyline 01 Engine
   Cinematic Scene-by-Scene Visual Novel Controller
   ═══════════════════════════════════════════════════════════════ */

// ── Scene Data ──
// Each scene defines: background image, overlay darkness, Ken Burns style,
// whether it has typewriter text, audio cues, and special behaviors.
const SCENE_DATA = [
    // 0 — STORYLINE TITLE CARD
    {
        bg: null,
        overlay: 'full-black',
        kenBurns: null,
        audio: null,
        autoAdvance: 4000,
    },
    // 1 — BLACK / HEARTBEAT
    {
        bg: null,
        overlay: 'full-black',
        kenBurns: null,
        audio: 'heartbeat',
        autoAdvance: 5500,
        special: 'heartbeat',
    },
    // 2 — PROLOGUE CARD
    {
        bg: 'https://images.openai.com/static-rsc-4/NlH-cNKwyx5i7-Af__xSZZnSNTVy10tcILWTqc6dX0XjZ1nF5rPHKv2WEvRxUr-HiFdlBf14R33eN5qk2ZmaeoeSdBzv-t-fPy8tUeujh84aSIrgI6Qls0uF0gRt-LkAexjOO9B1AlpDApWlwGmEqooVP_9Fj3-SxrSBWblw0is?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-in',
        audio: null,
    },
    // 3 — NARRATOR 1 (Every legend...)
    {
        bg: 'https://images.openai.com/static-rsc-4/YXKfW5aepiuCaVK-pyMSLtO4iiNaOf75ovEQIIwEd3a49SzfJWoMaEJTahx7IEBdYKnTn0eI323hxN6zvUz9QnudrK17CfzBT5zfylCBOcg4Mfc-DrNrSRVVjZrk9GQf-1jkN73lZTeRMKsn02pBk4UUa_Af8qzIfn9U_0giyTQ?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-left',
        audio: null,
        typewriter: true,
    },
    // 4 — NARRATOR 2 (13 March 2007)
    {
        bg: 'https://images.openai.com/static-rsc-4/9pkVyTeJ0aE6v2_xPsqU2GS4DuIiPvfhWldpgTLZsmlo76FW-aN1rL6-Led3JNvQUiBpT3VB3iOgEfwQrCDpGb_LM-yc-R2zhjEGLH7AziWoSHS054RctW2lH0Dd6VxjFrGMwaKsuCLn0Tsxc2Pmldh3kbyR1n2Vc8-_oGw6QZw?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-out',
        audio: 'birth',
        typewriter: true,
    },
    // 5 — CHAPTER 01 CARD
    {
        bg: 'https://images.openai.com/static-rsc-4/w2dAlvYe5O3LPsNZsk5t4K57Tmg4tlIYOBalsy3BYyce1dJ5QbU4iBf2ZR6ttqMO0SHtx7_R-WTeOc0JG65FNITZ3Seqjk_xkJY4BkU4FUUFXcBFRQTsZDwkp1Oqx6mo6jkCEZnO69e6ICWhXTU3ZMsA9u-UxjHf2zR30foyqi4?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-in',
        audio: 'chapter',
    },
    // 6 — CH01 TEXT 1 (Two places)
    {
        bg: 'https://images.openai.com/static-rsc-4/w2dAlvYe5O3LPsNZsk5t4K57Tmg4tlIYOBalsy3BYyce1dJ5QbU4iBf2ZR6ttqMO0SHtx7_R-WTeOc0JG65FNITZ3Seqjk_xkJY4BkU4FUUFXcBFRQTsZDwkp1Oqx6mo6jkCEZnO69e6ICWhXTU3ZMsA9u-UxjHf2zR30foyqi4?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-right',
        typewriter: true,
    },
    // 7 — CH01 TEXT 2 (One beginning)
    {
        bg: 'https://images.openai.com/static-rsc-4/w2dAlvYe5O3LPsNZsk5t4K57Tmg4tlIYOBalsy3BYyce1dJ5QbU4iBf2ZR6ttqMO0SHtx7_R-WTeOc0JG65FNITZ3Seqjk_xkJY4BkU4FUUFXcBFRQTsZDwkp1Oqx6mo6jkCEZnO69e6ICWhXTU3ZMsA9u-UxjHf2zR30foyqi4?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-left',
        typewriter: true,
    },
    // 8 — CHAPTER 02 CARD
    {
        bg: 'https://images.openai.com/static-rsc-4/5GDV4FIOzbEgLNchWvfkjYf-roh2GYTCdZSIGDiwOh1uj9RKKlRpMewR08VjVgjNJtXj5wEF8nU6CAEAtXdPfhBLc2KOOgJvY0PbeFxvFbmmIdVtMA-o3IQ_qiiZTwPoJaKK6nN3dUqKYGtZqax7s9q3o52ufj8nmKbTIr_nbio?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-in',
        audio: 'chapter',
    },
    // 9 — CH02 TEXT 1 (Simple world)
    {
        bg: 'https://images.openai.com/static-rsc-4/0ajGdIM4klwZENCIOWW3eak7ArNjb0djLcalGIKzWTQdZtF08vwzmJ19T79cuGcNNtOPe4YuIEP34-_w5oxg2J_1RZpss22bU3k7zVP-UfQpnV6GajWSxxOWFlvRbfUbtswQfWGBEQEJ_yi-mjeIOXz8_Hs61FEhU5QhiIC-0P0?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-out',
        typewriter: true,
    },
    // 10 — CH02 TEXT 2 (Every great adventure)
    {
        bg: 'https://images.openai.com/static-rsc-4/rjCOro5z4G-SlwT_otxa8pjH6GBmhw7AkeDi154gD4GysvEljTko2Bh6b9K_sm_g6SJQ7Pg5LP_MkGjm34DvsgbxI7yphrzNPJheogQ2MrpTvfo9O1ruNPLmMxpmRrEEqEtx4O6v7kHZyT1tZfyHG38c4u9yqyNt-rPs91c7xoHfuol-40Pff6PsxNgc5wLy?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-in',
        typewriter: true,
    },
    // 11 — SYSTEM AWAKENS
    {
        bg: null,
        overlay: 'full-black',
        kenBurns: null,
        audio: 'system',
        special: 'system',
    },
    // 12 — PLAYER CARD
    {
        bg: null,
        overlay: 'full-black',
        kenBurns: null,
        audio: null,
        special: 'playercard',
    },
    // 13 — SYSTEM MESSAGE
    {
        bg: null,
        overlay: 'full-black',
        kenBurns: null,
        audio: null,
        typewriter: true,
    },
    // 14 — ENDING NARRATION
    {
        bg: 'https://images.openai.com/static-rsc-4/GzeA6lJLJqbFTwxQNkOzYN3x03J3jvpvzh36MnqrWzum8jmhksSUuBk7KPKLyBnhnGaKnYOftwgwiCLs5-PBu7uCa0ziypNDGbvIg8PxR6_2jIdOFSNfRIIAcOal94MdQBCFHouBNiWC3N6pej6tvA3InoVwuwWWLfzVx3hyKgM?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-right',
        typewriter: true,
    },
    // 15 — END CARD
    {
        bg: 'https://images.openai.com/static-rsc-4/GzeA6lJLJqbFTwxQNkOzYN3x03J3jvpvzh36MnqrWzum8jmhksSUuBk7KPKLyBnhnGaKnYOftwgwiCLs5-PBu7uCa0ziypNDGbvIg8PxR6_2jIdOFSNfRIIAcOal94MdQBCFHouBNiWC3N6pej6tvA3InoVwuwWWLfzVx3hyKgM?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-out',
        audio: null,
    },
];


// ── Audio Engine ──
class StoryAudio {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.droneNodes = [];
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
    }

    // Ambient drone for background
    startAmbient() {
        const t = this.ctx.currentTime;

        // Deep pad
        [55, 82.5, 110].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            osc.type = i === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, t);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, t);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.04 / (i + 1), t + 5);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
            this.droneNodes.push({ osc, gain });
        });

        // Wind
        const bufSize = this.ctx.sampleRate * 4;
        const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
        const src = this.ctx.createBufferSource();
        src.buffer = buf; src.loop = true;
        const wGain = this.ctx.createGain();
        const wFilter = this.ctx.createBiquadFilter();
        wFilter.type = 'bandpass'; wFilter.frequency.setValueAtTime(250, t); wFilter.Q.setValueAtTime(0.4, t);
        wGain.gain.setValueAtTime(0, t);
        wGain.gain.linearRampToValueAtTime(0.012, t + 4);
        src.connect(wFilter); wFilter.connect(wGain); wGain.connect(this.masterGain);
        src.start();
    }

    // Heartbeat
    playHeartbeat() {
        const t = this.ctx.currentTime;
        const playBeat = (offset) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(50, t + offset);
            osc.frequency.exponentialRampToValueAtTime(30, t + offset + 0.3);
            gain.gain.setValueAtTime(0.2, t + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.4);
            osc.connect(gain); gain.connect(this.masterGain);
            osc.start(t + offset); osc.stop(t + offset + 0.5);
        };
        // Double-beat pattern
        playBeat(0); playBeat(0.2);
        playBeat(1.2); playBeat(1.4);
        playBeat(2.4); playBeat(2.6);
        playBeat(3.6); playBeat(3.8);
    }

    // Birth moment — gentle chime
    playBirthChime() {
        const t = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0, t + i * 0.4);
            gain.gain.linearRampToValueAtTime(0.06, t + i * 0.4 + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.4 + 3);
            osc.connect(gain); gain.connect(this.masterGain);
            osc.start(t + i * 0.4); osc.stop(t + i * 0.4 + 3.5);
        });
    }

    // Chapter reveal — low rumble
    playChapterReveal() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(45, t);
        osc.frequency.exponentialRampToValueAtTime(25, t + 2.5);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 3);
        osc.connect(gain); gain.connect(this.masterGain);
        osc.start(t); osc.stop(t + 3.5);
    }

    // System boot — digital
    playSystemBoot() {
        const t = this.ctx.currentTime;
        // Digital beeps
        [800, 1000, 800, 1200, 600].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0, t + i * 0.3);
            gain.gain.linearRampToValueAtTime(0.025, t + i * 0.3 + 0.02);
            gain.gain.linearRampToValueAtTime(0, t + i * 0.3 + 0.12);
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass'; filter.frequency.setValueAtTime(2000, t);
            osc.connect(filter); filter.connect(gain); gain.connect(this.masterGain);
            osc.start(t + i * 0.3); osc.stop(t + i * 0.3 + 0.2);
        });
    }
}


// ── Typewriter Engine ──
class Typewriter {
    constructor() {
        this.isTyping = false;
        this.skipRequested = false;
        this.resolve = null;
    }

    // Type HTML content character by character, preserving tags
    async type(element, speed = 28) {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this.isTyping = true;
            this.skipRequested = false;

            const fullHTML = element.getAttribute('data-full-html') || element.innerHTML;
            element.setAttribute('data-full-html', fullHTML);
            element.innerHTML = '';

            // Add cursor
            const cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';
            element.appendChild(cursor);

            // Parse HTML to extract text and tags
            const segments = this._parseHTML(fullHTML);
            let currentHTML = '';
            let segIndex = 0;

            const typeNext = () => {
                if (this.skipRequested || segIndex >= segments.length) {
                    // Complete immediately
                    element.innerHTML = fullHTML;
                    cursor.classList.add('hidden');
                    element.appendChild(cursor);
                    this.isTyping = false;
                    resolve();
                    return;
                }

                const seg = segments[segIndex];
                if (seg.type === 'tag') {
                    currentHTML += seg.content;
                    segIndex++;
                    typeNext(); // tags appear instantly
                } else {
                    currentHTML += seg.content;
                    segIndex++;
                    element.innerHTML = currentHTML;
                    element.appendChild(cursor);
                    setTimeout(typeNext, speed);
                }
            };

            typeNext();
        });
    }

    skip() {
        if (this.isTyping) {
            this.skipRequested = true;
        }
    }

    _parseHTML(html) {
        const segments = [];
        let i = 0;
        while (i < html.length) {
            if (html[i] === '<') {
                // Find closing >
                const end = html.indexOf('>', i);
                if (end !== -1) {
                    segments.push({ type: 'tag', content: html.substring(i, end + 1) });
                    i = end + 1;
                } else {
                    segments.push({ type: 'char', content: html[i] });
                    i++;
                }
            } else if (html[i] === '&') {
                // HTML entity
                const end = html.indexOf(';', i);
                if (end !== -1 && end - i < 10) {
                    segments.push({ type: 'char', content: html.substring(i, end + 1) });
                    i = end + 1;
                } else {
                    segments.push({ type: 'char', content: html[i] });
                    i++;
                }
            } else {
                segments.push({ type: 'char', content: html[i] });
                i++;
            }
        }
        return segments;
    }
}


// ── Main Story Engine ──
class StoryEngine {
    constructor() {
        this.currentScene = -1;
        this.totalScenes = SCENE_DATA.length;
        this.audio = new StoryAudio();
        this.typewriter = new Typewriter();
        this.transitioning = false;
        this.ambientStarted = false;
        this.activeBgSlot = 'a'; // alternates between 'a' and 'b'

        // Cache elements
        this.bgA = document.getElementById('bg-image-a');
        this.bgB = document.getElementById('bg-image-b');
        this.overlay = document.getElementById('bg-overlay');
        this.advancePrompt = document.getElementById('advance-prompt');
        this.sceneCounter = document.getElementById('scene-current');
        this.scenes = document.querySelectorAll('.scene');

        // Preload images
        this._preloadImages();

        // Bind controls
        this._bindControls();

        // Start
        this._startEntry();
    }

    _preloadImages() {
        const urls = new Set();
        SCENE_DATA.forEach(s => { if (s.bg) urls.add(s.bg); });
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    _bindControls() {
        // Advance on click
        document.addEventListener('click', (e) => {
            if (e.target.closest('#advance-prompt') || !e.target.closest('a')) {
                this._handleAdvance();
            }
        });

        // Advance on spacebar / right arrow / enter
        document.addEventListener('keydown', (e) => {
            if (['Space', 'ArrowRight', 'Enter'].includes(e.code)) {
                e.preventDefault();
                this._handleAdvance();
            }
        });
    }

    _handleAdvance() {
        // If typewriter is active, skip it first
        if (this.typewriter.isTyping) {
            this.typewriter.skip();
            return;
        }

        // Otherwise advance to next scene
        if (!this.transitioning) {
            this.nextScene();
        }
    }

    _startEntry() {
        // Fade in from title screen
        setTimeout(() => {
            this.nextScene();
        }, 500);
    }

    async nextScene() {
        if (this.transitioning) return;
        if (this.currentScene >= this.totalScenes - 1) return;
        this.transitioning = true;

        // Hide current scene
        if (this.currentScene >= 0) {
            this.scenes[this.currentScene].classList.remove('active');
        }

        // Advance
        this.currentScene++;
        const data = SCENE_DATA[this.currentScene];

        // Update counter
        this.sceneCounter.textContent = this.currentScene + 1;

        // Hide advance prompt during transition
        this.advancePrompt.classList.remove('visible');

        // ── Set background ──
        this._setBackground(data.bg, data.kenBurns);

        // ── Set overlay ──
        this.overlay.className = '';
        if (data.overlay) this.overlay.classList.add(data.overlay);

        // ── Init audio on first interaction ──
        if (!this.ambientStarted) {
            this.audio.init();
            this.audio.startAmbient();
            this.ambientStarted = true;
        }

        // ── Play audio cue ──
        if (data.audio === 'heartbeat') this.audio.playHeartbeat();
        if (data.audio === 'birth') this.audio.playBirthChime();
        if (data.audio === 'chapter') this.audio.playChapterReveal();
        if (data.audio === 'system') this.audio.playSystemBoot();

        // ── Show new scene ──
        await this._sleep(400); // brief darkness between scenes
        const sceneEl = this.scenes[this.currentScene];
        sceneEl.classList.add('active');

        // ── Handle specials ──
        if (data.special === 'heartbeat') {
            this._runHeartbeatEffect();
        }
        if (data.special === 'system') {
            await this._runSystemReveal();
        }
        if (data.special === 'playercard') {
            await this._runPlayerCard();
        }

        // ── Run typewriter if needed ──
        if (data.typewriter) {
            const twEl = sceneEl.querySelector('[data-typewriter]');
            if (twEl) {
                await this._sleep(800);
                await this.typewriter.type(twEl, 30);
            }
        }

        // ── Auto-advance or show prompt ──
        if (data.autoAdvance) {
            await this._sleep(data.autoAdvance);
            this.transitioning = false;
            this.nextScene();
            return;
        }

        // Show advance prompt
        await this._sleep(600);
        this.advancePrompt.classList.add('visible');
        this.transitioning = false;
    }

    // ── Background crossfade with Ken Burns ──
    _setBackground(url, kenBurns) {
        if (!url) {
            // No bg — fade both out
            this.bgA.classList.remove('active');
            this.bgB.classList.remove('active');
            return;
        }

        // Alternate between A and B for crossfade
        const incoming = this.activeBgSlot === 'a' ? this.bgB : this.bgA;
        const outgoing = this.activeBgSlot === 'a' ? this.bgA : this.bgB;

        // Remove old Ken Burns
        incoming.className = 'bg-image';
        incoming.style.backgroundImage = `url(${url})`;

        // Apply Ken Burns
        if (kenBurns) incoming.classList.add(kenBurns);

        // Crossfade
        incoming.classList.add('active');
        outgoing.classList.remove('active');

        // Swap slot
        this.activeBgSlot = this.activeBgSlot === 'a' ? 'b' : 'a';
    }

    // ── Heartbeat visual effect ──
    _runHeartbeatEffect() {
        const ring = document.getElementById('heartbeat-visual');
        if (!ring) return;
        const beats = [0, 200, 1200, 1400, 2400, 2600, 3600, 3800];
        beats.forEach(delay => {
            setTimeout(() => {
                ring.classList.remove('beat');
                void ring.offsetWidth; // force reflow
                ring.classList.add('beat');
            }, delay);
        });
    }

    // ── System reveal (lines appear one by one) ──
    async _runSystemReveal() {
        const lines = document.querySelectorAll('#scene-system .sys-line');
        for (const line of lines) {
            const delay = parseInt(line.getAttribute('data-delay')) || 0;
            await this._sleep(delay > 0 ? 600 : 400);
            line.classList.add('visible');
        }
        await this._sleep(1000);
    }

    // ── Player card stats animation ──
    async _runPlayerCard() {
        await this._sleep(600);
        const rows = document.querySelectorAll('.pc-row');
        for (let i = 0; i < rows.length; i++) {
            await this._sleep(350);
            rows[i].classList.add('visible');
        }
        // XP bar
        await this._sleep(500);
        const xpFill = document.querySelector('.pc-xp-fill');
        if (xpFill) xpFill.classList.add('animate');
        await this._sleep(800);
    }

    // ── Utility ──
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


// ── Initialize ──
window.addEventListener('DOMContentLoaded', () => {
    new StoryEngine();
});
