import React, { useRef, useEffect } from "react";
import * as PIXI from 'pixi.js';
import dinoTextureSrc from '/src/assets/dino/dino.png';
import dinoTextureSrc1 from '/src/assets/dino/dino1.png';
import dinoTextureSrc2 from '/src/assets/dino/dino2.png';

import groundTextureSrc from '/src/assets/ground.png';
// NEW: Import obstacle textures
import treeTextureSrc from '/src/assets/tree.png';
import rockTextureSrc from '/src/assets/rock.png';

const Dino = () => {
    const pixiContainer = useRef(null);
    const app = useRef(null);

    useEffect(() => {
        const setup = async () => {
            if (!pixiContainer.current) return;

            app.current = new PIXI.Application();
            await app.current.init({
                resizeTo: pixiContainer.current,
                backgroundColor: 0x87CEEB,
                backgroundAlpha: 1,
                autoDensity: true,
            });

            pixiContainer.current.appendChild(app.current.canvas);

            // --- Load All Textures ---
                    const girlImages = [dinoTextureSrc,dinoTextureSrc1,dinoTextureSrc2];
                    const texturesdino = await Promise.all(
                        girlImages.map(img => PIXI.Assets.load(img))
                    );

            const textures = await PIXI.Assets.load([
                // dinoTextureSrc,
                groundTextureSrc,
                treeTextureSrc,
                rockTextureSrc
            ]);
                    const animatedSprite = new PIXI.AnimatedSprite(texturesdino);
            
            // const dinoTexture = textures[dinoTextureSrc];
            const groundTexture = textures[groundTextureSrc];
            const obstacleTextures = [textures[treeTextureSrc], textures[rockTextureSrc]];

            // --- Create Scrolling Ground ---
            const groundHeight = 32;
            const ground = new PIXI.TilingSprite({
                texture: groundTexture,
                width: app.current.screen.width,
                height: groundHeight,
            });
            ground.y = app.current.screen.height - ground.height;
            app.current.stage.addChild(ground);

            // --- Create Dino ---
            // const dino = new PIXI.Sprite(dinoTexture);
            animatedSprite.anchor.set(0.5);
            animatedSprite.scale.set(0.2);
            animatedSprite.x = app.current.screen.width / 4;
            animatedSprite.y = ground.y - (animatedSprite.height / 2) + 10;
            animatedSprite.animationSpeed = 0.1;

            app.current.stage.addChild(animatedSprite);
            animatedSprite.play();

            // --- Obstacle Management ---
            const obstacles = [];
            const obstacleContainer = new PIXI.Container();
            app.current.stage.addChild(obstacleContainer);

            let spawnTimer = 0;
            let spawnInterval = 50; // Spawn every 150 frames (adjust for frequency)

            // --- Animation Loop ---
            app.current.ticker.add((delta) => {
                // Scroll the ground
                ground.tilePosition.x -= 3 * delta.deltaTime;

                // --- Handle Obstacle Spawning ---
                spawnTimer += delta.deltaTime;
                if (spawnTimer > spawnInterval) {
                    // Create a new obstacle
                    const randomTexture = obstacleTextures[Math.floor(Math.random() * obstacleTextures.length)];
                    const obstacle = new PIXI.Sprite(randomTexture);
                    obstacle.anchor.set(0.5);
                    obstacle.scale.set(0.5); // Adjust scale

                    // Start it off-screen to the right
                    obstacle.x = app.current.screen.width + obstacle.width;
                    obstacle.y = ground.y - (obstacle.height / 2) + 10;

                    obstacleContainer.addChild(obstacle);
                    obstacles.push(obstacle);

                    // Reset timer with some randomness for variation
                    spawnTimer = 0;
                    spawnInterval = 120 + Math.random() * 100;
                }

                // --- Move and Despawn Obstacles ---
                for (let i = obstacles.length - 1; i >= 0; i--) {
                    const obstacle = obstacles[i];
                    obstacle.x -= 3 * delta.deltaTime;

                    // If obstacle is off-screen to the left, remove it
                    if (obstacle.x < -obstacle.width) {
                        obstacleContainer.removeChild(obstacle);
                        obstacles.splice(i, 1);
                        obstacle.destroy(); // Free up memory
                    }
                }
            });
        };

        setup();

        return () => {
            if (app.current) {
                app.current.destroy(true, { children: true, texture: true, baseTexture: true });
                app.current = null;
            }
        };
    }, []);

    return (
        <div ref={pixiContainer} className="w-full h-full overflow-hidden" />
    );
};

export default Dino;