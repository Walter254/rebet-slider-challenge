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
  position: relative;
  width: ${DIMENSIONS.TRACK_WIDTH}px;
  height: ${DIMENSIONS.TRACK_HEIGHT}px;
  border-radius: ${DIMENSIONS.BORDER_RADIUS}px;
  background: ${props => {
    if (props.position < 0) {
      return `linear-gradient(
        90deg, 
        ${COLORS.DECLINE.LIGHT} 0%,
        ${COLORS.DECLINE.DARK} 50%,
        ${COLORS.DECLINE.LIGHT} 100%
      )`;
    } else if (props.position > 0) {
      return `linear-gradient(
        90deg, 
        ${COLORS.ACCEPT.LIGHT} 0%,
        ${COLORS.ACCEPT.DARK} 50%,
        ${COLORS.ACCEPT.LIGHT} 100%
      )`;
    }
    return `linear-gradient(
      90deg, 
      ${COLORS.NEUTRAL.LIGHT} 0%,
      ${COLORS.NEUTRAL.DARK} 50%,
      ${COLORS.NEUTRAL.LIGHT} 100%
    )`;
  }};
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border: ${DIMENSIONS.BORDER_WIDTH}px solid transparent;

  &::before {
    content: '';
    position: absolute;
    inset: -${DIMENSIONS.BORDER_WIDTH}px;
    border-radius: ${DIMENSIONS.BORDER_RADIUS + DIMENSIONS.BORDER_WIDTH}px;
    padding: ${DIMENSIONS.BORDER_WIDTH}px;
    background: ${props => {
      if (props.position < 0) {
        return `linear-gradient(
          90deg, 
          ${COLORS.DECLINE.BORDER.LIGHT} 0%,
          ${COLORS.DECLINE.BORDER.DARK} 50%,
          ${COLORS.DECLINE.BORDER.LIGHT} 100%
        )`;
      } else if (props.position > 0) {
        return `linear-gradient(
          90deg, 
          ${COLORS.ACCEPT.BORDER.LIGHT} 0%,
          ${COLORS.ACCEPT.BORDER.DARK} 50%,
          ${COLORS.ACCEPT.BORDER.LIGHT} 100%
        )`;
      }
      return `linear-gradient(
        90deg, 
        ${COLORS.NEUTRAL.BORDER.LIGHT} 0%,
        ${COLORS.NEUTRAL.BORDER.DARK} 50%,
        ${COLORS.NEUTRAL.BORDER.LIGHT} 100%
      )`;
    }};
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
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

  // Color transitions based on orb position
  color: ${props => {
    if (Math.abs(props.position) < 10) {
      return COLORS.TEXT.WHITE;  // Center position - white
    } else if (props.position > 0) {
      return COLORS.TEXT.GREEN;  // Right position - specific green
    } else {
      return COLORS.TEXT.RED;    // Left position - specific red
    }
  }};
  
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

