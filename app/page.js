'use client';
import { useState } from 'react';
import Teaser from '../components/Teaser';
import Reveal from '../components/Reveal';

export default function Home() {
    const [showReveal, setShowReveal] = useState(true);

    return (
        <main className="relative">
            <button
                onClick={() => setShowReveal(!showReveal)}
                className="fixed top-4 right-4 z-50 bg-black/80 text-white text-xs px-3 py-2 rounded-full shadow-md hover:bg-black transition cursor-pointer"
            >
                Viewing: {showReveal ? '🎂 Reveal' : '💌 Teaser'} (Click to switch)
            </button>

            {showReveal ? <Reveal /> : <Teaser />}
        </main>
    );
}