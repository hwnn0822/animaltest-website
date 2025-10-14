"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/stores/useTestStore';
import { calculateResult, animalInfo } from '@/utils/calculateResult';
import { motion } from 'framer-motion';
import copy from 'copy-to-clipboard';

const animalEmojis: Record<string, string> = {
  dog: '🐶',
  cat: '🐱',
  rabbit: '🐰',
  fox: '🦊',
  bear: '🐻',
  deer: '🦌',
  wolf: '🐺',
  parrot: '🦜',
};

export default function ResultPage() {
  const router = useRouter();
  const { answers, reset } = useTestStore();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (answers.length === 0) {
      router.push('/');
    }
  }, [answers, router]);

  if (answers.length === 0) {
    return null;
  }

  const resultAnimal = calculateResult(answers);
  const { title, description, pros, cons, bestMatch, worstMatch, bestMatchReason, worstMatchReason } = animalInfo[resultAnimal];
  const emoji = animalEmojis[resultAnimal];

  const handleRestart = () => {
    reset();
    router.push('/');
  };

  const handleShare = async () => {
    const shareData = {
      title: '나의 연애 동물 테스트',
      text: `나는 연애할 때 ${title} 타입! 당신의 연애 동물은 무엇인지 확인해보세요!`,
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('Error sharing:', err);
    }
  };

  const handleCopy = () => {
    copy(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 max-w-screen-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/50 p-10 rounded-3xl shadow-lg text-center max-w-lg w-full"
      >
        <h1 className="text-2xl text-gray-800 mb-8 bg-clip-text bg-gradient-to-r from-accentPink to-darkPurple">나의 연애 동물은?</h1>
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
          className="text-[140px] mb-10"
        >
          {emoji}
        </motion.div>
        <h2 className="text-3xl text-accentPink mb-6">{title}</h2>
        <p className="text-gray-700 text-md mb-12 leading-relaxed">{description}</p>

        <div className="text-left w-full mb-8">
          <h3 className="text-xl font-bold text-darkPurple mb-2">💖 연애 스타일의 장점</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {pros.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-darkPurple mb-2">💔 연애 스타일의 단점</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {cons.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-darkPurple mb-3 text-center">✨ 최고의 궁합</h3>
              <div className="bg-white/60 p-4 rounded-xl shadow-md">
                <p className="text-center text-2xl mb-2">
                  {animalEmojis[bestMatch.match(/\((.*)\)/)?.[1]?.toLowerCase() ?? '']}
                </p>
                <p className="text-gray-800 font-bold text-center mb-2">{bestMatch}</p>
                <p className="text-gray-600 text-sm text-center">{bestMatchReason}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-darkPurple mb-3 text-center">⚠️ 워스트 궁합</h3>
              <div className="bg-white/60 p-4 rounded-xl shadow-md">
                <p className="text-center text-2xl mb-2">
                  {animalEmojis[worstMatch.match(/\((.*)\)/)?.[1]?.toLowerCase() ?? '']}
                </p>
                <p className="text-gray-800 font-bold text-center mb-2">{worstMatch}</p>
                <p className="text-gray-600 text-sm text-center">{worstMatchReason}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-sm mx-auto">
          <button
            onClick={handleRestart}
            className="py-6 px-12 bg-gradient-to-r from-accentPink to-darkPurple text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:shadow-darkPurple/40 transition-all duration-300 ease-in-out transform hover:-translate-y-2 mb-4 border border-white border-opacity-50 w-full"
          >
            테스트 다시하기
          </button>
          <div className="flex space-x-2">
            <button
              onClick={handleShare}
              className="py-3 px-6 bg-white/80 text-gray-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full"
            >
              공유하기
            </button>
            <button
              onClick={handleCopy}
              className="py-3 px-6 bg-white/80 text-gray-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full"
            >
              {isCopied ? '복사 완료!' : '링크 복사'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
