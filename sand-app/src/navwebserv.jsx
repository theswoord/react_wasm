import React from 'react';
import progressbar from './assets/progress80.png';
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';

import wip from './assets/WIP.png';
// No more './middlecss.css' import!

function Navwebserv() {
  return (
    <PageGridLayout backgroundTitle="About Me">
    {/* <div className='col-span-3 row-start-1 col-start-1 relative'>
    </div> */}
    <div className='col-span-1 row-start-2 col-start-2 relative'>

    <div className="flex flex-col items-center justify-center text-center gap-y-6">
      
      <h2 className="text-2xl md:text-3xl font-light text-black">
        Work in progress, will be implemented shortly!
      </h2>
      
      {/* - `max-w-md` keeps the image from being too large.
        - `w-full` makes it responsive within that max-width.
        - `my-4` adds vertical margin.
        */}
      <img src={wip} alt="Work in progress" className="max-w-md w-full my-4" />

    </div>
        </div>
          <div className="col-start-2 row-start-3 flex items-end justify-center">
        <ProgressBar percent={80} />
      </div>
    </PageGridLayout>
  );
}

export default Navwebserv;