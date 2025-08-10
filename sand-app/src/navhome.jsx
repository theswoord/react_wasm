import React from 'react';
import progressbar from './assets/progress20.png'
import './middlecss.css'
import Pixicomponent from './components/pixitest'
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';
import controllerImage from './assets/sandgame500.png';
import CloudScene from './components/CloudScene';
import Girl from './components/girl'
import SpeechBubble from "./components/SpeechBubble";
import ProfileCard from "./components/ProfileCard";
import myPhoto from "./assets/nbouhali.jpg";


function Navhome() {

  
  return(
   <PageGridLayout backgroundTitle="About Me">
      <div className="col-span-3 row-start-1 col-start-1 z-0">
        <CloudScene />
      </div>
        <div className="col-span-1 row-start-1 col-start-1 z-10 flex items-center justify-center pointer-events-none" >
        <ProfileCard
  imageSrc={myPhoto}
  title="Nabil Bouhali"
  bubbleBackground="#e0f7fa"
  bubbleBorder="#00acc1"
  bubbleTextColor="#004d40"
        />
        </div>
        <div className="z-10 col-span-2 col-start-2 row-start-1 flex items-center justify-center pointer-events-none">
       <SpeechBubble
  text="Junior IT Architect | Problem Solver. Motivated by coffee and a drive to build from the ground up, I love tackling new challenges."
  backgroundColor="#fef3c7"   // light yellow
  borderColor="#f59e0b"       // amber
  textColor="#78350f"         // dark brown
  borderRadius="24px"
  tailPosition="left"
/>
       </div>
      <div className="col-span-3 row-start-2 col-start-1 z-0">
          <Pixicomponent />
        </div>
      <div className="col-span-3 row-start-2 col-start-1 z-10 flex items-center justify-center pointer-events-none">
                <p className=" text-black text-6xl font-bold drop-shadow-lg">
            anchof mandir hnaya
          this is a running dino
          </p>
      </div>
        {/* <div className="inset-0 flex items-center justify-center">
          <p className="text-black text-6xl font-bold drop-shadow-lg">
          </p>
        
      </div> */}
      <div className="row-start-3 col-start-1 col-span-1 flex ">
       <Girl ></Girl>
      </div>
      <div className="col-start-3 row-start-3 col-span-1 flex ">
       <Girl ></Girl>
      </div>

      <div className="col-start-2 row-start-3 flex items-end justify-center">
        <ProgressBar percent={20} />
      </div>

    </PageGridLayout>
  );
}

export default Navhome;
// import React from 'react';
// import progressbar from './assets/progress20.png'
// import './middlecss.css'
// import Pixicomponent from './components/pixitest'
// import PageGridLayout from './tools/TestGrid'
// import ProgressBar from './components/ProgressBar';
// import controllerImage from './assets/sandgame500.png';
// import CloudScene from './components/CloudScene';
// import Girl from './components/girl'


// function Navhome() {

  
//   return(
//    <PageGridLayout backgroundTitle="About Me">
//       <div className="col-span-3 row-start-1 z-0 relative">
//         <CloudScene />
//       </div>

//         <div className="absolute z-10 col-span-2 col-start-2 row-start-1 flex items-center justify-center pointer-events-none">
//           <p className=" text-black text-6xl font-bold drop-shadow-lg">
//             This is the SKY hhhhhhh
//           </p>
//         </div>
//       <div className="col-span-3 row-start-2 relative">

//         <div className="w-full h-full">
//           <Pixicomponent />
//         </div>

//         <div className="absolute inset-0 flex items-center justify-center">
//           <p className="absolute text-black text-6xl font-bold drop-shadow-lg">
//             this is a running dino
//           </p>
//         </div>
        
//       </div>
//       <div className="relative row-start-3 flex ">
//        <Girl ></Girl>
//       </div>
//       <div className="relative col-start-3 row-start-3 flex ">
//        <Girl ></Girl>
//       </div>

//       <div className="col-start-2 row-start-3 flex items-end justify-center">
//         <ProgressBar percent={20} />
//       </div>

//     </PageGridLayout>
//   );
// }

// export default Navhome;


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


// import React from 'react';
// import progressbar from './assets/progress20.png'
// import './middlecss.css'
// import Pixicomponent from './components/pixitest'
// import PageGridLayout from './tools/TestGrid'
// import ProgressBar from './components/ProgressBar';
// import controllerImage from './assets/sandgame500.png';
// import CloudScene from './components/CloudScene';
// import Girl from './components/girl'


// function Navhome() {

  
//   return(
//    <PageGridLayout backgroundTitle="About Me">
//       <div className="col-span-3 row-start-1 col-start-1 z-0">
//         <CloudScene />
//       </div>
//         <div className="col-span-1 row-start-1 col-start-1 z-10 flex items-center justify-center pointer-events-none" >
//           <p className=" text-black text-6xl font-bold drop-shadow-lg">
//             hnaya andir tswira
//           </p>
//         </div>
//         <div className="z-10 col-span-2 col-start-2 row-start-1 flex items-center justify-center pointer-events-none">
//           <p className=" text-black text-6xl font-bold drop-shadow-lg">
//             hnaya anktb in a bubble
//           </p>
//         </div>
//       <div className="col-span-3 row-start-2">

//         <div className="w-full h-full">
//           <Pixicomponent />
//         </div>

//         <div className="inset-0 flex items-center justify-center">
//           <p className="text-black text-6xl font-bold drop-shadow-lg">
//             this is a running dino
//           </p>
//         </div>
        
//       </div>
//       <div className=" row-start-3 flex ">
//        <Girl ></Girl>
//       </div>
//       <div className="col-start-3 row-start-3 flex ">
//        <Girl ></Girl>
//       </div>

//       <div className="col-start-2 row-start-3 flex items-end justify-center">
//         <ProgressBar percent={20} />
//       </div>

//     </PageGridLayout>
//   );
// }

// export default Navhome;