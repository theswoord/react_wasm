import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// --- Helper Components ---

// A simple arrow SVG to indicate scrolling
const ScrollDownIndicator = () => (
  <svg
    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 h-8 text-white animate-bounce"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

// A placeholder for your portfolio sections
const PortfolioSection = ({ title, bgColor, children }) => (
  <section
    className={`w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center text-white text-center p-8 ${bgColor}`}
  >
    <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-4">
      {title}
    </h2>
    <div className="max-w-2xl">{children}</div>
  </section>
);


// --- Main App Component ---

export default function App() {
  const mainContainerRef = useRef(null);
  const horizontalScrollerRef = useRef(null);

  useLayoutEffect(() => {
    // This is where the magic happens!
    // We use a GSAP context to ensure all animations are properly cleaned up
    // when the component unmounts.
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray("section");
      
      // We're pinning the main container and animating the horizontal scroller
      // based on the user's vertical scroll.
      let horizontalScroll = gsap.to(horizontalScrollerRef.current, {
        x: () => -(horizontalScrollerRef.current.scrollWidth - window.innerWidth),
        ease: 'none', // No easing for a direct 1:1 scroll feel
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'top top',
          end: () => `+=${horizontalScrollerRef.current.scrollWidth - window.innerWidth}`,
          scrub: 1, // Smoothly scrubs the animation
          pin: true, // Pins the container during the scroll
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // --- Optional: Animate elements within each section as they come into view ---
      sections.forEach((section) => {
        const heading = section.querySelector('h2');
        const content = section.querySelector('div');

        gsap.from([heading, content], {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            containerAnimation: horizontalScroll, // Link to the horizontal scroll animation
            start: 'left center', // When the left edge of the section hits the center
            toggleActions: 'play reverse play reverse',
          },
        });
      });

    }, mainContainerRef); // Scope the context to the main container

    // Cleanup function to revert all GSAP animations and ScrollTriggers
    return () => ctx.revert();
  }, []);

  return (
    // The main container that will be pinned
    <div ref={mainContainerRef} className="overflow-hidden">
        {/* This div holds all the horizontal sections and is the one we move with GSAP */}
        <div
            ref={horizontalScrollerRef}
            className="w-max h-screen flex" // w-max is key to allow it to be wider than the screen
        >
            {/* --- Your Portfolio Sections --- */}
            
            <PortfolioSection title="Welcome" bgColor="bg-slate-900">
                <p className="text-xl">
                    This is a starter template for a horizontal scrolling portfolio. 
                    Scroll down to begin the journey.
                </p>
                <ScrollDownIndicator />
            </PortfolioSection>

            <PortfolioSection title="About Me" bgColor="bg-indigo-900">
                <p className="text-lg">
                    Based on your sketch, this could be your intro section.
                    You can introduce yourself and your passion for development here.
                    The background of this section is where you could add a cool, subtle PixiJS animation.
                </p>
            </PortfolioSection>

            <PortfolioSection title="Projects" bgColor="bg-purple-900">
                 <p className="text-lg">
                    This section could showcase your work. You can create a component for a single project
                    and map over your project data to display them here. Each project could have its own
                    interactive GSAP animation on hover or as it scrolls into view.
                </p>
            </PortfolioSection>

            <PortfolioSection title="Sandbox" bgColor="bg-teal-900">
                <p className="text-lg">
                    Your sketch mentioned a "Sandbox". This is a great idea!
                    Use this space to show off interactive experiments with PixiJS, GSAP, or other libraries.
                    It's a perfect way to demonstrate your skills.
                </p>
            </PortfolioSection>

            <PortfolioSection title="Contact" bgColor="bg-gray-800">
                <p className="text-lg">
                    And finally, a place for people to get in touch.
                    You've reached the end of the horizontal scroll!
                </p>
            </PortfolioSection>
        </div>
    </div>
  );
}
