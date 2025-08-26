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


// ... (image imports remain the same)

const Go = ({ direction }) => {
    const pixiContainer = useRef(null);
    const app = useRef(null);
    const currentTextures = useRef([]);
    const isMounted = useRef(true);
    const animatedSprite = useRef(null);

    useEffect(() => {
        isMounted.current = true;

        const setup = async () => {
            if (!pixiContainer.current) return;
            
            // Clean up any existing application
            if (app.current) {
                try {
                    if (animatedSprite.current) {
                        animatedSprite.current.stop();
                        app.current.stage.removeChild(animatedSprite.current);
                        animatedSprite.current.destroy();
                        animatedSprite.current = null;
                    }
                    
                    if (pixiContainer.current && app.current.canvas) {
                        pixiContainer.current.removeChild(app.current.canvas);
                    }
                    
                    app.current.destroy(true);
                    app.current = null;
                } catch (error) {
                    console.warn("Error during cleanup:", error);
                }
                
                // Unload previous textures
                if (currentTextures.current.length > 0) {
                    currentTextures.current.forEach(texture => {
                        PIXI.Assets.unload(texture);
                    });
                    currentTextures.current = [];
                }
            }

            const spriteWidth = 96;
            const spriteHeight = 96;

            try {
                // Initialize the PixiJS Application
                app.current = new PIXI.Application();
                await app.current.init({
                    width: spriteWidth,
                    height: spriteHeight,
                    backgroundAlpha: 0,
                    autoDensity: true,
                });

                if (!isMounted.current) {
                    app.current.destroy(true);
                    app.current = null;
                    return;
                }

                pixiContainer.current.appendChild(app.current.canvas);

                // Load textures
                const leftImages = [Left1, Left2, Left3, Left4, Left5, Left6, Left7];
                const rightImages = [Right1, Right2, Right3, Right4, Right5, Right6, Right7];
                const imagesToUse = direction === 'left' ? leftImages : rightImages;

                const textures = await Promise.all(
                    imagesToUse.map(img => PIXI.Assets.load(img))
                );

                if (!isMounted.current) {
                    textures.forEach(texture => PIXI.Assets.unload(texture));
                    app.current.destroy(true);
                    app.current = null;
                    return;
                }

                currentTextures.current = textures;

                // Create the animated sprite
                animatedSprite.current = new PIXI.AnimatedSprite(textures);
                animatedSprite.current.anchor.set(0.5);
                animatedSprite.current.x = app.current.screen.width / 2;
                animatedSprite.current.y = app.current.screen.height / 2;
                animatedSprite.current.animationSpeed = 0.15;
                animatedSprite.current.scale.set(2.5);
                animatedSprite.current.play();

                app.current.stage.addChild(animatedSprite.current);
            } catch (error) {
                console.error("Error setting up PixiJS:", error);
                if (app.current) {
                    app.current.destroy(true);
                    app.current = null;
                }
            }
        };

        setup();

        return () => {
            isMounted.current = false;
            
            // Clean up resources
            if (animatedSprite.current) {
                animatedSprite.current.stop();
                if (app.current && app.current.stage) {
                    app.current.stage.removeChild(animatedSprite.current);
                }
                animatedSprite.current.destroy();
                animatedSprite.current = null;
            }

            if (app.current) {
                try {
                    if (pixiContainer.current && app.current.canvas) {
                        pixiContainer.current.removeChild(app.current.canvas);
                    }
                    app.current.destroy(true);
                    app.current = null;
                } catch (error) {
                    console.warn("Error destroying app:", error);
                }
            }

            // Unload textures
            // if (currentTextures.current.length > 0) {
            //     currentTextures.current.forEach(texture => {
            //         PIXI.Assets.unload(texture);
            //     });
            //     currentTextures.current = [];
            // }
        };
    }, [direction]);

    return (
        <div>
            <div ref={pixiContainer} />
        </div>
    );
};

export default Go;