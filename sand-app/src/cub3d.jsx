import React, { useRef, useEffect, useState } from 'react';
import gameModule from './game/cub.js';
import wasmUrl from './game/cub.wasm?url';
import dataUrl from './game/cub.data?url';
import movement from './assets/movementcube.png'
import { useNavigate } from 'react-router-dom';
import Go from './components/go';
import './cube3d.css'



// --- Helper Functions to Parse and Build the Map ---
const availableTextures = [
    './assets/studio1.png',
    './assets/studio2.png',
    './assets/studio4.png',
    './assets/studio5.png',
    './assets/brick.png',
    './assets/tree2.png',
    './assets/studio0.png',
    './assets/studio3.png',
    './assets/SO.png',
    './assets/NO.png',

    // Add any other texture filenames here
];



const DEFAULT_MAP_TEMPLATE = `NO ./assets/studio1.png
SO ./assets/studio2.png
WE ./assets/studio4.png
EA ./assets/studio5.png
F 0,0,0
C 0,0,0

11111111111111
10000000000001
10000001000001
10000000000001
1001000N000101
10000000000001
10000000000001
10000001000001
10000000000001
11111111111111`;

// Parses the full .cub file content into structured objects
const parseMapData = (mapContent) => {
    const lines = mapContent.split('\n');
    const textures = { NO: '', SO: '', WE: '', EA: '' };
    const colors = { F: '', C: '' };
    let mapGridLines = [];
    let mapSectionStarted = false;

    lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (Object.keys(textures).includes(parts[0])) {
            textures[parts[0]] = parts[1] || '';
        } else if (Object.keys(colors).includes(parts[0])) {
            colors[parts[0]] = parts[1] || '';
        } else if (line.trim().length > 0 && (line.includes('1') || line.includes('0'))) {
            mapSectionStarted = true;
            mapGridLines.push(line);
        }
    });

    return { textures, colors, mapGrid: mapGridLines.join('\n') };
};

// Builds the .cub file content from the structured state
const buildMapData = (textures, colors, mapGrid) => {
    return `NO ${textures.NO}
SO ${textures.SO}
WE ${textures.WE}
EA ${textures.EA}
F ${colors.F}
C ${colors.C}

${mapGrid}`;
};


