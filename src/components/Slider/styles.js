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
  border-radius: ${DIMENSIONS.BORDER_RADIUS}px;
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

export const Indicator = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 2px;
  color: white;
  font-size: 16px;
  pointer-events: none;
  transition: color 300ms ease;
  
  // Positioning for the decline (left) side
  &:first-child {
    left: 2%;
  }
  
  // Positioning for the accept (right) side
  &:last-child {
    right: 2%;
  }
`;


export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.side === 'left' ? '0 8px 0 0' : '0 0 0 8px'};
`;

