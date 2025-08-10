import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import progressbar20 from '../assets/progress20.png';
import progressbar40 from '../assets/progress40.png';
import progressbar60 from '../assets/progress60.png';
import progressbar80 from '../assets/progress80.png';
import progressbar100 from '../assets/progress100.png';

// const svghome = "M9.362 9.158l-5.268.584c-.19.023-.358.15-.421.343s0 .394.14.521c1.566 1.429 3.919 3.569 3.919 3.569-.002 0-.646 3.113-1.074 5.19-.036.188.032.387.196.506.163.119.373.121.538.028 1.844-1.048 4.606-2.624 4.606-2.624l4.604 2.625c.168.092.378.09.541-.029.164-.119.232-.318.195-.505l-1.071-5.191 3.919-3.566c.14-.131.202-.332.14-.524s-.23-.319-.42-.341c-2.108-.236-5.269-.586-5.269-.586l-2.183-4.83c-.082-.173-.254-.294-.456-.294s-.375.122-.453.294l-2.183 4.83z";
const svghome = "M12 3L2 12h3v8h5v-6h4v6h5v-8h3L12 3z";
const svgsand = "M10 8v9h6V8h-6zm8 11H0v-7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h2V8a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2v11zM8 17v-3H4v-2H2v5h6zM8 2v4h10V2h-2v2h-6V2H8zm5 11a2 2 0 0 1 2 2v3h-4v-3a2 2 0 0 1 2-2zm-1-4h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2z";
const svgcub = "M23.186 4.847H22.929V3.881c0 -0.449 -0.365 -0.814 -0.814 -0.814H2.902c-0.422 0 -0.836 0.32 -0.943 0.728l-0.012 0.048H0.814c-0.449 0 -0.814 0.365 -0.814 0.814v2.812c0 0.439 0.349 0.797 0.785 0.813l-0.34 1.299c-0.058 0.22 -0.017 0.44 0.11 0.605s0.331 0.26 0.558 0.26H3.081L0.07 19.777c-0.094 0.291 -0.056 0.583 0.103 0.803s0.426 0.345 0.732 0.346l8.241 0.008h0.001c0.293 0 0.568 -0.114 0.776 -0.322 0.208 -0.208 0.322 -0.484 0.322 -0.776v-1.929c0 -0.606 -0.493 -1.099 -1.099 -1.099h-0.502c-0.123 0 -0.219 -0.039 -0.271 -0.11 -0.052 -0.071 -0.059 -0.175 -0.022 -0.292l0.436 -1.348h4.597c0.673 0 1.359 -0.447 1.631 -1.062l1.572 -3.549H22.115c0.449 0 0.814 -0.365 0.814 -0.814v-1.349h0.256c0.449 0 0.814 -0.365 0.814 -0.814V5.661c0 -0.449 -0.365 -0.814 -0.814 -0.814m-9.877 8.309h-2.102c0.612 -0.317 1.004 -0.842 1.004 -1.447 0 -0.5 -0.268 -0.945 -0.705 -1.263h3.004zm2.06 -6.591c0 0.299 -0.244 0.543 -0.543 0.543H6.34c-0.299 0 -0.543 -0.244 -0.543 -0.543v-1.652c0 -0.299 0.244 -0.543 0.543 -0.543H14.825c0.299 0 0.543 0.244 0.543 0.543z";
const svgwebserv = "M1,1 L23,1 M10,4.5 L14,4.5 C14,4.5 14,6 14,6 C14,7 12,8 12,8 C12,8 10,7 10,6 C10,6 10,4.5 10,4.5 Z M5,1 C5,1 5,3 5,6 C5,9 10,9.23530084 10,12 C10,14.7646992 5.00000001,15 5,18 C4.99999999,21 5,23 5,23 M19,1 C19,1 19,3 19,6 C19,9 14,9.23530084 14,12 C14,14.7646992 19,15 19,18 C19,21 19,23 19,23 M1,23 L23,23 M8,21 C8,19 12,17 12,17 C12,17 16,19 16,21 C16,21 16,23 16,23 L8,23 L8,21 Z";
const svgcontact = "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z";
// const svgcontact = "M19 7h-14c-1.104 0-2 .896-2 2v9c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2v-9c0-1.104-.896-2-2-2zm-9.684 7.316l1.602 1.4c.305.266.691.398 1.082.398s.777-.133 1.082-.398l1.602-1.4-.037.037 3.646 3.646h-12.586l3.646-3.646-.037-.037zm-4.316 2.977v-6.753l3.602 3.151-3.602 3.602zm10.398-3.602l3.602-3.151v6.75l-3.602-3.599zm3.602-4.691v.21l-6.576 5.754c-.227.198-.621.198-.848 0l-6.576-5.754v-.21h14z";

