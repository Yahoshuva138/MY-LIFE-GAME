/* ═══════════════════════════════════════════════════════════════
   YAHOSHUVA: ORIGIN ZERO — Storyline 01 Engine
   WITH FULL VOICE NARRATION & MOTIVATIONAL BACKGROUND AUDIO
   
   Voice System:
   ─────────────
   • Web Speech API narrates every text scene
   • Deep, slow, clear delivery (rate 0.72, pitch 0.85)
   • Words spoken in sync with typewriter text
   • Peter Dinklage motivational speech plays as atmospheric BG
   • Background audio fades during narration, rises between scenes
   ═══════════════════════════════════════════════════════════════ */

// ── Scene Configuration ──
const SCENE_DATA = [
    // 0 — STORYLINE TITLE CARD
    {
        bg: null,
        overlay: 'full-black',
        kenBurns: null,
        autoAdvance: 4000,
    },
    // 1 — BLACK / HEARTBEAT
    {
        bg: null,
        overlay: 'full-black',
        audio: 'heartbeat',
        autoAdvance: 5500,
        special: 'heartbeat',
    },
    // 2 — PROLOGUE CARD
    {
        bg: 'https://images.openai.com/static-rsc-4/NlH-cNKwyx5i7-Af__xSZZnSNTVy10tcILWTqc6dX0XjZ1nF5rPHKv2WEvRxUr-HiFdlBf14R33eN5qk2ZmaeoeSdBzv-t-fPy8tUeujh84aSIrgI6Qls0uF0gRt-LkAexjOO9B1AlpDApWlwGmEqooVP_9Fj3-SxrSBWblw0is?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-in',
    },
    // 3 — NARRATOR 1 (Every legend...)
    {
        bg: 'https://images.openai.com/static-rsc-4/YXKfW5aepiuCaVK-pyMSLtO4iiNaOf75ovEQIIwEd3a49SzfJWoMaEJTahx7IEBdYKnTn0eI323hxN6zvUz9QnudrK17CfzBT5zfylCBOcg4Mfc-DrNrSRVVjZrk9GQf-1jkN73lZTeRMKsn02pBk4UUa_Af8qzIfn9U_0giyTQ?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-left',
        typewriter: true,
        speak: 'Every legend has a beginning. ... Some begin in kingdoms. Some begin in extraordinary places. ... But this one began in a small town, surrounded by ordinary people, simple moments, and an unknown future.',
    },
    // 4 — NARRATOR 2 (13 March 2007)
    {
        bg: 'https://images.openai.com/static-rsc-4/9pkVyTeJ0aE6v2_xPsqU2GS4DuIiPvfhWldpgTLZsmlo76FW-aN1rL6-Led3JNvQUiBpT3VB3iOgEfwQrCDpGb_LM-yc-R2zhjEGLH7AziWoSHS054RctW2lH0Dd6VxjFrGMwaKsuCLn0Tsxc2Pmldh3kbyR1n2Vc8-_oGw6QZw?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-out',
        audio: 'birth',
        typewriter: true,
        speak: 'Thirteenth of March, Two Thousand and Seven. ... A new life entered the world.',
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
        speak: 'The story begins with two places. ... Hassanabad. The native village, where the roots of this story belong. ... Sattenapalli. The nearby town where Yahoshuva was born, because there was no hospital in Hassanabad.',
    },
    // 7 — CH01 TEXT 2 (One beginning)
    {
        bg: 'https://images.openai.com/static-rsc-4/w2dAlvYe5O3LPsNZsk5t4K57Tmg4tlIYOBalsy3BYyce1dJ5QbU4iBf2ZR6ttqMO0SHtx7_R-WTeOc0JG65FNITZ3Seqjk_xkJY4BkU4FUUFXcBFRQTsZDwkp1Oqx6mo6jkCEZnO69e6ICWhXTU3ZMsA9u-UxjHf2zR30foyqi4?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-left',
        typewriter: true,
        speak: 'After his birth, his family shifted to Sattenapalli. ... Two places. One beginning. ... One would represent his roots. The other would become the setting for the next chapter of his early life.',
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
        speak: 'The world was still simple. ... No legendary quests. No powerful weapons. No massive open worlds. ... Just childhood, family, curiosity, and little moments that would eventually become memories.',
    },
    // 10 — CH02 TEXT 2 (Every great adventure)
    {
        bg: 'https://images.openai.com/static-rsc-4/rjCOro5z4G-SlwT_otxa8pjH6GBmhw7AkeDi154gD4GysvEljTko2Bh6b9K_sm_g6SJQ7Pg5LP_MkGjm34DvsgbxI7yphrzNPJheogQ2MrpTvfo9O1ruNPLmMxpmRrEEqEtx4O6v7kHZyT1tZfyHG38c4u9yqyNt-rPs91c7xoHfuol-40Pff6PsxNgc5wLy?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-in',
        typewriter: true,
        speak: 'The future protagonist had no idea what was waiting ahead. ... But every great adventure begins, before the hero knows they are part of one.',
    },
    // 11 — SYSTEM AWAKENS
    {
        bg: null,
        overlay: 'full-black',
        audio: 'system',
        special: 'system',
    },
    // 12 — PLAYER CARD
    {
        bg: null,
        overlay: 'full-black',
        special: 'playercard',
    },
    // 13 — SYSTEM MESSAGE
    {
        bg: null,
        overlay: 'full-black',
        typewriter: true,
        speak: 'Your journey has been initialized. ... Your past contains memories. Your future contains possibilities. ... The first chapter begins now.',
    },
    // 14 — ENDING NARRATION
    {
        bg: 'https://images.openai.com/static-rsc-4/GzeA6lJLJqbFTwxQNkOzYN3x03J3jvpvzh36MnqrWzum8jmhksSUuBk7KPKLyBnhnGaKnYOftwgwiCLs5-PBu7uCa0ziypNDGbvIg8PxR6_2jIdOFSNfRIIAcOal94MdQBCFHouBNiWC3N6pej6tvA3InoVwuwWWLfzVx3hyKgM?purpose=inline',
        overlay: 'darker',
        kenBurns: 'ken-burns-right',
        typewriter: true,
        speak: 'He didn\'t know what life had planned for him. He didn\'t know about the challenges, failures, friendships, victories, or worlds he would discover. ... He was just beginning. ... And this, was only, Level One.',
    },
    // 15 — END CARD
    {
        bg: 'https://images.openai.com/static-rsc-4/GzeA6lJLJqbFTwxQNkOzYN3x03J3jvpvzh36MnqrWzum8jmhksSUuBk7KPKLyBnhnGaKnYOftwgwiCLs5-PBu7uCa0ziypNDGbvIg8PxR6_2jIdOFSNfRIIAcOal94MdQBCFHouBNiWC3N6pej6tvA3InoVwuwWWLfzVx3hyKgM?purpose=inline',
        overlay: 'darkest',
        kenBurns: 'ken-burns-out',
    },
];