function Cub3D() {
      const navigate = useNavigate();
    const canvasRef = useRef(null);
    const moduleRef = useRef(null);

    // State for each part of the map template
    const [textures, setTextures] = useState({ NO: '', SO: '', WE: '', EA: '' });
    const [colors, setColors] = useState({ F: '', C: '' });
    const [mapGrid, setMapGrid] = useState('');

    // --- Module Initialization and File System Handling ---
    useEffect(() => {
        // Load map from localStorage or use default template
        const savedMap = localStorage.getItem('customCub3dMap') || DEFAULT_MAP_TEMPLATE;
        const parsedData = parseMapData(savedMap);
        setTextures(parsedData.textures);
        setColors(parsedData.colors);
        setMapGrid(parsedData.mapGrid);

        const moduleConfig = {
            canvas: canvasRef.current,
            locateFile: (path, prefix) => {
                if (path.endsWith('.wasm')) return wasmUrl;
                if (path.endsWith('.data')) return dataUrl;
                return prefix + path;
            },
        };

        gameModule(moduleConfig).then(instance => {
            moduleRef.current = instance;
            const mapData = localStorage.getItem('customCub3dMap');
            if (mapData) {
                try {
                    if (!instance.FS.analyzePath('/assets').exists) {
                        instance.FS.mkdir('/assets');
                    }
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
                console.log('Calling instance._cleanup() from JS...');
                instance._cleanup();
            }
            if (instance && typeof instance.exit === 'function') {
                try {
                    instance.exit();
                } catch (e) {
                    // exit() can sometimes throw an error if the runtime is already dead
                    console.warn("Error during module exit:", e);
                }
            }
        };
    }, []);

    // --- UI Interaction Handlers ---

    const handleFocus = () => {
        // Tell the C module that the UI is focused
        moduleRef.current?.ccall('set_ui_focus', null, ['number'], [1]);
    };

    const handleBlur = () => {
        // Tell the C module that the UI is no longer focused
        moduleRef.current?.ccall('set_ui_focus', null, ['number'], [0]);
    };

    const handleSave = () => {
        const fullMapData = buildMapData(textures, colors, mapGrid);
        try {
            localStorage.setItem('customCub3dMap', fullMapData);
            // alert('Map saved! Reload the page to see your changes.');
            location.reload();
        } catch (e) {
            alert('Failed to save map.');
        }
    };
    const ResetMap = () => {
        const fullMapData = buildMapData(textures, colors, mapGrid);
        try {
            // localStorage.setItem('customCub3dMap', fullMapData);
            localStorage.removeItem('customCub3dMap');
            location.reload();

            // alert('Block.cub Is back to it\'s original state');
        } catch (e) {
            alert('Failed to Delete Map.');
        }
    };
    const ExportFile = () => {
        const fullMapData = buildMapData(textures, colors, mapGrid);
        console.log(fullMapData);
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([fullMapData], { type: 'text/cub' }));
        a.download = 'Map.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // try {
        //    console.log(fullMapData.JsonParse)
        //     alert('Block.cub Is back to it\'s original state');
        // } catch (e) {
        //     alert('Failed to Delete Map.');
        // }
    };

        const handlePrevious = () => {

      navigate(-1);
  };
        return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-slate-300 font-sans p-4 gap-4">
                            <div 
            className="fixed top-8 left-8 z-50 cursor-pointer" 
            onClick={handlePrevious}
          >
            <Go direction={"left"} />
          </div>
            {/* Title and How to Play Section */}
            <div className="text-center group relative">
                <h1 className="text-5xl font-bold text-white tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Cub3D
                </h1>
                <h4 className="text-cyan-400 cursor-pointer mt-1">how to play?</h4>
                
                {/* Hidden "How to Play" content */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max p-6 bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
                    <h1 className="text-xl font-bold text-white mb-2">How to Play / Comment jouer</h1>
                    <p className="font-bold text-cyan-300 mt-4">Turning / Tourner</p>
                    <ul className="list-disc list-inside text-slate-300">
                        <li><strong>Right arrow / flèche droite</strong> → : Turn Right / Tourner à droite</li>
                        <li><strong>Left arrow / flèche gauche</strong> ← : Turn Left / Tourner à gauche</li>
                    </ul>
                     <p className="font-bold text-cyan-300 mt-4">Movement</p>
                    <ul className="list-disc list-inside text-slate-300">
                        <li><strong>W / Z : </strong> Advance / avance</li>
                        <li><strong>S : </strong>Backward / Recule</li>
                        <li><strong>A / Q : </strong> Strafe Left / déplacer à gauche</li>
                        <li><strong>D : </strong>Strafe right / déplacer à droite</li>
                    </ul>
                </div>
            </div>

            {/* Game and Editor Container */}
            <div className="flex flex-col md:flex-row items-start gap-8">
                <canvas ref={canvasRef} id="canvas" width="800" height="600" tabIndex="0" className="border-2 border-slate-600 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"></canvas>
                
                {/* Map Editor */}
                <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm text-slate-300">
                    <h3 className="text-2xl font-bold mb-4 text-white">Custom Map Editor</h3>
                    
                    <h4 className="text-xl font-semibold mt-4 mb-2 text-cyan-300">Textures</h4>
                    <div className="space-y-2">
                        {Object.keys(textures).map(key => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="font-mono font-bold">{key}:</label>
                                <select
                                    value={textures[key]}
                                    onChange={(e) => setTextures({ ...textures, [key]: e.target.value })}
                                    onFocus={handleFocus} onBlur={handleBlur}
                                    className="bg-slate-700 border border-slate-600 rounded-md p-1 w-2/3 text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    <option value="">--Select a Texture--</option>
                                    {availableTextures.map(textureFile => (
                                        <option key={textureFile} value={textureFile}>{textureFile.split('/').pop()}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <h4 className="text-xl font-semibold mt-4 mb-2 text-cyan-300">Colors (R,G,B)</h4>
                    <div className="space-y-2">
                        {Object.keys(colors).map(key => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="font-bold">{key === 'F' ? 'Floor' : 'Ceiling'}:</label>
                                <input
                                    type="text" value={colors[key]}
                                    onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                                    onFocus={handleFocus} onBlur={handleBlur}
                                    className="bg-slate-700 border border-slate-600 rounded-md p-1 w-2/3 text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        ))}
                    </div>

                    <h4 className="text-xl font-semibold mt-4 mb-2 text-cyan-300">Map Grid</h4>
                    <textarea
                        rows="8"
                        value={mapGrid}
                        onChange={(e) => setMapGrid(e.target.value)}
                        onFocus={handleFocus} onBlur={handleBlur}
                        className="bg-slate-900 border border-slate-600 rounded-md p-2 w-full font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    ></textarea>

                    <div className="flex justify-between mt-4 gap-2">
                         <button onClick={handleSave} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Save & Reload
                        </button>
                        <button onClick={ResetMap} className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Reset
                        </button>
                        <button onClick={ExportFile} className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Export Map
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cub3D;

// ​chofe Media Queries f css