// A small, reusable component for the tooltip bubble.
const Tooltip = ({ text, position }) => {
  // Don't render anything if there's no text.
  if (!text) return null;

  return (
    <div
      className="absolute -top-12 bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-md shadow-lg transition-opacity duration-300 pointer-events-none"
      // The position is set dynamically based on which hotspot is hovered.
      style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
    >
      {text}
      {/* This div creates the little triangle pointing down from the bubble. */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
    </div>
  );
};

// The main progress bar component.
function ProgressBar({ percent = 0 }) {
  // State to manage the tooltip's visibility, text, and position.
  const [tooltip, setTooltip] = useState({ visible: false, text: '', position: 0 });
  // State to manage which image is shown on hover.
  const [hoveredImage, setHoveredImage] = useState(null);
  // Get the navigate function from the router
  const navigate = useNavigate();

  // Logic for choosing the initial image based on the percent prop.
  let chosenbar = null;
  const bars = [progressbar20, progressbar40, progressbar60, progressbar80, progressbar100];
  if (percent === 20) {
    chosenbar = bars[0];
  }
  if (percent === 40) {
    chosenbar = bars[1];
  }
  if (percent === 60) {
    chosenbar = bars[2];
  }
  if (percent === 80) {
    chosenbar = bars[3];
  }
  if (percent === 100) {
    chosenbar = bars[4];
  }

  // Define the hoverable areas and clickable dots in a single data structure.
const navigationPoints = [
{ position: 27, text: 'Home', image: progressbar20,icon: svghome,color:"#808080",fill:"#FFDF0F", path: '/' },
{ position: 42, text: 'Sand Game', image: progressbar40,icon: svgsand,color:"#000000",fill:"#000000", path: '/navsand' },
{ position: 56, text: 'Cub3D', image: progressbar60,icon: svgcub,color:"#808080",fill:"#000000", path: '/navcub' },
{ position: 73, text: 'Webserv', image: progressbar80,icon: svgwebserv,color:"#000000",fill:"#000000", path: '/navwebserv' },
{ position: 90, text: 'Contact', image: progressbar100,icon: svgcontact,color:"#808080",fill:"#000000", path: '/navcontact' },
];


  const handleMouseEnter = (text, position, image) => {
    setTooltip({ visible: true, text, position });
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: '', position: 0 });
    setHoveredImage(null);
  };
  
  // If no valid initial image is chosen, don't render anything.
  if (!chosenbar) {
    return null;
  }

  return (
    // The main container must be `relative` to position the hotspots and tooltip inside it.
    <div className="relative w-[400px]" onMouseLeave={handleMouseLeave}>
      {/* The base image of the progress bar.
          Its `src` is the hoveredImage if it exists, otherwise it's the initial chosenbar. */}
      <img src={hoveredImage || chosenbar} alt={`Progress at ${percent}%`} className="w-full" />

      {/* The Tooltip bubble, which is only visible when `tooltip.visible` is true */}
      {tooltip.visible && <Tooltip text={tooltip.text} position={tooltip.position} />}

      {/* Invisible Hotspots: These are the hoverable areas */}
      {navigationPoints.map((point) => (
        <div
          key={`hotspot-${point.position}`}
          onMouseEnter={() => handleMouseEnter(point.text, point.position, point.image)}
          className="absolute top-0 h-full"
          // Position and size each hotspot over the correct part of the image.
          style={{ 
            left: `${point.position - 10}%`, 
            width: `20%` 
          }}
        />
      ))}

      {/* Clickable Hearts */}
      {navigationPoints.map((point) => (
        <svg
          key={`dot-${point.position}`}
          onClick={() => navigate(point.path)}
          style={{ left: `${point.position}%` , stroke: `${point.color}` , '--fill':`${point.fill}` }}
          className="absolute top-1/2 w-5 h-5 text-[var(--fill)] fill-current cursor-pointer transform -translate-y-1/2 -translate-x-1/2 hover:scale-125 hover:text-red-800 transition-all duration-200"
          
          // className="absolute top-1/2 w-5 h-5 text-white fill-current stroke-red-800 cursor-pointer transform -translate-y-1/2 -translate-x-1/2 hover:scale-125 hover:text-red-400 transition-all duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1"
        >
          <path d={point.icon} />
        </svg>
      ))}
    </div>
  );
}

export default ProgressBar;
