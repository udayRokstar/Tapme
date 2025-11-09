'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function FeedbackPage() {
  const router = useRouter();

  const generateRandomId = (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleRating = async (rating: string) => {
    const sessionId = generateRandomId(8);
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const { data } = await axios.post('/api/feedback', { sessionId, rating });
      
      // Redirect to home page with success message
      router.push('/?feedback=success');
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit feedback. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      {submitStatus.type && (
        <div 
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md ${
            submitStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white font-medium`}
        >
          {submitStatus.message}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        How was your experience?
      </h1>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {[
          { emoji: '😞', label: 'Not Happy' },
          { emoji: '😊', label: 'Good' },
          { emoji: '😍', label: 'Satisfied' }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => handleRating(item.label)}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <span className="text-6xl md:text-8xl mb-4">{item.emoji}</span>
            <span className="text-white text-xl font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      
      <button
        onClick={() => router.push('/')}
        className="mt-12 px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
      >
        Back to Home
      </button>
    </div>
  );
}
