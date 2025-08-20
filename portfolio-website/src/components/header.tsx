'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';
import { MenuIcon, CloseIcon } from './icons';

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
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`fixed w-full z-20 transition duration-500 ${scrolled ? 'bg-AAprimary bg-opacity-80 backdrop-blur-sm py-2' : 'bg-opacity-0 bg-AAprimary py-4'}`}>
      <div className="container flex items-center justify-between px-6 sm:px-12">
        <div className="relative h-12 w-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-10">
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
              <span className="absolute font-bold text-AAsecondary text-2xl" style={{transform: 'translateX(-13px) translateY(30px)'}}>S</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex font-mono text-xs items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.path} className="text-AAsecondary">
              <Link href={item.path}>
                &gt; {item.number}.{' '}
                <span className={`text-white hover:text-AAsecondary duration-300 ${pathname === item.path ? 'text-AAsecondary' : ''}`}>
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
          <Link href="/resume" className="text-AAsecondary">
            &gt; 04.{' '}
            <span className={`text-white hover:text-AAsecondary duration-300 ${pathname === '/resume' ? 'text-AAsecondary' : ''}`}>
              Resume
            </span>
          </Link>
          <Link href="/resume.pdf" target="_blank" rel="noreferrer">
            <button className="text-AAsecondary border border-spacing-2 py-2 px-3 rounded-sm border-AAsecondary hover:bg-ResumeButtonHover">
              Resume PDF
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white space-y-2 hover:cursor-pointer mt-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-end"
            aria-label="Toggle menu"
          >
            <div className="w-8 h-0.5 rounded bg-AAsecondary"></div>
            <div className="w-6 h-0.5 rounded bg-AAsecondary mt-1.5"></div>
            <div className="w-4 h-0.5 rounded bg-AAsecondary mt-1.5"></div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`w-full fixed h-screen flex md:hidden duration-300 z-20 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div 
          className="w-1/4 h-full backdrop-blur-sm bg-MobileNavColor/30 hover:cursor-pointer" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className="w-3/4 h-full bg-MobileNavBarColor flex flex-col justify-center items-center space-y-8 font-sans">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className="flex flex-col text-center space-y-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-AAsecondary text-xs font-mono">{item.number}.</span>
              <span className="text-white font-Text2 text-sm sm:text-base hover:text-AAsecondary hover:cursor-pointer duration-300">
                {item.name}
              </span>
            </Link>
          ))}
          <Link href="/resume.pdf" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>
            <button className="rounded border font-Text2 border-AAsecondary hover:bg-ResumeButtonHover py-2 sm:py-4 px-5 sm:px-10 text-xs text-AAsecondary">
              Resume PDF
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}