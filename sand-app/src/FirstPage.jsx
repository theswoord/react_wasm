import React from 'react';
import WasmGame from './WasmGame';
import './FirstPage.css'; // Import a CSS file for styling


function FirstPage() {
  return (
    <div>
      <h1>
        The Sand Game
        <span className="spoiler"> + secret reactions</span>
      </h1>
      <WasmGame gameName="game1" />
    </div>
  );
}

export default FirstPage;