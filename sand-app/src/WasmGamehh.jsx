// src/WasmGame.jsx - Restore this file

import React, { useRef, useEffect } from 'react';

function WasmGame() {
  const canvasRef = useRef(null);
  const workerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !isInitialized.current) {
      isInitialized.current = true;

      const worker = new Worker(new URL('./game/game.worker.js', import.meta.url), {
        type: 'module'
      });
      workerRef.current = worker;

      const offscreenCanvas = canvasRef.current.transferControlToOffscreen();
      
      worker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);
    }

    return () => {
      if (workerRef.current) {
        console.log('[React] Terminating worker...');
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="game-container">
      <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
    </div>
  );
}

export default WasmGame;