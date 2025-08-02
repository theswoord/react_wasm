import React from 'react';
import progressbar from './assets/progress80.png'
import wip from './assets/WIP.png'
import './middlecss.css'


function Navwebserv() {
  return (
    <div className='navwebservcss'>
      <h2>Working in progress will be implemented shortly </h2>
      <img src={wip} alt="work in progress" className='WIP' />
        <div className='navbar'>
      <img src={progressbar} alt="almost" />
    </div>
    </div>
  );
}

export default Navwebserv;