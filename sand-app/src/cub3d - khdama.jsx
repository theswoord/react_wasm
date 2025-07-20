import React, { useRef,useState, useEffect } from 'react';
import gameModule from './game/cub.js';
import wasmUrl from './game/cub.wasm?url';
import dataUrl from './game/cub.data?url';

const saveMapToLocalStorage = (mapData) => {
  try {
    localStorage.setItem('customCub3dMap', mapData);
    alert('Map saved to browser storage!');
  } catch (e) {
    console.error('Failed to save map:', e);
    alert('Could not save map. Storage might be full.');
  }
};


function Cub3D() {
  const canvasRef = useRef(null);
  const moduleRef = useRef(null);
  const [customMap, setCustomMap] = useState(localStorage.getItem('customCub3dMap') || '');


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

            const mapData = localStorage.getItem('customCub3dMap');
      if (mapData) {
        console.log('Found custom map in localStorage. Writing to VFS...');
        try {
            // Ensure the '/assets' directory exists in the virtual file system
            if (!instance.FS.analyzePath('/assets').exists) {
                instance.FS.mkdir('/assets');
            }
            // Write the map data to the file C expects to open.
            instance.FS.writeFile('assets/block.cub', mapData);
        } catch (e) {
            console.error('Failed to write custom map to VFS:', e);
        }
      }


      instance.callMain();
    });

    return () => {
      const instance = moduleRef.current;
        if (typeof instance._cleanup === 'function') {
        // console.log('Calling instance._cleanup() from JS...');
        instance._cleanup();
      }
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
      <canvas ref={canvasRef} id="canvas" width="800" height="600"></canvas>
      <div className="map-editor">
        <h3>Custom Map Editor</h3>
        <textarea
          rows="10"
          cols="50"
          value={customMap}
          onChange={(e) => setCustomMap(e.target.value)}
          placeholder="Paste your custom .cub map data here..."
        ></textarea>
        <br />
        <button onClick={() => saveMapToLocalStorage(customMap)}>
          Save Map & Reload Page
        </button>
        <p><small>After saving, reload the page to play your custom map.</small></p>
      </div>
    </div>
  );
}

export default Cub3D;