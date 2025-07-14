// src/game/game.worker.js

// 1. Import the Emscripten module at the top level.
// If this fails, the browser console will show a clear error.
import gameModule from './reactgame.js';

console.log('[Worker] Script and game module imported successfully. Waiting for message...');

self.onmessage = async (e) => {
  const { canvas } = e.data;

  if (!canvas) {
    console.error('[Worker] Error: Did not receive a canvas.');
    return;
  }
  console.log('[Worker] Canvas received. Instantiating WASM...');

  try {
    const Module = {
      canvas: canvas,
      print: (text) => console.log(`[WASM stdout] ${text}`),
      printErr: (text) => console.error(`[WASM stderr] ${text}`),
    };

    // 2. The module is already imported, so we just call the factory function.
    const instance = await gameModule(Module);
    console.log('[Worker] WASM instantiated successfully.');

    instance.callMain();
    console.log('[Worker] callMain() executed. Game should be running.');

  } catch (error) {
    console.error('[Worker] CRITICAL ERROR during instantiation:', error);
  }
};