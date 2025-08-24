import React from 'react';
import { Link } from 'react-router-dom';
import cub3dcontroller from './assets/cub3d500.png';
import PageGridLayout from './tools/TestGrid';
import ProgressBar from './components/ProgressBar';
import MiddleScene from './components/pixitest';
import Girl from './components/girl';
import ScreenshotViewer from './components/ScreenshotViewer';

function Navcub() {
  return (
    <PageGridLayout>
      {/* <div className='col-span-3 row-start-2 col-start-2'>
        <div className='absolute inset-0 flex items-center justify-center p-4'> Added padding for spacing */}
                <div className="col-span-3 row-span-2 col-start-1 row-start-1 z-0 flex items-center justify-center pointer-events-none">
          <MiddleScene type={2} />
        </div>
        <div className="col-span-1 col-start-3 row-start-2 z-10 flex items-center justify-center opacity-70">
          
          <Link to="/Second" className="">
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
      <div className="col-start-1 row-start-3 col-span-1  flex items-end justify-center">
       <Girl character={"nabil"}></Girl>
      </div>
      <div className="row-start-3 col-start-3 col-span-1  flex items-end justify-center">
       <Girl character={"khatr"}></Girl>
      </div>
<div className="col-start-2 row-start-3 flex flex-col items-center justify-end px-2 gap-4">
        {/* Add the screenshot viewer here */}
        <ScreenshotViewer gameType="cub" />
        {/* Keep your progress bar */}
        <div className="w-full">
            <ProgressBar percent={60} />
        </div>
      </div>
    </PageGridLayout>
  );
}

export default Navcub;