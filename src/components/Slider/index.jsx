import { useState, useRef, useEffect } from 'react';

import { SliderContainer, Track, Indicator, IconWrapper} from './styles';
import { Orb } from './Orb';
import { Arrows } from './AnimatedArrows';
import { Icon } from './icon';
import { DIMENSIONS, THRESHOLDS } from './constants';
import { getTranslation } from '../../locales';

const Slider = ({ language = 'en' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [isSpringAnimating, setIsSpringAnimating] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const orbPositionRef = useRef(0);

  const t = getTranslation(language).slider;

  // Calculate normalized position (-1 to 1)
  const normalizedPosition = position / (DIMENSIONS.TRACK_WIDTH / 2);

  const calculateBoundedPosition = (rawPosition) => {
    const maxOffset = DIMENSIONS.TRACK_WIDTH / 2 - DIMENSIONS.ORB_SIZE / 2;
    return Math.max(Math.min(rawPosition, maxOffset), -maxOffset);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsSpringAnimating(false);
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
    if (Math.abs(normalizedPosition) >= THRESHOLDS.ACTIVATION) {
      console.log(normalizedPosition > 0 ? 'Accepted' : 'Declined');
    }
    setIsSpringAnimating(true);
    setPosition(0);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Determine the current position state
  const getPositionState = () => {
    if (Math.abs(normalizedPosition) < THRESHOLDS.COLOR_TRANSITION) {
      return 'neutral';  // Center - orange and animated
    } else if (normalizedPosition < 0) {
      return 'decline';  // Left - static red
    } else {
      return 'accept';   // Right - static green
    }
  };

  const currentState = getPositionState();

  return (
    <SliderContainer ref={containerRef}>
      <Track position={position}>
        <Indicator>
          <IconWrapper side="left">
            <Icon 
              type="close" 
              position={position} 
            />
          </IconWrapper>
          {t.decline}
        </Indicator>
        <Arrows 
          side="left" 
          position={currentState} 
        />
        <Orb 
          onMouseDown={handleMouseDown}
          position={position}
          isDragging={isDragging}
          isSpringAnimating={isSpringAnimating}
        />
        <Arrows 
          side="right" 
          position={currentState} 
        />
        <Indicator>
          {t.accept}
          <IconWrapper side="right">
            <Icon 
              type="check" 
              position={position} 
            />
          </IconWrapper>
        </Indicator>
      </Track>
    </SliderContainer>
  );
};

export default Slider;