import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import reactLogo from './assets/react.svg'

import './Homepage.css'

import controllerImage from './assets/sandgame500.png';
//when you click on picture element kaytrecho hhhh start game

function HomePage() {
  return (
    <div className="home-page-container"> 
      <h2>Home Page</h2>
      <Link to="/First" className="controller-link"> 
        <img
          src={controllerImage}
          alt="Go to First Page"
          className="controller-button"
        />
      </Link>
      <Link to="/Second" style={{ marginLeft: '10px' }}>
        <button>Go to Second Page</button>
      </Link>
    </div>
  );
}


export default HomePage;