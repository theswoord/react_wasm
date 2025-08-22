import React, { useRef, useEffect } from "react";
import * as PIXI from 'pixi.js';
// Make sure you have a cloud image at this path
import cloudTexture from '/src/assets/cloud.png';
import cloudTexture2 from '/src/assets/cloud2.png';
import cloudTexture3 from '/src/assets/cloud3.png';


const CloudScene = () => {
    const pixiContainer = useRef(null);
    const app = useRef(null);

    useEffect(() => {
        const setup = async () => {
            // Ensure the container div exists
            if (!pixiContainer.current) return;

            // Create the Pixi Application
            app.current = new PIXI.Application();
            await app.current.init({
                // CRITICAL: Resize the canvas to its parent container (the div)
                resizeTo: pixiContainer.current,
                backgroundColor: 0x87CEEB, // A nice sky blue color
                backgroundAlpha: 1,
                autoDensity: true,
            });

            // Append the canvas to the React div
            pixiContainer.current.appendChild(app.current.canvas);

            const texture = await PIXI.Assets.load(cloudTexture);
            const texture2 = await PIXI.Assets.load(cloudTexture2);
            const texture3 = await PIXI.Assets.load(cloudTexture3);

            
            const clouds = [];
            const cloudCount = 10; // Let's create 10 clouds
            const textures =[texture,texture2,texture3];

            for (let i = 0; i < cloudCount; i++) {
                // let j = 0;
                const randomTexture = textures[Math.floor(Math.random() * textures.length)];
                const cloud = new PIXI.Sprite(randomTexture);

                // Randomize properties for a natural look
                cloud.anchor.set(0.5);
                cloud.scale.set(0.2 + Math.random() * 0.4); // Random scale
                cloud.alpha = 0.5 + Math.random() * 0.5; // Random transparency
                
                // Position them randomly to start
                cloud.x = Math.random() * app.current.screen.width;
                cloud.y = Math.random() * app.current.screen.height;

                // Give each cloud its own speed for parallax effect
                cloud.speed = 1 + Math.random() * 1.5;

                app.current.stage.addChild(cloud);
                clouds.push(cloud);
            }

            // The animation loop (ticker)
            app.current.ticker.add((delta) => {
                clouds.forEach(cloud => {
                    // Move the cloud based on its speed
                    cloud.x += cloud.speed * delta.deltaTime;

                    // If cloud goes off the right side of the screen,
                    // wrap it back to the left side with a new random Y position and scale.
                    if (cloud.x > app.current.screen.width + cloud.width) {
                        cloud.x = -cloud.width;
                        cloud.y = Math.random() * app.current.screen.height; // New random height
                        cloud.scale.set(0.2 + Math.random() * 0.4); // New random scale
                    }
                });
            });
        };

        setup();

        // Cleanup function when the component unmounts
return () => {
    if (app.current) {
        // Collect and unload all textures used in this scene
        const assetsToUnload = [cloudTexture, cloudTexture2, cloudTexture3];
        const uniqueAssets = [...new Set(assetsToUnload)];

        uniqueAssets.forEach(asset => {
            PIXI.Assets.unload(asset);
        });

        // Destroy the Pixi app completely
        app.current.destroy(true, { children: true, texture: true, baseTexture: true });
        app.current = null;
    }
};
    }, []);

    // ✅ THE FIX: The div now has w-full and h-full to fill its parent grid cell.
    // It also has `rounded-2xl` and `overflow-hidden` to match the grid aesthetic.
    return (
        <div 
            ref={pixiContainer} 
            className="w-full h-full overflow-hidden" 
        />
    );
};

export default CloudScene;