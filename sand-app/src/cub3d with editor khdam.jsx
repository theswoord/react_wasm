import React, { useRef, useEffect, useState } from 'react';
import gameModule from './game/cub.js';
import wasmUrl from './game/cub.wasm?url';
import dataUrl from './game/cub.data?url';

// --- Helper Functions to Parse and Build the Map ---

const DEFAULT_MAP_TEMPLATE = `NO ./assets/studio1.png
SO ./assets/studio2.png
WE ./assets/studio4.png
EA ./assets/studio5.png
F 220,100,0
C 225,30,0

1111111111
1000100001
1000100001
10N0100001
1000000001
1111111111`;

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
            alert('Map saved! Reload the page to see your changes.');
        } catch (e) {
            alert('Failed to save map.');
        }
    };
        const ResetMap = () => {
        const fullMapData = buildMapData(textures, colors, mapGrid);
        try {
            // localStorage.setItem('customCub3dMap', fullMapData);
            localStorage.removeItem('customCub3dMap');
            alert('Block.cub Is back to it\'s original state');
        } catch (e) {
            alert('Failed to Delete Map.');
        }
    };

    return (
        <div className="game-container" style={{ display: 'flex', gap: '20px' }}>
            <canvas ref={canvasRef} id="canvas" width="800" height="600" style={{ border: '1px solid black' }} tabIndex="0" ></canvas>
            
            <div className="map-editor" style={{ fontFamily: 'sans-serif' }}>
                <h3>Custom Map Editor</h3>
                
                <h4>Textures</h4>
                {Object.keys(textures).map(key => (
                    <div key={key}>
                        <label>{key}: </label>
                        <input
                            type="text"
                            value={textures[key]}
                            onChange={(e) => setTextures({ ...textures, [key]: e.target.value })}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                ))}

                <h4>Colors (R,G,B)</h4>
                {Object.keys(colors).map(key => (
                    <div key={key}>
                        <label>{key === 'F' ? 'Floor' : 'Ceiling'}: </label>
                        <input
                            type="text"
                            value={colors[key]}
                            onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                ))}

                <h4>Map Grid</h4>
                <textarea
                    rows="10"
                    cols="30"
                    value={mapGrid}
                    onChange={(e) => setMapGrid(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ fontFamily: 'monospace' }}
                ></textarea>
                <br />
                <button onClick={handleSave} style={{ marginTop: '10px' }}>
                    Save Map & Reload
                </button>
                <button onClick={ResetMap} style={{ marginTop: '10px' }}>
                    Reset and Reload
                </button>
            </div>
        </div>
    );
}

export default Cub3D;
