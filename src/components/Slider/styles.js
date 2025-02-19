import styled from 'styled-components';
import { COLORS, DIMENSIONS } from './constants';

export const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  position: relative;
`;

export const Track = styled.div`
  width: ${DIMENSIONS.TRACK_WIDTH};
  height: ${DIMENSIONS.TRACK_HEIGHT};
  background-color: ${COLORS.TRACK};
  border-radius: 2px;
  position: relative;
`;

export const Orb = styled.div`
  width: ${DIMENSIONS.ORB_SIZE};
  height: ${DIMENSIONS.ORB_SIZE};
  background-color: ${COLORS.PRIMARY};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;