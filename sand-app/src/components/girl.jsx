// import React, { useRef, useEffect } from "react";
// import * as PIXI from 'pixi.js';

// // Image imports
// import girl1 from '/src/assets/girl/girl1.png';
// import girl2 from '/src/assets/girl/girl2.png';
// import girl3 from '/src/assets/girl/girl3.png';
// import girl4 from '/src/assets/girl/girl4.png';
// import girl5 from '/src/assets/girl/girl5.png';
// import girl6 from '/src/assets/girl/girl6.png';

// const Girl = () => {
//     const pixiContainer = useRef(null);
//     const app = useRef(null);

//     useEffect(() => {
//         const setup = async () => {
//             if (!pixiContainer.current || app.current) return; // Prevent re-initialization

//             // Create the Pixi application
//             app.current = new PIXI.Application();
//             await app.current.init({
//                 resizeTo: pixiContainer.current,
//                 backgroundAlpha: 0,
//                 autoDensity: true,
//             });

//             pixiContainer.current.appendChild(app.current.canvas);

//             // Array of image paths
//             const girlImages = [girl1, girl2, girl3, girl4, girl5, girl6];

//             // BEST PRACTICE: Use PIXI.Assets.load to load all textures at once
//             const textures = await Promise.all(
//                 girlImages.map(img => PIXI.Assets.load(img))
//             );

//             // Create the animated sprite
//             const animatedSprite = new PIXI.AnimatedSprite(textures);

//             // Configure the sprite
//             animatedSprite.anchor.set(0.5);
//             // animatedSprite.scale.set(0.2);
//             animatedSprite.x = app.current.screen.width / 2;
//             animatedSprite.y = app.current.screen.height - animatedSprite.height/2;

//             // FIX: Set animation speed
//             animatedSprite.animationSpeed = 0.1;

//             // Add to the stage
//             app.current.stage.addChild(animatedSprite);

//             // FIX: Start the animation
//             animatedSprite.play();
//         };

//         setup();

//         return () => {
//             // Clean up the Pixi application
//             if (app.current) {
//                 app.current.destroy(true, { children: true, texture: true, baseTexture: true });
//                 app.current = null;
//             }
//         };
//     }, []); // Empty dependency array ensures this runs only once

//     return (
//         <div
//             ref={pixiContainer}
//             className="w-full h-full rounded-2xl overflow-hidden"
//         />
//     );
// };

// export default Girl;



import React, { useRef, useEffect, useState } from "react"; // 👈 Import useState
import * as PIXI from 'pixi.js';

// Image imports (assuming they are in the same location)
import girl1 from '/src/assets/girl/girl11.png';
import girl2 from '/src/assets/girl/girl12.png';
import girl3 from '/src/assets/girl/girl13.png';
import girl4 from '/src/assets/girl/girl14.png';
import girl5 from '/src/assets/girl/girl15.png';
import girl6 from '/src/assets/girl/girl16.png';

const Girl = () => {
    const pixiContainer = useRef(null);
    const app = useRef(null);
    // 👇 State to hold the position of the bubble for the HTML overlay
    const [bubblePosition, setBubblePosition] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        visible: false,
    });

    useEffect(() => {
    const setup = async () => {
        if (!pixiContainer.current || app.current) return;

        // ... (PIXI.Application and animatedSprite setup is the same) ...
        app.current = new PIXI.Application();
        await app.current.init({
            resizeTo: pixiContainer.current,
            backgroundAlpha: 0,
            autoDensity: true,
        });

        pixiContainer.current.appendChild(app.current.canvas);

        const girlImages = [girl1, girl2, girl3, girl4, girl5, girl6];
        const textures = await Promise.all(
            girlImages.map(img => PIXI.Assets.load(img))
        );
        const animatedSprite = new PIXI.AnimatedSprite(textures);
        animatedSprite.anchor.set(0.5);
        animatedSprite.x = app.current.screen.width / 2;
        animatedSprite.y = app.current.screen.height - (animatedSprite.height / 2);
        animatedSprite.animationSpeed = 0.1;
        app.current.stage.addChild(animatedSprite);
        animatedSprite.play();


        // --- CORRECTED BUBBLE DRAWING LOGIC ---

        const dialogueContainer = new PIXI.Container();
        app.current.stage.addChild(dialogueContainer);

        const bubbleWidth = 280;
        const bubbleHeight = 60;
        const cornerRadius = 15;
        const tailHeight = 15;
        
        const bubble = new PIXI.Graphics();
        
        // 👇 Use the explicit drawing methods
        bubble.lineStyle(3, 0xDFAA8B);   // 1. Set the border style first
        bubble.beginFill(0xF2CCB7);       // 2. Begin filling with white

        // 3. Draw the shapes
        bubble.drawRoundedRect(0, 0, bubbleWidth, bubbleHeight, cornerRadius);
        bubble.moveTo((bubbleWidth / 2) - tailHeight, bubbleHeight);
        bubble.lineTo(bubbleWidth / 2, bubbleHeight + tailHeight);
        bubble.lineTo((bubbleWidth / 2) + tailHeight, bubbleHeight);
        bubble.closePath();

        bubble.endFill();                 // 4. Apply the fill to the drawn shapes
        
        dialogueContainer.addChild(bubble);

        dialogueContainer.x = animatedSprite.x - (dialogueContainer.width / 2);
        dialogueContainer.y = animatedSprite.y - animatedSprite.height / 2 - dialogueContainer.height - 10;

        setBubblePosition({
            top: dialogueContainer.y,
            left: dialogueContainer.x,
            width: bubbleWidth,
            height: bubbleHeight,
            visible: true,
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

    // 👇 The JSX is now a wrapper with two children: the canvas and the HTML overlay
    return (
        <div className="relative w-full h-full"> {/* Parent needs to be relative */}
            {/* 1. The PixiJS Canvas */}
            <div
                ref={pixiContainer}
                className="w-full h-full rounded-2xl overflow-hidden"
            />

            {/* 2. The HTML Dialogue Overlay */}
            {bubblePosition.visible && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${bubblePosition.top}px`,
                        left: `${bubblePosition.left}px`,
                        width: `${bubblePosition.width}px`,
                        height: `${bubblePosition.height}px`,
                    }}
                    // These classes center the content within the bubble area
                    className="p-2.5 flex items-center justify-center text-center pointer-events-auto"
                >
                    {/* 👇 Add any HTML content you want here! */}
                    <p className="text-base text-black">
                        I made this website's design <a href="https://www.google.com" className="text-blue-600 underline">Here is my Linkedin</a>.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Girl;