'use client';

import { Link as ScrollLink } from 'react-scroll';

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
      className={`${isMobile ? 'block w-full text-center' : ''} text-accent-color font-semibold ${className}`}
      data-testid={testId}
    >
      {number && <span className="mr-2">{number}</span>}
      {name}
    </ScrollLink>
  );
}