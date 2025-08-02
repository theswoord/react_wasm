import React from 'react';
import progressbar from './assets/progress100.png'
import './middlecss.css'


function Navcontact() {
  return (
    <div>
      <h2>This is the CONTACT Component! 🏖️</h2>
              <div className='navbar'>
            <img src={progressbar} alt="almost" />
          </div>
    </div>
  );
}

export default Navcontact;