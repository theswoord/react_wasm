// src/components/Dinosaur.js

import React, { useEffect, useRef } from "react";
import * as PIXI from 'pixi.js';
import dinoTextureSrc from '/src/assets/dino/dino.png';
import dinoTextureSrc1 from '/src/assets/dino/dino1.png';
import dinoTextureSrc2 from '/src/assets/dino/dino2.png';

// This component now takes the parent's app and ground as props
const Dinosaur = ({ app, ground ,position}) => {
    const dinoSpriteRef = useRef(null);

    useEffect(() => {
        // Don't do anything if the app or ground aren't ready
        if (!app || !ground) return;

        let animatedSprite;

        const setupDino = async () => {
            // Load only the textures this component needs
            const dinoImages = [dinoTextureSrc, dinoTextureSrc1, dinoTextureSrc2];
            const texturesdino = await Promise.all(
                dinoImages.map(img => PIXI.Assets.load(img))
            );

            animatedSprite = new PIXI.AnimatedSprite(texturesdino);
            dinoSpriteRef.current = animatedSprite; // Save reference for cleanup

            animatedSprite.anchor.set(0.5);
            animatedSprite.scale.set(0.2);
            animatedSprite.animationSpeed = 0.1;

            // Position the dino relative to the screen width and the ground's Y position
            console.log(position);
            animatedSprite.x = app.screen.width / position;
            animatedSprite.y = ground.y - (animatedSprite.height / 2) + 10;

            // Add the dino to the PARENT's stage
            app.stage.addChild(animatedSprite);
            animatedSprite.play();
        };

        setupDino();

        // Cleanup function: remove the dino from the stage when the component unmounts
        return () => {
            if (app.current) {
                app.current.destroy(true, { children: true, texture: true, baseTexture: true });
                app.current = null;
            }
        };
    }, [app, ground]); // Rerun effect if app or ground props change

    // This component doesn't need to render its own div or canvas
    return null;
};

export default Dinosaur;