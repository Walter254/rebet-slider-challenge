import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';

import glowingCircleData from '../assets/AnimatedAssets/glowing_circle.json';
import redButton from '../assets/StaticAssets/red_button.png';
import greenButton from '../assets/StaticAssets/green_button.png';
import orangeButton from '../assets/StaticAssets/orange_button.png';

const OrbContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 130px;  
  height: 130px; 
  transform: translate(-50%, -50%);
  cursor: grab;
  z-index: 2;

  &:active {
    cursor: grabbing;
  }
`;

const StaticOrb = styled.img`
  width: 130px;  
  height: 130px; 
  object-fit: contain;
`;


const LottieWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px; 
  height: 100px;
  pointer-events: none;
`;

export const Orb = ({ position, isDragging, isSpringAnimating, onMouseDown, style }) => {
  const lottieRef = useRef();

  useEffect(() => {
    if (!isDragging && Math.abs(position) < 10 && lottieRef.current) {
      lottieRef.current.play();
    } else if (lottieRef.current) {
      lottieRef.current.pause();
    }
  }, [isDragging, position]);

  const getOrbContent = () => {
    if (Math.abs(position) < 10) { // At center
      return (
        <>
          <StaticOrb 
            src={orangeButton} 
            alt="orb"
            style={{ position: 'relative', zIndex: 3 }}
          />
        </>
      );
    } else if (position < 0) {
      return <StaticOrb src={redButton} alt="orb" />;
    } else {
      return <StaticOrb src={greenButton} alt="orb" />;
    }
  };

  return (
    <OrbContainer
      onMouseDown={onMouseDown}
      style={{
        transform: `translate(calc(-50% + ${position}px), -50%)`,
        transition: isSpringAnimating 
          ? 'transform 600ms cubic-bezier(0.25, 0.8, 0.25, 1.3)' 
          : 'none'
      }}
      className={isSpringAnimating ? 'spring-animating' : ''}
    >
      {getOrbContent()}
    </OrbContainer>
  );
};