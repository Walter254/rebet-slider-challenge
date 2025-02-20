import { useState, useRef, useEffect } from 'react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import { SliderContainer, Track, Indicator, IconWrapper} from './styles';
import { Orb } from './Orb';
import { Arrows } from './AnimatedArrows';
import { Icon } from './icon';
import { DIMENSIONS, THRESHOLDS } from './constants';
import { Modal } from './Modal';
import { getTranslation } from '../../locales';

const Slider = ({ language = 'en' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [isSpringAnimating, setIsSpringAnimating] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const orbPositionRef = useRef(0);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const t = getTranslation(language).slider;
  const modalT = getTranslation(language).modal;

  const defaultMessages = {
    challengeAccepted: "Challenge Accepted! 🎉",
    challengeDeclined: "Challenge Declined 🚫",
  };

  // Calculate normalized position (-1 to 1)
  const normalizedPosition = position / (DIMENSIONS.TRACK_WIDTH / 2);

  const calculateBoundedPosition = (rawPosition) => {
    const maxOffset = DIMENSIONS.TRACK_WIDTH / 2 - DIMENSIONS.ORB_SIZE / 2;
    return Math.max(Math.min(rawPosition, maxOffset), -maxOffset);
  };

  useEffect(() => {
    if (Math.abs(normalizedPosition) >= THRESHOLDS.ACTIVATION) {
        const isAccepted = normalizedPosition > 0;
        // Use translation or fallback to default message
        const message = isAccepted 
          ? (modalT?.challengeAccepted || defaultMessages.challengeAccepted)
          : (modalT?.challengeDeclined || defaultMessages.challengeDeclined);

      setModalMessage(message);
      setShowModal(true);
      setIsSpringAnimating(true);
      setPosition(0);
      setIsDragging(false);
    }
  }, [normalizedPosition, t]);

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
    <StyleSheetManager shouldComponentUpdate={(prop) => isPropValid(prop)}>
      <>
        <SliderContainer ref={containerRef}>
          <Track position={position}>
          <Indicator position={position}>
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
        <Indicator position={position}>
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
    {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <h2 style={{
          fontSize: '2rem',
          color: '#333',
          margin: '0',
          padding: '1rem',
          fontWeight: '500'
        }}>
          {modalMessage}
        </h2>
      </Modal>
      )}
    </>
    </StyleSheetManager>
  );
};

export default Slider;