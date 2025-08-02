import React from 'react';
import progressbar from './assets/progress20.png'
import './middlecss.css'


function Navhome() {
  return (
    <div>
      <h2>Aspiring dev learning new things !</h2>
              <div className='navbar'>
            <img src={progressbar} alt="almost" />
          </div>
    </div>
  );
}

export default Navhome;