import React, { useState } from 'react';
import { SliderContainer, Track, Orb } from './styles';

const Slider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // I'll implement drag logic in the next phase
    console.log('Dragging...');
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // I'll implement return-to-center in the next phase
    setPosition(0);
  };

  return (
    <SliderContainer
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Track>
        <Orb
          onMouseDown={handleMouseDown}
        />
      </Track>
    </SliderContainer>
  );
};

export default Slider;