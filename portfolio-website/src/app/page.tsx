'use client';
import { Hero } from '@/components/hero';
import { FeaturedProjects } from '@/components/featured-projects';
import { Skills } from '@/components/skills';
import { ContactCTA } from '@/components/contact-cta';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ErrorBoundary } from '@/components/error-boundary';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

// Import content from other pages
import { GithubIcon, LinkedInIcon, TwitterIcon, KaggleIcon } from '@/components/icons';
import socialStyles from '@/components/SocialIcon.module.css';
import contactStyles from '@/components/ContactButton.module.css';

export default function HomePage() {
  useEffect(() => {
    // Helper function to animate elements
    const animateElement = (element: Element, animation: string, delay: number) => {
      if (!element) return; // Skip if element doesn't exist
      
      // Mark this element as being animated to prevent duplicate animations
      if (element.getAttribute('data-animating') === 'true') return;
      element.setAttribute('data-animating', 'true');
      
      setTimeout(() => {
        element.classList.add(animation);
        element.classList.remove('opacity-0');
        
        // After animation completes, ensure element remains visible
        setTimeout(() => {
          if (element.classList.contains('opacity-0')) {
            element.classList.remove('opacity-0');
          }
          element.setAttribute('data-animated', 'true');
        }, 700); // Animation duration + buffer
      }, delay);
    };

    // Create an observer with options - using a moderate threshold for better visibility
    const observerOptions = {
      root: null, // viewport is the root
      rootMargin: '0px', // No margin
      threshold: 0.3 // trigger when at least 30% of the element is visible
    };

    // Track which elements have already been animated
    const animatedElements = new Set();

    // Find all elements with opacity-0 class to observe individually
    const elementsToObserve = document.querySelectorAll('.opacity-0');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only animate elements that haven't been animated yet and are intersecting
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          animatedElements.add(entry.target);
          
          // Determine delay based on siblings with same parent
          const parent = entry.target.parentElement;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('.opacity-0'));
            const index = siblings.indexOf(entry.target as Element);
            
            // Use longer delays for non-hero sections
            const isHeroSection = parent.closest('.hero') !== null || entry.target.closest('.hero') !== null;
            const baseDelay = isHeroSection ? 200 : 300; // Longer base delay for non-hero sections
            const delay = index > -1 ? index * baseDelay : 0;
            
            // Animate the element
            animateElement(entry.target, 'fadeInUp', delay);
          } else {
            // If no parent or siblings, just animate with no delay
            animateElement(entry.target, 'fadeInUp', 0);
          }
        }
      });
    }, observerOptions);
    
    // Observe each element individually
    elementsToObserve.forEach(element => {
      // Skip elements that have already been animated
      if (element.getAttribute('data-animated') !== 'true') {
        observer.observe(element);
      }
    });
    
    // Cleanup function to disconnect observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <main className="flex-grow pt-16">
        <ErrorBoundary>
          {/* Hero Section */}
          <Hero />
      
      {/* About Section */}
      <section id="about" className="py-24 bg-black about">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <h2 
            className="flex items-center font-mono text-AAsecondary text-2xl mb-8 opacity-0"
          >
            <span className="text-AAsecondary mr-2">01.</span> About Me
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 text-white opacity-0">

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p>
                  Hello! I&apos;m Saidul, a software engineer who enjoys creating things that live on the internet. 
                  My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — 
                  turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
                </p>
                
                <p>
                  Fast-forward to today, and I&apos;ve had the privilege of working at an advertising agency, a start-up, 
                  a huge corporation, and a student-led design studio. My main focus these days is building accessible, 
                  inclusive products and digital experiences at Upstatement for a variety of clients.
                </p>
                
                <p>
                  I also recently launched a course that covers everything you need to build a web app with the 
                  Spotify API using Node & React.
                </p>

                <p>
                  Here are a few technologies I&apos;ve been working with recently:
                </p>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-AAsecondary">▹</span>
                      <span>JavaScript (ES6+)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-AAsecondary">▹</span>
                      <span>React</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-AAsecondary">▹</span>
                      <span>Node.js</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-AAsecondary">▹</span>
                      <span>TypeScript</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-AAsecondary">▹</span>
                      <span>Next.js</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-AAsecondary">▹</span>
                      <span>Tailwind CSS</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1 flex justify-center opacity-0">
              <div className="relative group w-64 h-64">
                <div className="absolute inset-0 border-2 border-AAsecondary rounded translate-x-5 translate-y-5 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-AAprimary/50 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                <div className="relative w-64 h-64 bg-gray-700 rounded overflow-hidden">
                  <Image 
                    src="/profile-image.jpg" 
                    alt="Saidul Mursalin Khan" 
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Projects Section */}
      <section id="projects" className="py-24 bg-black projects">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <h2 className="flex items-center font-mono text-AAsecondary text-2xl mb-12 opacity-0">
            <span className="text-AAsecondary mr-2">02.</span> Some Things I&apos;ve Built
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </h2>
          
          <FeaturedProjects />
        </div>
      </section>
      
      {/* Skills Section */}
      <Skills />
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black contact">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <h2 className="flex items-center font-mono text-[#6049ea] text-2xl mb-12 justify-center opacity-0">
            <span className="text-[#6049ea] mr-2">03.</span> Get In Touch
          </h2>
          
          <div className="max-w-2xl mx-auto text-center mb-12 opacity-0">
            <p className="text-white mb-8">
              I&apos;m currently looking for new opportunities. Whether you have a question, project proposal, or just want to say hi, 
              my inbox is always open. I&apos;ll do my best to get back to you as soon as possible!
            </p>
            
            <div className="flex justify-center">
              <Link 
                href="mailto:saidulmursalinkhan@gmail.com" 
                className={contactStyles.contactButton}
                data-testid="home-contact-button"
              >
                Say Hello
              </Link>
            </div>
          </div>
          
          <div className={socialStyles.socialIconContainer}>
            <Link href="https://github.com/Saidul-M-Khan" target="_blank" rel="noreferrer" data-testid="home-social-github">
              <GithubIcon className={socialStyles.socialIcon} />
            </Link>
            <Link href="https://linkedin.com/in/saidul-m-khan" target="_blank" rel="noreferrer" data-testid="home-social-linkedin">
              <LinkedInIcon className={socialStyles.socialIcon} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer" data-testid="home-social-twitter">
              <TwitterIcon className={socialStyles.socialIcon} />
            </Link>
            <Link href="https://kaggle.com" target="_blank" rel="noreferrer" data-testid="home-social-kaggle">
              <KaggleIcon className={socialStyles.socialIcon} />
            </Link>
          </div>
        </div>
      </section>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}