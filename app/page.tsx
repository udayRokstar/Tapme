
import { Suspense } from 'react';
import HomeContent from './components/HomeContent';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