// ═══════════════════════════════════════════════════════
// NARRATOR VOICE ENGINE (Web Speech API)
// Delivers deep, slow, clear motivational narration
// ═══════════════════════════════════════════════════════
class NarratorVoice {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voice = null;
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.onEndCallback = null;
        this._voiceReady = false;
        this._initVoices();
    }

    _initVoices() {
        // Voices load asynchronously in most browsers
        const loadVoices = () => {
            const voices = this.synth.getVoices();
            if (voices.length === 0) return;

            // Priority: deep male English voices
            // Prefer: Google UK English Male, Microsoft David, Microsoft Mark, 
            //         any male en-US / en-GB voice
            const priorities = [
                'Google UK English Male',
                'Microsoft David Desktop',
                'Microsoft David',
                'Microsoft Mark',
                'Google US English',
                'Microsoft Zira',       // fallback female if no male
                'Alex',                 // macOS
                'Daniel',               // macOS British
                'Samantha',             // macOS fallback
            ];

            // Try priority list first
            for (const name of priorities) {
                const found = voices.find(v => v.name.includes(name));
                if (found) {
                    this.voice = found;
                    break;
                }
            }

            // Fallback: first English voice
            if (!this.voice) {
                this.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
            }

            this._voiceReady = true;
            console.log('[NARRATOR] Voice loaded:', this.voice?.name);
        };

        loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = loadVoices;
        }

        // Some browsers need a short delay
        setTimeout(loadVoices, 500);
        setTimeout(loadVoices, 1500);
    }

    /**
     * Speak text with deep, slow, motivational delivery.
     * Uses "..." in the text as pause markers (0.8s pauses).
     * Returns a Promise that resolves when speech finishes.
     */
    speak(text) {
        return new Promise(async (resolve) => {
            if (!this.synth || !text) { resolve(); return; }

            // Cancel any ongoing speech
            this.synth.cancel();

            // Split on "..." for dramatic pauses
            const segments = text.split('...').map(s => s.trim()).filter(s => s.length > 0);

            for (let i = 0; i < segments.length; i++) {
                await this._speakSegment(segments[i]);
                // Dramatic pause between segments
                if (i < segments.length - 1) {
                    await this._pause(900);
                }
            }

            this.isSpeaking = false;
            resolve();
        });
    }

    _speakSegment(text) {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(text);

            // Deep, slow, clear, motivational voice settings
            utterance.rate = 0.72;      // Slow and deliberate
            utterance.pitch = 0.85;     // Deep tone
            utterance.volume = 1.0;     // Full volume
            if (this.voice) utterance.voice = this.voice;

            this.isSpeaking = true;
            this.currentUtterance = utterance;

            utterance.onend = () => {
                this.currentUtterance = null;
                resolve();
            };

            utterance.onerror = (e) => {
                console.warn('[NARRATOR] Speech error:', e.error);
                this.currentUtterance = null;
                resolve();
            };

            // Chrome bug workaround: resume synthesis if paused
            this.synth.cancel();
            setTimeout(() => {
                this.synth.speak(utterance);
            }, 50);

            // Chrome has a bug where long utterances stop after ~15s
            // Keep-alive ping to prevent that
            this._keepAlive();
        });
    }

    _pause(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    _keepAlive() {
        // Chrome pauses speech synthesis after ~15s without interaction.
        // This periodic resume/pause prevents that.
        if (this._keepAliveTimer) clearInterval(this._keepAliveTimer);
        this._keepAliveTimer = setInterval(() => {
            if (this.synth.speaking && !this.synth.paused) {
                this.synth.pause();
                this.synth.resume();
            } else {
                clearInterval(this._keepAliveTimer);
            }
        }, 10000);
    }

    stop() {
        this.synth.cancel();
        this.isSpeaking = false;
        if (this._keepAliveTimer) clearInterval(this._keepAliveTimer);
    }
}


