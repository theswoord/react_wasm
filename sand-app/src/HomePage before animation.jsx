import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import reactLogo from './assets/react.svg'

import './Homepage.css'

import controllerImage from './assets/sandgame500.png';
import cub3dcontroller from './assets/cub3d500.png';

//when you click on picture element kaytrecho hhhh start game

function HomePage() {
  return (
    <div className="home-page-container"> 

      <Link to="/First" className="controller-link"> 
            <h2>the Sand Game</h2>
        <img
          src={controllerImage}
          alt="Go to First Page"
          className="controller-button"
        />
      </Link>
      <Link to="/Second" className="cub3d-link" style={{ marginLeft: '10px' }}>
            <h2>Cub3D</h2>
          <img
          src={cub3dcontroller}
          alt="Go to First Page"
          className="cub3d-button"
        />
      </Link>
    </div>
  );
}


export default HomePage;