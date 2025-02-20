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
  border-radius: 9999px;
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
  transition: transform 0.3s ease-out;
  z-index: 2;
  box-shadow: ${props => {
    if (props.position < 0) {
      return `0 0 20px ${COLORS.DECLINE.BORDER.DARK}`;
    } else if (props.position > 0) {
      return `0 0 20px ${COLORS.ACCEPT.BORDER.DARK}`;
    }
    return `0 0 20px ${COLORS.NEUTRAL.BORDER.DARK}`;
  }};
  
  &:active {
    cursor: grabbing;
  }
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