// ═══════════════════════════════════════════════════════
// BACKGROUND MUSIC (extracted motivational speech audio)
// Plays quietly, ducks when narrator speaks
// ═══════════════════════════════════════════════════════
class BackgroundMusic {
    constructor() {
        this.audio = new Audio('AUDIO/motivational_bg.mp3');
        this.audio.loop = true;
        this.audio.volume = 0;
        this.targetVolume = 0.12;   // Quiet atmospheric layer
        this.duckVolume = 0.03;     // Ducked during narration
        this.fadeInterval = null;
    }

    start() {
        this.audio.play().catch(() => {
            // Autoplay blocked — will start on next user interaction
            const handler = () => {
                this.audio.play();
                document.removeEventListener('click', handler);
                document.removeEventListener('keydown', handler);
            };
            document.addEventListener('click', handler);
            document.addEventListener('keydown', handler);
        });
        this._fadeTo(this.targetVolume, 3000);
    }

    // Duck the music when narrator speaks
    duck() {
        this._fadeTo(this.duckVolume, 800);
    }

    // Raise music between narration
    unduck() {
        this._fadeTo(this.targetVolume, 1200);
    }

    _fadeTo(target, duration) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        const steps = 30;
        const stepTime = duration / steps;
        const stepSize = (target - this.audio.volume) / steps;
        let step = 0;

        this.fadeInterval = setInterval(() => {
            step++;
            this.audio.volume = Math.max(0, Math.min(1,
                this.audio.volume + stepSize
            ));
            if (step >= steps) {
                clearInterval(this.fadeInterval);
                this.audio.volume = target;
            }
        }, stepTime);
    }
}


// ═══════════════════════════════════════════════════════
// SOUND EFFECTS ENGINE
// ═══════════════════════════════════════════════════════
class SFXEngine {
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

