'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const questions = [
  {
    id: 1,
    question: 'What type of experience are you looking for in Bhutan?',
    options: [
      { text: 'Cultural and spiritual', category: 'cultural', weight: 3 },
      { text: 'Adventure and trekking', category: 'adventure', weight: 3 },
      { text: 'Nature and wildlife', category: 'nature', weight: 3 },
      { text: 'Relaxation and wellness', category: 'spiritual', weight: 3 },
    ],
  },
  {
    id: 2,
    question: 'How do you prefer to spend your free time?',
    options: [
      { text: 'Exploring historical sites and museums', category: 'cultural', weight: 2 },
      { text: 'Hiking and outdoor activities', category: 'adventure', weight: 2 },
      { text: 'Photography and nature walks', category: 'nature', weight: 2 },
      { text: 'Meditation and yoga', category: 'spiritual', weight: 2 },
    ],
  },
  {
    id: 3,
    question: 'What interests you most about Bhutan?',
    options: [
      { text: 'Traditional festivals and customs', category: 'cultural', weight: 2 },
      { text: 'Mountain trails and landscapes', category: 'adventure', weight: 2 },
      { text: 'Biodiversity and wildlife', category: 'nature', weight: 2 },
      { text: 'Buddhist philosophy and practices', category: 'spiritual', weight: 2 },
    ],
  },
  {
    id: 4,
    question: 'What type of accommodation do you prefer?',
    options: [
      { text: 'Traditional guesthouses', category: 'cultural', weight: 1 },
      { text: 'Mountain lodges', category: 'adventure', weight: 1 },
      { text: 'Eco-friendly resorts', category: 'nature', weight: 1 },
      { text: 'Meditation retreats', category: 'spiritual', weight: 1 },
    ],
  },
];

const recommendations = {
  cultural: {
    title: 'Cultural Explorer',
    description: 'Immerse yourself in Bhutan\'s rich cultural heritage and traditions.',
    image: '/images/cultural.jpg',
    experiences: [
      'Visit ancient dzongs and monasteries',
      'Attend traditional festivals',
      'Experience local customs and rituals',
      'Learn traditional arts and crafts',
    ],
  },
  adventure: {
    title: 'Adventure Seeker',
    description: 'Challenge yourself with exciting outdoor activities and treks.',
    image: '/images/adventure.jpg',
    experiences: [
      'Trek to Tiger\'s Nest',
      'Explore mountain trails',
      'Try white water rafting',
      'Experience mountain biking',
    ],
  },
  spiritual: {
    title: 'Spiritual Journey',
    description: 'Find inner peace and spiritual growth in Bhutan\'s sacred spaces.',
    image: '/images/spiritual.jpg',
    experiences: [
      'Meditation retreats',
      'Temple visits',
      'Spiritual workshops',
      'Yoga sessions',
    ],
  },
  nature: {
    title: 'Nature Enthusiast',
    description: 'Discover Bhutan\'s pristine natural beauty and wildlife.',
    image: '/images/nature.jpg',
    experiences: [
      'Wildlife watching',
      'Nature photography',
      'Botanical gardens',
      'Bird watching',
    ],
  },
};

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResult = () => {
    const scores = {
      cultural: 0,
      adventure: 0,
      spiritual: 0,
      nature: 0,
    };

    Object.values(answers).forEach((answer) => {
      scores[answer.category] += answer.weight;
    });

    return Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  };

  const getRecommendation = () => {
    if (!showResults) return null;
    const category = calculateResult();
    return recommendations[category];
  };

  if (showResults) {
    const recommendation = getRecommendation();
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bhutan Experience</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64">
            <Image
              src={recommendation.image}
              alt={recommendation.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {recommendation.title}
            </h2>
            <p className="text-gray-600 mb-6">{recommendation.description}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended Experiences:
            </h3>
            <ul className="space-y-2">
              {recommendation.experiences.map((experience, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {experience}
                </li>
              ))}
            </ul>
            
            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => router.push('/destinations')}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Bhutan Experience</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 