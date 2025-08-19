import React from 'react';
import { Link } from 'react-router-dom';
import cub3dcontroller from './assets/cub3d500.png';
import PageGridLayout from './tools/TestGrid';
import ProgressBar from './components/ProgressBar';
import MiddleScene from './components/pixitest';
function Navcub() {
  return (
    <PageGridLayout>
      {/* <div className='col-span-3 row-start-2 col-start-2'>
        <div className='absolute inset-0 flex items-center justify-center p-4'> Added padding for spacing */}
                <div className="col-span-3 row-span-2 col-start-1 row-start-1 z-0 flex items-center justify-center pointer-events-none">
          <MiddleScene type={2} />
        </div>
        <div className="col-span-1 col-start-3 row-start-2 z-10 flex items-center justify-center">
          
          <Link to="/Second" className="transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 rounded-lg">
            <img
              src={cub3dcontroller}
              alt="Play Cub3D"
              // These classes make the image fit its container
              className="w-full h-auto object-contain max-h-[40vh]" // Constrained height
            />
          </Link>
        </div>

        {/* </div>
      </div> */}
      <div className="col-start-2 row-start-3 flex items-center justify-center px-2">
        <ProgressBar percent={60} />
      </div>
    </PageGridLayout>
  );
}

export default Navcub;