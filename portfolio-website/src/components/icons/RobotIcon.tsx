import React from 'react';

interface RobotIconProps {
  className?: string;
}

const RobotIcon: React.FC<RobotIconProps> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={className}
      fill="none"
    >
      {/* Robot Head */}
      <rect x="130" y="100" width="240" height="200" rx="30" fill="#E2E8F0" stroke="#2D3748" strokeWidth="10" />
      
      {/* Robot Face Screen */}
      <rect x="150" y="120" width="200" height="160" rx="15" fill="#1E3A5F" stroke="#2D3748" strokeWidth="5" />
      
      {/* Robot Eyes */}
      <circle cx="200" cy="170" r="25" fill="#6049EA" />
      <circle cx="300" cy="170" r="25" fill="#6049EA" />
      
      {/* Robot Smile */}
      <path d="M220 220 Q250 240 280 220" stroke="#6049EA" strokeWidth="10" strokeLinecap="round" />
      
      {/* Robot Ears/Antenna */}
      <rect x="110" y="150" width="20" height="60" rx="5" fill="#E2E8F0" />
      <rect x="370" y="150" width="20" height="60" rx="5" fill="#E2E8F0" />
      
      {/* Robot Head Top */}
      <path d="M130 100 Q250 70 370 100" fill="#E2E8F0" stroke="#2D3748" strokeWidth="5" />
      
      {/* Robot Body */}
      <path d="M180 300 L180 380 Q250 400 320 380 L320 300" fill="#E2E8F0" stroke="#2D3748" strokeWidth="10" />
      
      {/* Robot Arms */}
      <path d="M180 320 L120 380" stroke="#E2E8F0" strokeWidth="20" strokeLinecap="round" />
      <path d="M320 320 L380 380" stroke="#E2E8F0" strokeWidth="20" strokeLinecap="round" />
      
      {/* Robot Body Line */}
      <path d="M200 350 L300 350" stroke="#6049EA" strokeWidth="5" />
      
      {/* Shadow */}
      <ellipse cx="250" cy="430" rx="70" ry="10" fill="#CBD5E0" opacity="0.3" />
    </svg>
  );
};

export default RobotIcon;