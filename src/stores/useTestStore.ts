import { create } from 'zustand';

interface TestState {
  answers: number[];
  currentQuestionIndex: number;
  addAnswer: (answer: number) => void;
  goBack: () => void;
  reset: () => void;
}

export const useTestStore = create<TestState>((set) => ({
  answers: [],
  currentQuestionIndex: 0,
  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),
  goBack: () =>
    set((state) => {
      if (state.currentQuestionIndex > 0) {
        return {
          answers: state.answers.slice(0, -1),
          currentQuestionIndex: state.currentQuestionIndex - 1,
        };
      }
      return {};
    }),
  reset: () => set({ answers: [], currentQuestionIndex: 0 }),
}));
