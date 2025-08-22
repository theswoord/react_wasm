import React from 'react';
import progressbar from './assets/progress100.png'
import './middlecss.css'
import Pixicomponent from './components/pixitest'
import PageGridLayout from './tools/TestGrid'
import ProgressBar from './components/ProgressBar';
import MiddleScene from './components/pixitest';
import Girl from './components/girl';





function Navcontact() {
  return (
    <PageGridLayout backgroundTitle="About Me">

                      <div className="col-span-3 row-span-1 col-start-1 row-start-2 z-0 flex items-center justify-center pointer-events-none">
          <MiddleScene type={4} />
        </div>
                      <div className="col-start-1 row-start-3 col-span-1  flex items-end justify-center">
       <Girl character={"nabil"}></Girl>
      </div>
              <div className="col-start-2 row-start-3 flex items-end justify-center">
        <ProgressBar percent={100} />
      </div>
  </PageGridLayout>
  );
}

export default Navcontact;





