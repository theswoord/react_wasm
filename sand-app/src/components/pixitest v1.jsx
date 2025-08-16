// src/components/Dino.js

import React, { useRef, useEffect, useState } from "react";
import * as PIXI from 'pixi.js';
import groundTextureSrc from '/src/assets/ground.png';
import treeTextureSrc from '/src/assets/tree.png';
import rockTextureSrc from '/src/assets/rock.png';
import Dinosaur from '/src/components/dino'; 
import greybrickground from '/src/assets/groundbrick.png';
import sandground from '/src/assets/sandground.png';
//---------SAND THEME -------------
import cactus from '/src/assets/cactus.png';
import tumble1 from '/src/assets/tumbleweed/tumble1.png';
import tumble2 from '/src/assets/tumbleweed/tumble2.png';
import tumble3 from '/src/assets/tumbleweed/tumble3.png';
import tumble4 from '/src/assets/tumbleweed/tumble4.png';


const HOMEPAGE = 0;
const SANDGAME = 1;
const CUB3D = 2;
const WEBSERV = 3;
const CONTACT = 4;


const Dino = ({ type = 0 }) => {
    const pixiContainer = useRef(null);
    const [pixiApp, setPixiApp] = useState(null);
    const [groundObject, setGroundObject] = useState(null);
    const appRef = useRef(null);

    const [dinoPosition, setDinoPosition] = useState(6); 

    useEffect(() => {
        const setup = async () => {
            if (!pixiContainer.current) return;

            if (appRef.current) {
                appRef.current.destroy(true);
            }
            const app = new PIXI.Application();
            appRef.current = app; 
            await app.init({
                resizeTo: pixiContainer.current,
                backgroundColor: 0x87CEEB, 
                autoDensity: true,
            });

            pixiContainer.current.appendChild(app.canvas);
            let textures;
            let groundSrcToUse;
            let h;
            if (type == HOMEPAGE) {
                groundSrcToUse = groundTextureSrc;
                h=32;
                setDinoPosition(6);
            }
            if (type == SANDGAME) {
                groundSrcToUse = sandground;
                h=32;
                setDinoPosition(4);

            }
                        if (type == CUB3D) {
                groundSrcToUse = greybrickground;
                h=32;
                setDinoPosition(2);
            }

            textures = await PIXI.Assets.load([
                groundSrcToUse,
                treeTextureSrc,
                rockTextureSrc
            ]);
            const groundTexture = textures[groundSrcToUse];
            const obstacleTextures = [textures[treeTextureSrc], textures[rockTextureSrc]];

            const ground = new PIXI.TilingSprite({
                texture: groundTexture,
                width: app.screen.width,
                height: h,
            });
            ground.y = app.screen.height - ground.height;
            app.stage.addChild(ground);


            setPixiApp(app);
            setGroundObject(ground);

            const obstacles = [];
            const obstacleContainer = new PIXI.Container();
            app.stage.addChild(obstacleContainer);

            let spawnTimer = 0;
            let spawnInterval = 120; 

            app.ticker.add((ticker) => {
                ground.tilePosition.x -= 3 * ticker.deltaTime;

                spawnTimer += ticker.deltaTime;
                if (spawnTimer > spawnInterval) {
                    const randomTexture = obstacleTextures[Math.floor(Math.random() * obstacleTextures.length)];
                    const obstacle = new PIXI.Sprite(randomTexture);
                    obstacle.anchor.set(0.5);
                    obstacle.scale.set(0.5);
                    obstacle.x = app.screen.width + obstacle.width;
                    obstacle.y = ground.y - (obstacle.height / 2) + 10;
                    obstacleContainer.addChild(obstacle);
                    obstacles.push(obstacle);

                    spawnTimer = 0;
                    spawnInterval = 120 + Math.random() * 100; 
                }

                for (let i = obstacles.length - 1; i >= 0; i--) {
                    const obstacle = obstacles[i];
                    obstacle.x -= 3 * ticker.deltaTime;

                    if (obstacle.x < -obstacle.width) {
                        obstacleContainer.removeChild(obstacle);
                        obstacles.splice(i, 1);
                        obstacle.destroy();
                    }
                }
            });
        };

        setup();

        return () => {
            if (appRef.current) {
                appRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
                appRef.current = null;
            }
        };
    }, [type]);

    return (
        <div ref={pixiContainer} className="w-full h-full overflow-hidden relative">
            {pixiApp && groundObject && <Dinosaur app={pixiApp} ground={groundObject} position={dinoPosition} />}
        </div>
    );
};

export default Dino;