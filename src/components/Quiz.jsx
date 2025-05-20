'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { quizQuestions, quizResults } from '@/data/quizData';

export default function Quiz() {
  const router = useRouter();
  const [userScore, setUserScore] = useState({
    cultural: 0,
    adventure: 0,
    spiritual: 0,
    nature: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptionClick = (points) => {
    const newScore = { ...userScore };
    Object.entries(points).forEach(([type, value]) => {
      newScore[type] += value;
    });
    setUserScore(newScore);

    // Find the highest scoring category
    const topChoice = Object.entries(newScore).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    setResult(quizResults[topChoice]);
    setShowResult(true);
  };

  const restartQuiz = () => {
    setUserScore({
      cultural: 0,
      adventure: 0,
      spiritual: 0,
      nature: 0
    });
    setShowResult(false);
    setResult(null);
  };

  const handleViewTour = () => {
    if (result?.recommendation) {
      router.push(result.recommendation);
    }
  };

  return (
    <section className="py-20 bg-[#2B3F55] mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white font-['Cinzel']">
          Discover Your Perfect Bhutan Experience
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
          {!showResult ? (
            <div id="quizContent">
              {quizQuestions.map((question) => (
                <div key={question.id} className="quiz-question">
                  <h3 className="text-2xl font-bold mb-8 text-[#2B3F55] font-['Cinzel']">
                    {question.question}
                  </h3>
                  <div className="space-y-4">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option.points)}
                        className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-[#2B3F55] hover:text-white transition-colors flex items-center gap-3"
                      >
                        <i className={`bi bi-${option.icon}-fill text-xl`}></i>
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div id="quizResult" className="text-center">
              <div className="mb-8">
                <i className={`bi bi-${result?.icon}-fill text-6xl text-[#2B3F55]`}></i>
                <h3 className="text-2xl font-bold mt-4 mb-2 text-[#2B3F55] font-['Cinzel']">
                  {result?.title}
                </h3>
                <p className="text-gray-600 mb-8 font-['Playfair_Display']">
                  {result?.description}
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h4 className="text-xl font-bold mb-4 text-[#2B3F55] font-['Cinzel']">
                    Recommended Experience
                  </h4>
                  <button
                    onClick={handleViewTour}
                    className="inline-block px-6 py-3 bg-[#2B3F55] text-white rounded-lg hover:bg-[var(--river-blue)] transition-colors"
                  >
                    View Your Perfect Tour
                  </button>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={restartQuiz}
                    className="px-6 py-3 border border-[#2B3F55] text-[#2B3F55] rounded-lg hover:bg-[#2B3F55] hover:text-white transition-colors"
                  >
                    Take Quiz Again
                  </button>
                  <Link
                    href="/booking"
                    className="px-6 py-3 border border-[#2B3F55] text-[#2B3F55] rounded-lg hover:bg-[#2B3F55] hover:text-white transition-colors"
                  >
                    Book Your Experience
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 