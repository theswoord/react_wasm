import React from 'react';
import { Link } from 'react-router-dom'; 
import controllerImage from './assets/sandgame500.png';
import progressbar from './assets/progress40.png'
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';

import './middlecss.css'

// import Navsand from './navsand';

function Navsand() {
  return (
<PageGridLayout backgroundTitle="About Me" bgcolore='#0000FF'>
    <div className=" col-span-3 row-start-1  col-start-1 bg-[#cbbd93] flex items-center justify-center">
    <p className='text-3xl text-black text-mono'>
      Play Sand game click Below
    </p>

    </div>
    <div className="col-span-1 row-start-2  col-start-2">
      {/* <h2>This is the SandNAV Component! 🏖️</h2> */}
      <div className='absolute inset-0 flex items-center justify-center'>

      <Link to="/First" className="controller-link">
        {/* <h2>the Sand Game</h2> */}
        <img
          src={controllerImage}
          alt="Go to First Page"
          className="controller-button"
            // className="max-w-lg w-full rounded-lg shadow-2xl" 

        />
      </Link>
      </div>
    </div>
          <div className="col-start-2 row-start-3 flex items-center justify-center px-2">
        <ProgressBar percent={40} />
      </div>
          </PageGridLayout>
  );
}

export default Navsand;