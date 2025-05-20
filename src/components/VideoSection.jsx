import React from 'react';

const videoData = [
  {
    src: "video1.mp4",
    title: "Culture",
    description: "Experience the vibrant cultural celebrations that bring Bhutan's heritage to life.",
    isRight: false
  },
  {
    src: "video8.mp4",
    title: "Mountain Adventures",
    description: "Trek through snow-capped peaks and pristine mountain paths",
    isRight: true
  },
  {
    src: "video3.mp4",
    title: "Local Life",
    description: "Immerse yourself in the daily life and rich traditions of Bhutanese communities.",
    isRight: false
  },
  {
    src: "video4.mp4",
    title: "Trongsa Dzong",
    description: "Discover the Heart of Himalayan kingdom.",
    isRight: true
  },
  {
    src: "video5.mp4",
    title: "Bumthang District",
    description: "Visit Bhutan's spiritual heartland",
    isRight: false
  },
  {
    src: "video2.mp4",
    title: "Tiger's Nest",
    description: "Marvel at the iconic monastery clinging to a cliff face.",
    isRight: true
  },
  {
    src: "video7.mp4",
    title: "Natural Beauty",
    description: "Immerse yourself in the Natural wonders.",
    isRight: false
  },
  {
    src: "video6.mp4",
    title: "Punakha Valley",
    description: "Visit the majestic fortress at the river confluence.",
    isRight: true
  },
  {
    src: "video9.mp4",
    title: "Wildlife",
    description: "Spot rare Himalayan species in their natural habitat",
    isRight: false
  }
];

const VideoSection = () => {
  return (
    <section className="py-20 bg-[var(--rice-white)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-['Cinzel']">
          Experience Bhutan's Magic
        </h2>
        
        {videoData.map((video, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center mb-16 gap-8">
            {/* Video Container */}
            <div className={`w-full md:w-1/2 ${video.isRight ? 'md:order-2' : ''}`}>
                <video 
                className="w-full rounded-lg shadow-lg"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

            {/* Text Content */}
            <div className={`w-full md:w-1/2 ${video.isRight ? 'md:order-1' : ''}`}>
              <h3 className="text-2xl font-bold mb-4 font-['Cinzel'] text-[var(--dzong-blue)]">
                {video.title}
              </h3>
              <p className="text-lg font-['Playfair_Display'] text-[var(--text-dark)]">
                {video.description}
              </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default VideoSection; 