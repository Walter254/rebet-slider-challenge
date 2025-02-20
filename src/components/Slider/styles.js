import styled from 'styled-components';
import { COLORS, DIMENSIONS } from './constants';

export const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  position: relative;
  user-select: none;
`;

export const Track = styled.div`
  width: ${DIMENSIONS.TRACK_WIDTH}px;
  height: ${DIMENSIONS.TRACK_HEIGHT}px;
  background: ${props => {
    if (props.position < 0) {
      return `linear-gradient(to right, ${COLORS.DECLINE.LIGHT}, ${COLORS.DECLINE.DARK})`;
    } else if (props.position > 0) {
      return `linear-gradient(to right, ${COLORS.ACCEPT.LIGHT}, ${COLORS.ACCEPT.DARK})`;
    }
    return `linear-gradient(to right, ${COLORS.NEUTRAL.LIGHT}, ${COLORS.NEUTRAL.DARK})`;
  }};
  border-radius: ${DIMENSIONS.BORDER_RADIUS}px; // Changed from 9999px to specific radius
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-shadow: ${props => {
    if (props.position < 0) {
      return `0 0 0 ${DIMENSIONS.BORDER_WIDTH}px ${COLORS.DECLINE.BORDER.DARK}`;
    } else if (props.position > 0) {
      return `0 0 0 ${DIMENSIONS.BORDER_WIDTH}px ${COLORS.ACCEPT.BORDER.DARK}`;
    }
    return `0 0 0 ${DIMENSIONS.BORDER_WIDTH}px ${COLORS.NEUTRAL.BORDER.DARK}`;
  }};
`;

export const Orb = styled.div`
  width: ${DIMENSIONS.ORB_SIZE}px;
  height: ${DIMENSIONS.ORB_SIZE}px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: grab;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;           // for centering the inner circle
  justify-content: center; // for centering the inner circle
  align-items: center;     // for centering the inner circle
  box-shadow: ${props => {
    if (props.position < 0) {
      return `0 0 20px ${COLORS.DECLINE.BORDER.DARK}`;
    } else if (props.position > 0) {
      return `0 0 20px ${COLORS.ACCEPT.BORDER.DARK}`;
    }
    return `0 0 20px ${COLORS.NEUTRAL.BORDER.DARK}`;
  }};
  
  transition: ${props => 
    props.isDragging
      ? 'none'
      : 'transform 600ms cubic-bezier(0.25, 0.8, 0.25, 1.3)'
  };

  &:active {
    cursor: grabbing;
  }
`;

export const OrbCenter = styled.div`
  width: 35px;  // Size of the inner circle
  height: 35px; // Size of the inner circle
  background-color: rgba(0, 0, 0, 0.8); // Slightly transparent black
  border-radius: 50%;
  position: relative;
  z-index: 3;
`;

export const Arrow = styled.span`
  color: ${COLORS.NEUTRAL.BORDER.DARK};
  font-size: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
  
  &.left {
    left: 30%;
  }
  
  &.right {
    right: 30%;
  }
`;

export const Indicator = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1;
  opacity: ${props => props.visible ? 1 : 0.7};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

export const Icon = styled.span`
  font-size: 20px;
`;

