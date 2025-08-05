import React from 'react';
import progressbar from './assets/progress80.png';
import wip from './assets/WIP.png';
// No more './middlecss.css' import!

function Navwebserv() {
  return (
    // Use flexbox for centering content vertically and in a column.
    <div className="flex flex-col items-center justify-center text-center gap-y-6">
      
      <h2 className="text-2xl md:text-3xl font-light text-orange-200">
        Work in progress, will be implemented shortly!
      </h2>
      
      {/* - `max-w-md` keeps the image from being too large.
        - `w-full` makes it responsive within that max-width.
        - `my-4` adds vertical margin.
      */}
      <img src={wip} alt="Work in progress" className="max-w-md w-full my-4" />
      
      {/* Centering the progress bar */}
      <div className="w-full max-w-md flex justify-center mt-4">
        <img src={progressbar} alt="Progress: 80%" className="h-8 object-contain" />
      </div>

    </div>
  );
}

export default Navwebserv;