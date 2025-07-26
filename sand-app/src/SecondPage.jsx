import React from 'react';
import Cub3D from './cub3d';
import './Secondpage.css'

function SecondPage() {
  return (
    <div className="main-page-container">
      <h1>Cub3D</h1>
      <h4 className="hover-trigger-text">how to play ?</h4>


      <div class="movement-hidden">
        <h1>How to Play / Comment jouer </h1>
        <ul>Turning / Tourner</ul>
        <li><strong>Right arrow / fleche droite</strong> → :  Turn Right / Tourner a droite</li>
        <li><strong>Left arrow / fleche gauche</strong> ← :  Turn Left / Tourner a gauche</li>
        <ul>Movement</ul>
        <li><strong>W / Z : </strong> Advance / avance</li>
        <li><strong>S : </strong>Backward / Recule</li>
        <li><strong>A / Q : </strong> Strafe Left / déplacer à gauche</li>
        <li><strong>D : </strong>Strafe right / déplacer à droite</li>
      </div>

      <Cub3D gameName="game1" />
    </div>
  );
}

export default SecondPage;