import React, { useRef, useEffect } from "react";
import * as PIXI from 'pixi.js';
import dinoTexture from '/src/assets/dino.png';

// Renamed to follow React component capitalization conventions
const Dino = () => {
    // Renamed for clarity
    const pixiContainer = useRef(null);
    const app = useRef(null);

    useEffect(() => {
        const setup = async () => {
            if (!pixiContainer.current) return;

            app.current = new PIXI.Application();
            await app.current.init({
                // CRITICAL: Resize the canvas to its parent container (the div)
                resizeTo: pixiContainer.current,
                backgroundColor: 0xF0F0AF, // A nice sky bl
                // backgroundColor: 0x0, // A nice sky blue color
                // ue color
                backgroundAlpha: 0,
                autoDensity: true,
            });

            pixiContainer.current.appendChild(app.current.canvas);

            const texture = await PIXI.Assets.load(dinoTexture);
            const dino = new PIXI.Sprite(texture);

            dino.anchor.set(0.5);
            dino.scale.set(0.2);
            dino.x = app.current.screen.width / 2;
            dino.y = app.current.screen.height / 2;
            app.current.stage.addChild(dino);

            // Correctly use delta.deltaTime for smooth animation
            app.current.ticker.add((delta) => {
                // dino.rotation += 0.02 * delta.deltaTime;
                dino.x += 3 * delta.deltaTime;
                if (dino.x > app.current.screen.width + dino.width / 2) {
                    dino.x = -dino.width / 2;
                }
            });
        };

        setup();

        return () => {
            // Check if the app was created before trying to destroy it
            if (app.current) {
                // No need for ticker.remove(), destroy(true) handles it all.
                app.current.destroy(true, { children: true, texture: true, baseTexture: true });
                app.current = null;
            }
        };
    }, []);

        return (
        <div 
            ref={pixiContainer} 
            className="w-full h-full rounded-2xl overflow-hidden" 
        />
    );
};

export default Dino;

// import React, { useRef, useEffect } from "react";
// import * as PIXI from 'pixi.js';
// import dinoTexture from '/src/assets/dino.png';

// // Renamed to follow React component capitalization conventions
// const Dino = () => {
//     // Renamed for clarity
//     const pixiContainer = useRef(null);
//     const app = useRef(null);

//     useEffect(() => {
//         const setup = async () => {
//             if (!pixiContainer.current) return;

//             app.current = new PIXI.Application();
//             await app.current.init({
//                 resizeTo: pixiContainer.current,
//                 // width: 800,
//                 // height: 265,
//                 backgroundColor: 0xff00ff,
//                 backgroundAlpha: 0,
//                 autoDensity: true, // Handles high-resolution screens
//             });

//             pixiContainer.current.appendChild(app.current.canvas);

//             const texture = await PIXI.Assets.load(dinoTexture);
//             const dino = new PIXI.Sprite(texture);

//             dino.anchor.set(0.5);
//             dino.x = app.current.screen.width / 2;
//             dino.y = app.current.screen.height / 2;
//             app.current.stage.addChild(dino);

//             // Correctly use delta.deltaTime for smooth animation
//             app.current.ticker.add((delta) => {
//                 // dino.rotation += 0.02 * delta.deltaTime;
//                 dino.x += 1 * delta.deltaTime;
//                 if (dino.x > app.current.screen.width + dino.width / 2) {
//                     dino.x = -dino.width / 2;
//                 }
//             });
//         };

//         setup();

//         return () => {
//             // Check if the app was created before trying to destroy it
//             if (app.current) {
//                 // No need for ticker.remove(), destroy(true) handles it all.
//                 app.current.destroy(true, { children: true, texture: true, baseTexture: true });
//                 app.current = null;
//             }
//         };
//     }, []);

//     return <div ref={pixiContainer} />;
// };

// export default Dino;