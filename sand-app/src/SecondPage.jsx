import React from 'react';
import Cub3D from './cub3d';
import './Secondpage.css'

function SecondPage() {
  return (
    <div className="main-page-container">
      <Cub3D gameName="game1" />
    </div>
  );
}

export default SecondPage;