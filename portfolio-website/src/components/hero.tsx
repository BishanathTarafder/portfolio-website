'use client';

import Link from 'next/link';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1 className="opacity-0">Hi, my name is</h1>
        
        <h2 className="name opacity-0">
          Bishanath Tarafder
        </h2>
        
        <h3 className="tagline opacity-0">
          I make ideas & things alive.
        </h3>
        
        <p className="opacity-0">
          I'm a software engineer, I possess strong problem-solving skills and specialize in crafting exceptional digital experiences. 
          My current area of focus is in the javascript ecosystem, where I actively engage in developing and designing immersive full stack applications. 
          This involves working with Backend and Frontend of Web & Mobile Applications.
        </p>
        
        <div className="hero-buttons opacity-0">
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
            className="btn"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="btn btn-outline"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}