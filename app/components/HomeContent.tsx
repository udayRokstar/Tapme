'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function HomeContent() {
  const [colorIndex, setColorIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const colors = [
    'from-purple-500 via-pink-500 to-red-500',
    'from-blue-500 via-cyan-500 to-green-500',
    'from-yellow-400 via-red-500 to-pink-500',
    'from-green-400 via-blue-500 to-purple-500'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);

    // Check for feedback success in URL
    if (searchParams.get('feedback') === 'success') {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
        // Remove the query parameter without refreshing the page
        window.history.replaceState({}, '', window.location.pathname);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => clearInterval(interval);
  }, [searchParams]);

  const handleTap = () => {
    if (!showFeedback) {
      router.push('/feedback');
    }
  };

  return (
    <div 
      onClick={handleTap} 
      className={`min-h-screen w-full bg-gradient-to-r ${colors[colorIndex]} transition-colors duration-1000 ease-in-out cursor-pointer`}
    >
      <div className="flex items-center justify-center h-screen flex-col">
        {!showFeedback ? (
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
            Welcome to 
            <span className='relative inline-block'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient bg-300% animate-bounce'>
                TapUniverse
              </span>
              <span className='absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 animate-gradient bg-300% animate-pulse opacity-70'>
                TapUniverse
              </span>
            </span>
          </h1>
        ) : (
          <div className="animate-shake text-4xl md:text-6xl font-bold text-center px-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500">
              BOOM! Thanks For Feedback
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
