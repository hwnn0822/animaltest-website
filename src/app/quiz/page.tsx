"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import questions from '@/data/questions';
import { useTestStore } from '@/stores/useTestStore';
import QuestionPage from '@/components/QuestionPage';

export default function QuizPage() {
  const router = useRouter();
  const { currentQuestionIndex, addAnswer, goBack, answers } = useTestStore();
  const [answer, setAnswer] = useState(answers[currentQuestionIndex] || 3);

  const handleNext = () => {
    if (answer !== null) {
      addAnswer(answer);
    }
  };

  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      router.push('/result');
    } else {
      setAnswer(answers[currentQuestionIndex] || 3);
    }
  }, [currentQuestionIndex, router, answers]);

  if (currentQuestionIndex >= questions.length) {
    return null;
  }

  const question = questions[currentQuestionIndex];

  return (
    <QuestionPage
      question={question}
      answer={answer}
      onAnswerChange={setAnswer}
      onNext={handleNext}
      onBack={handleBack}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
    />
  );
}
