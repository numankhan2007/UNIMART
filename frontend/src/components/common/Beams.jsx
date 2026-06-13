import React from 'react';

export const HBeam = ({ y, x, width, reverse, delay, duration }) => (
  <div className="absolute h-[2px] overflow-hidden rounded-full" style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`, width: `${width}px` }}>
    <div className="w-[40%] h-full rounded-full" style={{
      background: reverse ? 'linear-gradient(to left, transparent, rgba(99, 102, 241, 0.9) 100%)' : 'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.9) 100%)',
      animation: `${reverse ? 'beam-left' : 'beam-right'} ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      transform: reverse ? 'translateX(250%)' : 'translateX(-100%)',
      boxShadow: '0 0 10px 1px rgba(99, 102, 241, 0.4)'
    }} />
  </div>
);

export const VBeam = ({ x, y, height, reverse, delay, duration }) => (
  <div className="absolute w-[2px] overflow-hidden rounded-full" style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`, height: `${height}px` }}>
    <div className="h-[40%] w-full rounded-full" style={{
      background: reverse ? 'linear-gradient(to top, transparent, rgba(99, 102, 241, 0.9) 100%)' : 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.9) 100%)',
      animation: `${reverse ? 'beam-up' : 'beam-down'} ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      transform: reverse ? 'translateY(250%)' : 'translateY(-100%)',
      boxShadow: '0 0 10px 1px rgba(99, 102, 241, 0.4)'
    }} />
  </div>
);
