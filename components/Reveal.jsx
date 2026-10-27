'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// ==========================================
// 🎨 CUSTOMIZE YOUR DETAILS HERE
// ==========================================
const HER_NAME = "Her Name";
const YOUR_NAME = "Ayan";
const HER_AGE = "25";

const REASONS = [
    "You make ordinary plans feel like something worth looking forward to",
    "You notice the small things I don't think you're paying attention to",
    "You call me out when I need it, and I actually appreciate it",
    "You make me want to be a better version of myself"
];

const PHOTOS = [
    {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80",
        caption: "Happy Birthday to my favorite person 🤍"
    },
    {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=80",
        caption: "Every moment with you is a favorite memory ✨"
    },
    {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format&fit=crop&q=80",
        caption: "Can't wait to make a million more memories together ❤️"
    }
];

const LETTER_TEXT = `Dear ${HER_NAME},

I was going to write something short and cute, but honestly there's too much I actually want to say — starting with how you make even boring days feel worth looking forward to.

Thank you for being my favorite notification, my safe space, and the brightest part of my days. Wishing you the happiest birthday filled with everything that makes you smile!`;
// ==========================================

const BG_BALLOONS = [
    { left: '6%', size: 56, color: 'radial-gradient(circle at 30% 30%, #ff9ebb, #e11d48)', duration: 16, delay: 0 },
    { left: '16%', size: 44, color: 'radial-gradient(circle at 30% 30%, #fde68a, #d97706)', duration: 19, delay: 3 },
    { left: '27%', size: 62, color: 'radial-gradient(circle at 30% 30%, #fbcfe8, #db2777)', duration: 15, delay: 1.5 },
    { left: '38%', size: 48, color: 'radial-gradient(circle at 30% 30%, #ddd6fe, #7c3aed)', duration: 21, delay: 4 },
    { left: '50%', size: 54, color: 'radial-gradient(circle at 30% 30%, #fecdd3, #f43f5e)', duration: 17, delay: 2 },
    { left: '62%', size: 46, color: 'radial-gradient(circle at 30% 30%, #bae6fd, #0284c7)', duration: 20, delay: 5 },
    { left: '73%', size: 60, color: 'radial-gradient(circle at 30% 30%, #fda4af, #be123c)', duration: 16, delay: 0.8 },
    { left: '84%', size: 50, color: 'radial-gradient(circle at 30% 30%, #fef08a, #ca8a04)', duration: 18, delay: 3.5 },
    { left: '92%', size: 42, color: 'radial-gradient(circle at 30% 30%, #f5d0fe, #a21caf)', duration: 22, delay: 1 },
];

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 17 + 7) % 95}%`,
    top: `${(i * 23 + 11) % 90}%`,
    delay: (i * 0.4) % 4,
    duration: 2.5 + (i % 3),
}));

function AmbientBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Twinkling Sparkles */}
            {SPARKLES.map((s, i) => (
                <motion.span
                    key={`sparkle-${i}`}
                    style={{ left: s.left, top: s.top }}
                    animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.3, 0.8] }}
                    transition={{ repeat: Infinity, duration: s.duration, delay: s.delay }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-pink-200 shadow-sm"
                />
            ))}

            {/* Floating 3D-style Balloons with Strings */}
            {BG_BALLOONS.map((b, i) => (
                <motion.div
                    key={`balloon-${i}`}
                    style={{
                        left: b.left,
                        width: b.size,
                        height: Math.round(b.size * 1.18),
                        background: b.color,
                        borderRadius: '50% 50% 48% 48% / 55% 55% 45% 45%',
                    }}
                    initial={{ y: '110vh', x: 0, rotate: -4 }}
                    animate={{
                        y: '-25vh',
                        x: [0, 18, -14, 10, 0],
                        rotate: [-4, 5, -3, 4, -4],
                    }}
                    transition={{
                        y: { repeat: Infinity, duration: b.duration, delay: b.delay, ease: 'linear' },
                        x: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                        rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
                    }}
                    className="absolute opacity-40 shadow-inner"
                >
                    {/* Glossy highlight */}
                    <span className="absolute top-2.5 left-3 w-3 h-5 rounded-full bg-white/40 -rotate-12 block" />
                    {/* Balloon knot */}
                    <span
                        style={{ background: b.color }}
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2 rounded-sm block"
                    />
                    {/* Balloon swaying string */}
                    <span className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-px h-14 bg-white/30 block" />
                </motion.div>
            ))}
        </div>
    );
}


export default function Reveal() {
    // 1. Declare step and other main states FIRST
    const [step, setStep] = useState(0);
    const [candleBlown, setCandleBlown] = useState(false);
    const [poppedBalloons, setPoppedBalloons] = useState([false, false, false, false]);
    const [letterOpen, setLetterOpen] = useState(false);

    // 2. NOW declare the flying button state and effect
    const [isButtonFlying, setIsButtonFlying] = useState(true);

    useEffect(() => {
        // When the app opens (step 0), the button dances for 4.5 seconds
        if (step === 0) {
            setIsButtonFlying(true);
            const timer = setTimeout(() => setIsButtonFlying(false), 4500);
            return () => clearTimeout(timer);
        }
    }, [step]); // 'step' is now safely initialized above!

    // 3. Audio refs & Voice Note state
    const bgMusicRef = useRef(null);
    const voiceRef = useRef(null);
    const [isPlayingVoice, setIsPlayingVoice] = useState(false);
    const [voiceProgress, setVoiceProgress] = useState(0);
    const [voiceDuration, setVoiceDuration] = useState(0);
    const fireConfetti = () => {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff4d8d', '#ff85a2', '#ffd166', '#a855f7', '#38bdf8']
        });
    };

    const handleStart = () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = 0.5;
            bgMusicRef.current.play().catch(() => { });
        }
        setStep(1);
    };

    const handleMakeWish = () => {
        if (!candleBlown) {
            setCandleBlown(true);
            fireConfetti();
            setTimeout(() => {
                setStep(5);
            }, 2200);
        }
    };

    const handlePopBalloon = (index) => {
        if (!poppedBalloons[index]) {
            const updated = [...poppedBalloons];
            updated[index] = true;
            setPoppedBalloons(updated);
            confetti({
                particleCount: 35,
                spread: 50,
                origin: { y: 0.4 }
            });
        }
    };

    const toggleVoiceNote = () => {
        if (!voiceRef.current) return;

        if (isPlayingVoice) {
            voiceRef.current.pause();
            setIsPlayingVoice(false);
            if (bgMusicRef.current) bgMusicRef.current.volume = 0.5;
        } else {
            if (bgMusicRef.current) bgMusicRef.current.volume = 0.08;
            voiceRef.current.play().catch(() => { });
            setIsPlayingVoice(true);
        }
    };

    const handleVoiceTimeUpdate = () => {
        if (!voiceRef.current) return;
        const current = voiceRef.current.currentTime;
        const total = voiceRef.current.duration || 1;
        setVoiceProgress((current / total) * 100);
    };

    const handleVoiceEnded = () => {
        setIsPlayingVoice(false);
        setVoiceProgress(100);
        if (bgMusicRef.current) bgMusicRef.current.volume = 0.5;
    };

    const formatTime = (sec) => {
        if (!sec || isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const allBalloonsPopped = poppedBalloons.every(Boolean);

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden font-sans select-none bg-[#1a0510]">
            <audio ref={bgMusicRef} src="/music.mp3" loop />
            <audio
                ref={voiceRef}
                src="/voice.mp3"
                onLoadedMetadata={() => {
                    if (voiceRef.current) setVoiceDuration(voiceRef.current.duration);
                }}
                onTimeUpdate={handleVoiceTimeUpdate}
                onEnded={handleVoiceEnded}
            />

            <AmbientBackground />

            <div className="relative z-10">
                <AnimatePresence mode="wait">

                    {/* STEP 0: UNWRAP CARD */}
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-screen px-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 pt-14 w-full max-w-sm text-center shadow-2xl z-10"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl drop-shadow-md">
                                    🎁
                                </div>
                                <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold">
                                    A SURPRISE FOR
                                </p>
                                <h1 className="text-4xl font-serif italic text-pink-600 mt-1 mb-2">
                                    {HER_NAME}
                                </h1>
                                <p className="text-xs text-gray-400 mb-6">
                                    {YOUR_NAME} made this — just for you.
                                </p>
                            </motion.div>

                            {/* The Flying Unwrap Button */}
                            <motion.button
                                animate={
                                    isButtonFlying
                                        ? {
                                            // The crazy flight path (swooping all over the place)
                                            x: [0, 110, -130, 90, -100, 0],
                                            y: [0, -180, 120, -100, 150, 0],
                                            rotate: [0, 15, -20, 25, -15, 0],
                                            scale: [1, 0.9, 1.1, 0.8, 1.2, 1]
                                        }
                                        : { x: 0, y: 0, rotate: 0, scale: 1 } // Settles down securely
                                }
                                transition={
                                    isButtonFlying
                                        ? { duration: 4.5, ease: "easeInOut" }
                                        : { type: "spring", stiffness: 300, damping: 20 }
                                }
                                whileHover={!isButtonFlying ? { scale: 1.05 } : {}}
                                whileTap={!isButtonFlying ? { scale: 0.95 } : {}}
                                onClick={!isButtonFlying ? handleStart : undefined}
                                className={`mt-8 w-full max-w-sm py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-lg shadow-pink-500/30 z-20 ${isButtonFlying ? 'cursor-default pointer-events-none' : 'cursor-pointer'
                                    }`}
                            >
                                {isButtonFlying ? "Catch me! 🎁" : "Unwrap it 🎁"}
                            </motion.button>

                            <p className="text-xs text-pink-200/70 mt-3">
                                🔊 Sound on for the full magic
                            </p>
                        </motion.div>
                    )}

                    {/* STEP 1: BEATING HEART & RIBBON */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setStep(2)}
                            className="flex flex-col items-center justify-between min-h-screen bg-[#fffafa]/90 backdrop-blur-sm py-16 px-4 cursor-pointer text-center"
                        >
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-rose-600 mt-8">
                                Your birthday surprise starts<br />here
                            </h2>

                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                                className="text-8xl md:text-9xl text-rose-500 drop-shadow-xl"
                            >
                                ❤️
                            </motion.div>

                            <div className="flex flex-col items-center">
                                <motion.div
                                    animate={{ y: [0, 6, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="text-4xl mb-2"
                                >
                                    🎀
                                </motion.div>
                                <p className="text-xs text-gray-500">Tap the pink ribbon to begin</p>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: IT'S YOUR BIRTHDAY RED SCREEN */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                fireConfetti();
                                setStep(3);
                            }}
                            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-600/90 to-pink-600/90 text-white px-4 cursor-pointer text-center"
                        >
                            <motion.h1
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl md:text-6xl font-serif font-bold mb-4"
                            >
                                It&apos;s your birthday!
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl md:text-5xl font-serif font-bold mb-8"
                            >
                                Yay!!! 🎉
                            </motion.p>
                            <p className="text-sm text-white/80 animate-pulse">
                                Tap anywhere to continue
                            </p>
                        </motion.div>
                    )}

                    {/* STEP 3: OFFICIALLY YOUR DAY BANNER */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setStep(4)}
                            className="relative flex items-center justify-between min-h-screen bg-[#fffcf7]/90 px-8 md:px-24 cursor-pointer overflow-hidden"
                        >
                            <div className="z-10 max-w-lg">
                                <p className="text-lg md:text-xl text-rose-400 font-serif mb-2">
                                    It&apos;s officially your day
                                </p>
                                <h1 className="text-5xl md:text-7xl font-serif font-bold text-rose-600 leading-tight">
                                    Happy Birthday,<br />
                                    <span className="italic">{HER_NAME}</span>
                                </h1>
                                <p className="text-sm md:text-base text-gray-500 mt-4">
                                    and somehow, you are {HER_AGE} already ✨
                                </p>
                                <p className="text-xs text-gray-400 mt-12 animate-pulse">
                                    Tap anywhere to continue →
                                </p>
                            </div>

                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-8xl md:text-9xl"
                            >
                                💐
                            </motion.div>
                        </motion.div>
                    )}

                    {/* STEP 4: CAKE & WISH */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleMakeWish}
                            className="flex flex-col items-center justify-center min-h-screen text-white px-4 cursor-pointer text-center"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">
                                Cake first. Obviously. 🎂
                            </h2>

                            <div className="relative flex flex-col items-center my-6">
                                {!candleBlown && (
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], rotate: [-4, 4, -4] }}
                                        transition={{ repeat: Infinity, duration: 0.6 }}
                                        className="text-4xl -mb-2 z-20"
                                    >
                                        🕯️
                                    </motion.div>
                                )}
                                {candleBlown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: -15 }}
                                        className="text-2xl -mb-2 text-gray-400"
                                    >
                                        💨
                                    </motion.div>
                                )}

                                <div className="w-56 h-36 bg-gradient-to-b from-pink-400 via-pink-500 to-amber-300 rounded-2xl shadow-2xl border-b-8 border-rose-300 flex items-center justify-center text-6xl">
                                    🎂
                                </div>
                            </div>

                            <p className="mt-8 text-base text-pink-200/80 animate-pulse">
                                {candleBlown ? "Wish made! ✨ 🎉" : "Tap anywhere to make a wish ✨"}
                            </p>
                        </motion.div>
                    )}

                    {/* STEP 5: POP THE BALLOONS */}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center min-h-screen text-white py-12 px-4"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-center">
                                Pop the balloons 🎈
                            </h2>
                            <p className="text-xs text-pink-200/60 mb-8 text-center">
                                4 reasons are waiting inside. One pop at a time.
                            </p>

                            <div className="flex gap-6 my-4 min-h-[90px] items-center justify-center">
                                {[
                                    { color: "bg-pink-500" },
                                    { color: "bg-sky-400" },
                                    { color: "bg-emerald-400" },
                                    { color: "bg-yellow-400" }
                                ].map((b, idx) => (
                                    !poppedBalloons[idx] && (
                                        <motion.button
                                            key={idx}
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.8 }}
                                            onClick={() => handlePopBalloon(idx)}
                                            className={`${b.color} w-14 h-20 rounded-full shadow-lg flex items-center justify-center text-2xl cursor-pointer relative`}
                                        >
                                            ✨
                                            <div className="w-0.5 h-8 bg-white/40 absolute -bottom-8" />
                                        </motion.button>
                                    )
                                ))}
                            </div>

                            <div className="w-full max-w-md space-y-3 mt-6">
                                {REASONS.map((reason, idx) => (
                                    poppedBalloons[idx] && (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className="bg-[#381024]/90 backdrop-blur-md border border-pink-500/30 rounded-2xl p-4 shadow-md"
                                        >
                                            <p className="text-[10px] font-bold tracking-wider uppercase text-pink-400 mb-1">
                                                REASON NO. {idx + 1}
                                            </p>
                                            <p className="text-sm text-pink-50">{reason}</p>
                                        </motion.div>
                                    )
                                ))}
                            </div>

                            {allBalloonsPopped && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center mt-8"
                                >
                                    <p className="text-sm italic text-pink-200 mb-4">
                                        Still nowhere near all the reasons! ✨
                                    </p>
                                    <button
                                        onClick={() => setStep(6)}
                                        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg cursor-pointer"
                                    >
                                        Keep going →
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* STEP 6: POLAROID GALLERY */}
                    {step === 6 && (
                        <motion.div
                            key="step6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-screen text-white py-12 px-4"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-1">
                                Remember these? 📸
                            </h2>
                            <p className="text-xs text-pink-200/60 mb-8">
                                Swipe or scroll through ➡️
                            </p>

                            <div className="flex gap-6 overflow-x-auto max-w-full pb-6 px-4 snap-x">
                                {PHOTOS.map((photo, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -6, rotate: idx % 2 === 0 ? 1 : -1 }}
                                        className="bg-white text-gray-800 p-3 pb-6 rounded-xl shadow-xl min-w-[240px] max-w-[260px] snap-center flex flex-col items-center"
                                    >
                                        <img
                                            src={photo.url}
                                            alt={`Memory ${idx + 1}`}
                                            className="w-full h-64 object-cover rounded-lg mb-4"
                                        />
                                        <p className="text-xs font-serif italic text-center text-gray-600 px-2">
                                            {photo.caption}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                onClick={() => setStep(7)}
                                className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg cursor-pointer"
                            >
                                Keep going →
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 7: VOICE MESSAGE IN BETWEEN */}
                    {step === 7 && (
                        <motion.div
                            key="step7"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-screen text-white px-4 py-12 text-center"
                        >
                            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2">
                                A Little Voice Note 🎙️
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                                Hear it from me, {HER_NAME}
                            </h2>
                            <p className="text-xs text-pink-200/70 mb-8 max-w-xs">
                                Press play — the background music will quiet down automatically so you can hear me.
                            </p>

                            <div className="bg-[#381024]/90 backdrop-blur-md border border-pink-500/40 rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center">
                                <div className="flex items-center gap-4 w-full">
                                    <motion.button
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.94 }}
                                        onClick={toggleVoiceNote}
                                        className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-2xl shadow-lg shadow-pink-500/40 cursor-pointer shrink-0"
                                    >
                                        {isPlayingVoice ? "⏸️" : "▶️"}
                                    </motion.button>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center justify-between gap-1 h-10 px-2">
                                            {Array.from({ length: 20 }).map((_, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    animate={
                                                        isPlayingVoice
                                                            ? { height: [8, 28, 12, 34, 10] }
                                                            : { height: 8 }
                                                    }
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 0.7,
                                                        delay: idx * 0.05,
                                                    }}
                                                    className="w-1 rounded-full bg-pink-400 block"
                                                />
                                            ))}
                                        </div>

                                        <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden mt-2">
                                            <div
                                                style={{ width: `${voiceProgress}%` }}
                                                className="bg-gradient-to-r from-pink-400 to-amber-300 h-full transition-all duration-200"
                                            />
                                        </div>

                                        <div className="flex justify-between text-[10px] text-pink-200/60 mt-1">
                                            <span>{isPlayingVoice ? "Playing voice note..." : "Tap play to listen"}</span>
                                            <span>{formatTime(voiceDuration)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (voiceRef.current && isPlayingVoice) {
                                        voiceRef.current.pause();
                                        setIsPlayingVoice(false);
                                        if (bgMusicRef.current) bgMusicRef.current.volume = 0.5;
                                    }
                                    setStep(8);
                                }}
                                className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg cursor-pointer"
                            >
                                Continue to your letter 💌 →
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 8: THE ENVELOPE & LETTER */}
                    {step === 8 && (
                        <motion.div
                            key="step8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-screen text-white px-4 py-12"
                        >
                            {!letterOpen ? (
                                <div className="flex flex-col items-center text-center">
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                                        Before this ends, {HER_NAME}...
                                    </h2>
                                    <p className="text-xs text-pink-200/60 mb-10">
                                        A letter from {YOUR_NAME} is waiting inside.
                                    </p>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setLetterOpen(true)}
                                        className="w-72 h-48 bg-amber-300 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer relative border-4 border-amber-200"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shadow-md text-lg">
                                            {YOUR_NAME[0]}
                                        </div>
                                    </motion.div>

                                    <p className="text-xs text-pink-200/70 mt-6 animate-pulse">
                                        ⭐ Tap the envelope when you are ready 💌
                                    </p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-[#fffdf6] text-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full"
                                >
                                    <p className="font-serif italic text-lg leading-relaxed whitespace-pre-line text-gray-700">
                                        {LETTER_TEXT}
                                    </p>
                                    <div className="mt-8 text-right">
                                        <button
                                            onClick={() => {
                                                fireConfetti();
                                                setStep(9);
                                            }}
                                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold shadow-md cursor-pointer"
                                        >
                                            One last thing →
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* STEP 9: FINALE SCREEN */}
                    {step === 9 && (
                        <motion.div
                            key="step9"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center min-h-screen text-white px-4 text-center"
                        >
                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-4xl md:text-5xl font-serif font-bold tracking-wide text-pink-100"
                            >
                                HAPPY<br />BIRTHDAY
                            </motion.h1>
                            <p className="text-3xl font-serif italic text-amber-300 mt-1 mb-8">
                                {HER_NAME}! 🎉
                            </p>

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-8xl my-4 drop-shadow-2xl"
                            >
                                🧸🎁
                            </motion.div>

                            <p className="text-sm text-pink-200/80 mt-6">
                                Made with love, just for you — {YOUR_NAME} ❤️
                            </p>

                            <button
                                onClick={() => {
                                    setCandleBlown(false);
                                    setPoppedBalloons([false, false, false, false]);
                                    setLetterOpen(false);
                                    setVoiceProgress(0);
                                    setStep(0);
                                }}
                                className="mt-10 text-xs text-pink-400/70 hover:text-pink-300 underline cursor-pointer"
                            >
                                Replay from the beginning ↺
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}