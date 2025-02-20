import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import leftArrowsData from '../assets/AnimatedAssets/glowing_left_arrows.json';
import rightArrowsData from '../assets/AnimatedAssets/glowing_right_arrows.json';

const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 24px;
  pointer-events: none;
  
  &.left {
    left: 30%;
  }
  
  &.right {
    right: 30%;
  }
`;

export const LeftArrows = () => (
  <ArrowContainer className="left">
    <Lottie
      animationData={leftArrowsData}
      loop={true}
      autoplay={true}
    />
  </ArrowContainer>
);

export const RightArrows = () => (
  <ArrowContainer className="right">
    <Lottie
      animationData={rightArrowsData}
      loop={true}
      autoplay={true}
    />
  </ArrowContainer>
);