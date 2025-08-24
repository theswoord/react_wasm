import React, { useRef, useEffect } from 'react';
import gameModule from './game/reactgame.js';
import Go from './components/go';
import { useNavigate } from 'react-router-dom';



// You no longer need to import FirstPage.css


function WasmGame({ gameName }) {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const moduleRef = useRef(null);

  useEffect(() => {
    const Module = {
      canvas: canvasRef.current,
      print: (text) => console.log(text),
      printErr: (text) => console.error(text),
    };

    gameModule(Module).then(instance => {
      moduleRef.current = instance;
      instance.callMain();
    });

    return () => {
      const instance = moduleRef.current;
      if (typeof instance._cleanup === 'function') {
        instance._cleanup();
      }
      if (typeof instance.exit === 'function') {
        instance.exit();
      }
    };
  }, []);

    const handlePrevious = () => {

      navigate(-1);
  };

 return (
    // Main container with a warm, dark, sandy background
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-stone-900 text-amber-100 font-sans p-4 gap-6">

                <div 
            className="fixed top-8 left-8 z-50 cursor-pointer" 
            onClick={handlePrevious}
          >
            <Go direction={"left"} />
          </div>
      {/* Game Title with spoiler effect */}
      <h1 
        className="group text-5xl font-bold text-amber-200 tracking-wider cursor-default" 
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
      >
        The Sand Game
        {/* Spoiler text that appears on hover */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl text-amber-300">
          {' '}+ secret reactions
        </span>
      </h1>

      {/* This inner div groups the canvas and tutorial so they move as one block */}
      <div className="flex flex-col md:flex-row items-start gap-8">

        {/* Canvas for the game with a warm border */}
        <canvas
          ref={canvasRef}
          id="canvas"
          width="800"
          height="600"
          className="border-2 border-amber-800 rounded-lg shadow-2xl"
        ></canvas>
        
        {/* Tutorial/Commands section with a semi-transparent stone background */}
        <div className="bg-stone-800/50 p-6 rounded-lg shadow-lg w-full max-w-xs backdrop-blur-sm">
          
          <h2 className="text-2xl font-bold mb-4 text-white">Commands</h2>
          <ul className="list-none mb-6">
            <li className="flex items-baseline mb-2">
              <strong className="inline-block w-[50px] mr-3 text-amber-400 font-mono">E:</strong> Pick random
            </li>
            <li className="flex items-baseline mb-2">
              <strong className="inline-block w-[50px] mr-3 text-amber-400 font-mono">R:</strong> Spawn random
            </li>
            <li className="flex items-baseline">
              <strong className="inline-block w-[50px] mr-3 text-amber-400 font-mono">1-9:</strong> Choose Element
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-white">Elements</h2>
          <ul className="list-none">
            <li className="flex items-baseline mb-2 text-[#F2D2A9]">
              <strong className="inline-block w-[50px] mr-3 font-mono">1:</strong> Sand
            </li>
            <li className="flex items-baseline mb-2 text-stone-400">
              <strong className="inline-block w-[50px] mr-3 font-mono">2:</strong> Rock
            </li>
            <li className="flex items-baseline mb-2 text-sky-400">
              <strong className="inline-block w-[50px] mr-3 font-mono">3:</strong> Water
            </li>
            <li className="flex items-baseline mb-2 text-orange-400">
              <strong className="inline-block w-[50px] mr-3 font-mono">4:</strong> Bronze
            </li>
            <li className="flex items-baseline mb-2 text-yellow-300">
              <strong className="inline-block w-[50px] mr-3 font-mono">5:</strong> Sponge
            </li>
            <li className="flex items-baseline mb-2 text-stone-300">
              <strong className="inline-block w-[50px] mr-3 font-mono">6-0:</strong> Empty / Delete
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default WasmGame;
