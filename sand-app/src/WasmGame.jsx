import React, { useRef, useEffect } from 'react';
import gameModule from './game/reactgame.js';

function WasmGame({ gameName }) { // gameName is now just for logging
  const canvasRef = useRef(null);
  const moduleRef = useRef(null);

  useEffect(() => {
    const Module = {
      canvas: canvasRef.current,
      print: (text) => console.log(text),
      printErr: (text) => console.error(text),
    };

    gameModule(Module).then(instance => {
      // console.log(`✅ ${gameName} module initialized.`);
      moduleRef.current = instance;
      instance.callMain();
    });

    return () => {
      // console.log(`🧹 Cleaning up ${gameName}...`);
      const instance = moduleRef.current;
      // if (instance && typeof instance.exit === 'function') {
      //   instance.exit();
      // }
       if (typeof instance._cleanup === 'function') {
        // console.log('Calling instance._cleanup() from JS...');
        instance._cleanup();
      }
      if(typeof instance.exit === 'function') {
        instance.exit();
      }
    };
  }, []);

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        id="canvas"
        width="800"
        height="600"
      ></canvas>
    </div>
  );
}

export default WasmGame;