// src/components/Dino.js

import React, { useRef, useEffect, useState } from "react";
import * as PIXI from 'pixi.js';
// Correcting the import path to be relative
import Dinosaur from '/src/components/dino'; 

// --- Import All Assets ---
// Correcting asset paths to be relative

// Generic
import groundTextureSrc from '/src/assets/ground.png';
import treeTextureSrc from '/src/assets/tree.png';
import rockTextureSrc from '/src/assets/rock.png';

// Grey Bricks Theme
import greybrickground from '/src/assets/groundbrick.png';

// Sand Theme
import sandground from '/src/assets/sandground.png';
import sandBackgroundSrc from '/src/assets/sandbackground.png';
import cactus from '/src/assets/cactus.png';
import tumble1 from '/src/assets/tumbleweed/tumble1.png';
import tumble2 from '/src/assets/tumbleweed/tumble2.png';
import tumble3 from '/src/assets/tumbleweed/tumble3.png';
import tumble4 from '/src/assets/tumbleweed/tumble4.png';
// Cub3D Theme
import cub3dground from '/src/assets/metalground.png';
import pillar1 from '/src/assets/pillar1.png';
import pillar2 from '/src/assets/pillar2.png';
import pillar3 from '/src/assets/pillar3.png';
import grave from '/src/assets/gravestone1.png';

// Webserv Theme
import webservground from '/src/assets/workinprogressground.png';
import plaka from '/src/assets/plaka.png';
import cone from '/src/assets/cone.png';
// Contact Theme
import contactground from '/src/assets/groundbrick.png';
// import plaka from '/src/assets/plaka.png';
// import cone from '/src/assets/cone.png';

// import pillar1 from '/src/assets/pillar1.png';
// import pillar2 from '/src/assets/pillar2.png';
// import pillar3 from '/src/assets/pillar3.png';
// import grave from '/src/assets/gravestone1.png';
// --- Theme Definitions ---

const HOMEPAGE = 0;
const SANDGAME = 1;
const CUB3D = 2;
const WEBSERV = 3; // Example for future themes
const CONTACT = 4; // Example for future themes

/**
 * Configuration object for each game theme.
 * This makes it easy to add new themes without changing the main logic.
 */
const themeConfig = {
    [HOMEPAGE]: {
        ground: groundTextureSrc,
        background: null, // No background, will use solid color
        dinoPosition: 6,
        Color : 0x87CEEB,
        obstacles: [
            // Added a 'scale' property to each obstacle
            { type: 'static', texture: treeTextureSrc, scale: 0.5 },
            { type: 'static', texture: rockTextureSrc, scale: 1 }
        ]
    },
    [SANDGAME]: {
        ground: sandground,
        background: sandBackgroundSrc,
        dinoPosition: 4,
        Color : 0x000000,
        obstacles: [
            { type: 'static', texture: cactus, scale: 1.3 },
            { 
              type: 'animated', 
              textures: [tumble1, tumble2, tumble3, tumble4], 
              animationSpeed: 0.15,
              scale: 0.1 // Tumbleweed is now smaller
            }
        ]
    },
    [CUB3D]: {
        ground: cub3dground,
        background: null,
        dinoPosition: 2,
        Color : 0x818589,
        obstacles: [
            { type: 'static', texture: grave, scale: 3 },
            { type: 'static', texture: pillar1, scale: 3 }, 
            { type: 'static', texture: pillar2, scale: 3 }, 
            { type: 'static', texture: pillar3, scale: 3 }, 

        ]
    },
        [WEBSERV]: {
        ground: webservground,
        background: null,
        dinoPosition: 1.5,
        Color : 0x818589,
        obstacles: [
            { type: 'static', texture: cone, scale: 0.2 },
            { type: 'static', texture: plaka, scale: 0.3 },

            // { type: 'static', texture: pillar1, scale: 3 }, 
            // { type: 'static', texture: pillar2, scale: 3 }, 
            // { type: 'static', texture: pillar3, scale: 3 }, 

        ]
    },
            [CONTACT]: {
        ground: contactground,
        background: null,
        dinoPosition: 1.1,
        Color : 0x818589,
        obstacles: [
            { type: 'static', texture: rockTextureSrc, scale: 1 }
            // { type: 'static', texture: cone, scale: 0.2 },
            // { type: 'static', texture: plaka, scale: 0.3 },

            // { type: 'static', texture: pillar1, scale: 3 }, 
            // { type: 'static', texture: pillar2, scale: 3 }, 
            // { type: 'static', texture: pillar3, scale: 3 }, 

        ]
    }
};


