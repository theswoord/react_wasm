import React from 'react';
import WasmGame from './WasmGame';

function FirstPage() {
  return (
    <div>
      <h1>First Game 🎮</h1>
      <WasmGame gameName="game1" />
    </div>
  );
}

export default FirstPage;