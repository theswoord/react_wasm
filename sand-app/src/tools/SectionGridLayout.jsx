import React from 'react';

// This component takes two props:
// 1. progressImage: The specific progress bar image for that section.
// 2. children: The unique content for that section (e.g., the WIP image or the Cub3D link).
function SectionGridLayout({ progressImage, children }) {
  return (
    // This is the main grid container. It defines the structure for all sections.
    // It's a 3x3 grid that takes up a good portion of the height and has some gap.
    <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[60vh] w-full max-w-4xl mx-auto">
      
      {/* AREA FOR THE MAIN CONTENT (CHILDREN)
        We place the `children` in the grid. Let's make it span the top two rows
        and all three columns so it has plenty of space.
      */}
      <div className="col-span-3 row-span-2 flex items-center justify-center p-4">
        {children}
      </div>

      {/* FIXED PROGRESS BAR
        This part is always the same. It is placed in cell "2" of our numpad layout.
        Cell "2" is Column 2, Row 3.
      */}
      <div className="col-start-2 row-start-3 flex items-center justify-center">
        {/* We use the `progressImage` prop passed from the parent */}
        {progressImage && (
          <img src={progressImage} alt="Progress" className="h-8 object-contain" />
        )}
      </div>

      {/* You could even add other fixed elements. For example, a "Back" button
          in cell "1" (Column 1, Row 3). For now, we'll leave it empty. */}
      <div className="col-start-1 row-start-3"></div>
      
      {/* Or a "Next" button in cell "3" (Column 3, Row 3) */}
      <div className="col-start-3 row-start-3"></div>

    </div>
  );
}

export default SectionGridLayout;