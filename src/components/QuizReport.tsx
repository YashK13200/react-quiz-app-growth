import React from 'react';
import { Question } from '../types';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizReportProps {
  questions: Question[];
  answers: Record<number, string>;
  email: string;
  onRestart: () => void;
}

export function QuizReport({ questions, answers, email, onRestart }: QuizReportProps) {
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-0">Quiz Results</h1>
            <button
              onClick={onRestart}
              className="flex items-center px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Restart Quiz
            </button>
          </div>
          <p className="text-gray-600 mb-2">Email: {email}</p>
          <p className="text-lg sm:text-xl font-semibold">
            Score: {calculateScore()} out of {questions.length}
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {questions.map((question, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-xl p-4 sm:p-6 transform transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Question {index + 1}: {question.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0">
                    {answers[index] === question.correct_answer ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Your Answer:</p>
                    <p className="text-gray-700">{answers[index] || 'Not answered'}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Correct Answer:</p>
                  <p className="text-gray-700">{question.correct_answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}