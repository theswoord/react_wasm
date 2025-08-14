// import React from 'react';

// // A simplified cell style, perfect for debugging the grid structure.
// function GridBackgroundCell() {
//   return <div className="bg-gray-200 rounded-lg border-2 border-dashed border-gray-400"></div>;
// }

// // The main layout component, modified for a full-screen, tight-gap view.
// function PageGridLayout({ children, backgroundTitle = '' }) {
//   const totalCells = 9;

//   return (
//     // MAIN WRAPPER: Fills the entire screen. No centering flexbox or large padding.
//     <div className="min-h-screen w-full bg-gray-100">

//       {/* BACKGROUND TITLE: Sits behind the grid. */}
//       {backgroundTitle && (
//         <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
//           <h1 className="text-[10vw] font-black text-gray-300/50">
//             {backgroundTitle.toUpperCase()}
//           </h1>
//         </div>
//       )}

//       {/* MAIN CONTAINER: Stretches edge-to-edge.
//           - `p-2` adds a small buffer between the grid and the screen edge.
//           - `h-screen` makes it fill the viewport height.
//       */}
//       <div className="relative z-10 w-full h-screen p-2">

//         {/* LAYER 1: The visible background grid cells.
//             - ✅ Gap is now `gap-2` for smaller spacing.
//         */}
//         <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
//           {Array.from({ length: totalCells }).map((_, index) => (
//             <GridBackgroundCell key={`bg-cell-${index}`} />
//           ))}
//         </div>

//         {/* LAYER 2: The transparent content grid where children are placed.
//             - `inset-2` aligns this grid with the parent's padding.
//             - `gap-2` matches the background grid's gap.
//         */}
//         <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-2">
//           {children}
//         </div>
            
//       </div>
//     </div>
//   );
// }

// export default PageGridLayout;

import React from 'react';

// Simplified cell with no border for a seamless grid
function GridBackgroundCell() {
  return <div className="bg-gray-200 rounded-none"></div>;
}

function PageGridLayout({ children, backgroundTitle = '' }) {
  const totalCells = 9;

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {backgroundTitle && (
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <h1 className="text-[10vw] font-black text-gray-300/50">
            {backgroundTitle.toUpperCase()}
          </h1>
        </div>
      )}

      <div className="relative z-10 w-full h-screen">
        {/* Background grid with no gaps */}
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
          {Array.from({ length: totalCells }).map((_, index) => (
            <GridBackgroundCell key={`bg-cell-${index}`} />
          ))}
        </div>

        {/* Content layer with no padding and no gap */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PageGridLayout;
