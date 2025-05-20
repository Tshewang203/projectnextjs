import React from 'react';
import Link from 'next/link';

const QuizResult = ({ result, onRetake }) => {
  return (
    <div className="text-center">
      <div className="mb-6">
        <i className={`bi bi-${result.icon}-fill text-5xl text-primary`} />
      </div>
      
      <h3 className="text-2xl font-cinzel font-bold text-primary mb-4">
        {result.title}
      </h3>
      
      <p className="text-gray-600 font-playfair mb-6">
        {result.description}
      </p>
      
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h5 className="font-cinzel text-lg mb-4">Recommended Experience</h5>
        <Link
          href={result.recommendation}
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          View Your Perfect Tour
        </Link>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={onRetake}
          className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          Take Quiz Again
        </button>
        
        <Link
          href="/booking"
          className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          Book Your Experience
        </Link>
      </div>
    </div>
  );
};

export default QuizResult; 