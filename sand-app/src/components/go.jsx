import React, { useRef, useEffect } from "react";
import * as PIXI from 'pixi.js';

// Image imports
import Left1 from '/src/assets/left/L1.png';
import Left2 from '/src/assets/left/L2.png';
import Left3 from '/src/assets/left/L3.png';
import Left4 from '/src/assets/left/L4.png';
import Left5 from '/src/assets/left/L5.png';
import Left6 from '/src/assets/left/L6.png';
import Left7 from '/src/assets/left/L7.png';
import Right1 from '/src/assets/right/R1.png';
import Right2 from '/src/assets/right/R2.png';
import Right3 from '/src/assets/right/R3.png';
import Right4 from '/src/assets/right/R4.png';
import Right5 from '/src/assets/right/R5.png';
import Right6 from '/src/assets/right/R6.png';
import Right7 from '/src/assets/right/R7.png';

const Go = ({ direction }) => {
    const pixiContainer = useRef(null);
    const app = useRef(null);

    useEffect(() => {
        // --- This function sets up the PixiJS application ---
        const setup = async () => {
            if (!pixiContainer.current || app.current) return;

            const spriteWidth = 96 ;
            const spriteHeight = 96 ;

            // Initialize the PixiJS Application with a fixed size
            app.current = new PIXI.Application();
            await app.current.init({
                // --- REMOVED: resizeTo: pixiContainer.current ---
                width: spriteWidth,
                height: spriteHeight,
                backgroundAlpha: 0,
                autoDensity: true,
            });

            // Append the canvas to the DOM
            pixiContainer.current.appendChild(app.current.canvas);

            // --- FIX 1: Determine which image set to use based on the 'direction' prop ---
            // This is now done with a simple ternary operator for clarity.
            const leftImages = [Left1, Left2, Left3, Left4, Left5, Left6, Left7];
            const rightImages = [Right1, Right2, Right3, Right4, Right5, Right6, Right7];
            
            // Use strict equality ('===') and lowercase for the prop check.
            const imagesToUse = direction === 'left' ? leftImages : rightImages;

            // Load textures from the selected image array
            const textures = await Promise.all(
                imagesToUse.map(img => PIXI.Assets.load(img))
            );

            // Create the animated sprite
            const animatedSprite = new PIXI.AnimatedSprite(textures);
            animatedSprite.anchor.set(0.5); // Set anchor to the center
            
            // --- FIX 3: Correctly position the sprite ---
            // Position it horizontally in the center
            animatedSprite.x = app.current.screen.width / 2;
            // Position it vertically in the center. This ensures it's fully visible.
            animatedSprite.y = app.current.screen.height / 2; 

            animatedSprite.animationSpeed = 0.15; // Adjusted speed slightly
            animatedSprite.scale.set(2.5);
            animatedSprite.play();

            app.current.stage.addChild(animatedSprite);
        };

        setup();

        // --- Cleanup function to run when the component unmounts ---
        return () => {
            if (app.current) {
                app.current.destroy(true, { children: true, texture: true, baseTexture: true });
                app.current = null;
            }
        };
        // --- FIX 2: The useEffect dependency is now 'direction' ---
        // This ensures the effect re-runs ONLY when the direction prop changes,
        // which will correctly load the new set of images.
    }, [direction]);

    return (
        <div >
            <div
                ref={pixiContainer}
            />
        </div>
    );
};

export default Go;
