import React from 'react';
import { Link } from 'react-router-dom'; 
import controllerImage from './assets/sandgame500.png';
import progressbar from './assets/progress40.png'
import './middlecss.css'

// import Navsand from './navsand';

function Navsand() {
  return (
    <div>
      {/* <h2>This is the SandNAV Component! 🏖️</h2> */}
      <Link to="/First" className="controller-link">
        {/* <h2>the Sand Game</h2> */}
        <img
          src={controllerImage}
          alt="Go to First Page"
          className="controller-button"
        />
      </Link>
              <div className='navbar'>
            <img src={progressbar} alt="almost" />
          </div>
    </div>
  );
}

export default Navsand;