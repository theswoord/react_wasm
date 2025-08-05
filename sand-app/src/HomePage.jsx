// src/HomePage.jsx
import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLocation, useNavigate } from 'react-router-dom';

// Import your section components from the 'components' sub-folder
import Navcub from './navcub';
import Navsand from './navsand';
import Navwebserv from './navwebserv';
import Navcontact from './navcontact';
import Navhome from './navhome';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Section Data ---
const sections = [
  { id: 'welcome', path: '/', title: 'About Me', Component: Navhome, bgColor: 'bg-teal-900' },
  { id: 'sand', path: '/navsand', title: 'Sand Game', Component: Navsand, bgColor: 'bg-purple-900' },
  { id: 'cub3d', path: '/navcub', title: 'Cub3D', Component: Navcub, bgColor: 'bg-gray-800' },
  { id: 'webserv', path: '/navwebserv', title: 'webserv', Component: Navwebserv, bgColor: 'bg-orange-500' },
  { id: 'contact', path: '/navcontact', title: 'Contact', Component: Navcontact, bgColor: 'bg-teal-900' },
];

export default function HomePage() {
  const mainContainerRef = useRef(null);
  const horizontalScrollerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to track current section
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  // Refs to manage animation and prevent conflicts
  const horizontalScrollTween = useRef(null);
  const isNavigatingProgrammatically = useRef(false);
  const lastRouteChangeTime = useRef(0);

  // Initialize current section based on URL
  useEffect(() => {
    const sectionIndex = sections.findIndex(sec => sec.path === location.pathname);
    setCurrentSectionIndex(sectionIndex >= 0 ? sectionIndex : 0);
  }, []);

  // --- SETUP THE ANIMATION (runs only once) ---
  useLayoutEffect(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  const ctx = gsap.context(() => {
    const panels = gsap.utils.toArray(".panel");

    horizontalScrollTween.current = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: mainContainerRef.current,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.2, max: 0.8 },
          delay: 0.1
        },
        end: () => "+=3000",
        onUpdate: (self) => {
          if (isNavigatingProgrammatically.current) return;

          const newSectionIndex = Math.round(self.progress * (panels.length - 1));

          // ✅ FIX 2: Use a functional state update to access the latest state (prevIndex)
          // without needing it in the dependency array.
          setCurrentSectionIndex(prevIndex => {
            if (newSectionIndex !== prevIndex) {
              console.log(`Scroll Progress: ${self.progress.toFixed(3)}, Snapped to Section: ${newSectionIndex}`);
              navigate(sections[newSectionIndex].path, { replace: true });
              return newSectionIndex; // Return the new state
            }
            return prevIndex; // Otherwise, keep the state as is
          });
        }
      },
    });
  }, mainContainerRef);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  // --- HANDLE URL CHANGES (including direct navigation) ---
  useEffect(() => {
    const targetSectionIndex = sections.findIndex(sec => sec.path === location.pathname);
    const validSectionIndex = targetSectionIndex >= 0 ? targetSectionIndex : 0;
    
    // If URL changed but not from our scroll trigger, animate to that section
    if (validSectionIndex !== currentSectionIndex) {
      console.log(`URL changed to: ${location.pathname}, scrolling to section ${validSectionIndex}`);
      
      setCurrentSectionIndex(validSectionIndex);
      
      // Set flag to prevent scroll trigger from interfering
      isNavigatingProgrammatically.current = true;
      lastRouteChangeTime.current = Date.now();
      
      // Scroll to the target section
      setTimeout(() => {
        const scrollTriggerInstance = horizontalScrollTween.current?.scrollTrigger;
        if (scrollTriggerInstance) {
          const targetProgress = validSectionIndex / (sections.length - 1);
          const targetScroll = scrollTriggerInstance.start + 
            (scrollTriggerInstance.end - scrollTriggerInstance.start) * targetProgress;
          
          gsap.to(window, {
            scrollTo: { y: targetScroll, autoKill: false },
            duration: 1.6,
            ease: 'power2.inOut',
            onComplete: () => {
              // Reset flag after animation completes
              setTimeout(() => {
                isNavigatingProgrammatically.current = false;
              }, 1000);
            }
          });
        } else {
          isNavigatingProgrammatically.current = false;
        }
      }, 50);
    }
  }, [location.pathname, currentSectionIndex]);

 return (
  <div ref={mainContainerRef} className="h-screen w-screen overflow-hidden">
      {/* Debug info - can be removed in production */}
   <div className="fixed top-4 left-4 z-50 bg-black bg-opacity-70 text-white p-2 rounded text-sm">
    Current: {sections[currentSectionIndex]?.path} ({sections[currentSectionIndex]?.title})
   </div>
   
   <div
    className={`h-screen w-[${sections.length * 100}vw] flex`}
   >
    {sections.map(({ id, Component, bgColor }) => (
     <section
      key={id}
            // These classes will center your component by default.
            // You can override this inside your component if you need a different alignment.
      className={`panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative ${bgColor}`}
     >
            {/* ✅ CHANGE: The shared title and wrappers have been removed.
              The component now has full control over the panel.
            */}
      <Component />

     </section>
    ))}
   </div>
  </div>
 );
}