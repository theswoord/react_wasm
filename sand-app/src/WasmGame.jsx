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
      if (typeof instance.exit === 'function') {
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
  <div className="tutorial" style={{
    // backgroundColor: 'tomato'
  }}>
    <h2>Commands</h2>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      <li><strong style={{ display: 'inline-block', minWidth: '50px' }}>E:</strong> Pick a random element</li>
      <li><strong style={{ display: 'inline-block', minWidth: '50px' }}>R:</strong> Spawn a random element</li>
      <li><strong style={{ display: 'inline-block', minWidth: '50px' }}>1-9:</strong> Choose Element</li>
    </ul>
    <h2>Elements</h2>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      <li style={{color: '#F2D2A9'}} ><strong style={{ display: 'inline-block', minWidth: '50px' }}>1:</strong> Sand</li>
      <li style={{color: '#7F8386'}} ><strong style={{ display: 'inline-block', minWidth: '50px' }}>2:</strong> Rock</li>
      <li style={{color: '#99C0E3'}} ><strong style={{ display: 'inline-block', minWidth: '50px' }}>3:</strong> Water</li>
      <li style={{color: '#FFA500'}} ><strong style={{ display: 'inline-block', minWidth: '50px' }}>4:</strong> Bronze</li>
      <li style={{color: '#FDFE03'}} ><strong style={{ display: 'inline-block', minWidth: '50px' }}>5:</strong> Sponge</li>
      <li style={{color: 'white'}} ><strong style={{ display: 'inline-block', minWidth: '50px' }}>6-0:</strong> Empty / Delete</li>
    </ul>
  </div>
</div>
  );
}

export default WasmGame;
