'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Teaser() {
    const [clickCount, setClickCount] = useState(0);
    const [daysLeft, setDaysLeft] = useState(10);
    const [progress, setProgress] = useState(12);
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const targetDate = new Date('2026-11-12T00:00:00+05:30');
        const now = new Date();

        const diffTime = Math.max(targetDate.getTime() - now.getTime(), 0);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays);

        const maxDays = 30; // Keeps the plane moving for testing
        let currentProgress = ((maxDays - diffDays) / maxDays) * 100;

        if (currentProgress < 12) currentProgress = 12;
        if (currentProgress > 88) currentProgress = 88;
        setProgress(currentProgress);
    }, []);

    const getCheekyMessage = () => {
        if (clickCount === 0) return "Tap to open...";
        if (clickCount === 1) return "Ah ah ah! No peeking! 🛑";
        if (clickCount === 2) return "I said no! 🙅‍♀️";
        if (clickCount === 3) return "Nice try though! 😂";
        return `Wait ${daysLeft} more days! 🕰️`;
    };

    // Handles the tap: Shakes envelope and bursts hearts
    const handleEnvelopeTap = () => {
        setClickCount((prev) => prev + 1);

        // Generate 6 random hearts that explode outwards and upwards
        const newHearts = Array.from({ length: 6 }).map((_, i) => ({
            id: Date.now() + i,
            x: (Math.random() - 0.5) * 200, // random left/right spread
            y: -(Math.random() * 150 + 100), // random upwards float
            scale: Math.random() * 0.8 + 0.5,
            rotate: (Math.random() - 0.5) * 60
        }));

        setHearts(newHearts);

        // Clear hearts after animation
        setTimeout(() => setHearts([]), 2000);
        setTimeout(() => setClickCount(0), 5000);
    };

    const getDailyClue = () => {
        if (daysLeft > 7) return "The countdown has officially begun...";
        if (daysLeft === 7) return "Clue 1: I hope you have a sweet tooth ready.";
        if (daysLeft === 6) return "Clue 2: Make sure your volume is turned up when the time comes.";
        if (daysLeft === 5) return "Clue 3: I might have hidden some of my favorite photos in here.";
        if (daysLeft === 4) return "Clue 4: Prepare to pop some virtual balloons.";
        if (daysLeft === 3) return "Clue 5: There is a little letter waiting for you.";
        if (daysLeft === 2) return "Clue 6: Almost time to light the candles...";
        if (daysLeft === 1) return "Clue 7: Just one more sleep! 🌙";
        return "Any minute now...";
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center p-6 font-sans overflow-hidden">

            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-10">
                Patience...
            </h1>

            <div className="h-40 flex flex-col items-center justify-center relative">

                {/* Floating Hearts Burst */}
                <AnimatePresence>
                    {hearts.map((h) => (
                        <motion.div
                            key={h.id}
                            initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
                            animate={{ x: h.x, y: h.y, scale: h.scale, rotate: h.rotate, opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute text-4xl z-50 pointer-events-none drop-shadow-md"
                        >
                            💖
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.div
                    whileTap={{ x: [-10, 10, -10, 10, 0] }}
                    onClick={handleEnvelopeTap}
                    className="cursor-pointer bg-white p-8 rounded-2xl shadow-xl border-2 border-pink-200 relative z-10 select-none flex flex-col items-center"
                >
                    <div className="text-7xl mb-4">💌</div>
                    <p className="text-pink-600 font-medium h-6">
                        {getCheekyMessage()}
                    </p>
                </motion.div>
            </div>

            {/* Tracker remains exactly the same below... */}
            <div className="mt-16 w-full max-w-md bg-white rounded-3xl p-6 shadow-lg border border-pink-100 relative z-20">
                <h3 className="text-sm uppercase tracking-widest text-pink-400 font-bold mb-4">
                    Delivery Status
                </h3>

                <div className="relative w-full h-12 flex items-center justify-center mb-4 mt-2">
                    <div className="absolute left-0 text-3xl z-10">🇩🇪</div>
                    <div className="absolute right-0 text-3xl z-10">🇮🇳</div>

                    <div className="absolute left-[12%] right-[12%] h-0 border-t-[3px] border-dashed border-pink-100" />

                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress - 12}%` }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                        className="absolute left-[12%] h-0 border-t-[3px] border-dashed border-pink-400"
                    />

                    <motion.div
                        initial={{ left: '12%' }}
                        animate={{ left: `${progress}%`, y: [-4, 4, -4] }}
                        transition={{
                            left: { duration: 2.5, ease: "easeInOut", delay: 0.5 },
                            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                        }}
                        className="absolute text-3xl drop-shadow-md -translate-x-1/2 -mt-1 z-20"
                    >
                        ✈️
                    </motion.div>
                </div>

                <p className="text-xs text-gray-400 mb-5 px-4 italic">
                    The distance from Germany to West Bengal is long, but this little plane gets closer every day.
                </p>

                <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
                    <p className="text-sm text-pink-800 font-medium">{getDailyClue()}</p>
                </div>
            </div>
        </div>
    );
}