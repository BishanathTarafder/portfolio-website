'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './theme-toggle';
import { CloseIcon } from './icons';
import styles from './NavButton.module.css';

const navItems = [
  { name: 'Home', number: '00', path: '#home' },
  { name: 'About', number: '01', path: '#about' },
  { name: 'Work', number: '02', path: '#projects' },
  { name: 'Contact', number: '03', path: '#contact' },
];

export function Header() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');
  
  // Update hash on client side only
  useEffect(() => {
    setCurrentHash(window.location.hash);
    
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Function to handle smooth scrolling with easing
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    
    // Special case for home - scroll to top
    if (path === '#home') {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
      
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      return;
    }
    
    // Only apply smooth scrolling for hash links
    if (path.startsWith('#')) {
      const targetId = path.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
        
        // Get the target position with offset for header
        const headerOffset = 100; // Increased offset for better spacing
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Custom smooth scroll with improved easing
        const scrollOptions = {
          left: 0,
          top: offsetPosition,
          behavior: 'smooth' as ScrollBehavior
        };
        
        // Force style priority with !important by using scrollIntoView with custom options
        setTimeout(() => {
          window.scrollTo(scrollOptions);
          
          // Update hash after scrolling completes
          setTimeout(() => {
            window.history.pushState(null, '', path);
            setCurrentHash(path);
          }, 800);
        }, 10);
      }
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);
  
  useEffect(() => {
    // Set initial value
    lastY.current = window.scrollY;
    setAtTop(window.scrollY <= 8);
    
    const onScroll = () => {
      if (ticking.current) return;
      
      ticking.current = true;
      
      requestAnimationFrame(() => {
        const y = window.scrollY;
        
        // Update atTop state
        setAtTop(y <= 8);
        
        // Don't hide header when mobile menu is open
        if (mobileMenuOpen) {
          setHidden(false);
        }
        // Hide header when scrolling down past threshold
        else if (y > lastY.current && y > 80) {
          setHidden(true);
        } 
        // Show header when scrolling up
        else if (y < lastY.current - 4) {
          setHidden(false);
        }
        
        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileMenuOpen]);

  // Force navbar visible when mobile menu is open and handle body scroll locking
  useEffect(() => {
    if (mobileMenuOpen) {
      setHidden(false);
      // Prevent body scrolling when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scrolling when mobile menu is closed
      document.body.style.overflow = '';
    }
    
    // Cleanup function to ensure body scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  // Animation for navbar buttons
  useEffect(() => {
    // Wait for hero section animations to complete before animating navbar
    // Hero animations complete at 0.8s + 0.6s = 1.4s (last animation start + duration)
    const heroAnimationCompleteDelay = 1600; // 1.4s + 200ms buffer
    
    // Animate desktop navbar buttons after hero animations complete
    const desktopNavLinks = document.querySelectorAll('.nav-links a');
    desktopNavLinks.forEach((link, index) => {
      if (link instanceof HTMLElement && link.getAttribute('data-animated') === 'false') {
        setTimeout(() => {
          link.classList.remove('opacity-0');
          link.classList.add('fadeInUp');
          link.setAttribute('data-animated', 'true');
        }, heroAnimationCompleteDelay + (index * 100)); // Staggered delay after hero animations
      }
    });
    
    // Animate desktop resume button after hero animations complete
    const desktopResumeBtn = document.querySelector('.nav-links .btn-outline');
    if (desktopResumeBtn && desktopResumeBtn.getAttribute('data-animated') === 'false') {
      setTimeout(() => {
        desktopResumeBtn.classList.remove('opacity-0');
        desktopResumeBtn.classList.add('fadeInUp');
        desktopResumeBtn.setAttribute('data-animated', 'true');
      }, heroAnimationCompleteDelay + 600); // Appear after other nav items
    }

    // Animate mobile menu items when mobile menu opens
    if (mobileMenuOpen) {
      const mobileNavLinks = document.querySelectorAll('.flex-col.h-full a:not(.btn-outline)');
      mobileNavLinks.forEach((link, index) => {
        if (link instanceof HTMLElement && link.getAttribute('data-animated') === 'false') {
          setTimeout(() => {
            link.classList.remove('opacity-0');
            link.classList.add('fadeInUp');
            link.setAttribute('data-animated', 'true');
          }, 300 + (index * 100)); // Staggered delay for mobile menu items
        }
      });
      
      // Animate mobile resume button when mobile menu opens
      const mobileResumeBtn = document.querySelector('.mt-6.btn-outline');
      if (mobileResumeBtn && mobileResumeBtn.getAttribute('data-animated') === 'false') {
        setTimeout(() => {
          mobileResumeBtn.classList.remove('opacity-0');
          mobileResumeBtn.classList.add('fadeInUp');
          mobileResumeBtn.setAttribute('data-animated', 'true');
        }, 800); // Appear after other mobile menu items
      }
    }
  }, [mobileMenuOpen]);
  
  return (
    <header className={`
      fixed top-0 inset-x-0 z-[100] transition-all duration-300 will-change-transform
      ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
      ${atTop ? 'bg-transparent' : 'bg-opacity-70 bg-black shadow-lg'}
    `}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4">
        <div className="relative">
          <Link href="#home" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} className="logo" aria-label="Home">
            <div className="logo-circle">
              <span>BT</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="nav-links">
            {navItems.map((item, index) => (
              <Link 
                key={item.path}
                href={item.path} 
                onClick={(e) => scrollToSection(e, item.path)}
                className={`${styles.navButton} opacity-0 mr-4`}
                data-animated="false"
                data-index={index}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/resume.pdf" 
              target="_blank"
              rel="noreferrer"
              className={`${styles.navButton} ${styles.navButtonActive} opacity-0 flex items-center gap-2`}
              download
              data-animated="false"
              data-testid="nav-resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Resume
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-end p-1 focus:outline-none focus:ring-2 focus:ring-[#6049ea] rounded-lg"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6 text-[#6049ea]" />
            ) : (
              <div className="flex flex-col items-end space-y-1.5">
                <div className="w-8 h-0.5 rounded bg-[#6049ea]"></div>
                <div className="w-6 h-0.5 rounded bg-[#6049ea]"></div>
                <div className="w-4 h-0.5 rounded bg-[#6049ea]"></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
          role="button"
          tabIndex={mobileMenuOpen ? 0 : -1}
        ></div>
        <div 
          className={`absolute right-0 top-0 h-screen w-3/4 max-w-sm bg-black shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="menu"
        >
          <div className="flex flex-col h-full justify-center items-center space-y-8 py-8">
            {navItems.map((item, index) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`${styles.mobileNavButton} opacity-0`}
                data-animated="false"
                data-index={index}
                data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                onClick={(e) => {
                  scrollToSection(e, item.path);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/resume.pdf" 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => setMobileMenuOpen(false)}
              className={`${styles.navButton} ${styles.navButtonActive} mt-6 inline-flex items-center gap-2 opacity-0`}
              download
              data-animated="false"
              data-testid="mobile-nav-resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Resume</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}