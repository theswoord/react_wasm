import React from 'react';
import { Link } from 'react-router-dom'; 
import cub3dcontroller from './assets/cub3d500.png';
import progressbar from './assets/progress60.png'
import './middlecss.css'


function Navcub() {
  return (
    <div>
      {/* <h2>This is the NAVcub3d Component! 🏖️</h2> */}
      <Link to="/Second" className="cub3d-link" style={{ marginLeft: '10px' }}>
        {/* <h2>Cub3D</h2> */}
        <img
          src={cub3dcontroller}
          alt="Go to First Page"
          className="cub3d-button"
        />
      </Link>
              <div className='navbar'>
            <img src={progressbar} alt="almost" />
          </div>
    </div>
  );
}

export default Navcub;