import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import leftArrowsData from '../assets/AnimatedAssets/glowing_left_arrows.json';
import rightArrowsData from '../assets/AnimatedAssets/glowing_right_arrows.json';
import staticLeftRedArrows from '../assets/StaticAssets/red_left_arrows.png';
import staticRightRedArrows from '../assets/StaticAssets/red_right_arrows.png';
import staticLeftGreenArrows from '../assets/StaticAssets/green_left_arrows.png';
import staticRightGreenArrows from '../assets/StaticAssets/green_right_arrows.png';

const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 24px;
  pointer-events: none;
  
  &.left {
    left: 30%;
  }
  
  &.right {
    right: 30%;
  }
`;

const StaticImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Arrows = ({ position, side }) => {
  const lottieRef = useRef();

  useEffect(() => {
    if (position === 'neutral' && lottieRef.current) {
      lottieRef.current.play();
    } else if (lottieRef.current) {
      lottieRef.current.pause();
    }
  }, [position]);

  if (position === 'decline') {
    return (
      <ArrowContainer className={side}>
        <StaticImage src={side === 'left' ? staticLeftRedArrows : staticRightRedArrows} alt="arrow" />
      </ArrowContainer>
    );
  }

  if (position === 'accept') {
    return (
      <ArrowContainer className={side}>
        <StaticImage src={side === 'left' ? staticLeftGreenArrows : staticRightGreenArrows} alt="arrow" />
      </ArrowContainer>
    );
  }

  return (
    <ArrowContainer className={side}>
      <Lottie
        lottieRef={lottieRef}
        animationData={side === 'left' ? leftArrowsData : rightArrowsData}
        loop={true}
        autoplay={position === 'neutral'}
      />
    </ArrowContainer>
  );
};