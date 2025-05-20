import React from 'react';

const TipCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full transform transition-transform hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-cinzel font-semibold mb-3 text-primary">{title}</h4>
      <p className="text-gray-600 font-playfair">{description}</p>
    </div>
  );
};

export default TipCard; 