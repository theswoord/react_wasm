import React from 'react';
import progressbar20 from '../assets/progress20.png';
import progressbar40 from '../assets/progress40.png';
import progressbar60 from '../assets/progress60.png';
import progressbar80 from '../assets/progress80.png';
import progressbar100 from '../assets/progress100.png';


// The progress bar component
function ProgressBar({percent = 0}) {
    let chosenbar = 0;
    const bars = [progressbar20,progressbar40,progressbar60,progressbar80,progressbar100]
    if(percent == 20)
    {
        chosenbar = bars[0];

    }
        if(percent == 40)
    {
        chosenbar = bars[1];

    }
            if(percent == 60)
    {
        chosenbar = bars[2];

    }
            if(percent == 80)
    {
        chosenbar = bars[3];

    }
            if(percent == 100)
    {
        chosenbar = bars[4];

    }


  return (
    // <div className="w-full h-10 bg-white border border-gray-400 rounded-md flex items-center p-1">
    //   <div className="w-[20%] h-full bg-blue-500 rounded-sm"></div>
    //   <span className="ml-2 text-gray-500 text-sm">progress bar</span>
    // </div>
    <img src={chosenbar} alt="" />
  );
}
export default ProgressBar;




// import React from 'react';
// import progressbar20 from '../assets/progress20.png';
// import progressbar40 from '../assets/progress40.png';
// import progressbar60 from '../assets/progress60.png';
// import progressbar80 from '../assets/progress80.png';
// import progressbar100 from '../assets/progress100.png';

// // Define the steps for the progress bar in a single, easy-to-manage array.
// // We list them from highest to lowest threshold.
// const progressSteps = [
//   { threshold: 100, image: progressbar100 },
//   { threshold: 80,  image: progressbar80 },
//   { threshold: 60,  image: progressbar60 },
//   { threshold: 40,  image: progressbar40 },
//   { threshold: 20,  image: progressbar20 },
// ];

// function ProgressBar({ percent = 0 }) {
//   // Find the correct image to display.
//   // The `.find()` method iterates through our steps and returns the FIRST one that matches the condition.
//   // Since we sorted from high to low, the first step we find where `percent` is greater than or
//   // equal to the threshold will be the correct one.
//   const activeStep = progressSteps.find(step => percent >= step.threshold);

//   // If a step is found, use its image. Otherwise, don't render anything.
//   const imageToShow = activeStep ? activeStep.image : null;

//   // We only render the image if a valid one was found.
//   // This prevents showing a broken image if the percentage is less than 20.
//   if (!imageToShow) {
//     return null; // Or return a default "0%" state image if you have one.
//   }
  
//   return (
//     // You can add styling to the image container if needed
//     <div className="flex justify-center items-center">
//         <img 
//             src={imageToShow} 
//             alt={`Progress bar at ${percent}%`} 
//             className="h-8 object-contain" // Example styling for consistent height
//         />
//     </div>
//   );
// }

// export default ProgressBar;