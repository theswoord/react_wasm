import React, { useRef, useEffect } from 'react';
import gameModule from './game/cub.js';
import wasmUrl from './game/cub.wasm?url';
import dataUrl from './game/cub.data?url';

function Cub3D() {
  const canvasRef = useRef(null);
  const moduleRef = useRef(null);

  useEffect(() => {
    const moduleConfig = {
      canvas: canvasRef.current,

      locateFile: (path, prefix) => {
        if (path.endsWith('.wasm')) {
          return wasmUrl;
        }
        if (path.endsWith('.data')) {
          return dataUrl; 
        }
        return prefix + path;
      },
      
      print: (text) => console.log(text),
      printErr: (text) => console.error(text),
    };

    gameModule(moduleConfig).then(instance => {
      console.log('✅ Game module initialized.');
      moduleRef.current = instance;
      instance.callMain();
    });

    return () => {
      const instance = moduleRef.current;
      if (instance && typeof instance.exit === 'function') {
        try {
          instance.exit();
        } catch(e) {
          // exit() can sometimes throw an error if the runtime is already dead
          console.warn("Error during module exit:", e);
        }
      }
    };
  }, []); // Empty array ensures this runs only once.

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

export default Cub3D;