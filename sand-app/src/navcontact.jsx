import React from 'react';
import progressbar from './assets/progress100.png'
import './middlecss.css'
import Pixicomponent from './components/pixitest'
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';



function Navcontact() {
  return (
    <PageGridLayout backgroundTitle="About Me">

    <div className = "col-span-1 row-start-2 col-start-2 relative bg-red-200" >
      <h2>This is the CONTACT Component! 🏖️</h2>
           <Pixicomponent />
    </div>
              <div className="col-start-2 row-start-3 flex items-end justify-center">
        <ProgressBar percent={100} />
      </div>
  </PageGridLayout>
  );
}

export default Navcontact;





