import { Suspense } from 'react';
import { connection } from 'next/server';
import Teaser from '../components/Teaser';
import Reveal from '../components/Reveal';

async function BirthdayGate() {
  // Wait for an actual user request so the server checks the live clock
  await connection();

  // Target date: Nov 12, 2026, 00:00:00 IST (Indian Standard Time)
  const targetDate = new Date('2026-11-12T00:00:00+05:30');
  const now = new Date();

  const isBirthday = now.getTime() >= targetDate.getTime();

  return isBirthday ? <Reveal /> : <Teaser />;
}

export default function Home() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-pink-50 text-pink-600 font-medium">
            Loading your surprise... ✨
          </div>
        }
      >
        <BirthdayGate />
      </Suspense>
    </main>
  );
}