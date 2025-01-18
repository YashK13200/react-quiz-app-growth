import React, { useState, useEffect, useMemo } from 'react';
import { Question, QuizState } from './types';
import { StartPage } from './components/StartPage';
import { QuestionNavigation } from './components/QuestionNavigation';
import { Timer } from './components/Timer';
import { QuizReport } from './components/QuizReport';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  visitedQuestions: new Set([0]),
  timeRemaining: 30 * 60, // 30 minutes in seconds
  email: '',
  isQuizStarted: false,
  isQuizSubmitted: false,
};

function App() {
  const [state, setState] = useState<QuizState>(initialState);
  const [questionOptions, setQuestionOptions] = useState<Record<number, string[]>>({});
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (state.isQuizStarted && !state.isQuizSubmitted) {
      const timer = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.isQuizStarted, state.isQuizSubmitted]);

  useEffect(() => {
    if (state.timeRemaining <= 0 && !state.isQuizSubmitted) {
      handleSubmitQuiz();
    }
  }, [state.timeRemaining]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      const data = await response.json();
      
      const initialOptions: Record<number, string[]> = {};
      data.results.forEach((question: Question, index: number) => {
        initialOptions[index] = [
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort(() => Math.random() - 0.5);
      });
      
      setQuestionOptions(initialOptions);
      setState((prev) => ({
        ...prev,
        questions: data.results,
      }));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleStartQuiz = (email: string) => {
    setState((prev) => ({
      ...prev,
      email,
      isQuizStarted: true,
    }));
    fetchQuestions();
  };

  const handleAnswerSelect = (answer: string) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestionIndex]: answer,
      },
    }));
  };

  const handleQuestionChange = (index: number) => {
    setDirection(index > state.currentQuestionIndex ? 'right' : 'left');
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: index,
      visitedQuestions: new Set([...prev.visitedQuestions, index]),
    }));
  };

  const handleSubmitQuiz = () => {
    setState((prev) => ({
      ...prev,
      isQuizSubmitted: true,
    }));
  };

  const handleRestartQuiz = () => {
    setState(initialState);
    setQuestionOptions({});
  };

  if (!state.isQuizStarted) {
    return <StartPage onStart={handleStartQuiz} />;
  }

  if (state.isQuizSubmitted) {
    return (
      <QuizReport
        questions={state.questions}
        answers={state.answers}
        email={state.email}
        onRestart={handleRestartQuiz}
      />
    );
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl">Loading questions...</div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const options = questionOptions[state.currentQuestionIndex] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <Timer
          timeRemaining={state.timeRemaining}
          onTimeUp={handleSubmitQuiz}
        />

        <QuestionNavigation
          totalQuestions={state.questions.length}
          currentQuestion={state.currentQuestionIndex}
          visitedQuestions={state.visitedQuestions}
          answers={state.answers}
          onQuestionSelect={handleQuestionChange}
        />

        <div 
          key={state.currentQuestionIndex}
          className={`bg-white rounded-lg shadow-xl p-4 sm:p-6 transform transition-all duration-300 ease-in-out ${
            direction === 'right' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
          }`}
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Question {state.currentQuestionIndex + 1}
          </h2>
          <p className="text-base sm:text-lg mb-4 sm:mb-6">{currentQuestion.question}</p>

          <div className="space-y-2 sm:space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-3 sm:p-4 text-left rounded-lg transition-all duration-200 transform hover:scale-[1.01] ${
                  state.answers[state.currentQuestionIndex] === option
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-4 sm:mt-6">
            <button
              onClick={() => handleQuestionChange(state.currentQuestionIndex - 1)}
              disabled={state.currentQuestionIndex === 0}
              className="flex items-center px-3 sm:px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              Previous
            </button>

            {state.currentQuestionIndex === state.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-3 sm:px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => handleQuestionChange(state.currentQuestionIndex + 1)}
                className="flex items-center px-3 sm:px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
              >
                Next
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;