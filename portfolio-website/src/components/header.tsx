'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './theme-toggle';
import { CloseIcon } from './icons';

const navItems = [
  { name: 'Home', number: '00', path: '#home' },
  { name: 'About', number: '01', path: '#about' },
  { name: 'Experience', number: '02', path: '#experience' },
  { name: 'Work', number: '03', path: '#projects' },
  { name: 'Contact', number: '04', path: '#contact' },
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
  
  // Function to handle smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    
    // Only apply smooth scrolling for hash links
    if (path.startsWith('#')) {
      const targetId = path.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
        
        // Smooth scroll to the element
        targetElement.scrollIntoView({ behavior: 'smooth' });
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
  
  return (
    <header className={`
      fixed top-0 inset-x-0 z-[100] transition-all duration-300 will-change-transform
      ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
      ${atTop ? 'bg-transparent backdrop-blur-sm' : 'bg-opacity-70 bg-AAprimary backdrop-blur-md shadow-lg'}
    `}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4">
        <div className="relative">
          <Link href="/" className="logo">
            <div className="logo-circle">
              <span>BT</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                onClick={(e) => scrollToSection(e, item.path)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="https://drive.google.com/file/d/1234567890/view" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline ml-4 bg-transparent border-2 border-AAsecondary text-AAsecondary hover:bg-AAsecondary hover:text-AAprimary transition-all duration-300 py-2 px-6 rounded-md font-semibold relative overflow-hidden"
            >
              Resume
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-end p-1 focus:outline-none focus:ring-2 focus:ring-AAsecondary rounded"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6 text-AAsecondary" />
            ) : (
              <div className="flex flex-col items-end space-y-1.5">
                <div className="w-8 h-0.5 rounded bg-AAsecondary"></div>
                <div className="w-6 h-0.5 rounded bg-AAsecondary"></div>
                <div className="w-4 h-0.5 rounded bg-AAsecondary"></div>
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
          className={`absolute right-0 top-0 h-screen w-3/4 max-w-sm bg-AAprimary shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="menu"
        >
          <div className="flex flex-col h-full justify-center items-center space-y-8 py-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className="text-center px-6 py-2 rounded-lg bg-opacity-10 hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                onClick={(e) => {
                  scrollToSection(e, item.path);
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-white text-lg hover:text-AAsecondary transition-colors duration-300">
                  {item.name}
                </span>
              </Link>
            ))}
            <Link 
              href="https://drive.google.com/file/d/1234567890/view" 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 inline-block border-2 border-AAsecondary text-AAsecondary rounded-md py-3 px-8 hover:bg-AAsecondary hover:text-AAprimary transition-all duration-300 font-semibold relative overflow-hidden"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}