const Dino = ({ type = 0 }) => {
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    const pixiContainer = useRef(null);
    const [pixiApp, setPixiApp] = useState(null);
    const [groundObject, setGroundObject] = useState(null);
    const appRef = useRef(null);
    const [dinoPosition, setDinoPosition] = useState(6); 

    useEffect(() => {
        const setup = async () => {
            if (!pixiContainer.current) return;

            // Clean up previous PIXI app if it exists
            if (appRef.current) {
                appRef.current.destroy(true);
            }
            
            const app = new PIXI.Application();
            appRef.current = app; 
            
            // Get the current theme's configuration
            const currentTheme = themeConfig[type] || themeConfig[HOMEPAGE];

            // Set the dino position based on the theme
            setDinoPosition(currentTheme.dinoPosition);

            await app.init({
                resizeTo: pixiContainer.current,
                // Use a background color only if no image is specified
                backgroundColor: currentTheme.background ? 0x000000 : currentTheme.Color, 
                autoDensity: true,
            });

            pixiContainer.current.appendChild(app.canvas);
            
            // Dynamically collect all assets needed for the current theme
            const assetsToLoad = [currentTheme.ground];
            if (currentTheme.background) {
                assetsToLoad.push(currentTheme.background);
            }
            currentTheme.obstacles.forEach(obs => {
                if (obs.type === 'static') {
                    assetsToLoad.push(obs.texture);
                } else if (obs.type === 'animated') {
                    assetsToLoad.push(...obs.textures);
                }
            });
            const uniqueAssets = [...new Set(assetsToLoad)];
            const loadedTextures = await PIXI.Assets.load(uniqueAssets);

            // --- Setup Scene ---

            // 1. Background (if it exists)
            if (currentTheme.background) {
                const backgroundSprite = new PIXI.Sprite(loadedTextures[currentTheme.background]);
                backgroundSprite.width = app.screen.width;
                backgroundSprite.height = app.screen.height;
                app.stage.addChild(backgroundSprite);
            }

            // 2. Ground
            const ground = new PIXI.TilingSprite({
                texture: loadedTextures[currentTheme.ground],
                width: app.screen.width,
                height: 32,
            });
            ground.y = app.screen.height - ground.height;
            app.stage.addChild(ground);

            // Set state to render the Dinosaur child component
            setPixiApp(app);
            setGroundObject(ground);

            // --- Obstacle Management ---
            const obstacles = [];
            const obstacleContainer = new PIXI.Container();
            app.stage.addChild(obstacleContainer);

            let spawnTimer = 0;
            let spawnInterval = 120; 
            let speede = 3

            // --- Animation Loop ---
            app.ticker.add((ticker) => {
                ground.tilePosition.x -= speede * ticker.deltaTime;

                spawnTimer += ticker.deltaTime;
                if (spawnTimer > spawnInterval) {
                    // Select a random obstacle from the CURRENT THEME's list
                    const obstacleConfig = currentTheme.obstacles[Math.floor(Math.random() * currentTheme.obstacles.length)];
                    let newObstacle;

                    // Create the correct type of sprite
                    if (obstacleConfig.type === 'static') {
                        newObstacle = new PIXI.Sprite(loadedTextures[obstacleConfig.texture]);
                    } else if (obstacleConfig.type === 'animated') {
                        const animTextures = obstacleConfig.textures.map(t => loadedTextures[t]);
                        newObstacle = new PIXI.AnimatedSprite(animTextures);
                        newObstacle.animationSpeed = obstacleConfig.animationSpeed || 0.1;
                        newObstacle.play();
                    }
                    
                    if (newObstacle) {
                        newObstacle.anchor.set(0.5);
                        // Use the scale from the config, or a default of 0.5 if not provided
                        const scale = obstacleConfig.scale || 0.5;
                        newObstacle.scale.set(scale);
                        
                        newObstacle.x = app.screen.width + newObstacle.width;
                        newObstacle.y = ground.y - (newObstacle.height / 2) + 10;
                        obstacleContainer.addChild(newObstacle);
                        obstacles.push(newObstacle);
                    }

                    spawnTimer = 0;
                    spawnInterval = 120 + Math.random() * 100; 
                }

                // Move and Despawn Obstacles
                for (let i = obstacles.length - 1; i >= 0; i--) {
                    const obstacle = obstacles[i];
                    obstacle.x -= speede * ticker.deltaTime;

                    if (obstacle.x < -obstacle.width) {
                        obstacleContainer.removeChild(obstacle);
                        obstacles.splice(i, 1);
                        obstacle.destroy();
                    }
                }
            });
        };

        setup();

        // Cleanup function
return () => {
    if (appRef.current) {
        const currentTheme = themeConfig[type] || themeConfig[HOMEPAGE];

        // Collect all assets for this theme
        const assetsToUnload = [currentTheme.ground];
        if (currentTheme.background) {
            assetsToUnload.push(currentTheme.background);
        }
        currentTheme.obstacles.forEach(obs => {
            if (obs.type === 'static') {
                assetsToUnload.push(obs.texture);
            } else if (obs.type === 'animated') {
                assetsToUnload.push(...obs.textures);
            }
        });
        const uniqueAssets = [...new Set(assetsToUnload)];

        // Unload textures from cache
        uniqueAssets.forEach(asset => {
            PIXI.Assets.unload(asset);
        });

        // Destroy the PIXI app completely
        // appRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
        appRef.current = null;
    }
};
    }, [type]); // Re-run the effect whenever the 'type' prop changes

    return (
        <div ref={pixiContainer} className="w-full h-full overflow-hidden relative">
            {pixiApp && groundObject && <Dinosaur app={pixiApp} ground={groundObject} position={dinoPosition} />}
        </div>
    );
};

export default Dino;