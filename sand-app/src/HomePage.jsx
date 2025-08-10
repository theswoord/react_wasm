// src/HomePage.jsx
import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLocation, useNavigate } from 'react-router-dom';

// Import your section components
import Navcub from './navcub';
import Navsand from './navsand';
import Navwebserv from './navwebserv';
import Navcontact from './navcontact';
import Navhome from './navhome';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Section Data
const sections = [
  { id: 'welcome', path: '/', title: 'About Me', Component: Navhome, bgColor: 'bg-teal-900' },
  { id: 'sand', path: '/navsand', title: 'Sand Game', Component: Navsand, bgColor: 'bg-purple-900' },
  { id: 'cub3d', path: '/navcub', title: 'Cub3D', Component: Navcub, bgColor: 'bg-gray-800' },
  { id: 'webserv', path: '/navwebserv', title: 'webserv', Component: Navwebserv, bgColor: 'bg-orange-500' },
  { id: 'contact', path: '/navcontact', title: 'Contact', Component: Navcontact, bgColor: 'bg-teal-900' },
];

export default function HomePage() {
  const mainContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const horizontalScrollTween = useRef(null);
  const isNavigatingProgrammatically = useRef(false);
  const lastRouteChangeTime = useRef(0);

  // Initialize current section based on URL
  useEffect(() => {
    const sectionIndex = sections.findIndex(sec => sec.path === location.pathname);
    setCurrentSectionIndex(sectionIndex >= 0 ? sectionIndex : 0);
  }, []);

  // GSAP Animation Setup
  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");
      
      // FIX 1: Use directional snapping
      horizontalScrollTween.current = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: mainContainerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: (value) => {
              // Calculate section index based on scroll position
              const sectionIndex = Math.round(value * (panels.length - 1));
              return sectionIndex / (panels.length - 1);
            },
            duration: { min: 0.2, max: 1.2 },
            delay: 0.2
          },
          end: () => "+=3000",
          onSnapComplete: (self) => {
            if (isNavigatingProgrammatically.current) return;
            
            // FIX 2: Only update URL when snap completes
            const newSectionIndex = Math.round(self.progress * (panels.length - 1));
            console.log(`Snapped to Section: ${newSectionIndex}`);
            setCurrentSectionIndex(newSectionIndex);
            navigate(sections[newSectionIndex].path, { replace: true });
          }
        }
      });
    }, mainContainerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle URL Changes
  useEffect(() => {
    const targetSectionIndex = sections.findIndex(sec => sec.path === location.pathname);
    const validSectionIndex = targetSectionIndex >= 0 ? targetSectionIndex : 0;
    
    if (validSectionIndex !== currentSectionIndex) {
      console.log(`URL changed to: ${location.pathname}, scrolling to section ${validSectionIndex}`);
      
      setCurrentSectionIndex(validSectionIndex);
      isNavigatingProgrammatically.current = true;
      lastRouteChangeTime.current = Date.now();
      
      setTimeout(() => {
        const scrollTriggerInstance = horizontalScrollTween.current?.scrollTrigger;
        if (scrollTriggerInstance) {
          // FIX 3: Use precise section-based scrolling
          const targetProgress = validSectionIndex / (sections.length - 1);
          
          gsap.to(window, {
            scrollTo: {
              y: scrollTriggerInstance.start + 
                 (scrollTriggerInstance.end - scrollTriggerInstance.start) * targetProgress
            },
            duration: 1.2,
            ease: 'power2.inOut',
            onComplete: () => {
              setTimeout(() => {
                isNavigatingProgrammatically.current = false;
              }, 300);
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
      {/* Debug info */}
      <div className="fixed top-4 left-4 z-50 bg-black bg-opacity-70 text-white p-2 rounded text-sm">
        Current: {sections[currentSectionIndex]?.path} ({sections[currentSectionIndex]?.title})
      </div>
      
      <div className={`h-screen w-[${sections.length * 100}vw] flex`}>
        {sections.map(({ id, Component, bgColor }) => (
          <section
            key={id}
            className={`panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative ${bgColor}`}
          >
            <Component />
          </section>
        ))}
      </div>
    </div>
  );
}