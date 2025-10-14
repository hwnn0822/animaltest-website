'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Gaegu } from 'next/font/google';

const gaegu = Gaegu({
  weight: ['400', '700'],
  preload: false,
  subsets: ['latin'],
});

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 max-w-screen-md mx-auto bg-gradient-to-br from-primaryPink via-lightPink to-lightPurple bg-fixed">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className={`${gaegu.className} text-5xl mb-8 bg-clip-text bg-gradient-to-r from-accentPink to-darkPurple drop-shadow-md`}>사랑 앞에서 나는 어떤 동물일까?</h1>
        <p className="text-3xl text-gray-700 mb-16">연애할때의 나를 귀여운 동물로 알아보자</p>
        <div className="max-w-sm mx-auto">
          <button
            onClick={() => router.push('/quiz')}
            className="bg-gradient-to-r from-accentPink to-darkPurple text-white rounded-full shadow-lg hover:shadow-2xl hover:shadow-darkPurple/40 transition-all duration-300 ease-in-out transform hover:-translate-y-2 py-2 px-12 text-2xl border border-white border-opacity-50"
          >
            테스트 시작하기
          </button>
        </div>
      </motion.div>
    </div>
  );
}