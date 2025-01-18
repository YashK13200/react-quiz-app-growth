// import React from 'react';
import { Circle, CheckCircle, AlertCircle } from 'lucide-react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  visitedQuestions: Set<number>;
  answers: Record<number, string>;
  onQuestionSelect: (index: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onQuestionSelect,
}: QuestionNavigationProps) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Questions Overview</h2>
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-1.5 sm:gap-2 min-w-max sm:min-w-0">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`p-1.5 sm:p-2 rounded-md flex items-center justify-center transition-all duration-200 transform hover:scale-105 ${
              currentQuestion === i
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-indigo-100'
            }`}
          >
            {answers[i] ? (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            ) : visitedQuestions.has(i) ? (
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            ) : (
              <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            )}
            <span className="ml-1 text-sm sm:text-base">{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}