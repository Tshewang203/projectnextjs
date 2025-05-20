export const quizQuestions = [
  {
    id: 'question1',
    question: 'What interests you most about Bhutan?',
    options: [
      {
        text: 'Ancient temples and monasteries',
        icon: 'building',
        type: 'cultural',
        points: { cultural: 3, spiritual: 1 }
      },
      {
        text: 'Trekking and outdoor adventures',
        icon: 'geo-alt',
        type: 'adventure',
        points: { adventure: 3, nature: 1 }
      },
      {
        text: 'Meditation and spiritual practices',
        icon: 'peace',
        type: 'spiritual',
        points: { spiritual: 3, cultural: 1 }
      },
      {
        text: 'Wildlife and natural landscapes',
        icon: 'tree',
        type: 'nature',
        points: { nature: 3, adventure: 1 }
      }
    ]
  }
];

export const quizResults = {
  cultural: {
    title: 'Cultural Explorer',
    description: 'You have a deep appreciation for Bhutan\'s rich heritage! Our Cultural Heritage Tour will take you through ancient dzongs, vibrant festivals, and traditional craft workshops. Experience the living history of the Dragon Kingdom.',
    recommendation: '/destinations#landmarks',
    icon: 'building'
  },
  adventure: {
    title: 'Adventure Seeker',
    description: 'The Himalayas are calling! Our Himalayan Trek package offers challenging trails, mountain camping, and breathtaking views. Perfect for those who seek excitement in Bhutan\'s majestic landscapes.',
    recommendation: '/destinations#sacred-sites',
    icon: 'geo-alt'
  },
  spiritual: {
    title: 'Spiritual Pilgrim',
    description: 'Find inner peace in the Land of Happiness. Our Mindfulness Retreat includes guided meditation sessions, monastery stays, and interactions with Buddhist monks. Transform your journey into a spiritual awakening.',
    recommendation: '/destinations#sacred-sites',
    icon: 'peace'
  },
  nature: {
    title: 'Nature Enthusiast',
    description: 'Discover Bhutan\'s pristine wilderness! Our Wildlife and Nature tour explores national parks, rare species spotting, and virgin forests. Perfect for those who seek connection with untouched natural beauty.',
    recommendation: '/destinations#landmarks',
    icon: 'tree'
  }
}; 