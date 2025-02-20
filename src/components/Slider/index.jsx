import { useState, useRef, useEffect } from 'react';
import { SliderContainer, Track, Orb } from './styles';
import { DIMENSIONS } from './constants';

const Slider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const orbPositionRef = useRef(0);

  const calculateBoundedPosition = (rawPosition) => {
    const maxOffset = DIMENSIONS.TRACK_WIDTH / 2 - DIMENSIONS.ORB_SIZE / 2;
    return Math.max(Math.min(rawPosition, maxOffset), -maxOffset);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    orbPositionRef.current = position;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startXRef.current;
    const newPosition = calculateBoundedPosition(orbPositionRef.current + deltaX);
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Return to center with animation
    setPosition(0);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    document.addEventListener('mouseup', handleMouseUpGlobal);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging]);

  return (
    <SliderContainer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Track>
        <Orb
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(calc(-50% + ${position}px), -50%)`
          }}
        />
      </Track>
    </SliderContainer>
  );
};

export default Slider;