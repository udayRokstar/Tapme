
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [
    'from-purple-500 via-pink-500 to-red-500',
    'from-blue-500 via-cyan-500 to-green-500',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-green-400 via-teal-500 to-blue-500',
    'from-pink-500 via-purple-500 to-indigo-500'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const router = useRouter();

  const handleTap = () => {
    router.push('/feedback');
  };

  return (
    <div onClick={handleTap} className={`min-h-screen w-full bg-gradient-to-r ${colors[colorIndex]} transition-colors duration-1000 ease-in-out`}>
      <div className="flex items-center justify-center h-screen">
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
      </div>
    </div>
  );
}
