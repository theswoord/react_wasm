import React from 'react';
import progressbar from './assets/progress80.png';
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';
import MiddleScene from './components/pixitest';
import wip from './assets/WIP.png';
import Girl from './components/girl';

// No more './middlecss.css' import!

function Navwebserv() {
  return (
    <PageGridLayout backgroundTitle="About Me">

            <div className=" col-span-3 row-start-1 z-20 col-start-1 flex items-center justify-center">
        <p className='text-3xl text-black text-mono'>
          Work still in progress we will Have a Webserver here !
        </p>

      </div>
                <div className="col-span-3 row-span-1 col-start-1 row-start-2 z-0 flex items-center justify-center pointer-events-none">
          <MiddleScene type={3} />
        </div>

              <div className="col-start-1 row-start-3 col-span-1  flex items-end justify-center">
       <Girl character={"nabil"}></Girl>
      </div>
      <div className="row-start-3 col-start-3 col-span-1  flex items-end justify-center">
       <Girl character={"khatr"}></Girl>
      </div>
            <div className="row-start-3 col-start-2 col-span-1  flex items-end justify-center">
       <Girl character={"mbouderr"}></Girl>
      </div>

          <div className="col-start-2 row-start-1 flex items-start justify-center">
        <ProgressBar percent={80} />
      </div>
    </PageGridLayout>
  );
}

export default Navwebserv;