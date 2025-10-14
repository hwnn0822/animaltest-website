"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/data/questions';

interface QuestionPageProps {
  question: Question;
  answer: number;
  onAnswerChange: (answer: number) => void;
  onNext: () => void;
  onBack: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function QuestionPage({
  question,
  answer,
  onAnswerChange,
  onNext,
  onBack,
  currentQuestionIndex,
  totalQuestions,
}: QuestionPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 max-w-screen-md mx-auto">
      <div className="w-full max-w-md mx-auto">
        <div className="w-full bg-white/30 rounded-full h-2.5 mb-4">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white/50 p-10 rounded-3xl shadow-lg text-center max-w-lg w-full"
          >
            <h2 className="text-xl text-gray-800 mb-8 leading-tight">Q{question.id}. {question.text}</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div
                  onClick={() => onAnswerChange(1)}
                  className={`p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    answer <= 2 ? 'bg-primaryPink text-gray-800 shadow-lg' : 'bg-white/80 hover:bg-white'
                  }`}
                >
                  <p className="font-medium text-lg whitespace-pre-line">{question.scale.left}</p>
                </div>
                <div
                  onClick={() => onAnswerChange(5)}
                  className={`p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    answer >= 4 ? 'bg-lightPurple text-gray-800 shadow-lg' : 'bg-white/80 hover:bg-white'
                  }`}
                >
                  <p className="font-medium text-lg whitespace-pre-line">{question.scale.right}</p>
                </div>
              </div>

              <div className="flex items-center justify-center w-full space-x-2 md:space-x-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <input
                      type="radio"
                      id={`answer-${value}`}
                      name="answer"
                      value={value}
                      checked={answer === value}
                      onChange={() => onAnswerChange(value)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`answer-${value}`}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out
                      ${
                        answer === value
                          ? `shadow-lg transform scale-110 ${
                              value === 1 ? 'bg-primaryPink' :
                              value === 2 ? 'bg-pink-100' :
                              value === 3 ? 'bg-gradient-to-r from-pink-100 to-purple-100' :
                              value === 4 ? 'bg-purple-100' :
                              'bg-lightPurple'
                            }`
                          : 'bg-white/60 hover:bg-white'
                      }`}
                    >
                      <span className="text-base font-bold text-gray-800">
                        {value}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-12">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={onBack}
                  className="py-2 px-12 bg-white/80 text-gray-800 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  뒤로
                </button>
              )}
              <button
                onClick={onNext}
                className="py-2 px-12 bg-gradient-to-r from-accentPink to-darkPurple text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:shadow-darkPurple/40 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                다음
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}