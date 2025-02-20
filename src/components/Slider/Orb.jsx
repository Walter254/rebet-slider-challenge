import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import redButton from '../assets/StaticAssets/red_button.png';
import greenButton from '../assets/StaticAssets/green_button.png';
import orangeButton from '../assets/StaticAssets/orange_button.png';

const OrbContainer = styled.div`
  position: absolute;
  top: 45%;
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
  transition: filter 0.3s ease;
  filter: drop-shadow(0 0 0 transparent);
`;

const OrangeOrb = styled(StaticOrb)`
  position: relative;
  z-index: 3;
  filter: drop-shadow(0 0 4px rgba(255, 166, 0, 0.7));
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0% {
      filter: drop-shadow(0 0 2px rgba(255, 166, 0, 0.4));
    }
    50% {
      filter: drop-shadow(0 0 6px rgba(255, 166, 0, 0.8));
    }
    100% {
      filter: drop-shadow(0 0 2px rgba(255, 166, 0, 0.4));
    }
  }

  &:hover {
    animation: none;
    filter: drop-shadow(0 0 8px rgba(255, 166, 0, 0.9));
  }
`;

export const Orb = ({ position, isDragging, isSpringAnimating, onMouseDown }) => {
  const lottieRef = useRef();

  useEffect(() => {
    if (!isDragging && Math.abs(position) < 10 && lottieRef.current) {
      lottieRef.current.play();
    } else if (lottieRef.current) {
      lottieRef.current.pause();
    }
  }, [isDragging, position]);

  const getOrbContent = () => {
    if (Math.abs(position) < 10) {
      // At center
      return <OrangeOrb src={orangeButton} alt="orb" />;
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
          : 'none',
      }}
      className={isSpringAnimating ? 'spring-animating' : ''}
    >
      {getOrbContent()}
    </OrbContainer>
  );
};
