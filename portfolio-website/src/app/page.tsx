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
import { GithubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '@/components/icons';

export default function HomePage() {
  useEffect(() => {
    // Helper function to animate elements
    const animateElement = (element: Element, animation: string, delay: number = 0) => {
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

    // Create an observer with options
    const observerOptions = {
      root: null, // viewport is the root
      rootMargin: '-200px', // Only trigger when element is 200px into the viewport
      threshold: 0.8 // trigger when at least 80% of the element is visible
    };

    // Track which elements have already been animated
    const animatedElements = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only animate elements that haven't been animated yet
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          animatedElements.add(entry.target);
          
          // First, make the section itself visible
          entry.target.classList.remove('opacity-0');
          entry.target.classList.add('fadeInUp');
          
          // Hero section animations are handled by CSS
          
          // Projects section animations
          if (entry.target.id === 'projects' || entry.target.classList.contains('projects')) {
            const title = entry.target.querySelector('.section-title h2');
            const subtitle = entry.target.querySelector('.section-title p');
            const cards = entry.target.querySelectorAll('.project-card');
            
            if (title) animateElement(title, 'fadeInUp', 0);
            if (subtitle) animateElement(subtitle, 'fadeInUp', 200);
            
            cards.forEach((card, index) => {
              animateElement(card, 'fadeInUp', 300 + (index * 200));
            });
          }
          
          // About section animations
          else if (entry.target.id === 'about' || entry.target.classList.contains('about')) {
            const title = entry.target.querySelector('h2');
            const paragraphs = entry.target.querySelectorAll('p');
            const skills = entry.target.querySelector('.skills');
            
            if (title) animateElement(title, 'fadeInUp', 0);
            
            paragraphs.forEach((p, index) => {
              animateElement(p, 'fadeInUp', 200 + (index * 100));
            });
            
            if (skills) animateElement(skills, 'fadeInUp', 500);
          }
          
          // Contact section animations
          else if (entry.target.id === 'contact' || entry.target.classList.contains('contact')) {
            const title = entry.target.querySelector('.section-title h2');
            const subtitle = entry.target.querySelector('.section-title p');
            const form = entry.target.querySelector('form');
            const info = entry.target.querySelector('.contact-info');
            
            if (title) animateElement(title, 'fadeInUp', 0);
            if (subtitle) animateElement(subtitle, 'fadeInUp', 200);
            if (info) animateElement(info, 'fadeInUp', 300);
            if (form) animateElement(form, 'fadeInUp', 400);
          }
          
          // Make all opacity-0 elements within this section visible
          entry.target.querySelectorAll('.opacity-0').forEach(element => {
            animateElement(element, 'fadeInUp', 100);
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      // Initially hide all sections except hero
      if (section.id !== 'hero' && !section.classList.contains('hero')) {
        section.classList.add('opacity-0');
      }
      observer.observe(section);
    });
    
    // Make sure all sections and their children become visible even if animation fails
    setTimeout(() => {
      document.querySelectorAll('.opacity-0').forEach(element => {
        element.classList.remove('opacity-0');
        element.classList.add('fadeInUp');
      });
    }, 3000); // Fallback after 3 seconds
    
    // Additional safety check after page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelectorAll('.opacity-0').forEach(element => {
          element.classList.remove('opacity-0');
          element.classList.add('fadeInUp');
        });
      }, 1000);
    });

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
      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900 about">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <h2 
            className="flex items-center font-mono text-AAsecondary text-2xl mb-8 opacity-0"
          >
            <span className="text-AAsecondary mr-2">01.</span> About Me
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 text-gray-400 opacity-0">

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
      
      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <h2 
            className="flex items-center font-mono text-AAsecondary text-2xl mb-12 opacity-0"
          >
            <span className="text-AAsecondary mr-2">02.</span> Experience
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </h2>
          
          <div className="mb-12 opacity-0">
            <div className="bg-gray-800/50 rounded-md border border-gray-700 p-8 mb-12">
              <div className="mb-8">
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Work Experience</h3>
                  
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">Senior AI Engineer</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">TechCorp Inc.</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2021 - Present</span>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                      <li>Led the development of computer vision algorithms for autonomous systems</li>
                      <li>Designed and implemented deep learning models for real-time object detection</li>
                      <li>Optimized ML pipelines for production environments, reducing inference time by 40%</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">Machine Learning Engineer</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">AI Solutions Ltd</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2019 - 2021</span>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                      <li>Developed NLP models for sentiment analysis and text classification</li>
                      <li>Built recommendation systems using collaborative filtering techniques</li>
                      <li>Collaborated with cross-functional teams to integrate ML solutions into production systems</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-AAsecondary font-mono">Education</h3>
                  
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">M.S. in Computer Science</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">Stanford University</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2018 - 2020</span>
                      </div>
                    </div>
                    <p className="text-gray-400">Specialization in Artificial Intelligence • GPA: 3.9/4.0</p>
                  </div>
                  
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-200">B.S. in Computer Engineering</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-AAsecondary">MIT</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">2014 - 2018</span>
                      </div>
                    </div>
                    <p className="text-gray-400">Minor in Mathematics • Magna Cum Laude • GPA: 3.8/4.0</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link 
                  href="/resume.pdf" 
                  target="_blank"
                  rel="noreferrer"
                  className="border border-AAsecondary text-AAsecondary px-5 py-3 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900 projects">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <h2 className="flex items-center font-mono text-AAsecondary text-2xl mb-12 opacity-0">
            <span className="text-AAsecondary mr-2">03.</span> Some Things I&apos;ve Built
            <div className="h-[1px] bg-gray-600 ml-6 w-32 md:w-96"></div>
          </h2>
          
          <FeaturedProjects />
        </div>
      </section>
      
      {/* Skills Section */}
      <Skills />
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900 contact">
        <div className="container mx-auto px-4 md:px-16 lg:px-32">
          <h2 className="flex items-center font-mono text-AAsecondary text-2xl mb-12 justify-center opacity-0">
            <span className="text-AAsecondary mr-2">04.</span> Get In Touch
          </h2>
          
          <div className="max-w-2xl mx-auto text-center mb-12 opacity-0">
            <p className="text-gray-400 mb-8">
              I&apos;m currently looking for new opportunities. Whether you have a question, project proposal, or just want to say hi, 
              my inbox is always open. I&apos;ll do my best to get back to you as soon as possible!
            </p>
            
            <div className="flex justify-center">
              <Link 
                href="mailto:saidulmursalinkhan@gmail.com" 
                className="border border-AAsecondary text-AAsecondary px-8 py-4 rounded hover:bg-AAsecondary hover:bg-opacity-10 transition duration-300 font-mono text-lg"
              >
                Say Hello
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center space-x-8 mt-12 opacity-0">
            <Link href="https://github.com/Saidul-M-Khan" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <GithubIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://linkedin.com/in/saidul-m-khan" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <LinkedInIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <TwitterIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-transform duration-200 hover:-translate-y-1">
              <InstagramIcon className="w-6 h-6 hover:text-AAsecondary transition-colors duration-200" />
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