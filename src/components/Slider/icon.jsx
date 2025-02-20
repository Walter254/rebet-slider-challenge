import React from 'react';
import styled from 'styled-components';


import whiteCheck from '../assets/StaticAssets/white_check.png';
import greenCheck from '../assets/StaticAssets/green_check.png';
import redCheck from '../assets/StaticAssets/red_check.png';
import whiteClose from '../assets/StaticAssets/white_close.png';
import greenClose from '../assets/StaticAssets/green_close.png';
import redClose from '../assets/StaticAssets/red_close.png';

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const Icon = ({ type, position }) => {
  const getIconSrc = () => {
    if (Math.abs(position) < 10) { // Center position
      return type === 'check' ? whiteCheck : whiteClose;
    } else if (position > 0) { // Right position
      return type === 'check' ? greenCheck : greenClose;
    } else { // Left position
      return type === 'check' ? redCheck : redClose;
    }
  };

  return <IconImage src={getIconSrc()} alt={type} />;
};