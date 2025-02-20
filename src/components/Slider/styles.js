import styled from 'styled-components';
import { DIMENSIONS } from './constants';

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
  background-color: rgba(37, 37, 47, 1);
  border-radius: 2px;
  position: relative;
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
  
  &:active {
    cursor: grabbing;
  }
`;