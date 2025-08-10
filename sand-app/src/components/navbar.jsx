import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import progressBar from '../assets/progress20.png'; // We'll use the 100% bar as the base

// This is the little bubble that appears on hover
const Tooltip = ({ text, position }) => {
  if (!text) return null;

  return (
    <div
      className="absolute -top-12 bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-md shadow-lg transition-opacity duration-300"
      // The position is set dynamically based on which hotspot is hovered
      style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
    >
      {text}
      {/* Little triangle pointing down */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
    </div>
  );
};

// The main Navbar component
function InteractiveImageNavbar({ sections, onNavigate }) {
  // State to manage the tooltip's visibility, text, and position
  const [tooltip, setTooltip] = useState({ visible: false, text: '', position: 0 });

  // Define the hoverable areas. Each covers 20% of the width.
  // We adjust the `left` position to map to the visual segments of your progress bar image.
  const hotspots = [
    { left: 20, width: 20, sectionIndex: 0 }, // Home (20% mark)
    { left: 40, width: 20, sectionIndex: 1 }, // Sand (40% mark)
    { left: 60, width: 20, sectionIndex: 2 }, // Cub3d (60% mark)
    { left: 80, width: 20, sectionIndex: 3 }, // Webserv (80% mark)
    { left: 100, width: 20, sectionIndex: 4 }, // Contact (100% mark)
  ];

  const handleMouseEnter = (sectionIndex, position) => {
    setTooltip({
      visible: true,
      text: sections[sectionIndex].title,
      position: position,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: '', position: 0 });
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {/* The container must be `relative` to position the hotspots and tooltip inside it. */}
      <div className="relative w-[400px]">
        {/* The base image of the progress bar */}
        <img src={progressBar} alt="Navigation Bar" className="w-full" />

        {/* The Tooltip bubble, which is only visible on hover */}
        {tooltip.visible && <Tooltip text={tooltip.text} position={tooltip.position} />}

        {/* Invisible Hotspots: These are the clickable/hoverable areas */}
        {hotspots.map((hotspot) => (
          <Link
            key={sections[hotspot.sectionIndex].id}
            to={sections[hotspot.sectionIndex].path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(hotspot.sectionIndex);
            }}
            onMouseEnter={() => handleMouseEnter(hotspot.sectionIndex, hotspot.left)}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 h-full cursor-pointer"
            // Position and size each hotspot over the correct part of the image
            style={{ 
              left: `${hotspot.left - hotspot.width / 2}%`, 
              width: `${hotspot.width}%` 
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default InteractiveImageNavbar;