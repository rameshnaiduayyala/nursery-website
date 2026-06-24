import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (desktop)
    const mediaQuery = window.matchMedia('(any-pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer') ||
        (target.style && target.style.cursor === 'pointer');

      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Custom follower circle outline */}
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: hovered ? '54px' : '24px',
          height: hovered ? '54px' : '24px',
          backgroundColor: hovered ? 'rgba(198, 169, 105, 0.12)' : 'transparent',
          borderColor: '#C6A969',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Custom solid target center dot */}
      <div
        className="custom-cursor-dot hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 0.6 : 1})`,
          transition: 'transform 0.2s ease-out',
        }}
      />
    </>
  );
}
