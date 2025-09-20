import React from 'react';
import { Link } from 'react-router-dom';
import progressbar from './assets/progress80.png';
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';
import MiddleScene from './components/pixitest';
import wip from './assets/WIP.png';
import Girl from './components/girl';
import cub3dcontroller from './assets/cone.png';



// No more './middlecss.css' import!

function Navwebserv() {
  return (
    <PageGridLayout backgroundTitle="About Me">

      <div className=" col-span-3 row-start-1 z-20 col-start-1 flex items-center justify-center">
        <p className='text-3xl text-black text-mono text-gray-100'>
          press the giant cone in order to test the webserver
        </p>

      </div>
      <Link to="/webserv" className="col-span-1 row-span-1 col-start-2 row-start-2 z-10 flex items-center justify-center">
        <img
          src={cub3dcontroller}
          alt="Play Cub3D"
          // These classes make the image fit its container
          className="w-full h-auto object-contain max-h-[40vh]" // Constrained height
        />
                  </Link>

        <div className="col-start-1 row-start-3 col-span-1  flex items-end justify-center">
          <Girl character={"nabil"}></Girl>
        </div>
        <div className="row-start-3 col-start-3 col-span-1  flex items-end justify-center">
          <Girl character={"khatr"}></Girl>
        </div>
        <div className="row-start-3 col-start-2 col-span-1  flex items-end justify-center">
          <Girl character={"mbouderr"}></Girl>
        </div>

    </PageGridLayout>
  );
}

export default Navwebserv;