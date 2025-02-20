export const COLORS = {
    TEXT: {
        WHITE: '#FFFFFF',
        GREEN: 'rgba(7, 110, 73, 1)',
        RED: 'rgba(128, 32, 55, 1)'
    },
    
    // State-specific colors
    DECLINE: {
      LIGHT: 'rgba(98, 22, 49, 1)',
      DARK: 'rgba(255, 90, 139, 1)',
      BORDER: {
        LIGHT: 'rgba(98, 22, 49, 1)',
        DARK: 'rgba(218, 73, 108, 1)'
      }
    },
    ACCEPT: {
      LIGHT: 'rgba(27, 125, 67, 1)',
      DARK: 'rgba(108, 231, 150, 1)',
      BORDER: {
        LIGHT: 'rgba(26, 80, 62, 1)',
        DARK: 'rgba(64, 198, 134, 1)'
      }
    },
    NEUTRAL: {
      LIGHT: 'rgba(37, 37, 47, 1)',
      DARK: 'rgba(20, 20, 27, 1)',
      BORDER: {
        LIGHT: 'rgba(252, 66, 51, 0.5)',
        DARK: 'rgba(255, 238, 146, 1)'
      }
    }
  };
  
  export const DIMENSIONS = {
    TRACK_WIDTH: 335,
    TRACK_HEIGHT: 68,
    ORB_SIZE: 60,
    BORDER_WIDTH: 4,
    BORDER_RADIUS: 16
  };
  
  export const THRESHOLDS = {
    ACTIVATION: 0.8,
    COLOR_TRANSITION: 0.1
  };