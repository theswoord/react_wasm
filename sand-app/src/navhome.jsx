import React from 'react';
import progressbar from './assets/progress20.png'
import './middlecss.css'
import Pixicomponent from './components/pixitest'
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';
import controllerImage from './assets/sandgame500.png';
import CloudScene from './components/CloudScene';



function Navhome() {

  
  return(
   <PageGridLayout backgroundTitle="About Me">
      <div className="col-span-3 row-start-1 relative">
        <CloudScene />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white text-6xl font-bold drop-shadow-lg">
            This is the SKY hhhhhhh
          </p>
        </div>
      </div>
 {/* --- ✅ UNIFIED MIDDLE ROW CONTAINER --- */}
      {/* This single div now controls the entire middle row. We make it `relative` to act as our anchor. */}
      <div className="col-span-3 row-start-2 relative">

        {/* LAYER 1: The Background (Pixicomponent)
            We ensure this layer fills the entire parent container.
        */}
        <div className="w-full h-full">
          <Pixicomponent />
        </div>

        {/* LAYER 2: The Foreground Overlay (controllerImage)
            This `absolute` div creates a transparent layer on top where we can place content.
        */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="absolute text-white text-6xl font-bold drop-shadow-lg">
            this is a running dino
          </p>
          {/* <img src={controllerImage} alt="Controller" className="max-w-xs w-full drop-shadow-2xl" /> */}
        </div>
        
      </div>


      {/* --- BOTTOM ROW: The Progress Bar (This part is correct) --- */}
      <div className="col-start-2 row-start-3 flex items-center justify-center px-2">
        <ProgressBar percent={20} />
      </div>

    </PageGridLayout>
  );
}

export default Navhome;


// {/* <PageGridLayout>
//       {/* --- CONTENT PLACEMENT --- */}
//       {/* You use Tailwind's grid placement utilities here */}

//       {/* Place the Sky component. It starts at column 1 and spans all 3 columns. */}
//       <div className="col-span-3 row-start-1">
//         <Sky />
//       </div>

//       {/* Place the Title. It's centered in the top row. */}
//       <div className="col-span-3 row-start-1 flex items-center justify-center">
//         <Title text="ABOUT ME" />
//       </div>

//       {/* Place the Progress Bar in cell '2' (column 2, row 3) */}
//       <div className="col-start-2 row-start-3 flex items-center justify-center px-2">
//         <ProgressBar />
//       </div>
      
//       {/* You can place other content in other cells. For example, in cell 5: */}
//       <div className="col-start-2 row-start-2 flex items-center justify-center">
//          <p className="text-gray-400">Cell 5</p>
//       </div>

//     </PageGridLayout>
//   ); */}