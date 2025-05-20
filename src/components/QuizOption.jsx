import React from 'react';

const QuizOption = ({ option, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(option)}
      className="w-full text-left p-4 mb-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3 hover:bg-gray-50"
    >
      <i className={`bi bi-${option.icon}-fill text-xl text-primary`} />
      <span className="font-playfair">{option.text}</span>
    </button>
  );
};

export default QuizOption; 