    startAmbient() {
        const t = this.ctx.currentTime;
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
            osc.connect(filter); filter.connect(gain); gain.connect(this.masterGain);
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

    playHeartbeat() {
        const t = this.ctx.currentTime;
        const beat = (offset) => {
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
        [0, 0.2, 1.2, 1.4, 2.4, 2.6, 3.6, 3.8].forEach(beat);
    }

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

    playSystemBoot() {
        const t = this.ctx.currentTime;
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


// ═══════════════════════════════════════════════════════
// TYPEWRITER ENGINE
// ═══════════════════════════════════════════════════════
class Typewriter {
    constructor() {
        this.isTyping = false;
        this.skipRequested = false;
    }

    async type(element, speed = 28) {
        return new Promise((resolve) => {
            this.isTyping = true;
            this.skipRequested = false;

            const fullHTML = element.getAttribute('data-full-html') || element.innerHTML;
            element.setAttribute('data-full-html', fullHTML);
            element.innerHTML = '';

            const cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';
            element.appendChild(cursor);

            const segments = this._parseHTML(fullHTML);
            let currentHTML = '';
            let segIndex = 0;

            const typeNext = () => {
                if (this.skipRequested || segIndex >= segments.length) {
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
                    typeNext();
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
        if (this.isTyping) this.skipRequested = true;
    }

    _parseHTML(html) {
        const segments = [];
        let i = 0;
        while (i < html.length) {
            if (html[i] === '<') {
                const end = html.indexOf('>', i);
                if (end !== -1) {
                    segments.push({ type: 'tag', content: html.substring(i, end + 1) });
                    i = end + 1;
                } else {
                    segments.push({ type: 'char', content: html[i] }); i++;
                }
            } else if (html[i] === '&') {
                const end = html.indexOf(';', i);
                if (end !== -1 && end - i < 10) {
                    segments.push({ type: 'char', content: html.substring(i, end + 1) });
                    i = end + 1;
                } else {
                    segments.push({ type: 'char', content: html[i] }); i++;
                }
            } else {
                segments.push({ type: 'char', content: html[i] }); i++;
            }
        }
        return segments;
    }
}


// ═══════════════════════════════════════════════════════
// MAIN STORY ENGINE (orchestrates everything)
// ═══════════════════════════════════════════════════════
class StoryEngine {
    constructor() {
        this.currentScene = -1;
        this.totalScenes = SCENE_DATA.length;
        this.sfx = new SFXEngine();
        this.narrator = new NarratorVoice();
        this.bgMusic = new BackgroundMusic();
        this.typewriter = new Typewriter();
        this.transitioning = false;
        this.ambientStarted = false;
        this.activeBgSlot = 'a';

        // Cache DOM
        this.bgA = document.getElementById('bg-image-a');
        this.bgB = document.getElementById('bg-image-b');
        this.overlay = document.getElementById('bg-overlay');
        this.advancePrompt = document.getElementById('advance-prompt');
        this.sceneCounter = document.getElementById('scene-current');
        this.scenes = document.querySelectorAll('.scene');

        this._preloadImages();
        this._bindControls();
        this._startEntry();
    }

    _preloadImages() {
        const urls = new Set();
        SCENE_DATA.forEach(s => { if (s.bg) urls.add(s.bg); });
        urls.forEach(url => { const img = new Image(); img.src = url; });
    }

    _bindControls() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#advance-prompt') || !e.target.closest('a')) {
                this._handleAdvance();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (['Space', 'ArrowRight', 'Enter'].includes(e.code)) {
                e.preventDefault();
                this._handleAdvance();
            }
        });
    }

    _handleAdvance() {
        if (this.typewriter.isTyping) {
            this.typewriter.skip();
            return;
        }
        if (this.narrator.isSpeaking) {
            this.narrator.stop();
            return;
        }
        if (!this.transitioning) {
            this.nextScene();
        }
    }

    _startEntry() {
        setTimeout(() => this.nextScene(), 500);
    }

    async nextScene() {
        if (this.transitioning) return;
        if (this.currentScene >= this.totalScenes - 1) return;
        this.transitioning = true;

        // Hide current scene
        if (this.currentScene >= 0) {
            this.scenes[this.currentScene].classList.remove('active');
        }

        this.currentScene++;
        const data = SCENE_DATA[this.currentScene];
        this.sceneCounter.textContent = this.currentScene + 1;
        this.advancePrompt.classList.remove('visible');

        // Background
        this._setBackground(data.bg, data.kenBurns);

        // Overlay
        this.overlay.className = '';
        if (data.overlay) this.overlay.classList.add(data.overlay);

        // Init audio systems on first scene
        if (!this.ambientStarted) {
            this.sfx.init();
            this.sfx.startAmbient();
            this.bgMusic.start();
            this.ambientStarted = true;
        }

        // SFX cues
        if (data.audio === 'heartbeat') this.sfx.playHeartbeat();
        if (data.audio === 'birth') this.sfx.playBirthChime();
        if (data.audio === 'chapter') this.sfx.playChapterReveal();
        if (data.audio === 'system') this.sfx.playSystemBoot();

        // Show scene
        await this._sleep(400);
        const sceneEl = this.scenes[this.currentScene];
        sceneEl.classList.add('active');

        // Special behaviors
        if (data.special === 'heartbeat') this._runHeartbeatEffect();
        if (data.special === 'system') await this._runSystemReveal();
        if (data.special === 'playercard') await this._runPlayerCard();

        // ── TYPEWRITER + VOICE NARRATION (the key feature) ──
        if (data.typewriter) {
            const twEl = sceneEl.querySelector('[data-typewriter]');
            if (twEl) {
                await this._sleep(800);

                if (data.speak) {
                    // Duck background music for clarity
                    this.bgMusic.duck();

                    // Start typewriter and voice narration simultaneously
                    const typePromise = this.typewriter.type(twEl, 30);
                    const speakPromise = this.narrator.speak(data.speak);

                    // Wait for BOTH to finish (speech is usually longer)
                    await Promise.all([typePromise, speakPromise]);

                    // Raise background music back
                    this.bgMusic.unduck();
                } else {
                    // No speech — just typewriter
                    await this.typewriter.type(twEl, 30);
                }
            }
        }

        // Auto-advance or show prompt
        if (data.autoAdvance) {
            await this._sleep(data.autoAdvance);
            this.transitioning = false;
            this.nextScene();
            return;
        }

        await this._sleep(600);
        this.advancePrompt.classList.add('visible');
        this.transitioning = false;
    }

    _setBackground(url, kenBurns) {
        if (!url) {
            this.bgA.classList.remove('active');
            this.bgB.classList.remove('active');
            return;
        }
        const incoming = this.activeBgSlot === 'a' ? this.bgB : this.bgA;
        const outgoing = this.activeBgSlot === 'a' ? this.bgA : this.bgB;
        incoming.className = 'bg-image';
        incoming.style.backgroundImage = `url(${url})`;
        if (kenBurns) incoming.classList.add(kenBurns);
        incoming.classList.add('active');
        outgoing.classList.remove('active');
        this.activeBgSlot = this.activeBgSlot === 'a' ? 'b' : 'a';
    }

    _runHeartbeatEffect() {
        const ring = document.getElementById('heartbeat-visual');
        if (!ring) return;
        [0, 200, 1200, 1400, 2400, 2600, 3600, 3800].forEach(delay => {
            setTimeout(() => {
                ring.classList.remove('beat');
                void ring.offsetWidth;
                ring.classList.add('beat');
            }, delay);
        });
    }

    async _runSystemReveal() {
        const lines = document.querySelectorAll('#scene-system .sys-line');
        for (const line of lines) {
            await this._sleep(600);
            line.classList.add('visible');
        }
        await this._sleep(1000);
    }

    async _runPlayerCard() {
        await this._sleep(600);
        const rows = document.querySelectorAll('.pc-row');
        for (let i = 0; i < rows.length; i++) {
            await this._sleep(350);
            rows[i].classList.add('visible');
        }
        await this._sleep(500);
        const xpFill = document.querySelector('.pc-xp-fill');
        if (xpFill) xpFill.classList.add('animate');
        await this._sleep(800);
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


// ── Initialize ──
window.addEventListener('DOMContentLoaded', () => {
    new StoryEngine();
});
