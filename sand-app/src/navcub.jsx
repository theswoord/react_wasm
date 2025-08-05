import React from 'react';
import { Link } from 'react-router-dom'; 
import cub3dcontroller from './assets/cub3d500.png';
import progressbar from './assets/progress60.png';
// No more './middlecss.css' import!

function Navcub() {
  return (
    // Centering container
    <div className="flex flex-col items-center justify-center gap-y-8">

      {/* - We removed the inline style.
        - `transition-transform` and `hover:scale-105` create a nice hover effect.
        - `focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50` provides great accessibility for keyboard users.
      */}
      <Link to="/Second" className="transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg">
        <img
          src={cub3dcontroller}
          alt="Play Cub3D"
          // `max-w-lg` to control size, `rounded-lg` to match the focus ring.
          className="max-w-lg w-full rounded-lg shadow-2xl" 
        />
      </Link>
      
      {/* Centering the progress bar */}
      <div className="w-full max-w-md flex justify-center mt-4">
        <img src={progressbar} alt="Progress: 60%" className="h-8 object-contain" />
      </div>
      
    </div>
  );
}

export default Navcub;