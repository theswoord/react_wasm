import React from 'react';
// import progressbar from './assets/progress100.png'; // No longer needed
import './middlecss.css';
// import Pixicomponent from './components/pixitest'; // Unused
import PageGridLayout from './tools/TestGrid';
import ProgressBar from './components/ProgressBar';
import MiddleScene from './components/pixitest';
import Girl from './components/girl';
import ContactForm from './components/ContactForm'; // 👈 Import the new component

function Navcontact() {
  return (
    <PageGridLayout backgroundTitle="Contact"> {/* Changed title for context */}

      {/* Background Animation */}
      <div className="col-span-3 row-span-1 col-start-1 row-start-2 z-0 flex items-center justify-center pointer-events-none">
        <MiddleScene type={4} />
      </div>

      {/* 👇 NEW SECTION FOR THE CONTACT FORM 👇 */}
      <div className="col-start-2 row-start-1 row-span-2 z-10 flex items-center justify-center">
        <ContactForm />
      </div>

      {/* Your existing character and progress bar */}
      <div className="col-start-1 row-start-3 col-span-1 flex items-end justify-center">
        <Girl character={"nabil"} />
      </div>
      <div className="col-start-2 row-start-3 flex items-end justify-center">
        <ProgressBar percent={100} />
      </div>
      
    </PageGridLayout>
  );
}

export default Navcontact;