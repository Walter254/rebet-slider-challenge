import { useState, useRef, useEffect } from 'react';
import { SliderContainer, Track, Orb, Indicator, Icon, OrbCenter } from './styles';
import { Arrows } from './AnimatedArrows';
import { DIMENSIONS, THRESHOLDS } from './constants';
import { getTranslation } from '../../locales';

const Slider = ({ language = 'en' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
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
        <Indicator visible={normalizedPosition < -THRESHOLDS.COLOR_TRANSITION}>
          <Icon>×</Icon>
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
          style={{
            transform: `translate(calc(-50% + ${position}px), -50%)`
          }}
        >
          <OrbCenter />
        </Orb>
        <Arrows 
          side="right" 
          position={currentState} 
        />
        <Indicator visible={normalizedPosition > THRESHOLDS.COLOR_TRANSITION}>
          {t.accept}
          <Icon>✓</Icon>
        </Indicator>
      </Track>
    </SliderContainer>
  );
};

export default Slider;