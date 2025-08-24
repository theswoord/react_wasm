// src/components/ScreenshotViewer.js

import React, { useState } from 'react';

// Import your screenshots
import screenshot1 from '/src/assets/screens/sand1.png';
import screenshot2 from '/src/assets/screens/sand2.png';
import screenshot3 from '/src/assets/screens/sand3.png';

import screenshot4 from '/src/assets/screens/cub2.png';
import screenshot5 from '/src/assets/screens/cub1.png';


const gameScreenshots = {
  sand: [screenshot1, screenshot2, screenshot3],
  cub: [screenshot4, screenshot5],
};

// The component now accepts a 'gameType' prop
function ScreenshotViewer({ gameType = 'sand' }) { // Default to 'sand' if no type is provided
  
  // Select the correct array of images based on the prop
  const screenshots = gameScreenshots[gameType] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  // Return null or a placeholder if the gameType is invalid or has no images
  if (screenshots.length === 0) {
    console.error(`ScreenshotViewer: No images found for gameType "${gameType}".`);
    return null; 
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? screenshots.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === screenshots.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleArrowClick = (e, direction) => {
    e.stopPropagation();
    if (direction === 'next') goToNext();
    else goToPrevious();
  };
  
  const renderThumbnail = () => (
    <div
      onClick={() => setIsEnlarged(true)}
      className="relative w-full max-w-xs mx-auto cursor-pointer group overflow-hidden rounded-lg border-2 border-white/20"
      title="Click to enlarge"
    >
      <img
        src={screenshots[currentIndex]}
        alt={`${gameType} Screenshot Thumbnail`}
        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v-4m0 0h-4m4 4l-5-5" /></svg>
      </div>
       <button onClick={(e) => handleArrowClick(e, 'prev')} className="absolute top-1/2 -translate-y-1/2 left-2 z-10 p-1 bg-black/50 rounded-full text-white text-lg opacity-60 group-hover:opacity-100 transition-opacity">❮</button>
       <button onClick={(e) => handleArrowClick(e, 'next')} className="absolute top-1/2 -translate-y-1/2 right-2 z-10 p-1 bg-black/50 rounded-full text-white text-lg opacity-60 group-hover:opacity-100 transition-opacity">❯</button>
    </div>
  );

  const renderEnlargedView = () => (
    <div
      onClick={() => setIsEnlarged(false)}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-lg overflow-hidden"
      >
        <img
          src={screenshots[currentIndex]}
          alt={`Enlarged ${gameType} Screenshot`}
          className="w-full h-auto object-contain"
        />
        <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 bg-black/50 rounded-full text-white text-3xl cursor-pointer transition-colors hover:bg-black/80">❮</button>
        <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 bg-black/50 rounded-full text-white text-3xl cursor-pointer transition-colors hover:bg-black/80">❯</button>
        <button onClick={() => setIsEnlarged(false)} className="absolute top-3 right-3 z-10 p-2 bg-black/50 rounded-full text-white text-xl cursor-pointer hover:bg-black/80">✕</button>
      </div>
    </div>
  );

  return (
    <div>
      {isEnlarged ? renderEnlargedView() : renderThumbnail()}
    </div>
  );
}

export default ScreenshotViewer;