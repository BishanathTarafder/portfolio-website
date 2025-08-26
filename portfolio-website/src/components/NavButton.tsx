'use client';

import { Link as ScrollLink } from 'react-scroll';
import styles from './HeroButton.module.css';

type NavButtonProps = {
  to: string;
  name: string;
  number?: string;
  isMobile?: boolean;
  onClick?: () => void;
  testId?: string;
  className?: string;
};

export function NavButton({
  to,
  name,
  number,
  isMobile = false,
  onClick,
  testId,
  className = ''
}: NavButtonProps) {
  return (
    <ScrollLink
      to={to}
      spy={true}
      smooth={true}
      offset={-100} // Offset for header height
      duration={1000} // Animation duration in ms
      onClick={onClick}
      className={`${isMobile ? 'block w-full text-center py-3 px-6' : 'py-3 px-6'} bg-transparent border-2 border-accent-color text-accent-color hover:bg-accent-color hover:text-background-color transition-all duration-300 rounded-md font-semibold relative overflow-hidden ${className}`}
      data-testid={testId}
    >
      {number && <span className="mr-2">{number}</span>}
      {name}
    </ScrollLink>
  );
}