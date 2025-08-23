'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './theme-toggle';
import { CloseIcon } from './icons';

const navItems = [
  { name: 'About', number: '01', path: '/about' },
  { name: 'Experience', number: '02', path: '/experience' },
  { name: 'Work', number: '03', path: '/projects' },
  { name: 'Resume', number: '04', path: '/resume' },
  { name: 'Contact', number: '05', path: '/contact' },
];

export function Header() {
  const pathname = usePathname();
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
      ${atTop ? 'bg-transparent backdrop-blur-0 shadow-none' : 'bg-[rgba(17,25,40,0.75)] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.18)]'}
    `}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4">
        <div className="relative h-10 sm:h-12 w-8 sm:w-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 sm:h-12 w-8 sm:w-10 transition-transform duration-300 group-hover:scale-110">
              <div className="absolute h-1 w-1/2 bg-AAsecondary"></div>
              <div className="absolute h-full w-1 bg-AAsecondary"></div>
              <div className="absolute bottom-0 h-1 w-full bg-AAsecondary"></div>
              <div className="absolute right-0 bottom-0 h-6 w-1 bg-AAsecondary"></div>
              <div className="absolute left-2 top-3 h-1.5 w-[3.5px] bg-AAsecondary"></div>
              <div className="absolute right-2 top-3 h-1.5 w-[3.5px] bg-AAsecondary"></div>
              <div className="absolute right-4 top-0 h-[18px] w-1 bg-AAsecondary"></div>
              <div className="absolute right-0 top-[14px] h-1 w-4 bg-AAsecondary"></div>
              <div className="absolute right-3 top-0 h-1 w-1 bg-AAsecondary"></div>
              <div className="absolute right-0 top-[10px] h-1 w-1 bg-AAsecondary"></div>
              <div className="absolute right-1 top-[7px] h-[4px] w-[4px] bg-AAsecondary"></div>
              <div className="absolute right-2 top-[4px] h-[4px] w-[4px] bg-AAsecondary"></div>
              <div className="absolute left-3 bottom-[10px] w-3 h-[3px] bg-AAsecondary"></div>
              <div className="absolute left-[9px] bottom-[7px] w-[3px] h-[3px] bg-AAsecondary"></div>
              <div className="absolute right-[9px] bottom-[7px] w-[3px] h-[3px] bg-AAsecondary"></div>
              <span className="absolute font-bold text-AAsecondary text-xl sm:text-2xl" style={{transform: 'translateX(-13px) translateY(25px) sm:translateY(30px)'}}>S</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex font-mono text-xs lg:text-sm items-center space-x-5 lg:space-x-8">
          {navItems.map((item) => (
            <div key={item.path} className="text-AAsecondary hover:translate-y-[-2px] transition-transform duration-200">
              <Link href={item.path} className="group">
                <span className="text-AAsecondary">&gt; {item.number}.{' '}</span>
                <span className={`text-white group-hover:text-AAsecondary transition-colors duration-300 ${pathname === item.path ? 'text-AAsecondary' : ''}`}>
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
          <div className="flex items-center space-x-4">
            <Link 
              href="/resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="text-AAsecondary border border-AAsecondary py-2 px-3 rounded-md hover:bg-AAsecondary hover:bg-opacity-10 transition-all duration-300 text-xs lg:text-sm"
            >
              Resume
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
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
                className="flex flex-col text-center space-y-1 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-AAsecondary text-xs font-mono">{item.number}.</span>
                <span className="text-white text-lg group-hover:text-AAsecondary transition-colors duration-300">
                  {item.name}
                </span>
              </Link>
            ))}
            <Link 
              href="/resume.pdf" 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 inline-block border border-AAsecondary text-AAsecondary rounded-md py-3 px-8 hover:bg-AAsecondary hover:bg-opacity-10 transition-all duration-300"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}